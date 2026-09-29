// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { storageService } from "../src/storage/storageService.js";
import { PlayerEntryView } from "../src/components/PlayerEntryView.js";
import { CategorySelectView } from "../src/components/CategorySelect.js";
import { GameView } from "../src/components/GameView.js";
import { ResultsView } from "../src/components/ResultsView.js";
import { GameEngine } from "../src/state/gameState.js";

describe("Player Name Login & Welcome Screen Flow", () => {
  let container;

  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '<main id="main-content"></main>';
    container = document.getElementById("main-content");
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    storageService.clearCurrentPlayerName();
  });

  describe("1. Player Session State Storage", () => {
    it("stores, retrieves, and clears player name in session storage", () => {
      expect(storageService.getCurrentPlayerName()).toBe("");

      storageService.setCurrentPlayerName("Alice Francita");
      expect(storageService.getCurrentPlayerName()).toBe("Alice Francita");

      storageService.setCurrentPlayerName("   Rahul   ");
      expect(storageService.getCurrentPlayerName()).toBe("Rahul");

      storageService.clearCurrentPlayerName();
      expect(storageService.getCurrentPlayerName()).toBe("");
    });
  });

  describe("2. PlayerEntryView - Name Validation & UI", () => {
    it("renders the contest title, subtitle, input with placeholder, and continue button", () => {
      const view = new PlayerEntryView(container);
      view.render();

      expect(container.innerHTML).toContain("GUESS THE NAME CONTEST");
      expect(container.innerHTML).toContain("Enter your name to begin");
      expect(container.innerHTML).toContain('placeholder="Enter your name"');
      expect(container.innerHTML).toContain("Continue");

      const input = container.querySelector("#player-name-input");
      const btn = container.querySelector("#btn-continue-name");
      expect(input).not.toBeNull();
      expect(btn).not.toBeNull();
    });

    it("displays error message when submitting empty input or spaces only", () => {
      let submittedName = null;
      const view = new PlayerEntryView(container, (name) => {
        submittedName = name;
      });
      view.render();

      const input = container.querySelector("#player-name-input");
      const errorMsg = container.querySelector("#name-error-msg");

      // Submit empty
      input.value = "";
      view.handleSubmit();

      expect(submittedName).toBeNull();
      expect(errorMsg.style.display).not.toBe("none");
      expect(errorMsg.textContent).toContain("Please enter your name to continue.");

      // Submit whitespace only
      input.value = "     ";
      view.handleSubmit();
      expect(submittedName).toBeNull();
      expect(errorMsg.style.display).not.toBe("none");
      expect(errorMsg.textContent).toContain("Please enter your name to continue.");
    });

    it("clears error message when user starts typing", () => {
      const view = new PlayerEntryView(container);
      view.render();

      const input = container.querySelector("#player-name-input");
      const errorMsg = container.querySelector("#name-error-msg");

      view.showError("Please enter your name to continue.");
      expect(errorMsg.style.display).toBe("flex");

      input.value = "A";
      input.dispatchEvent(new Event("input"));
      expect(errorMsg.style.display).toBe("none");
    });

    it("trims whitespace and submits valid player name", () => {
      let submittedName = null;
      const view = new PlayerEntryView(container, (name) => {
        submittedName = name;
      });
      view.render();

      const input = container.querySelector("#player-name-input");
      input.value = "   Alice Francita   ";
      view.handleSubmit();

      expect(submittedName).toBe("Alice Francita");
      expect(view.playerName).toBe("Alice Francita");
    });
  });

  describe("3. Welcome Screen & Automatic Transition", () => {
    it("renders welcome screen with dynamically inserted name (no hardcoding)", () => {
      const view = new PlayerEntryView(container);
      view.playerName = "Rahul";
      view.renderWelcomeScreen();

      expect(container.innerHTML).toContain("Welcome, <span class=\"welcome-player-name\">Rahul</span>!");
      expect(container.innerHTML).toContain("Guess the Name Contest");
      expect(container.innerHTML).toContain("Get ready to test your knowledge!");

      // Test with another name
      view.playerName = "Priya";
      view.renderWelcomeScreen();
      expect(container.innerHTML).toContain("Welcome, <span class=\"welcome-player-name\">Priya</span>!");
      expect(container.innerHTML).not.toContain("Rahul");
    });

    it("automatically triggers onComplete after approximately 2 seconds", () => {
      let completedName = null;
      const view = new PlayerEntryView(
        container,
        null,
        (name) => {
          completedName = name;
        }
      );
      view.render();

      const input = container.querySelector("#player-name-input");
      input.value = "Detective Holmes";
      view.handleSubmit();

      expect(completedName).toBeNull();
      expect(view.state).toBe("welcome");

      // Advance by 1999ms
      vi.advanceTimersByTime(1999);
      expect(completedName).toBeNull();

      // Advance to 2000ms
      vi.advanceTimersByTime(1);
      expect(completedName).toBe("Detective Holmes");
    });

    it("cleans up transition timer on unmount", () => {
      let completedName = null;
      const view = new PlayerEntryView(
        container,
        null,
        (name) => {
          completedName = name;
        }
      );
      view.render();

      const input = container.querySelector("#player-name-input");
      input.value = "Detective Holmes";
      view.handleSubmit();

      view.unmount();
      vi.advanceTimersByTime(5000);
      expect(completedName).toBeNull();
    });
  });

  describe("4. Personalized Greeting in Main UI (Category Selection)", () => {
    it("displays personalized greeting with player name and switch player button", () => {
      let switched = false;
      const view = new CategorySelectView(
        container,
        () => {},
        () => {},
        "Alice Francita",
        () => {
          switched = true;
        }
      );
      view.render();

      expect(container.innerHTML).toContain("Ready to play, <strong class=\"player-greeting-name\">Alice Francita</strong>?");
      const switchBtn = container.querySelector("#btn-change-player");
      expect(switchBtn).not.toBeNull();
      expect(switchBtn.textContent).toContain("Switch Player");

      switchBtn.click();
      expect(switched).toBe(true);
    });

    it("preserves all 10 syllabus categories", () => {
      const view = new CategorySelectView(container, () => {}, () => {}, "Player One");
      view.render();

      const categories = storageService.getCategories();
      expect(categories.length).toBe(10);
      categories.forEach((cat) => {
        expect(container.textContent).toContain(cat.name);
      });
    });
  });

  describe("5. GameView Quiz Header Player Display", () => {
    it("displays player name in quiz header without cluttering", () => {
      const engine = new GameEngine();
      const cat = storageService.getCategories()[0];
      const questions = storageService.getQuestions();

      engine.startQuiz(cat, questions, "Alice Francita");

      const gameView = new GameView(container, engine, () => {});
      gameView.mount();

      expect(container.innerHTML).toContain("Alice Francita");
      expect(container.innerHTML).toContain("game-player-tag");

      gameView.unmount();
      engine.stopTimer();
    });
  });

  describe("6. Final Results Player Display", () => {
    it("displays player name and all required metrics on results screen", () => {
      const stats = {
        playerName: "Alice Francita",
        categoryId: "taxonomy-systematics",
        categoryName: "Taxonomy & Systematics",
        categoryIcon: "🔬",
        unit: "Unit I",
        unitTitle: "Principles of Animal Taxonomy",
        score: 36,
        maxPossibleScore: 40,
        questionsCompleted: 10,
        correctCount: 9,
        incorrectCount: 1,
        percentage: 90,
        accuracy: 90,
        stageBreakdown: { A: 7, B: 2, C: 0, D: 0, none: 1 },
        questionResults: []
      };

      const results = new ResultsView(container, stats, () => {}, () => {}, () => {});
      results.render();

      expect(container.innerHTML).toContain("Well played, <span class=\"results-player-name\">Alice Francita</span>!");
      expect(container.innerHTML).toContain("Score");
      expect(container.innerHTML).toContain("Correct Answers");
      expect(container.innerHTML).toContain("Incorrect Answers");
      expect(container.innerHTML).toContain("Accuracy");
      expect(container.innerHTML).toContain("36");
      expect(container.innerHTML).toContain("9");
      expect(container.innerHTML).toContain("1");
      expect(container.innerHTML).toContain("90%");
    });

    it("dynamically shows different player names on results screen", () => {
      const stats = {
        playerName: "Rahul Sharma",
        categoryId: "taxonomy-systematics",
        categoryName: "Taxonomy & Systematics",
        score: 28,
        maxPossibleScore: 40,
        questionsCompleted: 10,
        correctCount: 7,
        incorrectCount: 3,
        accuracy: 70,
        stageBreakdown: { A: 4, B: 3, C: 0, D: 0, none: 3 },
        questionResults: []
      };

      const results = new ResultsView(container, stats, () => {}, () => {}, () => {});
      results.render();

      expect(container.innerHTML).toContain("Well played, <span class=\"results-player-name\">Rahul Sharma</span>!");
      expect(container.innerHTML).not.toContain("Alice Francita");
    });
  });
});
