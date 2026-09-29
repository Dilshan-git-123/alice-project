// Game View Component - Active Question, Progressive Clues & Smooth Isolated Timer
import { sounds } from "../audio/soundEffects.js";

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export class GameView {
  constructor(container, engine, onQuit) {
    this.container = container;
    this.engine = engine;
    this.onQuit = onQuit;
    this.keyHandler = null;
    this.lastSecondTicked = null;
  }

  mount() {
    this.setupKeyboardShortcuts();
    this.render();
  }

  unmount() {
    if (this.keyHandler) {
      window.removeEventListener("keydown", this.keyHandler);
      this.keyHandler = null;
    }
  }

  setupKeyboardShortcuts() {
    this.keyHandler = (e) => {
      const snap = this.engine.getSnapshot();
      if (!snap.isAnsweringAllowed || !snap.currentQuestion) return;

      const key = e.key.toUpperCase();
      const options = snap.currentQuestion.options;

      let index = -1;
      if (["1", "A"].includes(key)) index = 0;
      else if (["2", "B"].includes(key)) index = 1;
      else if (["3", "C"].includes(key)) index = 2;
      else if (["4", "D"].includes(key)) index = 3;

      if (index >= 0 && index < options.length) {
        e.preventDefault();
        this.handleSelectOption(options[index]);
      }
    };
    window.addEventListener("keydown", this.keyHandler);
  }

  handleSelectOption(option) {
    const snap = this.engine.getSnapshot();
    if (!snap.isAnsweringAllowed) return;

    sounds.playClick();
    const result = this.engine.submitAnswer(option);

    if (result && result.isCorrect) {
      sounds.playCorrect();
    } else if (result && !result.isCorrect) {
      sounds.playWrong();
    }
  }

  handleSkipClue() {
    const snap = this.engine.getSnapshot();
    if (!snap.isAnsweringAllowed) return;

    sounds.playClick();
    if (snap.currentStage === "A") {
      this.engine.advanceToStage("B");
    } else if (snap.currentStage === "B") {
      this.engine.advanceToStage("C");
    } else if (snap.currentStage === "C") {
      this.engine.advanceToStage("D");
    }
  }

  handleBackNavigation() {
    sounds.playClick();
    if (confirm("Are you sure you want to leave this quiz? Your current progress may be lost.")) {
      this.engine.stopTimer();
      this.unmount();
      if (this.onQuit) this.onQuit();
    }
  }

  // Targeted timer update: Updates ONLY the timer DOM elements
  // Prevents re-rendering the question card, clues, options, or page
  updateTimer(timeLeft, maxTimeForStage) {
    const timerSecondsEl = this.container.querySelector("#timer-seconds");
    const timerRingPath = this.container.querySelector("#timer-ring-path");
    const timerWidgetEl = this.container.querySelector("#timer-widget");

    if (timerSecondsEl) {
      timerSecondsEl.textContent = `${timeLeft}s`;
    }

    const timerPercent = Math.max(0, Math.min(100, (timeLeft / (maxTimeForStage || 20)) * 100));
    if (timerRingPath) {
      timerRingPath.setAttribute("stroke-dasharray", `${timerPercent}, 100`);
      timerRingPath.setAttribute("stroke", timeLeft <= 5 ? "var(--rose)" : "var(--primary)");
    }

    if (timerWidgetEl) {
      if (timeLeft <= 5) {
        timerWidgetEl.classList.add("urgent");
      } else {
        timerWidgetEl.classList.remove("urgent");
      }
    }

    // Sound effect during final 5 seconds
    if (timeLeft <= 5 && timeLeft > 0 && timeLeft !== this.lastSecondTicked) {
      this.lastSecondTicked = timeLeft;
      sounds.playTick();
    }
  }

  render() {
    const snap = this.engine.getSnapshot();
    if (!snap.currentQuestion) {
      this.container.innerHTML = `<div class="p-6 text-center">Loading question...</div>`;
      return;
    }

    const {
      category,
      currentIndex,
      totalQuestions,
      currentQuestion,
      currentStage,
      timeLeft,
      maxTimeForStage,
      score,
      lastFeedback,
      wrongGuessesThisStage,
      isAnsweringAllowed,
      playerName
    } = snap;

    const stages = ["A", "B", "C", "D"];
    const currentStageIndex = stages.indexOf(currentStage);

    // Percentage of timer remaining
    const timerPercent = Math.max(0, Math.min(100, (timeLeft / (maxTimeForStage || 20)) * 100));
    const isUrgent = timeLeft <= 5;

    this.container.innerHTML = `
      <div class="view-game">
        <!-- Top Bar with Top-Left Back Button -->
        <div class="game-top-bar">
          <div class="game-meta-group">
            <button class="btn-top-back" id="btn-top-back" title="Return to Categories">
              <span style="font-size:1.1rem; line-height:1;">←</span>
              <span>Back</span>
            </button>
            <div class="game-cat-tag">
              <span>${category.icon || "🎯"}</span>
              <span>${category.unit ? `<strong style="color:var(--primary); font-size:0.8rem; margin-right:4px;">${category.unit}</strong> ` : ""}${category.name}</span>
            </div>
            <div class="q-progress-indicator">
              Question <span>${currentIndex + 1}</span> / ${totalQuestions}
            </div>
            <div class="game-player-tag" title="Active Contestant">
              <span class="player-tag-icon">👤</span>
              <span class="player-tag-name">${escapeHtml(playerName || "Player")}</span>
            </div>
          </div>

          <!-- Score Counter -->
          <div class="game-score-display">
            <span class="score-label">Score</span>
            <span class="score-num" id="current-score-num">${score}</span>
          </div>
        </div>

        <!-- Stage Stepper & Isolated Timer Banner -->
        <div class="stage-stepper-container">
          <div class="stepper-steps">
            ${stages
              .map((stg, idx) => {
                const isActive = stg === currentStage;
                const isPassed = idx < currentStageIndex;
                const points = this.engine.getStagePoints(stg);
                return `
                  <div class="stage-step ${isActive ? "active" : ""} ${isPassed ? "passed" : ""}">
                    <span class="stage-letter">Stage ${stg}</span>
                    <span class="stage-pts-badge">${points} pts</span>
                  </div>
                  ${idx < 3 ? '<span class="stepper-divider">➔</span>' : ""}
                `;
              })
              .join("")}
          </div>

          <!-- Animated Timer (Updated independently per tick) -->
          <div class="timer-widget ${isUrgent ? "urgent" : ""}" id="timer-widget">
            <div class="timer-ring-container">
              <svg width="32" height="32" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.15)"
                  stroke-width="3.5"
                />
                <path
                  id="timer-ring-path"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="${isUrgent ? "var(--rose)" : "var(--primary)"}"
                  stroke-width="3.5"
                  stroke-dasharray="${timerPercent}, 100"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div class="timer-seconds" id="timer-seconds">${timeLeft}s</div>
          </div>
        </div>

        <!-- Clues Board (Progressive Reveal) -->
        <div class="clues-board">
          <div class="clues-board-header">
            <span class="clues-title">
              <span>🔍</span> Clue Dossier
            </span>
            <span style="font-size:0.8rem; color:var(--text-muted);">
              Clue ${currentStage} of 4 Active
            </span>
          </div>

          <div class="clue-stream">
            ${stages
              .map((stg, idx) => {
                const isRevealed = idx <= currentStageIndex;
                const isCurrent = stg === currentStage;
                const clueText = currentQuestion.clues[stg] || "";

                if (isRevealed) {
                  return `
                    <div class="clue-item ${isCurrent ? "active" : ""}">
                      <div class="clue-tag">${stg}</div>
                      <div class="clue-text">"${clueText}"</div>
                    </div>
                  `;
                } else {
                  return `
                    <div class="clue-item hidden-clue">
                      <div class="clue-tag">${stg}</div>
                      <div class="clue-text">Clue ${stg} is currently classified...</div>
                    </div>
                  `;
                }
              })
              .join("")}
          </div>
        </div>

        <!-- Feedback Banner if active -->
        ${
          lastFeedback
            ? `
          <div class="feedback-banner ${lastFeedback.type}">
            <div class="feedback-content">
              <div class="feedback-title">
                ${
                  lastFeedback.type === "correct"
                    ? "🐾 CORRECT! +" + (lastFeedback.points != null ? lastFeedback.points : "") + " POINTS!"
                    : lastFeedback.type === "timeout"
                    ? "⏱️ Time's Up for this Clue!"
                    : lastFeedback.type === "incorrect-d"
                    ? "❌ Question Missed"
                    : "❌ Not quite! Checking next clue..."
                }
              </div>
              <div class="feedback-sub">${lastFeedback.message}</div>
              ${
                lastFeedback.explanation
                  ? `<div style="font-size:0.9rem; margin-top:0.4rem; color:#1f2937; background:rgba(255,255,255,0.8); padding:0.5rem 0.85rem; border-radius:10px; border:1px solid #d1fae5;">📖 <strong>Explanation:</strong> <em>${escapeHtml(lastFeedback.explanation)}</em></div>`
                  : ""
              }
            </div>
          </div>
        `
            : ""
        }

        <!-- 4 Answer Options -->
        <div class="options-section">
          <div class="options-heading">
            <span>Select Answer (Keys 1-4 or Click)</span>
            <span>Current Stake: ${this.engine.getStagePoints(currentStage)} Points</span>
          </div>

          <div class="options-grid">
            ${currentQuestion.options
              .map((opt, idx) => {
                const optLetter = ["A", "B", "C", "D"][idx];
                const isWrongSelection = wrongGuessesThisStage.includes(opt);
                const isCorrectMatch =
                  lastFeedback &&
                  (lastFeedback.correctOption === opt ||
                    (lastFeedback.type === "correct" && lastFeedback.selectedOption === opt));

                let stateClass = "";
                if (isCorrectMatch) stateClass = "state-correct";
                else if (isWrongSelection) stateClass = "state-wrong";

                return `
                  <button 
                    class="option-btn ${stateClass}" 
                    data-option="${opt.replace(/"/g, "&quot;")}"
                    ${!isAnsweringAllowed || isWrongSelection ? "disabled" : ""}>
                    <span class="option-badge">${optLetter}</span>
                    <span class="option-text">${opt}</span>
                  </button>
                `;
              })
              .join("")}
          </div>
        </div>

        <!-- Bottom Controls -->
        <div class="game-bottom-bar">
          <button class="btn-ghost" id="btn-quit-game">
            <span>✕ Abandon Investigation</span>
          </button>
          
          ${
            currentStage !== "D" && isAnsweringAllowed
              ? `
            <button class="btn-ghost" id="btn-skip-clue" title="Advance to next clue immediately without waiting">
              <span>Next Clue ➔</span>
            </button>
          `
              : ""
          }
        </div>
      </div>
    `;

    // Event listeners
    const topBackBtn = this.container.querySelector("#btn-top-back");
    if (topBackBtn) {
      topBackBtn.addEventListener("click", () => this.handleBackNavigation());
    }

    this.container.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const opt = btn.getAttribute("data-option");
        if (opt) this.handleSelectOption(opt);
      });
    });

    const skipBtn = this.container.querySelector("#btn-skip-clue");
    if (skipBtn) {
      skipBtn.addEventListener("click", () => this.handleSkipClue());
    }

    const quitBtn = this.container.querySelector("#btn-quit-game");
    if (quitBtn) {
      quitBtn.addEventListener("click", () => this.handleBackNavigation());
    }
  }
}
