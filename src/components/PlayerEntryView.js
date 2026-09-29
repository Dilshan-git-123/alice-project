// Player Name Entry & Welcome Screen Component
// Playful, friendly Jungle / Zoology Expedition theme
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

export class PlayerEntryView {
  /**
   * @param {HTMLElement} container
   * @param {Function} onNameEntered - Called immediately upon valid name submission
   * @param {Function} onComplete - Called after the ~2s welcome screen transition
   */
  constructor(container, onNameEntered, onComplete) {
    this.container = container;
    this.onNameEntered = onNameEntered;
    this.onComplete = onComplete;
    this.state = "entry"; // 'entry' | 'welcome'
    this.playerName = "";
    this.transitionTimer = null;
  }

  mount() {
    this.render();
  }

  unmount() {
    if (this.transitionTimer) {
      clearTimeout(this.transitionTimer);
      this.transitionTimer = null;
    }
  }

  render() {
    if (this.state === "entry") {
      this.renderEntryScreen();
    } else {
      this.renderWelcomeScreen();
    }
  }

  renderEntryScreen() {
    this.container.innerHTML = `
      <div class="view-player-entry">
        <!-- Floating Jungle Vines & Foliage -->
        <div class="jungle-canopy-leaves" aria-hidden="true">
          <span class="canopy-leaf leaf-1">🌿</span>
          <span class="canopy-leaf leaf-2">🍃</span>
          <span class="canopy-leaf leaf-3">🌴</span>
          <span class="canopy-leaf leaf-4">🌱</span>
        </div>

        <!-- Hanging Vines / Ropes -->
        <div class="hanging-ropes" aria-hidden="true">
          <div class="rope-line rope-left"></div>
          <div class="rope-line rope-right"></div>
        </div>

        <!-- Large Wooden Signboard Card -->
        <div class="player-entry-card jungle-signboard">
          <!-- Wooden Corner Pegs -->
          <div class="wood-peg peg-tl"></div>
          <div class="wood-peg peg-tr"></div>
          <div class="wood-peg peg-bl"></div>
          <div class="wood-peg peg-br"></div>

          <!-- Cheerful Animal Friends Peeking from Edges -->
          <div class="safari-animals-cluster" aria-hidden="true">
            <span class="animal-friend animal-giraffe" title="Friendly Giraffe">🦒</span>
            <span class="animal-friend animal-monkey" title="Playful Monkey">🐒</span>
            <span class="animal-friend animal-lion" title="Cheerful Lion">🦁</span>
            <span class="animal-friend animal-parrot" title="Tropical Parrot">🦜</span>
            <span class="animal-friend animal-frog" title="Tree Frog">🐸</span>
            <span class="animal-friend animal-turtle" title="Wise Turtle">🐢</span>
            <span class="animal-friend animal-elephant" title="Gentle Elephant">🐘</span>
          </div>

          <!-- Badge & Heading on Wooden Board -->
          <div class="contest-badge-wood">
            <span class="contest-badge-icon">🐾</span>
            <span>A Zoology Knowledge Challenge</span>
          </div>

          <h1 class="contest-title jungle-wood-title">GUESS THE NAME CONTEST</h1>

          <div class="paw-accent-row" aria-hidden="true">
            <span>🐾</span><span>🐾</span><span>🐾</span>
          </div>

          <!-- Warm Cream Inner Content Paper -->
          <div class="parchment-subcard">
            <p class="contest-subtitle">Enter your name to begin</p>

            <form class="name-entry-form" id="player-name-form" novalidate>
              <div class="form-group-entry">
                <label for="player-name-input" class="sr-only">Enter your name</label>
                <div class="input-glow-wrapper safari-input-wrapper" id="name-input-wrapper">
                  <span class="input-icon-prefix">👤</span>
                  <input
                    type="text"
                    id="player-name-input"
                    class="player-name-input"
                    placeholder="Enter your name"
                    maxlength="50"
                    autocomplete="name"
                    autofocus
                    spellcheck="false"
                    aria-describedby="name-error-msg"
                  />
                </div>
                <div
                  id="name-error-msg"
                  class="name-error-msg"
                  role="alert"
                  aria-live="polite"
                  style="display: none;"
                >
                  <span class="error-icon">⚠️</span>
                  <span>Please enter your name to continue.</span>
                </div>
              </div>

              <button type="submit" id="btn-continue-name" class="btn-continue-contest jungle-btn-primary">
                <span>Continue</span>
                <span class="btn-arrow">➔</span>
              </button>
            </form>
          </div>

          <div class="contest-card-footer">
            <span>🌿 Zoology &amp; Animal Science Department • 10 Syllabus Categories 🐾</span>
          </div>
        </div>
      </div>
    `;

    const form = this.container.querySelector("#player-name-form");
    const input = this.container.querySelector("#player-name-input");

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }

