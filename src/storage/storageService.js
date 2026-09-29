import { DEFAULT_CATEGORIES } from "../data/defaultCategories.js";
import { DEFAULT_QUESTIONS } from "../data/defaultQuestions.js";
import { DEFAULT_SETTINGS } from "../data/defaultSettings.js";

const STORAGE_KEYS = {
  CATEGORIES: "clue_game_categories_v3_syllabus",
  QUESTIONS: "clue_game_questions_v3_syllabus",
  SETTINGS: "clue_game_settings_v3_syllabus",
  SCORES: "clue_game_scores_v3_syllabus"
};

const OBSOLETE_CATEGORY_IDS = [
  "animals",
  "fruits",
  "microorganisms",
  "bacteria",
  "fossils",
  "fossils-ancient-life"
];

class StorageService {
  constructor() {
    this.memoryStorage = {};
    this.cleanupLegacyCache();
  }

  cleanupLegacyCache() {
    if (this.isAvailable()) {
      try {
        localStorage.removeItem("clue_game_categories_v1");
        localStorage.removeItem("clue_game_questions_v1");
        localStorage.removeItem("clue_game_settings_v1");
        localStorage.removeItem("clue_game_scores_v1");
        localStorage.removeItem("clue_game_categories_v2");
        localStorage.removeItem("clue_game_questions_v2");
        localStorage.removeItem("clue_game_settings_v2");
        localStorage.removeItem("clue_game_scores_v2");
      } catch {}
    }
  }

  isAvailable() {
    try {
      const test = "__test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  getItem(key) {
    if (this.isAvailable()) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return this.memoryStorage[key] || null;
  }

  setItem(key, value) {
    if (this.isAvailable()) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      this.memoryStorage[key] = value;
    }
  }

