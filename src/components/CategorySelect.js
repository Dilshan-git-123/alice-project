// Category Selection View Component - Organized visually by Unit
import { storageService } from "../storage/storageService.js";
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

export class CategorySelectView {
  constructor(container, onSelectCategory, onOpenNewCategoryModal, playerName = "", onChangePlayer = null) {
    this.container = container;
    this.onSelectCategory = onSelectCategory;
    this.onOpenNewCategoryModal = onOpenNewCategoryModal;
    this.playerName = playerName;
    this.onChangePlayer = onChangePlayer;
  }

  render() {
    const categories = storageService.getCategories();
    const allQuestions = storageService.getQuestions();
    const scores = storageService.getScores();

    // Map question count and high score for each category
    const catData = categories.map((cat) => {
      const qCount = allQuestions.filter(
        (q) => String(q.category).toLowerCase() === String(cat.id).toLowerCase()
      ).length;

      const catScores = scores.filter((s) => s.categoryId === cat.id);
      const bestScore = catScores.reduce((max, s) => Math.max(max, s.score || 0), 0);

      return {
        ...cat,
        questionCount: qCount,
        bestScore: catScores.length > 0 ? bestScore : null
      };
    });

    // Group categories by Unit
    const unitsMap = new Map();
    catData.forEach((cat) => {
      const unitKey = cat.unit || "Additional Units";
      if (!unitsMap.has(unitKey)) {
        unitsMap.set(unitKey, {
          unitName: unitKey,
          unitTitle: cat.unitTitle || "",
          categories: []
        });
      }
      unitsMap.get(unitKey).categories.push(cat);
    });

    const unitsArray = Array.from(unitsMap.values());

    this.container.innerHTML = `
      <div class="view-category-select">
        <!-- Hero Banner -->
        <header class="hero-banner">
          <div class="hero-pill">
            <span>🎓</span> Academic Zoology Clue Quiz
          </div>
          <h1 class="hero-title">Zoology & Animal Science <span>Syllabus Quest</span></h1>
          <p class="hero-desc">
            Master 5 core Units across 10 specialized categories. Deduce answers from progressive clues A through D!
          </p>

          ${
            this.playerName
              ? `
            <div class="player-greeting-bar" id="player-greeting-bar">
              <div class="player-greeting-left">
                <span class="player-greeting-icon">👤</span>
                <span class="player-greeting-text">
                  Ready to play, <strong class="player-greeting-name">${escapeHtml(this.playerName)}</strong>?
                </span>
              </div>
              <button class="btn-change-player" id="btn-change-player" title="Change or Switch Player">
                <span>Switch Player</span>
              </button>
            </div>
          `
              : ""
          }
        </header>

        <!-- Units and Categories Container -->
        <div class="units-container" style="display:flex; flex-direction:column; gap:2.5rem; margin-bottom:2.5rem;">
          ${unitsArray
            .map(
              (unitGroup) => `
            <section class="unit-section">
              <div class="unit-header-bar" style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem; padding-bottom:0.5rem; border-bottom:1px solid rgba(255,255,255,0.08);">
                <div style="display:flex; align-items:center; gap:0.6rem;">
                  <span class="stage-badge-small" style="background:var(--primary); font-size:0.8rem; padding:0.25rem 0.6rem;">
                    ${unitGroup.unitName}
                  </span>
                  <h2 style="font-family:var(--font-heading); font-size:1.25rem; font-weight:700; color:var(--jungle-deep);">
                    ${unitGroup.unitTitle ? unitGroup.unitTitle : unitGroup.unitName}
                  </h2>
                </div>
                <span style="font-size:0.8rem; color:var(--text-muted); font-family:var(--font-mono);">
                  ${unitGroup.categories.length} Categories
                </span>
              </div>

              <!-- Category Grid for this Unit -->
              <div class="category-grid" style="margin-bottom:0;">
                ${unitGroup.categories
                  .map(
                    (cat) => `
                  <div class="category-card" 
                       id="cat-card-${cat.id}"
                       style="--cat-accent: ${cat.color || "#6366f1"}; --cat-border: ${cat.borderColor || "rgba(99,102,241,0.4)"};"
                       data-cat-id="${cat.id}">
                    <div>
                      <div class="cat-header">
                        <div class="cat-icon-wrap">${cat.icon || "🎯"}</div>
                        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:0.25rem;">
                          <span style="font-family:var(--font-mono); font-size:0.7rem; font-weight:700; color:var(--primary);">${cat.unit || ""}</span>
                          <span class="cat-badge">${cat.questionCount} Questions</span>
                        </div>
                      </div>
                      <div class="cat-content">
                        <h3 class="cat-name" style="font-size:1.25rem;">${cat.name}</h3>
                        <p class="cat-desc">${cat.description || "Solve progressive academic clues."}</p>
                      </div>
                    </div>
                    <div class="cat-footer">
                      <button class="btn-play-cat" data-cat-id="${cat.id}">
                        <span>Start Category</span>
                        <span>➔</span>
                      </button>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>
            </section>
          `
            )
            .join("")}
        </div>

        <!-- Category Controls -->
        <div class="category-extras">
          <button class="btn-secondary-action" id="btn-add-custom-cat">
            <span>➕ Add Custom Category</span>
          </button>
        </div>

        <!-- How It Works / Rules Card -->
        <div class="how-to-play-card">
          <h3><span>📜</span> Detective Rules & Scoring</h3>
          <div class="rules-grid">
            <div class="rule-item">
              <div class="stage-badge-small" style="background:#10b981;">Stage A</div>
              <div class="rule-text">
                <strong>4 Points</strong>
                Vague introductory clue. Maximum risk & reward.
              </div>
            </div>
            <div class="rule-item">
              <div class="stage-badge-small" style="background:#06b6d4;">Stage B</div>
              <div class="rule-text">
                <strong>3 Points</strong>
                Specific trait clue. Still high scoring.
              </div>
            </div>
            <div class="rule-item">
              <div class="stage-badge-small" style="background:#f59e0b;">Stage C</div>
              <div class="rule-text">
                <strong>2 Points</strong>
                Distinguishing feature clue.
              </div>
            </div>
            <div class="rule-item">
              <div class="stage-badge-small" style="background:#f43f5e;">Stage D</div>
              <div class="rule-text">
                <strong>1 Point</strong>
                Dead giveaway clue. Answer is revealed if missed!
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Attach click events
    this.container.querySelectorAll(".category-card, .btn-play-cat").forEach((el) => {
      el.addEventListener("click", (e) => {
        const catId = el.getAttribute("data-cat-id");
        if (!catId) return;
        sounds.playClick();
        const selected = categories.find((c) => c.id === catId);
        if (selected) {
          this.onSelectCategory(selected);
        }
      });
    });

    const addCatBtn = this.container.querySelector("#btn-add-custom-cat");
    if (addCatBtn) {
      addCatBtn.addEventListener("click", () => {
        sounds.playClick();
        if (this.onOpenNewCategoryModal) this.onOpenNewCategoryModal();
      });
    }

    const changePlayerBtn = this.container.querySelector("#btn-change-player");
    if (changePlayerBtn) {
      changePlayerBtn.addEventListener("click", () => {
        sounds.playClick();
        if (this.onChangePlayer) this.onChangePlayer();
      });
    }
  }
}

