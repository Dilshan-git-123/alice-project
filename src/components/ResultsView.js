// Results View Component - Final Game Summary
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

export class ResultsView {
  constructor(container, stats, onPlayAgain, onChooseCategory, onViewScoreboard) {
    this.container = container;
    this.stats = stats;
    this.onPlayAgain = onPlayAgain;
    this.onChooseCategory = onChooseCategory;
    this.onViewScoreboard = onViewScoreboard;
    this.showReview = false;
  }

  mount() {
    sounds.playFanfare();
    this.render();
  }

  render() {
    const {
      playerName,
      categoryName,
      categoryIcon,
      score,
      maxPossibleScore,
      questionsCompleted,
      correctCount,
      incorrectCount,
      percentage,
      accuracy,
      stageBreakdown,
      questionResults
    } = this.stats;

    // Rank title
    let rankBadge = "🕵️‍♂️ Detective";
    let rankDesc = "Solid deductive reasoning!";
    if (percentage >= 90) {
      rankBadge = "🌟 Master Sleuth";
      rankDesc = "Incredible instinct! You solved almost everything on early clues!";
    } else if (percentage >= 70) {
      rankBadge = "🔍 Senior Investigator";
      rankDesc = "Sharp intellect! Very few clues needed to crack the case.";
    } else if (percentage < 50) {
      rankBadge = "📋 Cadet In Training";
      rankDesc = "Good practice run. Review the clues and try another round!";
    }

    this.container.innerHTML = `
      <div class="view-results">
        <div class="results-card">
          <div class="results-badge-icon">🏆</div>
          <h1 class="results-title">Well played, <span class="results-player-name">${escapeHtml(playerName || "Player")}</span>!</h1>
          <div class="results-contest-tag" style="display:inline-block; background:#fef9ed; border:1.5px solid #5c3214; color:#3e1f0a; font-family:var(--font-heading); font-size:0.9rem; font-weight:700; padding:0.25rem 0.85rem; border-radius:999px; margin-bottom:0.5rem;">
            Guess the Name Contest 🐾
          </div>
          <div class="results-cat-name">${this.stats.unit ? this.stats.unit + ' • ' : ''}${categoryName} Investigation • ${rankBadge}</div>

          <!-- Quick Summary Badges -->
          <div class="results-stat-pills-row" style="display:flex; justify-content:center; gap:0.65rem; margin-bottom:1.5rem; flex-wrap:wrap;">
            <span class="results-pill-item" style="background:#ecfdf5; border:1.5px solid #a7f3d0; color:#065f46; font-family:var(--font-heading); font-size:0.9rem; font-weight:700; padding:0.3rem 0.85rem; border-radius:999px;">
              ✅ ${correctCount} Correct
            </span>
            <span class="results-pill-item" style="background:#fff1f2; border:1.5px solid #fecdd3; color:#9f1239; font-family:var(--font-heading); font-size:0.9rem; font-weight:700; padding:0.3rem 0.85rem; border-radius:999px;">
              ❌ ${incorrectCount} Incorrect
            </span>
            <span class="results-pill-item" style="background:#f8fafc; border:1.5px solid #e2e8f0; color:#475569; font-family:var(--font-heading); font-size:0.9rem; font-weight:700; padding:0.3rem 0.85rem; border-radius:999px;">
              📝 ${questionsCompleted} Questions
            </span>
          </div>

          <!-- Score Hero Box -->
          <div class="score-hero-box" style="grid-template-columns: repeat(4, 1fr);">
            <div class="stat-metric">
              <span class="metric-value highlight-gold">${score} <span style="font-size:1.1rem; color:var(--text-muted);">/ ${maxPossibleScore}</span></span>
              <span class="metric-label">Score</span>
            </div>
            <div class="stat-metric">
              <span class="metric-value highlight-green">${correctCount} <span style="font-size:1.1rem; color:var(--text-muted);">/ ${questionsCompleted}</span></span>
              <span class="metric-label">Correct Answers</span>
            </div>
            <div class="stat-metric">
              <span class="metric-value highlight-rose" style="color:var(--rose);">${incorrectCount}</span>
              <span class="metric-label">Incorrect Answers</span>
            </div>
            <div class="stat-metric">
              <span class="metric-value">${accuracy}%</span>
              <span class="metric-label">Accuracy</span>
            </div>
          </div>

          <!-- Stage Breakdown -->
          <div class="stage-breakdown-box">
            <div class="breakdown-title">
              <span>🎯 Clue Stage Solves</span>
              <span>Points Earned Per Stage</span>
            </div>
            <div class="stage-pills-row">
              <div class="stage-break-pill">
                <div class="pill-letter">Stage A</div>
                <div class="pill-count">${stageBreakdown.A || 0}</div>
                <div class="pill-pts">4 pts each</div>
              </div>
              <div class="stage-break-pill">
                <div class="pill-letter">Stage B</div>
                <div class="pill-count">${stageBreakdown.B || 0}</div>
                <div class="pill-pts">3 pts each</div>
              </div>
              <div class="stage-break-pill">
                <div class="pill-letter">Stage C</div>
                <div class="pill-count">${stageBreakdown.C || 0}</div>
                <div class="pill-pts">2 pts each</div>
              </div>
              <div class="stage-break-pill">
                <div class="pill-letter">Stage D</div>
                <div class="pill-count">${stageBreakdown.D || 0}</div>
                <div class="pill-pts">1 pt each</div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="results-actions">
            <button class="btn-primary-action" id="btn-play-again">
              <span>🟢 Play Again 🔄</span>
            </button>
            <button class="btn-secondary-action" id="btn-choose-cat">
              <span>🏠 Back to Categories</span>
            </button>
            <button class="btn-secondary-action" id="btn-view-board">
              <span>🏆 Scoreboard</span>
            </button>
            <button class="btn-ghost" id="btn-toggle-review" style="width:100%; margin-top:0.5rem;">
              <span>${this.showReview ? "▲ Hide Case Breakdown" : "▼ Review All Questions & Clues"}</span>
            </button>
          </div>

          <!-- Question-by-Question Review List -->
          ${
            this.showReview
              ? `
            <div style="margin-top: 1.5rem; text-align: left; display: flex; flex-direction: column; gap: 0.75rem;">
              ${questionResults
                .map(
                  (res, idx) => `
                <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1rem;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                    <strong style="font-size:0.95rem;">Question ${idx + 1}: ${res.answer}</strong>
                    <span style="font-family:var(--font-mono); font-size:0.8rem; font-weight:700; color:${res.isCorrect ? "var(--emerald)" : "var(--rose)"};">
                      ${res.isCorrect ? `✓ Solved at Stage ${res.stage} (+${res.points} pts)` : "✗ Missed (0 pts)"}
                    </span>
                  </div>
                  ${res.explanation ? `<div style="font-size:0.85rem; color:var(--text-muted); line-height:1.4;">${res.explanation}</div>` : ""}
                </div>
              `
                )
                .join("")}
            </div>
          `
              : ""
          }
        </div>
      </div>
    `;

    // Listeners
    const playAgainBtn = this.container.querySelector("#btn-play-again");
    if (playAgainBtn) {
      playAgainBtn.addEventListener("click", () => {
        sounds.playClick();
        if (this.onPlayAgain) this.onPlayAgain();
      });
    }

    const chooseCatBtn = this.container.querySelector("#btn-choose-cat");
    if (chooseCatBtn) {
      chooseCatBtn.addEventListener("click", () => {
        sounds.playClick();
        if (this.onChooseCategory) this.onChooseCategory();
      });
    }

    const viewBoardBtn = this.container.querySelector("#btn-view-board");
    if (viewBoardBtn) {
      viewBoardBtn.addEventListener("click", () => {
        sounds.playClick();
        if (this.onViewScoreboard) this.onViewScoreboard();
      });
    }

    const reviewBtn = this.container.querySelector("#btn-toggle-review");
    if (reviewBtn) {
      reviewBtn.addEventListener("click", () => {
        sounds.playClick();
        this.showReview = !this.showReview;
        this.render();
      });
    }
  }
}
