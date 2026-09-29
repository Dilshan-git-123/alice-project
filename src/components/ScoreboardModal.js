// Scoreboard Modal Component
import { storageService } from "../storage/storageService.js";
import { sounds } from "../audio/soundEffects.js";

export class ScoreboardModal {
  constructor(onClose) {
    this.onClose = onClose;
    this.selectedCatFilter = "all";
  }

  render() {
    let modalEl = document.getElementById("scoreboard-modal");
    if (!modalEl) {
      modalEl = document.createElement("div");
      modalEl.id = "scoreboard-modal";
      modalEl.className = "modal-backdrop";
      document.body.appendChild(modalEl);
    }

    const scores = storageService.getScores();
    const categories = storageService.getCategories();

    const filteredScores =
      this.selectedCatFilter === "all"
        ? scores
        : scores.filter((s) => s.categoryId === this.selectedCatFilter);

    // Compute overall stats
    const totalGames = scores.length;
    const bestScore = scores.reduce((m, s) => Math.max(m, s.score || 0), 0);
    const avgAccuracy =
      totalGames > 0
        ? Math.round(
            scores.reduce((sum, s) => sum + (s.correctCount / (s.questionsCompleted || 1)) * 100, 0) /
              totalGames
          )
        : 0;

    modalEl.innerHTML = `
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title">
            <span>🏆</span> Safari Expedition Scoreboard 🐾
          </div>
          <button class="btn-icon" id="btn-close-scoreboard">✕</button>
        </div>

        <div class="modal-body">
          <!-- Overview Metrics -->
          <div class="score-hero-box" style="margin-bottom:1.25rem; padding:1.2rem;">
            <div class="stat-metric">
              <span class="metric-value highlight-gold">${bestScore}</span>
              <span class="metric-label">High Score</span>
            </div>
            <div class="stat-metric">
              <span class="metric-value">${totalGames}</span>
              <span class="metric-label">Expeditions Completed</span>
            </div>
            <div class="stat-metric">
              <span class="metric-value highlight-green">${avgAccuracy}%</span>
              <span class="metric-label">Average Accuracy</span>
            </div>
          </div>

          <!-- Category Filter Bar -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
            <div style="display:flex; gap:0.4rem; align-items:center;">
              <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Filter:</span>
              <select class="form-select" id="score-cat-filter" style="padding:0.4rem 0.75rem; font-size:0.85rem;">
                <option value="all" ${this.selectedCatFilter === "all" ? "selected" : ""}>All Categories</option>
                ${categories
                  .map(
                    (c) =>
                      `<option value="${c.id}" ${this.selectedCatFilter === c.id ? "selected" : ""}>${c.name}</option>`
                  )
                  .join("")}
              </select>
            </div>

            ${
              scores.length > 0
                ? `<button class="btn-ghost" id="btn-clear-scores" style="font-size:0.8rem; padding:0.4rem 0.8rem; color:var(--rose);">Clear Score History</button>`
                : ""
            }
          </div>

          <!-- Score Table -->
          ${
            filteredScores.length === 0
              ? `
            <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
              <div style="font-size:2.5rem; margin-bottom:0.5rem;">📜</div>
              <p>No detective records found yet. Complete a case to enter the scoreboard!</p>
            </div>
          `
              : `
            <div class="table-responsive">
              <table class="custom-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Player</th>
                    <th>Category</th>
                    <th>Score</th>
                    <th>Correct / Total</th>
                    <th>Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  ${filteredScores
                    .map(
                      (row) => `
                    <tr>
                      <td style="font-size:0.8rem; color:var(--text-muted);">${row.dateStr || "Recent"}</td>
                      <td style="font-weight:600;">${row.playerName || "Detective"}</td>
                      <td>
                        <span style="display:inline-flex; align-items:center; gap:0.4rem;">
                          ${row.unit ? `<span class="stage-badge-small" style="background:var(--primary); font-size:0.65rem; padding:0.15rem 0.35rem;">${row.unit}</span>` : ""}
                          <span>${row.categoryName}</span>
                        </span>
                      </td>
                      <td>
                        <strong style="font-family:var(--font-mono); color:var(--gold); font-size:1.05rem;">
                          ${row.score}
                        </strong> 
                        <span style="font-size:0.75rem; color:var(--text-dim);">/ ${row.maxPossibleScore}</span>
                      </td>
                      <td style="font-family:var(--font-mono);">${row.correctCount} / ${row.questionsCompleted}</td>
                      <td>
                        <span style="font-family:var(--font-mono); font-weight:700; color:${
                          row.percentage >= 70 ? "var(--emerald)" : "var(--amber)"
                        };">
                          ${row.percentage}%
                        </span>
                      </td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>
            </div>
          `
          }
        </div>

        <div class="modal-footer">
          <button class="btn-secondary-action" id="btn-close-scoreboard-footer">Close</button>
        </div>
      </div>
    `;

    // Events
    const close = () => {
      sounds.playClick();
      modalEl.remove();
      if (this.onClose) this.onClose();
    };

    modalEl.querySelector("#btn-close-scoreboard").addEventListener("click", close);
    modalEl.querySelector("#btn-close-scoreboard-footer").addEventListener("click", close);
    modalEl.addEventListener("click", (e) => {
      if (e.target === modalEl) close();
    });

    const filterSelect = modalEl.querySelector("#score-cat-filter");
    if (filterSelect) {
      filterSelect.addEventListener("change", (e) => {
        sounds.playClick();
        this.selectedCatFilter = e.target.value;
        this.render();
      });
    }

    const clearBtn = modalEl.querySelector("#btn-clear-scores");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear all recorded scoreboard entries?")) {
          sounds.playClick();
          storageService.clearScores();
          this.render();
        }
      });
    }
  }
}
