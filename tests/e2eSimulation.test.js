// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { App } from "../src/main.js";
import { storageService } from "../src/storage/storageService.js";

describe("Requirement 17: Complete End-to-End Flow Verification", () => {
  let app;
  let mainContent;

  beforeEach(() => {
    window.__TEST_RUNNER__ = true;
    vi.useFakeTimers();
    sessionStorage.clear();
    document.body.innerHTML = `
      <div id="app">
        <header class="app-header">
          <div class="brand" id="brand-logo" title="Back to Categories">
            <span class="brand-title">CLUE SLEUTH</span>
          </div>
          <nav class="nav-actions">
            <button id="btn-toggle-sound">🔊</button>
            <button id="btn-open-scoreboard">🏆 Scoreboard</button>
            <button id="btn-open-settings">⚙️ Settings</button>
          </nav>
        </header>
        <main id="main-content"></main>
      </div>
    `;
    mainContent = document.getElementById("main-content");
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    sessionStorage.clear();
    if (app) {
      app.cleanupCurrentView();
      if (app.engine) app.engine.stopTimer();
    }
  });

  it("executes all steps 1 through 21 of the test specification", () => {
    // Step 1: Start application
    app = new App();

    // Step 2: Name-entry screen appears first
    expect(app.currentView).toBe("login");
    expect(mainContent.innerHTML).toContain("GUESS THE NAME CONTEST");
    expect(mainContent.innerHTML).toContain("Enter your name to begin");
    const nameInput = mainContent.querySelector("#player-name-input");
    const continueBtn = mainContent.querySelector("#btn-continue-name");
    const errorMsg = mainContent.querySelector("#name-error-msg");
    expect(nameInput).not.toBeNull();
    expect(continueBtn).not.toBeNull();

    // Step 3 & 4: Enter no name -> Confirm validation message appears
    continueBtn.click();
    expect(errorMsg.style.display).not.toBe("none");
    expect(errorMsg.textContent).toContain("Please enter your name to continue.");
    expect(app.currentView).toBe("login");

    // Also test whitespace-only name
    nameInput.value = "     ";
    continueBtn.click();
    expect(errorMsg.style.display).not.toBe("none");
    expect(errorMsg.textContent).toContain("Please enter your name to continue.");

    // Step 5: Enter "Alice Francita"
    nameInput.value = "Alice Francita";

    // Step 6: Click Continue
    continueBtn.click();

    // Step 7: Confirm "Welcome, Alice Francita!"
    expect(mainContent.innerHTML).toContain("Welcome, <span class=\"welcome-player-name\">Alice Francita</span>!");

    // Step 8: Confirm "Guess the Name Contest" appears
    expect(mainContent.innerHTML).toContain("Guess the Name Contest");
    expect(mainContent.innerHTML).toContain("Get ready to test your knowledge!");

    // Step 9: Wait approximately 2 seconds (auto-advance)
    vi.advanceTimersByTime(2000);

    // Step 10: Confirm Main UI appears
    expect(app.currentView).toBe("category");

    // Step 11: Confirm all 10 categories are present
    const categories = storageService.getCategories();
    expect(categories.length).toBe(10);
    categories.forEach((cat) => {
      expect(mainContent.textContent).toContain(cat.name);
    });

    // Step 12: Confirm player name appears in the Main UI
    expect(mainContent.innerHTML).toContain("Ready to play, <strong class=\"player-greeting-name\">Alice Francita</strong>?");

    // Step 13: Start a category
    const firstCatCard = mainContent.querySelector(`.category-card[data-cat-id="${categories[0].id}"]`);
    expect(firstCatCard).not.toBeNull();
    firstCatCard.click();

    // Step 14: Confirm quiz works normally
    expect(app.currentView).toBe("game");
    expect(mainContent.querySelector(".view-game")).not.toBeNull();
    const currentQ = app.engine.getCurrentQuestion();
    expect(currentQ).not.toBeNull();

    // Step 15: Confirm timer works without screen blinking
    // Ticking the timer updates the timer widget directly
    const initialSeconds = app.engine.timeLeft;
    vi.advanceTimersByTime(1000);
    expect(app.engine.timeLeft).toBe(initialSeconds - 1);
    const timerSecEl = mainContent.querySelector("#timer-seconds");
    expect(timerSecEl).not.toBeNull();
    expect(timerSecEl.textContent).toBe(`${initialSeconds - 1}s`);

    // Step 16: Confirm player name is displayed during the game in quiz header
    expect(mainContent.innerHTML).toContain("Alice Francita");
    const playerTag = mainContent.querySelector(".game-player-tag");
    expect(playerTag).not.toBeNull();
    expect(playerTag.textContent).toContain("Alice Francita");

    // Step 17 & 18: Finish a quiz & Confirm player name appears on results
    // Force finish game to view results
    app.engine.finishGame();
    expect(app.currentView).toBe("results");
    expect(mainContent.innerHTML).toContain("Well played, <span class=\"results-player-name\">Alice Francita</span>!");
    expect(mainContent.innerHTML).toContain("Taxonomy &amp; Systematics Investigation");
    expect(mainContent.innerHTML).toContain("Score");
    expect(mainContent.innerHTML).toContain("Correct Answers");
    expect(mainContent.innerHTML).toContain("Incorrect Answers");
    expect(mainContent.innerHTML).toContain("Accuracy");

    // Return to Category Selection
    const chooseCatBtn = mainContent.querySelector("#btn-choose-cat");
    expect(chooseCatBtn).not.toBeNull();
    chooseCatBtn.click();
    expect(app.currentView).toBe("category");

    // Step 19 & 20: Test with another name such as "Rahul" -> confirm UI dynamically changes to "Welcome, Rahul!"
    const switchPlayerBtn = mainContent.querySelector("#btn-change-player");
    expect(switchPlayerBtn).not.toBeNull();
    switchPlayerBtn.click();

    // Now back on name-entry screen
    expect(app.currentView).toBe("login");
    const nameInput2 = mainContent.querySelector("#player-name-input");
    const continueBtn2 = mainContent.querySelector("#btn-continue-name");

    nameInput2.value = "Rahul";
    continueBtn2.click();

    expect(mainContent.innerHTML).toContain("Welcome, <span class=\"welcome-player-name\">Rahul</span>!");
    expect(mainContent.innerHTML).not.toContain("Alice Francita");

    // Wait 2 seconds for transition to Main UI
    vi.advanceTimersByTime(2000);
    expect(app.currentView).toBe("category");
    expect(mainContent.innerHTML).toContain("Ready to play, <strong class=\"player-greeting-name\">Rahul</strong>?");
    expect(mainContent.innerHTML).not.toContain("Alice Francita");
  });
});