  // --- CATEGORIES ---
  getCategories() {
    let categories = this.getItem(STORAGE_KEYS.CATEGORIES);
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      this.setItem(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES);
      return [...DEFAULT_CATEGORIES];
    }
    // Automatically purge any obsolete categories from prior versions
    const hasObsolete = categories.some((c) => OBSOLETE_CATEGORY_IDS.includes(c.id));
    if (hasObsolete) {
      this.setItem(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES);
      this.setItem(STORAGE_KEYS.QUESTIONS, DEFAULT_QUESTIONS);
      return [...DEFAULT_CATEGORIES];
    }
    return categories;
  }

  saveCategories(categories) {
    this.setItem(STORAGE_KEYS.CATEGORIES, categories);
  }

  addCategory(category) {
    const categories = this.getCategories();
    const id = category.id || category.name.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Date.now();
    const newCategory = {
      id,
      unit: category.unit || "Elective Unit",
      unitTitle: category.unitTitle || "Custom Unit",
      name: category.name.trim(),
      icon: category.icon || "🎯",
      description: category.description || "Custom category created by user",
      color: category.color || "#3b82f6",
      gradient: category.gradient || "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.05) 100%)",
      borderColor: category.borderColor || "rgba(59, 130, 246, 0.4)"
    };
    categories.push(newCategory);
    this.saveCategories(categories);
    return newCategory;
  }

  updateCategory(id, updates) {
    const categories = this.getCategories();
    const index = categories.findIndex((c) => c.id === id);
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updates };
      this.saveCategories(categories);
      return categories[index];
    }
    return null;
  }

  deleteCategory(id) {
    let categories = this.getCategories();
    categories = categories.filter((c) => c.id !== id);
    this.saveCategories(categories);

    // Also remove associated questions
    let questions = this.getQuestions();
    questions = questions.filter((q) => q.category !== id);
    this.saveQuestions(questions);
    return true;
  }

  // --- QUESTIONS ---
  getQuestions(categoryId = null) {
    let questions = this.getItem(STORAGE_KEYS.QUESTIONS);
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      this.setItem(STORAGE_KEYS.QUESTIONS, DEFAULT_QUESTIONS);
      const all = [...DEFAULT_QUESTIONS];
      return categoryId ? all.filter((q) => q.category === categoryId) : all;
    }
    // Automatically purge any obsolete questions from prior versions
    const hasObsolete = questions.some((q) => OBSOLETE_CATEGORY_IDS.includes(q.category));
    if (hasObsolete) {
      this.setItem(STORAGE_KEYS.QUESTIONS, DEFAULT_QUESTIONS);
      const all = [...DEFAULT_QUESTIONS];
      return categoryId ? all.filter((q) => q.category === categoryId) : all;
    }
    return categoryId ? questions.filter((q) => q.category === categoryId) : questions;
  }

  saveQuestions(questions) {
    this.setItem(STORAGE_KEYS.QUESTIONS, questions);
  }

  getQuestionById(id) {
    const questions = this.getQuestions();
    return questions.find((q) => q.id === Number(id)) || null;
  }

  addQuestion(questionData) {
    const questions = this.getQuestions();
    const nextId = questions.reduce((max, q) => Math.max(max, Number(q.id) || 0), 0) + 1;
    const newQuestion = {
      id: nextId,
      category: questionData.category,
      answer: questionData.answer.trim(),
      clues: {
        A: questionData.clues.A.trim(),
        B: questionData.clues.B.trim(),
        C: questionData.clues.C.trim(),
        D: questionData.clues.D.trim()
      },
      options: questionData.options.map((opt) => opt.trim()),
      correctOption: questionData.correctOption.trim(),
      explanation: questionData.explanation ? questionData.explanation.trim() : ""
    };
    questions.push(newQuestion);
    this.saveQuestions(questions);
    return newQuestion;
  }

  updateQuestion(id, updates) {
    const questions = this.getQuestions();
    const index = questions.findIndex((q) => q.id === Number(id));
    if (index !== -1) {
      questions[index] = { ...questions[index], ...updates };
      this.saveQuestions(questions);
      return questions[index];
    }
    return null;
  }

  deleteQuestion(id) {
    let questions = this.getQuestions();
    questions = questions.filter((q) => q.id !== Number(id));
    this.saveQuestions(questions);
    return true;
  }

  // --- SETTINGS ---
  getSettings() {
    const settings = this.getItem(STORAGE_KEYS.SETTINGS);
    if (!settings) {
      this.setItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
      return { ...DEFAULT_SETTINGS };
    }
    return { ...DEFAULT_SETTINGS, ...settings };
  }

  saveSettings(settings) {
    this.setItem(STORAGE_KEYS.SETTINGS, settings);
  }

  resetSettings() {
    this.setItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    return { ...DEFAULT_SETTINGS };
  }

  // --- SCORES / SCOREBOARD ---
  getScores() {
    const scores = this.getItem(STORAGE_KEYS.SCORES);
    return scores && Array.isArray(scores) ? scores : [];
  }

  saveScore(scoreRecord) {
    const scores = this.getScores();
    const record = {
      id: "score-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
      playerName: scoreRecord.playerName || "Detective Player",
      categoryId: scoreRecord.categoryId,
      categoryName: scoreRecord.categoryName,
      score: scoreRecord.score,
      maxPossibleScore: scoreRecord.maxPossibleScore,
      questionsCompleted: scoreRecord.questionsCompleted,
      correctCount: scoreRecord.correctCount,
      incorrectCount: scoreRecord.incorrectCount,
      percentage: Math.round((scoreRecord.score / (scoreRecord.maxPossibleScore || 1)) * 100),
      stageBreakdown: scoreRecord.stageBreakdown || { A: 0, B: 0, C: 0, D: 0, none: 0 },
      timestamp: Date.now(),
      dateStr: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    scores.unshift(record);
    // Keep last 100 scores
    if (scores.length > 100) scores.pop();
    this.setItem(STORAGE_KEYS.SCORES, scores);
    return record;
  }

  clearScores() {
    this.setItem(STORAGE_KEYS.SCORES, []);
  }

  // --- PLAYER SESSION ---
  getCurrentPlayerName() {
    try {
      if (typeof sessionStorage !== "undefined") {
        return sessionStorage.getItem("clue_contest_player_name") || "";
      }
    } catch {}
    return this.memoryStorage["clue_contest_player_name"] || "";
  }

  setCurrentPlayerName(name) {
    const trimmed = (name || "").trim();
    try {
      if (typeof sessionStorage !== "undefined") {
        if (trimmed) {
          sessionStorage.setItem("clue_contest_player_name", trimmed);
        } else {
          sessionStorage.removeItem("clue_contest_player_name");
        }
      }
    } catch {}
    this.memoryStorage["clue_contest_player_name"] = trimmed;
    return trimmed;
  }

  clearCurrentPlayerName() {
    try {
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.removeItem("clue_contest_player_name");
      }
    } catch {}
    delete this.memoryStorage["clue_contest_player_name"];
  }

  // --- RESET ALL ---
  resetAllToDefaults() {
    this.setItem(STORAGE_KEYS.CATEGORIES, DEFAULT_CATEGORIES);
    this.setItem(STORAGE_KEYS.QUESTIONS, DEFAULT_QUESTIONS);
    this.setItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    this.setItem(STORAGE_KEYS.SCORES, []);
    this.clearCurrentPlayerName();
  }
}

export const storageService = new StorageService();

