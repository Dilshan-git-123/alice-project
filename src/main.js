// Main Application Entry Point
import { GameEngine } from "./state/gameState.js";
import { storageService } from "./storage/storageService.js";
import { sounds } from "./audio/soundEffects.js";
import { PlayerEntryView } from "./components/PlayerEntryView.js";
import { CategorySelectView } from "./components/CategorySelect.js";
import { GameView } from "./components/GameView.js";
import { ResultsView } from "./components/ResultsView.js";
import { ScoreboardModal } from "./components/ScoreboardModal.js";
import { SettingsModal } from "./components/SettingsModal.js";

export class App {
  constructor() {
    this.mainContent = document.getElementById("main-content");
    this.engine = new GameEngine();
    this.currentView = null; // 'login' | 'category' | 'game' | 'results'
    this.gameViewComponent = null;
    this.playerEntryComponent = null;
    this.playerName = storageService.getCurrentPlayerName();

    this.init();
  }

  init() {
    const settings = storageService.getSettings();
    sounds.setEnabled(settings.soundEnabled !== false);
    this.updateSoundButton();

    // Subscribe to engine state
    this.engine.subscribe((snapshot) => {
      this.handleEngineState(snapshot);
    });

    // Attach Top Header Actions
    this.setupHeaderActions();

    // Setup Browser Back Button handling
    this.setupHistoryHandling();

    // Flow: Check if player name exists in current session
    if (!this.playerName) {
      this.showPlayerEntry();
    } else {
      this.showCategorySelect();
    }
  }

  setupHistoryHandling() {
    window.addEventListener("popstate", (e) => {
      if (this.currentView === "game") {
        if (confirm("Are you sure you want to leave this quiz? Your current progress may be lost.")) {
          this.engine.stopTimer();
          this.showCategorySelect();
        } else {
          // Re-push game state if user decides to stay
          history.pushState({ view: "game" }, "", "#quiz");
        }
      } else if (this.currentView === "results") {
        this.showCategorySelect();
      }
    });
  }

