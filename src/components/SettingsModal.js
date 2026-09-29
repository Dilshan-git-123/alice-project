// Settings & Content Management Modal
import { storageService } from "../storage/storageService.js";
import { sounds } from "../audio/soundEffects.js";

export class SettingsModal {
  constructor(onClose, onSettingsSaved) {
    this.onClose = onClose;
    this.onSettingsSaved = onSettingsSaved;
    this.activeTab = "gameplay"; // 'gameplay' | 'behavior' | 'categories' | 'questions'
    this.editingCategory = null;
    this.editingQuestion = null;
    this.selectedCatForQuestions = "all";
  }

  render() {
    let modalEl = document.getElementById("settings-modal");
    if (!modalEl) {
      modalEl = document.createElement("div");
      modalEl.id = "settings-modal";
      modalEl.className = "modal-backdrop";
      document.body.appendChild(modalEl);
    }

    const settings = storageService.getSettings();
    const categories = storageService.getCategories();
    const allQuestions = storageService.getQuestions();

    modalEl.innerHTML = `
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title">
            <span>⚙️</span> Game Settings & Content Management
          </div>
          <button class="btn-icon" id="btn-close-settings">✕</button>
        </div>

        <div class="modal-body">
          <!-- Navigation Tabs -->
          <div class="modal-tabs">
            <button class="tab-btn ${this.activeTab === "gameplay" ? "active" : ""}" data-tab="gameplay">
              ⏱️ Gameplay & Points
            </button>
            <button class="tab-btn ${this.activeTab === "behavior" ? "active" : ""}" data-tab="behavior">
              🎮 Behavior & Audio
            </button>
            <button class="tab-btn ${this.activeTab === "categories" ? "active" : ""}" data-tab="categories">
              📂 Categories (${categories.length})
            </button>
            <button class="tab-btn ${this.activeTab === "questions" ? "active" : ""}" data-tab="questions">
              ❓ Questions (${allQuestions.length})
            </button>
          </div>

          <!-- Tab 1: Gameplay & Points -->
          ${
            this.activeTab === "gameplay"
              ? `
            <div>
              <h3 style="font-size:1.15rem; margin-bottom:1rem; color:var(--jungle-deep); font-family:var(--font-heading);">⏱️ Timer Duration per Clue Stage (seconds)</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Clue Stage A Timer (s)</label>
                  <input type="number" class="form-input" id="setting-timer-a" min="5" max="120" value="${settings.timerDurationA || 20}">
                </div>
                <div class="form-group">
                  <label class="form-label">Clue Stage B Timer (s)</label>
                  <input type="number" class="form-input" id="setting-timer-b" min="5" max="120" value="${settings.timerDurationB || 20}">
                </div>
                <div class="form-group">
                  <label class="form-label">Clue Stage C Timer (s)</label>
                  <input type="number" class="form-input" id="setting-timer-c" min="5" max="120" value="${settings.timerDurationC || 20}">
                </div>
                <div class="form-group">
                  <label class="form-label">Clue Stage D Timer (s)</label>
                  <input type="number" class="form-input" id="setting-timer-d" min="5" max="120" value="${settings.timerDurationD || 20}">
                </div>
              </div>

              <h3 style="font-size:1.15rem; margin-bottom:1rem; color:var(--jungle-deep); font-family:var(--font-heading);">🏆 Points System</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Points for Stage A Solve</label>
                  <input type="number" class="form-input" id="setting-points-a" min="1" max="100" value="${settings.pointsA || 4}">
                </div>
                <div class="form-group">
                  <label class="form-label">Points for Stage B Solve</label>
                  <input type="number" class="form-input" id="setting-points-b" min="1" max="100" value="${settings.pointsB || 3}">
                </div>
                <div class="form-group">
                  <label class="form-label">Points for Stage C Solve</label>
                  <input type="number" class="form-input" id="setting-points-c" min="1" max="100" value="${settings.pointsC || 2}">
                </div>
                <div class="form-group">
                  <label class="form-label">Points for Stage D Solve</label>
                  <input type="number" class="form-input" id="setting-points-d" min="1" max="100" value="${settings.pointsD || 1}">
                </div>
              </div>

              <div class="form-group" style="max-width:300px; margin-top:0.5rem;">
                <label class="form-label">Questions per Game Session</label>
                <input type="number" class="form-input" id="setting-q-count" min="1" max="50" value="${settings.questionsPerGame || 10}">
              </div>
            </div>
          `
              : ""
          }

          <!-- Tab 2: Behavior & Audio -->
          ${
            this.activeTab === "behavior"
              ? `
            <div>
              <div class="form-grid">
                <div class="form-group">
                  <label class="form-label">Player Nickname</label>
                  <input type="text" class="form-input" id="setting-player-name" value="${settings.defaultPlayerName || "Detective Player"}">
                </div>
                <div class="form-group">
                  <label class="form-label">Auto-Progression Delay (ms)</label>
                  <input type="number" class="form-input" id="setting-advance-delay" min="500" max="5000" step="100" value="${settings.autoAdvanceDelayMs || 1600}">
                </div>
              </div>

              <div style="display:flex; flex-direction:column; gap:1rem; margin-top:1rem;">
                <label style="display:flex; align-items:center; gap:0.75rem; cursor:pointer;">
                  <input type="checkbox" id="setting-reveal-d" ${settings.revealAnswerOnD !== false ? "checked" : ""} style="width:18px; height:18px; accent-color:var(--primary);">
                  <span><strong>Reveal Correct Answer on Stage D</strong> (Show answer if missed at final clue)</span>
                </label>

                <label style="display:flex; align-items:center; gap:0.75rem; cursor:pointer;">
                  <input type="checkbox" id="setting-sound-enabled" ${settings.soundEnabled !== false ? "checked" : ""} style="width:18px; height:18px; accent-color:var(--primary);">
                  <span><strong>Synthesized Sound Effects</strong> (Chimes, buzzers, and ticking)</span>
                </label>
              </div>

              <div style="margin-top:2rem; padding:1.25rem; border:1px solid rgba(244,63,94,0.3); border-radius:12px; background:rgba(244,63,94,0.05);">
                <h4 style="color:var(--rose); margin-bottom:0.4rem;">⚠️ Factory Reset</h4>
                <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">Reset all categories, 40 original questions, scoring, and settings back to factory defaults.</p>
                <button class="btn-ghost" id="btn-factory-reset" style="color:var(--rose); border-color:var(--rose);">Restore All Defaults</button>
              </div>
            </div>
          `
              : ""
          }

          <!-- Tab 3: Categories CRUD -->
          ${
            this.activeTab === "categories"
              ? `
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
                <h3 style="font-size:1.15rem; color:var(--jungle-deep); font-family:var(--font-heading);">📂 Available Categories</h3>
                <button class="btn-primary-action" id="btn-create-category-trigger" style="padding:0.4rem 0.85rem; font-size:0.85rem;">
                  ➕ New Category
                </button>
              </div>

              <!-- Form for Add/Edit Category -->
              ${
                this.editingCategory
                  ? `
                <div style="background:rgba(255,255,255,0.03); border:1px solid var(--primary); border-radius:14px; padding:1.25rem; margin-bottom:1.5rem;">
                  <h4 style="margin-bottom:0.75rem; color:var(--primary);">
                    ${this.editingCategory.isNew ? "Create New Category" : "Edit Category: " + this.editingCategory.name}
                  </h4>
                  <div class="form-grid">
                    <div class="form-group">
                      <label class="form-label">Category Name</label>
                      <input type="text" class="form-input" id="cat-form-name" value="${this.editingCategory.name || ""}">
                    </div>
                    <div class="form-group">
                      <label class="form-label">Icon / Emoji</label>
                      <input type="text" class="form-input" id="cat-form-icon" value="${this.editingCategory.icon || "🎯"}">
                    </div>
                  </div>
                  <div class="form-group" style="margin-bottom:1rem;">
                    <label class="form-label">Description</label>
                    <input type="text" class="form-input" id="cat-form-desc" value="${this.editingCategory.description || ""}">
                  </div>
                  <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
                    <button class="btn-ghost" id="btn-cancel-cat-edit">Cancel</button>
                    <button class="btn-primary-action" id="btn-save-cat-edit" style="padding:0.5rem 1rem; font-size:0.9rem;">Save Category</button>
                  </div>
                </div>
              `
                  : ""
              }

              <!-- Categories List -->
              <div class="table-responsive">
                <table class="custom-table">
                  <thead>
                    <tr>
                      <th>Icon</th>
                      <th>Category Name</th>
                      <th>Questions</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${categories
                      .map((cat) => {
                        const count = allQuestions.filter(
                          (q) => String(q.category).toLowerCase() === String(cat.id).toLowerCase()
                        ).length;
                        return `
                        <tr>
                          <td style="font-size:1.5rem;">${cat.icon}</td>
                          <td>
                            <strong>${cat.name}</strong>
                            <div style="font-size:0.75rem; color:var(--text-muted);">${cat.description || ""}</div>
                          </td>
                          <td style="font-family:var(--font-mono);">${count}</td>
                          <td>
                            <div style="display:flex; gap:0.4rem;">
                              <button class="btn-ghost btn-edit-cat" data-id="${cat.id}" style="padding:0.3rem 0.6rem; font-size:0.8rem;">Edit</button>
                              <button class="btn-ghost btn-delete-cat" data-id="${cat.id}" style="padding:0.3rem 0.6rem; font-size:0.8rem; color:var(--rose);">Delete</button>
                            </div>
                          </td>
                        </tr>
                      `;
                      })
                      .join("")}
                  </tbody>
                </table>
              </div>
            </div>
          `
              : ""
          }

          <!-- Tab 4: Questions CRUD -->
          ${
            this.activeTab === "questions"
              ? `
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
                <div style="display:flex; align-items:center; gap:0.5rem;">
                  <span style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">Category:</span>
                  <select class="form-select" id="questions-cat-filter" style="padding:0.35rem 0.75rem; font-size:0.85rem;">
                    <option value="all" ${this.selectedCatForQuestions === "all" ? "selected" : ""}>All Categories</option>
                    ${categories
                      .map(
                        (c) =>
                          `<option value="${c.id}" ${this.selectedCatForQuestions === c.id ? "selected" : ""}>${c.name}</option>`
                      )
                      .join("")}
                  </select>
                </div>
                <button class="btn-primary-action" id="btn-create-q-trigger" style="padding:0.4rem 0.85rem; font-size:0.85rem;">
                  ➕ New Question
                </button>
              </div>

              <!-- Question Add/Edit Form -->
              ${
                this.editingQuestion
                  ? `
                <div style="background:rgba(255,255,255,0.03); border:1px solid var(--primary); border-radius:14px; padding:1.25rem; margin-bottom:1.5rem;">
                  <h4 style="margin-bottom:0.75rem; color:var(--primary);">
                    ${this.editingQuestion.isNew ? "Create New Question" : "Edit Question #" + this.editingQuestion.id}
                  </h4>
                  
                  <div class="form-grid">
                    <div class="form-group">
                      <label class="form-label">Category</label>
                      <select class="form-select" id="q-form-category">
                        ${categories
                          .map(
                            (c) =>
                              `<option value="${c.id}" ${this.editingQuestion.category === c.id ? "selected" : ""}>${c.name}</option>`
                          )
                          .join("")}
                      </select>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Correct Answer</label>
                      <input type="text" class="form-input" id="q-form-answer" value="${this.editingQuestion.answer || ""}" placeholder="e.g. Tiger">
                    </div>
                  </div>

                  <!-- 4 Clues A, B, C, D -->
                  <div style="display:flex; flex-direction:column; gap:0.6rem; margin-bottom:1rem;">
                    <label class="form-label">Progressive Clues (A = Hardest, D = Easiest)</label>
                    <input type="text" class="form-input" id="q-form-clue-a" value="${this.editingQuestion.clues?.A || ""}" placeholder="Clue A: Vague hint">
                    <input type="text" class="form-input" id="q-form-clue-b" value="${this.editingQuestion.clues?.B || ""}" placeholder="Clue B: Trait hint">
                    <input type="text" class="form-input" id="q-form-clue-c" value="${this.editingQuestion.clues?.C || ""}" placeholder="Clue C: Feature hint">
                    <input type="text" class="form-input" id="q-form-clue-d" value="${this.editingQuestion.clues?.D || ""}" placeholder="Clue D: Giveaway hint">
                  </div>

                  <!-- 4 Options -->
                  <div class="form-group" style="margin-bottom:1rem;">
                    <label class="form-label">Four Answer Options (One must match the correct answer!)</label>
                    <div class="form-grid">
                      <input type="text" class="form-input" id="q-form-opt-0" value="${this.editingQuestion.options?.[0] || ""}" placeholder="Option 1">
                      <input type="text" class="form-input" id="q-form-opt-1" value="${this.editingQuestion.options?.[1] || ""}" placeholder="Option 2">
                      <input type="text" class="form-input" id="q-form-opt-2" value="${this.editingQuestion.options?.[2] || ""}" placeholder="Option 3">
                      <input type="text" class="form-input" id="q-form-opt-3" value="${this.editingQuestion.options?.[3] || ""}" placeholder="Option 4">
                    </div>
                  </div>

                  <!-- Explanation -->
                  <div class="form-group" style="margin-bottom:1rem;">
                    <label class="form-label">Educational Explanation</label>
                    <textarea class="form-textarea" id="q-form-explanation" placeholder="Brief fact revealed at completion...">${this.editingQuestion.explanation || ""}</textarea>
                  </div>

                  <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
                    <button class="btn-ghost" id="btn-cancel-q-edit">Cancel</button>
                    <button class="btn-primary-action" id="btn-save-q-edit" style="padding:0.5rem 1rem; font-size:0.9rem;">Save Question</button>
                  </div>
                </div>
              `
                  : ""
              }

              <!-- Questions Table -->
              <div class="table-responsive">
                <table class="custom-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Category</th>
                      <th>Answer</th>
                      <th>Clue Preview</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${allQuestions
                      .filter(
                        (q) =>
                          this.selectedCatForQuestions === "all" ||
                          String(q.category).toLowerCase() === String(this.selectedCatForQuestions).toLowerCase()
                      )
                      .map(
                        (q) => `
                      <tr>
                        <td style="font-family:var(--font-mono); font-size:0.8rem; color:var(--text-dim);">${q.id}</td>
                        <td><span class="cat-badge">${q.category}</span></td>
                        <td><strong>${q.answer}</strong></td>
                        <td style="font-size:0.8rem; color:var(--text-muted); max-width:240px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                          ${q.clues?.A || ""}
                        </td>
                        <td>
                          <div style="display:flex; gap:0.4rem;">
                            <button class="btn-ghost btn-edit-q" data-id="${q.id}" style="padding:0.3rem 0.6rem; font-size:0.8rem;">Edit</button>
                            <button class="btn-ghost btn-delete-q" data-id="${q.id}" style="padding:0.3rem 0.6rem; font-size:0.8rem; color:var(--rose);">Delete</button>
                          </div>
                        </td>
                      </tr>
                    `
                      )
                      .join("")}
                  </tbody>
                </table>
              </div>
            </div>
          `
              : ""
          }
        </div>

        <div class="modal-footer">
          <button class="btn-secondary-action" id="btn-save-settings">Save & Apply Changes</button>
        </div>
      </div>
    `;

    this.attachEventListeners(modalEl);
  }