    if (input) {
      input.addEventListener("input", () => {
        this.clearError();
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.handleSubmit();
        }
      });

      // Auto-focus the input
      setTimeout(() => {
        input.focus();
      }, 50);
    }
  }

  handleSubmit() {
    const input = this.container.querySelector("#player-name-input");
    if (!input) return;

    const trimmed = input.value.trim();

    if (!trimmed) {
      this.showError("Please enter your name to continue.");
      sounds.playWrong();
      input.focus();
      return;
    }

    this.playerName = trimmed;
    sounds.playClick();

    if (this.onNameEntered) {
      this.onNameEntered(this.playerName);
    }

    this.showWelcomeScreen();
  }

  showError(message) {
    const errorEl = this.container.querySelector("#name-error-msg");
    const wrapper = this.container.querySelector("#name-input-wrapper");
    const input = this.container.querySelector("#player-name-input");

    if (errorEl) {
      errorEl.innerHTML = `<span class="error-icon">⚠️</span> <span>${escapeHtml(message)}</span>`;
      errorEl.style.display = "flex";
    }

    if (wrapper) {
      wrapper.classList.add("input-has-error");
    }

    if (input) {
      input.setAttribute("aria-invalid", "true");
    }
  }

  clearError() {
    const errorEl = this.container.querySelector("#name-error-msg");
    const wrapper = this.container.querySelector("#name-input-wrapper");
    const input = this.container.querySelector("#player-name-input");

    if (errorEl) {
      errorEl.style.display = "none";
    }

    if (wrapper) {
      wrapper.classList.remove("input-has-error");
    }

    if (input) {
      input.removeAttribute("aria-invalid");
    }
  }

  showWelcomeScreen() {
    this.state = "welcome";
    this.renderWelcomeScreen();

    // 2-second polished transition to Main UI
    this.transitionTimer = setTimeout(() => {
      if (this.onComplete) {
        this.onComplete(this.playerName);
      }
    }, 2000);
  }

  renderWelcomeScreen() {
    this.container.innerHTML = `
      <div class="view-welcome-screen animate-welcome-entry">
        <!-- Floating Jungle Canopy -->
        <div class="jungle-canopy-leaves" aria-hidden="true">
          <span class="canopy-leaf leaf-1">🌿</span>
          <span class="canopy-leaf leaf-2">🍃</span>
          <span class="canopy-leaf leaf-3">🌴</span>
        </div>

        <div class="hanging-ropes" aria-hidden="true">
          <div class="rope-line rope-left"></div>
          <div class="rope-line rope-right"></div>
        </div>

        <!-- Wooden Signboard -->
        <div class="welcome-card jungle-signboard">
          <div class="wood-peg peg-tl"></div>
          <div class="wood-peg peg-tr"></div>
          <div class="wood-peg peg-bl"></div>
          <div class="wood-peg peg-br"></div>

          <!-- Cheerful Animal Friends -->
          <div class="safari-animals-cluster" aria-hidden="true">
            <span class="animal-friend animal-lion" title="Lion">🦁</span>
            <span class="animal-friend animal-parrot" title="Parrot">🦜</span>
            <span class="animal-friend animal-monkey" title="Monkey">🐒</span>
            <span class="animal-friend animal-frog" title="Frog">🐸</span>
          </div>

          <div class="welcome-badge-icon">🌿</div>

          <h1 class="welcome-heading">Welcome, <span class="welcome-player-name">${escapeHtml(this.playerName)}</span>!</h1>

          <div class="welcome-contest-tag">Guess the Name Contest</div>
          <p class="welcome-subtitle">Get ready to test your knowledge!</p>

          <div class="welcome-loading-container">
            <div class="welcome-progress-bar jungle-progress-track">
              <div class="welcome-progress-fill jungle-progress-leaf"></div>
            </div>
            <span class="welcome-loading-text">Starting in 2 seconds... 🐾</span>
          </div>
        </div>
      </div>
    `;
  }
}