  setupHeaderActions() {
    // Brand Logo
    const brandLogo = document.getElementById("brand-logo");
    if (brandLogo) {
      brandLogo.addEventListener("click", () => {
        if (this.currentView === "game") {
          if (confirm("Are you sure you want to leave this quiz? Your current progress may be lost.")) {
            this.engine.stopTimer();
            if (this.playerName) this.showCategorySelect();
            else this.showPlayerEntry();
          }
        } else {
          if (this.playerName) this.showCategorySelect();
          else this.showPlayerEntry();
        }
      });
    }

    // Header Player Pill (Change Player Shortcut)
    const playerPill = document.getElementById("header-player-pill");
    if (playerPill) {
      playerPill.addEventListener("click", () => {
        sounds.playClick();
        if (confirm(`Change contestant from "${this.playerName}"?`)) {
          this.handleSwitchPlayer();
        }
      });
    }

    // Sound Toggle
    const soundBtn = document.getElementById("btn-toggle-sound");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        const settings = storageService.getSettings();
        const newVal = !settings.soundEnabled;
        settings.soundEnabled = newVal;
        storageService.saveSettings(settings);
        sounds.setEnabled(newVal);
        sounds.playClick();
        this.updateSoundButton();
      });
    }

    // Scoreboard
    const scoreBtn = document.getElementById("btn-open-scoreboard");
    if (scoreBtn) {
      scoreBtn.addEventListener("click", () => {
        sounds.playClick();
        new ScoreboardModal().render();
      });
    }

    // Settings
    const settingsBtn = document.getElementById("btn-open-settings");
    if (settingsBtn) {
      settingsBtn.addEventListener("click", () => {
        sounds.playClick();
        new SettingsModal(null, () => {
          if (this.currentView === "category") {
            this.showCategorySelect();
          }
        }).render();
      });
    }
  }

  updateSoundButton() {
    const soundBtn = document.getElementById("btn-toggle-sound");
    const settings = storageService.getSettings();
    if (soundBtn) {
      soundBtn.innerHTML = settings.soundEnabled !== false ? "🔊" : "🔇";
      soundBtn.title = settings.soundEnabled !== false ? "Mute Sound" : "Unmute Sound";
    }
  }

  updateHeaderPlayer() {
    const pill = document.getElementById("header-player-pill");
    const nameEl = document.getElementById("header-player-name");
    if (pill && nameEl) {
      if (this.playerName && this.currentView !== "login") {
        nameEl.textContent = this.playerName;
        pill.style.display = "inline-flex";
      } else {
        pill.style.display = "none";
      }
    }
  }

  showPlayerEntry() {
    this.cleanupCurrentView();
    this.currentView = "login";
    this.updateHeaderPlayer();

    if (window.location.hash === "#quiz") {
      history.replaceState({ view: "login" }, "", window.location.pathname);
    }

    this.playerEntryComponent = new PlayerEntryView(
      this.mainContent,
      (name) => {
        this.playerName = name;
        storageService.setCurrentPlayerName(name);
        this.updateHeaderPlayer();
      },
      (name) => {
        this.playerName = name;
        storageService.setCurrentPlayerName(name);
        this.showCategorySelect();
      }
    );
    this.playerEntryComponent.mount();
  }

  handleSwitchPlayer() {
    storageService.clearCurrentPlayerName();
    this.playerName = "";
    this.updateHeaderPlayer();
    this.showPlayerEntry();
  }

  showCategorySelect() {
    if (!this.playerName) {
      this.showPlayerEntry();
      return;
    }

    this.cleanupCurrentView();
    this.currentView = "category";
    this.updateHeaderPlayer();

    if (window.location.hash === "#quiz") {
      history.replaceState({ view: "category" }, "", window.location.pathname);
    }

    const view = new CategorySelectView(
      this.mainContent,
      (selectedCat) => this.startGame(selectedCat),
      () => {
        const modal = new SettingsModal(null, () => this.showCategorySelect());
        modal.activeTab = "categories";
        modal.editingCategory = { isNew: true, name: "", icon: "🎯", description: "" };
        modal.render();
      },
      this.playerName,
      () => this.handleSwitchPlayer()
    );
    view.render();
  }

  startGame(category) {
    this.cleanupCurrentView();
    this.currentView = "game";

    // Push browser history state for proper Back button support
    history.pushState({ view: "game" }, "", "#quiz");

    const allQuestions = storageService.getQuestions();
    const settings = storageService.getSettings();

    this.engine.startQuiz(
      category,
      allQuestions,
      this.playerName || settings.defaultPlayerName || "Detective Player",
      settings
    );

    this.gameViewComponent = new GameView(
      this.mainContent,
      this.engine,
      () => this.showCategorySelect()
    );
    this.gameViewComponent.mount();
  }

  handleEngineState(snapshot) {
    if (this.currentView === "game") {
      if (snapshot.isGameOver) {
        // Game completed! Record score and transition to results
        const stats = this.engine.getFinalStats();
        storageService.saveScore(stats);
        this.showResults(stats);
      } else if (this.gameViewComponent) {
        if (snapshot.eventType === "tick") {
          // Dedicated timer update: updates ONLY the timer widget, completely avoiding screen re-renders
          this.gameViewComponent.updateTimer(snapshot.timeLeft, snapshot.maxTimeForStage);
        } else {
          // Real stage or question state transition
          this.gameViewComponent.render();
        }
      }
    }
  }

  showResults(stats) {
    this.cleanupCurrentView();
    this.currentView = "results";

    const results = new ResultsView(
      this.mainContent,
      stats,
      () => {
        const cat = storageService.getCategories().find((c) => c.id === stats.categoryId);
        if (cat) this.startGame(cat);
        else this.showCategorySelect();
      },
      () => this.showCategorySelect(),
      () => new ScoreboardModal().render()
    );
    results.mount();
  }

  cleanupCurrentView() {
    if (this.gameViewComponent) {
      this.gameViewComponent.unmount();
      this.gameViewComponent = null;
    }
    if (this.playerEntryComponent) {
      this.playerEntryComponent.unmount();
      this.playerEntryComponent = null;
    }
  }
}

// Boot application when DOM is ready (only in non-test browser environment)
const isTestEnv = typeof process !== "undefined" && process.env && process.env.NODE_ENV === "test";
if (typeof window !== "undefined" && !isTestEnv) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      new App();
    });
  } else {
    new App();
  }
}