  attachEventListeners(modalEl) {
    const close = () => {
      sounds.playClick();
      modalEl.remove();
      if (this.onClose) this.onClose();
    };

    modalEl.querySelector("#btn-close-settings").addEventListener("click", close);
    modalEl.addEventListener("click", (e) => {
      if (e.target === modalEl) close();
    });

    // Tab buttons
    modalEl.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        sounds.playClick();
        this.activeTab = btn.getAttribute("data-tab");
        this.editingCategory = null;
        this.editingQuestion = null;
        this.render();
      });
    });

    // Save gameplay / behavior settings button
    const saveBtn = modalEl.querySelector("#btn-save-settings");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        sounds.playClick();
        this.saveCurrentInputs(modalEl);
        if (this.onSettingsSaved) this.onSettingsSaved();
        close();
      });
    }

    // Factory reset
    const resetBtn = modalEl.querySelector("#btn-factory-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (confirm("Reset everything to factory default questions, categories, and settings?")) {
          sounds.playClick();
          storageService.resetAllToDefaults();
          if (this.onSettingsSaved) this.onSettingsSaved();
          this.render();
        }
      });
    }

    // Category CRUD actions
    const newCatBtn = modalEl.querySelector("#btn-create-category-trigger");
    if (newCatBtn) {
      newCatBtn.addEventListener("click", () => {
        sounds.playClick();
        this.editingCategory = { isNew: true, name: "", icon: "🎯", description: "" };
        this.render();
      });
    }

    modalEl.querySelectorAll(".btn-edit-cat").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const cat = storageService.getCategories().find((c) => c.id === id);
        if (cat) {
          sounds.playClick();
          this.editingCategory = { ...cat };
          this.render();
        }
      });
    });

    modalEl.querySelectorAll(".btn-delete-cat").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Delete this category and all its questions?")) {
          sounds.playClick();
          storageService.deleteCategory(id);
          if (this.onSettingsSaved) this.onSettingsSaved();
          this.render();
        }
      });
    });

    const cancelCatBtn = modalEl.querySelector("#btn-cancel-cat-edit");
    if (cancelCatBtn) {
      cancelCatBtn.addEventListener("click", () => {
        sounds.playClick();
        this.editingCategory = null;
        this.render();
      });
    }

    const saveCatBtn = modalEl.querySelector("#btn-save-cat-edit");
    if (saveCatBtn) {
      saveCatBtn.addEventListener("click", () => {
        sounds.playClick();
        const name = modalEl.querySelector("#cat-form-name").value.trim();
        const icon = modalEl.querySelector("#cat-form-icon").value.trim() || "🎯";
        const desc = modalEl.querySelector("#cat-form-desc").value.trim();

        if (!name) {
          alert("Please enter a category name");
          return;
        }

        if (this.editingCategory.isNew) {
          storageService.addCategory({ name, icon, description: desc });
        } else {
          storageService.updateCategory(this.editingCategory.id, {
            name,
            icon,
            description: desc
          });
        }
        this.editingCategory = null;
        if (this.onSettingsSaved) this.onSettingsSaved();
        this.render();
      });
    }

    // Question CRUD actions
    const catFilter = modalEl.querySelector("#questions-cat-filter");
    if (catFilter) {
      catFilter.addEventListener("change", (e) => {
        sounds.playClick();
        this.selectedCatForQuestions = e.target.value;
        this.render();
      });
    }

    const newQBtn = modalEl.querySelector("#btn-create-q-trigger");
    if (newQBtn) {
      newQBtn.addEventListener("click", () => {
        sounds.playClick();
        const defaultCat =
          this.selectedCatForQuestions !== "all"
            ? this.selectedCatForQuestions
            : storageService.getCategories()[0]?.id || "taxonomy-systematics";

        this.editingQuestion = {
          isNew: true,
          category: defaultCat,
          answer: "",
          clues: { A: "", B: "", C: "", D: "" },
          options: ["", "", "", ""],
          explanation: ""
        };
        this.render();
      });
    }

    modalEl.querySelectorAll(".btn-edit-q").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const q = storageService.getQuestionById(id);
        if (q) {
          sounds.playClick();
          this.editingQuestion = JSON.parse(JSON.stringify(q));
          this.render();
        }
      });
    });

    modalEl.querySelectorAll(".btn-delete-q").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Delete this question?")) {
          sounds.playClick();
          storageService.deleteQuestion(id);
          this.render();
        }
      });
    });

    const cancelQBtn = modalEl.querySelector("#btn-cancel-q-edit");
    if (cancelQBtn) {
      cancelQBtn.addEventListener("click", () => {
        sounds.playClick();
        this.editingQuestion = null;
        this.render();
      });
    }

    const saveQBtn = modalEl.querySelector("#btn-save-q-edit");
    if (saveQBtn) {
      saveQBtn.addEventListener("click", () => {
        sounds.playClick();
        const cat = modalEl.querySelector("#q-form-category").value;
        const answer = modalEl.querySelector("#q-form-answer").value.trim();
        const clueA = modalEl.querySelector("#q-form-clue-a").value.trim();
        const clueB = modalEl.querySelector("#q-form-clue-b").value.trim();
        const clueC = modalEl.querySelector("#q-form-clue-c").value.trim();
        const clueD = modalEl.querySelector("#q-form-clue-d").value.trim();
        const opt0 = modalEl.querySelector("#q-form-opt-0").value.trim();
        const opt1 = modalEl.querySelector("#q-form-opt-1").value.trim();
        const opt2 = modalEl.querySelector("#q-form-opt-2").value.trim();
        const opt3 = modalEl.querySelector("#q-form-opt-3").value.trim();
        const expl = modalEl.querySelector("#q-form-explanation").value.trim();

        if (!answer || !clueA || !clueB || !clueC || !clueD || !opt0 || !opt1 || !opt2 || !opt3) {
          alert("Please fill in the answer, all 4 clues, and all 4 options.");
          return;
        }

        const options = [opt0, opt1, opt2, opt3];
        // Ensure the correct answer is one of the options
        if (!options.some((o) => o.toLowerCase() === answer.toLowerCase())) {
          alert("One of the 4 answer options must match the correct answer!");
          return;
        }

        const qData = {
          category: cat,
          answer,
          clues: { A: clueA, B: clueB, C: clueC, D: clueD },
          options,
          correctOption: answer,
          explanation: expl
        };

        if (this.editingQuestion.isNew) {
          storageService.addQuestion(qData);
        } else {
          storageService.updateQuestion(this.editingQuestion.id, qData);
        }

        this.editingQuestion = null;
        this.render();
      });
    }
  }

  saveCurrentInputs(modalEl) {
    const current = storageService.getSettings();

    // Check gameplay inputs if present
    const tA = modalEl.querySelector("#setting-timer-a");
    const tB = modalEl.querySelector("#setting-timer-b");
    const tC = modalEl.querySelector("#setting-timer-c");
    const tD = modalEl.querySelector("#setting-timer-d");
    const pA = modalEl.querySelector("#setting-points-a");
    const pB = modalEl.querySelector("#setting-points-b");
    const pC = modalEl.querySelector("#setting-points-c");
    const pD = modalEl.querySelector("#setting-points-d");
    const qCount = modalEl.querySelector("#setting-q-count");

    if (tA) current.timerDurationA = Number(tA.value) || 20;
    if (tB) current.timerDurationB = Number(tB.value) || 20;
    if (tC) current.timerDurationC = Number(tC.value) || 20;
    if (tD) current.timerDurationD = Number(tD.value) || 20;

    if (pA) current.pointsA = Number(pA.value) || 4;
    if (pB) current.pointsB = Number(pB.value) || 3;
    if (pC) current.pointsC = Number(pC.value) || 2;
    if (pD) current.pointsD = Number(pD.value) || 1;
    if (qCount) current.questionsPerGame = Number(qCount.value) || 10;

    // Check behavior inputs if present
    const pName = modalEl.querySelector("#setting-player-name");
    const delay = modalEl.querySelector("#setting-advance-delay");
    const revD = modalEl.querySelector("#setting-reveal-d");
    const snd = modalEl.querySelector("#setting-sound-enabled");

    if (pName) current.defaultPlayerName = pName.value.trim() || "Detective Player";
    if (delay) current.autoAdvanceDelayMs = Number(delay.value) || 1600;
    if (revD) current.revealAnswerOnD = revD.checked;
    if (snd) {
      current.soundEnabled = snd.checked;
      sounds.setEnabled(snd.checked);
    }

    storageService.saveSettings(current);
  }
}
