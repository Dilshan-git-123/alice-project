// Game State Machine managing the Clue / Imposter-Style Quiz logic

export const STAGES = ["A", "B", "C", "D"];

export class GameEngine {
  constructor(options = {}) {
    this.settings = options.settings || {
      timerDurationA: 20,
      timerDurationB: 20,
      timerDurationC: 20,
      timerDurationD: 20,
      pointsA: 4,
      pointsB: 3,
      pointsC: 2,
      pointsD: 1,
      pointsWrong: 0,
      questionsPerGame: 10,
      autoAdvanceDelayMs: 1600,
      revealAnswerOnD: true,
      timeoutAction: "advance"
    };

    this.listeners = [];
    this.timerInterval = null;

    this.reset();
  }

  reset() {
    this.stopTimer();
    this.category = null;
    this.questions = [];
    this.currentIndex = 0;
    this.currentStage = "A"; // 'A' | 'B' | 'C' | 'D'
    this.timeLeft = 20;
    this.maxTimeForStage = 20;
    this.score = 0;
    this.maxPossibleScore = 0;
    this.isAnsweringAllowed = false;
    this.isGameOver = false;
    this.lastFeedback = null;
    this.wrongGuessesThisStage = [];
    this.questionResults = []; // summary of each question
    this.stageBreakdown = { A: 0, B: 0, C: 0, D: 0, none: 0 };
    this.playerName = "Detective Player";
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  notify(eventType = "stateChange") {
    const snapshot = this.getSnapshot();
    snapshot.eventType = eventType;
    this.listeners.forEach((listener) => {
      try {
        listener(snapshot);
      } catch (err) {
        console.error("Listener error:", err);
      }
    });
  }

  getSnapshot() {
    const currentQ = this.getCurrentQuestion();
    return {
      category: this.category,
      currentIndex: this.currentIndex,
      totalQuestions: this.questions.length,
      currentQuestion: currentQ,
      currentStage: this.currentStage,
      timeLeft: this.timeLeft,
      maxTimeForStage: this.maxTimeForStage,
      score: this.score,
      maxPossibleScore: this.maxPossibleScore,
      isAnsweringAllowed: this.isAnsweringAllowed,
      isGameOver: this.isGameOver,
      lastFeedback: this.lastFeedback,
      wrongGuessesThisStage: [...this.wrongGuessesThisStage],
      questionResults: [...this.questionResults],
      stageBreakdown: { ...this.stageBreakdown },
      playerName: this.playerName
    };
  }

  startQuiz(category, allQuestions, playerName = "Detective Player", settings = null) {
    if (settings) {
      this.settings = { ...this.settings, ...settings };
    }
    this.reset();
    this.category = category;
    this.playerName = playerName;

    // Filter questions for this category
    const catQuestions = allQuestions.filter(
      (q) => String(q.category).toLowerCase() === String(category.id).toLowerCase()
    );

    // Limit to settings.questionsPerGame or all available
    const limit = Math.min(this.settings.questionsPerGame || 10, catQuestions.length);
    this.questions = catQuestions.slice(0, limit);
    this.maxPossibleScore = this.questions.length * (this.settings.pointsA || 4);

    if (this.questions.length === 0) {
      this.isGameOver = true;
      this.notify();
      return;
    }

    this.currentIndex = 0;
    this.startQuestion(0);
  }

  getCurrentQuestion() {
    if (this.currentIndex >= 0 && this.currentIndex < this.questions.length) {
      return this.questions[this.currentIndex];
    }
    return null;
  }

  getStageDuration(stage) {
    switch (stage) {
      case "A":
        return Number(this.settings.timerDurationA) || 20;
      case "B":
        return Number(this.settings.timerDurationB) || 20;
      case "C":
        return Number(this.settings.timerDurationC) || 20;
      case "D":
        return Number(this.settings.timerDurationD) || 20;
      default:
        return 20;
    }
  }

  getStagePoints(stage) {
    switch (stage) {
      case "A":
        return Number(this.settings.pointsA) || 4;
      case "B":
        return Number(this.settings.pointsB) || 3;
      case "C":
        return Number(this.settings.pointsC) || 2;
      case "D":
        return Number(this.settings.pointsD) || 1;
      default:
        return 0;
    }
  }

  startQuestion(index) {
    this.stopTimer();
    this.currentIndex = index;
    this.currentStage = "A";
    this.wrongGuessesThisStage = [];
    this.lastFeedback = null;
    this.isAnsweringAllowed = true;

    this.startStageTimer("A");
    this.notify();
  }

  startStageTimer(stage) {
    this.stopTimer();
    this.maxTimeForStage = this.getStageDuration(stage);
    this.timeLeft = this.maxTimeForStage;

    this.timerInterval = setInterval(() => {
      this.timeLeft -= 1;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        this.handleTimeout();
      } else {
        this.notify("tick");
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  handleTimeout() {
    this.stopTimer();
    this.isAnsweringAllowed = false;

    const currentQ = this.getCurrentQuestion();
    if (!currentQ) return;

    if (this.currentStage === "A") {
      this.lastFeedback = {
        type: "timeout",
        message: "Time's up for Clue A! Advancing to Clue B...",
        stage: "A",
        points: 0
      };
      this.notify();
      setTimeout(() => {
        this.advanceToStage("B");
      }, 1000);
    } else if (this.currentStage === "B") {
      this.lastFeedback = {
        type: "timeout",
        message: "Time's up for Clue B! Advancing to Clue C...",
        stage: "B",
        points: 0
      };
      this.notify();
      setTimeout(() => {
        this.advanceToStage("C");
      }, 1000);
    } else if (this.currentStage === "C") {
      this.lastFeedback = {
        type: "timeout",
        message: "Time's up for Clue C! Advancing to Final Clue D...",
        stage: "C",
        points: 0
      };
      this.notify();
      setTimeout(() => {
        this.advanceToStage("D");
      }, 1000);
    } else if (this.currentStage === "D") {
      // Stage D timeout -> treat as incorrect, reveal answer, advance to next question
      this.stageBreakdown.none = (this.stageBreakdown.none || 0) + 1;
      this.questionResults.push({
        questionId: currentQ.id,
        answer: currentQ.answer,
        correctOption: currentQ.correctOption,
        userOption: null,
        isCorrect: false,
        stage: "D",
        points: 0,
        timedOut: true,
        explanation: currentQ.explanation
      });

      this.lastFeedback = {
        type: "incorrect-d",
        message: `Time's up! The correct answer was "${currentQ.correctOption}".`,
        correctOption: currentQ.correctOption,
        explanation: currentQ.explanation,
        points: 0,
        stage: "D",
        timedOut: true
      };
      this.notify();

      setTimeout(() => {
        this.nextQuestion();
      }, this.settings.autoAdvanceDelayMs || 2000);
    }
  }

  advanceToStage(nextStage) {
    this.currentStage = nextStage;
    this.wrongGuessesThisStage = [];
    this.lastFeedback = null;
    this.isAnsweringAllowed = true;
    this.startStageTimer(nextStage);
    this.notify();
  }

  submitAnswer(selectedOption) {
    if (!this.isAnsweringAllowed) return null;
    const currentQ = this.getCurrentQuestion();
    if (!currentQ) return null;

    // Prevent duplicate answer in the same stage if already selected
    if (this.wrongGuessesThisStage.includes(selectedOption)) {
      return null;
    }

    const isCorrect =
      String(selectedOption).trim().toLowerCase() ===
      String(currentQ.correctOption).trim().toLowerCase();

    if (isCorrect) {
      // CORRECT ANSWER!
      this.stopTimer();
      this.isAnsweringAllowed = false;

      const pointsEarned = this.getStagePoints(this.currentStage);
      this.score += pointsEarned;
      this.stageBreakdown[this.currentStage] =
        (this.stageBreakdown[this.currentStage] || 0) + 1;

      this.questionResults.push({
        questionId: currentQ.id,
        answer: currentQ.answer,
        correctOption: currentQ.correctOption,
        userOption: selectedOption,
        isCorrect: true,
        stage: this.currentStage,
        points: pointsEarned,
        explanation: currentQ.explanation
      });

      this.lastFeedback = {
        type: "correct",
        message: `Brilliant! Correct at Stage ${this.currentStage}! (+${pointsEarned} pts)`,
        selectedOption,
        correctOption: currentQ.correctOption,
        explanation: currentQ.explanation,
        points: pointsEarned,
        stage: this.currentStage
      };

      this.notify();

      // Proceed to next question after brief delay
      setTimeout(() => {
        this.nextQuestion();
      }, this.settings.autoAdvanceDelayMs || 1600);

      return { isCorrect: true, points: pointsEarned, stage: this.currentStage };
    } else {
      // WRONG ANSWER
      this.wrongGuessesThisStage.push(selectedOption);

      if (this.currentStage === "A") {
        this.lastFeedback = {
          type: "incorrect-stage",
          message: `Not quite! 0 points for Clue A. Moving to Clue B...`,
          selectedOption,
          stage: "A",
          points: 0
        };
        this.notify();

        // Continue to Clue B without revealing the answer
        setTimeout(() => {
          this.advanceToStage("B");
        }, 1200);

        return { isCorrect: false, points: 0, nextStage: "B" };
      } else if (this.currentStage === "B") {
        this.lastFeedback = {
          type: "incorrect-stage",
          message: `Not quite! 0 points for Clue B. Moving to Clue C...`,
          selectedOption,
          stage: "B",
          points: 0
        };
        this.notify();

        // Continue to Clue C without revealing the answer
        setTimeout(() => {
          this.advanceToStage("C");
        }, 1200);

        return { isCorrect: false, points: 0, nextStage: "C" };
      } else if (this.currentStage === "C") {
        this.lastFeedback = {
          type: "incorrect-stage",
          message: `Not quite! 0 points for Clue C. Moving to Final Clue D...`,
          selectedOption,
          stage: "C",
          points: 0
        };
        this.notify();

        // Continue to Clue D without revealing the answer
        setTimeout(() => {
          this.advanceToStage("D");
        }, 1200);

        return { isCorrect: false, points: 0, nextStage: "D" };
      } else if (this.currentStage === "D") {
        // Stage D wrong answer -> must reveal answer and move to next question!
        this.stopTimer();
        this.isAnsweringAllowed = false;

        this.stageBreakdown.none = (this.stageBreakdown.none || 0) + 1;
        this.questionResults.push({
          questionId: currentQ.id,
          answer: currentQ.answer,
          correctOption: currentQ.correctOption,
          userOption: selectedOption,
          isCorrect: false,
          stage: "D",
          points: 0,
          explanation: currentQ.explanation
        });

        this.lastFeedback = {
          type: "incorrect-d",
          message: `Incorrect! The correct answer was "${currentQ.correctOption}".`,
          selectedOption,
          correctOption: currentQ.correctOption,
          explanation: currentQ.explanation,
          points: 0,
          stage: "D"
        };

        this.notify();

        setTimeout(() => {
          this.nextQuestion();
        }, this.settings.autoAdvanceDelayMs || 2200);

        return { isCorrect: false, points: 0, revealedAnswer: currentQ.correctOption };
      }
    }
  }

  nextQuestion() {
    this.stopTimer();
    const nextIndex = this.currentIndex + 1;
    if (nextIndex < this.questions.length) {
      this.startQuestion(nextIndex);
    } else {
      this.finishGame();
    }
  }

  finishGame() {
    this.stopTimer();
    this.isGameOver = true;
    this.isAnsweringAllowed = false;
    this.notify();
  }

  getFinalStats() {
    const totalQ = this.questions.length;
    const correctCount = this.questionResults.filter((r) => r.isCorrect).length;
    const incorrectCount = totalQ - correctCount;
    const percentage = totalQ > 0 ? Math.round((this.score / (this.maxPossibleScore || 1)) * 100) : 0;
    const accuracy = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;

    return {
      playerName: this.playerName,
      categoryId: this.category ? this.category.id : "unknown",
      categoryName: this.category ? this.category.name : "Unknown",
      categoryIcon: this.category ? this.category.icon : "🎯",
      unit: this.category ? (this.category.unit || "Unit I") : "",
      unitTitle: this.category ? (this.category.unitTitle || "") : "",
      score: this.score,
      maxPossibleScore: this.maxPossibleScore,
      questionsCompleted: totalQ,
      correctCount,
      incorrectCount,
      percentage,
      accuracy,
      stageBreakdown: { ...this.stageBreakdown },
      questionResults: [...this.questionResults]
    };
  }
}
