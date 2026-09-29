import { describe, it, expect, beforeEach, vi } from "vitest";
import { GameEngine } from "../src/state/gameState.js";
import { storageService } from "../src/storage/storageService.js";

const sampleSyllabusQuestions = [
  {
    id: 1,
    unit: "Unit I",
    category: "taxonomy-systematics",
    questionNumber: 1,
    answer: "Systematics",
    clues: {
      A: "I am a major field within comparative biology focused on organic diversity.",
      B: "I explore both extinct and extant organisms to establish their genealogical history.",
      C: "I combine taxonomy with the reconstruction of phylogenetic patterns.",
      D: "Simpson defined me as the scientific study of the kinds and diversity of organisms."
    },
    options: ["Taxonomy", "Systematics", "Ecology", "Morphometrics"],
    correctOption: "Systematics",
    explanation: "Systematics is the broader study of organismal diversity and phylogenetic relationships."
  },
  {
    id: 2,
    unit: "Unit I",
    category: "taxonomy-systematics",
    questionNumber: 2,
    answer: "Taxon",
    clues: {
      A: "I am a fundamental concept recognized at every tier of Linnaean hierarchy.",
      B: "I represent a real biological entity rather than an abstract rank.",
      C: "Examples include Mammalia, Carnivora, and Felidae.",
      D: "I am defined as a taxonomic group of any rank assigned a definite category."
    },
    options: ["Category", "Taxon", "Phenon", "Cohort"],
    correctOption: "Taxon",
    explanation: "A taxon is a concrete taxonomic group of real organisms of any rank."
  }
];

const sampleSyllabusCategory = {
  id: "taxonomy-systematics",
  unit: "Unit I",
  unitTitle: "Principles of Animal Taxonomy",
  name: "Taxonomy & Systematics",
  icon: "🔬"
};

describe("Syllabus-Based Quiz System & GameEngine State Machine", () => {
  let engine;

  beforeEach(() => {
    vi.useFakeTimers();
    engine = new GameEngine();
  });

  it("1: Category Database - Contains exactly 10 syllabus categories across 5 Units", () => {
    const categories = storageService.getCategories();
    expect(categories.length).toBe(10);

    const expectedCategoryIds = [
      "taxonomy-systematics",
      "nomenclature-biosystematics",
      "invertebrate-origins-bodyplans",
      "arthropod-mollusca-echinoderm",
      "chordate-origins-fish-evolution",
      "tetrapod-vertebrate-evolution",
      "geological-time-concepts",
      "geological-succession-animals",
      "minor-phyla-1",
      "minor-phyla-2"
    ];

    expect(categories.map((c) => c.id)).toEqual(expectedCategoryIds);

    // Verify 5 Units distribution (2 categories each)
    const unitCounts = {};
    categories.forEach((c) => {
      unitCounts[c.unit] = (unitCounts[c.unit] || 0) + 1;
    });

    expect(unitCounts["Unit I"]).toBe(2);
    expect(unitCounts["Unit II"]).toBe(2);
    expect(unitCounts["Unit III"]).toBe(2);
    expect(unitCounts["Unit IV"]).toBe(2);
    expect(unitCounts["Unit V"]).toBe(2);
  });

  it("2: Obsolete Categories - Completely absent from category and question databases", () => {
    const categories = storageService.getCategories();
    const catNames = categories.map((c) => c.name.toLowerCase());

    expect(catNames).not.toContain("animals");
    expect(catNames).not.toContain("fruits");
    expect(catNames).not.toContain("microorganisms");
    expect(catNames).not.toContain("bacteria");
    expect(catNames).not.toContain("fossils & ancient life");

    const allQuestions = storageService.getQuestions();
    const oldCatReferences = allQuestions.filter((q) =>
      ["animals", "fruits", "microorganisms", "bacteria", "fossils-ancient-life"].includes(
        String(q.category).toLowerCase()
      )
    );
    expect(oldCatReferences.length).toBe(0);
  });

  it("3: Question Database - Contains exactly 100 questions (10 per category)", () => {
    const allQuestions = storageService.getQuestions();
    expect(allQuestions.length).toBe(100);

    const categories = storageService.getCategories();
    categories.forEach((cat) => {
      const catQuestions = allQuestions.filter((q) => q.category === cat.id);
      expect(catQuestions.length).toBe(10);

      // Verify each question has required keys
      catQuestions.forEach((q) => {
        expect(q.id).toBeDefined();
        expect(q.unit).toBe(cat.unit);
        expect(q.category).toBe(cat.id);
        expect(q.answer).toBeDefined();
        expect(q.clues.A).toBeDefined();
        expect(q.clues.B).toBeDefined();
        expect(q.clues.C).toBeDefined();
        expect(q.clues.D).toBeDefined();
        expect(q.options.length).toBe(4);
        expect(q.options).toContain(q.correctOption);
        expect(q.explanation).toBeDefined();
      });
    });
  });

  it("4: Question Flow - Starts Question 1 at Stage A with 20s timer", () => {
    engine.startQuiz(sampleSyllabusCategory, sampleSyllabusQuestions, "Student");
    const snap = engine.getSnapshot();

    expect(snap.category.id).toBe("taxonomy-systematics");
    expect(snap.currentIndex).toBe(0);
    expect(snap.currentStage).toBe("A");
    expect(snap.currentQuestion.answer).toBe("Systematics");
    expect(snap.timeLeft).toBe(20);
    expect(snap.score).toBe(0);
  });

  it("5: Progressive Clues - Sequentially reveals Clues A through D", () => {
    engine.startQuiz(sampleSyllabusCategory, sampleSyllabusQuestions, "Student");

    expect(engine.currentStage).toBe("A");
    expect(engine.getCurrentQuestion().clues.A).toContain("organic diversity");

    // Miss at A -> advances to B
    engine.submitAnswer("Taxonomy");
    vi.advanceTimersByTime(1500);

    expect(engine.currentStage).toBe("B");
    expect(engine.getCurrentQuestion().clues.B).toContain("genealogical history");

    // Miss at B -> advances to C
    engine.submitAnswer("Ecology");
    vi.advanceTimersByTime(1500);

    expect(engine.currentStage).toBe("C");
    expect(engine.getCurrentQuestion().clues.C).toContain("phylogenetic patterns");

    // Miss at C -> advances to D
    engine.submitAnswer("Morphometrics");
    vi.advanceTimersByTime(1500);

    expect(engine.currentStage).toBe("D");
    expect(engine.getCurrentQuestion().clues.D).toContain("Simpson defined me");
  });

  it("6: Timer - Counts down and resets on stage advance", () => {
    engine.startQuiz(sampleSyllabusCategory, sampleSyllabusQuestions, "Student");
    expect(engine.timeLeft).toBe(20);

    vi.advanceTimersByTime(6000);
    expect(engine.timeLeft).toBe(14);

    engine.advanceToStage("B");
    expect(engine.timeLeft).toBe(20);
  });

  it("7: Scoring - A awards 4 pts, B awards 3 pts, C awards 2 pts, D awards 1 pt", () => {
    // Stage A solve (+4)
    engine.startQuiz(sampleSyllabusCategory, sampleSyllabusQuestions, "Student");
    let res = engine.submitAnswer("Systematics");
    expect(res.points).toBe(4);
    expect(engine.score).toBe(4);

    // Stage B solve (+3)
    engine.startQuiz(sampleSyllabusCategory, sampleSyllabusQuestions, "Student");
    engine.advanceToStage("B");
    res = engine.submitAnswer("Systematics");
    expect(res.points).toBe(3);
    expect(engine.score).toBe(3);

    // Stage C solve (+2)
    engine.startQuiz(sampleSyllabusCategory, sampleSyllabusQuestions, "Student");
    engine.advanceToStage("C");
    res = engine.submitAnswer("Systematics");
    expect(res.points).toBe(2);
    expect(engine.score).toBe(2);

    // Stage D solve (+1)
    engine.startQuiz(sampleSyllabusCategory, sampleSyllabusQuestions, "Student");
    engine.advanceToStage("D");
    res = engine.submitAnswer("Systematics");
    expect(res.points).toBe(1);
    expect(engine.score).toBe(1);
  });

  it("8: Wrong answer at D - Reveals correct answer and moves to next question", () => {
    engine.startQuiz(sampleSyllabusCategory, sampleSyllabusQuestions, "Student");
    engine.advanceToStage("D");

    const res = engine.submitAnswer("Ecology");
    expect(res.isCorrect).toBe(false);
    expect(res.revealedAnswer).toBe("Systematics");
    expect(engine.score).toBe(0);

    vi.advanceTimersByTime(2500);
    expect(engine.currentIndex).toBe(1);
  });

  it("9: Timeouts - Advance through A->B->C and mark incorrect at D", () => {
    engine.startQuiz(sampleSyllabusCategory, sampleSyllabusQuestions, "Student");
    expect(engine.currentStage).toBe("A");

    // Timeout at A -> B
    vi.advanceTimersByTime(20000);
    vi.advanceTimersByTime(1200);
    expect(engine.currentStage).toBe("B");

    // Timeout at B -> C
    vi.advanceTimersByTime(20000);
    vi.advanceTimersByTime(1200);
    expect(engine.currentStage).toBe("C");

    // Timeout at C -> D
    vi.advanceTimersByTime(20000);
    vi.advanceTimersByTime(1200);
    expect(engine.currentStage).toBe("D");

    // Timeout at D -> mark incorrect, advance to next question
    vi.advanceTimersByTime(20000);
    expect(engine.lastFeedback.type).toBe("incorrect-d");
    expect(engine.lastFeedback.timedOut).toBe(true);

    vi.advanceTimersByTime(2500);
    expect(engine.currentIndex).toBe(1);
  });

  it("10: Deduplication - Prevents duplicate scoring on same question", () => {
    engine.startQuiz(sampleSyllabusCategory, sampleSyllabusQuestions, "Student");
    engine.submitAnswer("Systematics");
    const scoreBefore = engine.score;

    const duplicate = engine.submitAnswer("Systematics");
    expect(duplicate).toBeNull();
    expect(engine.score).toBe(scoreBefore);
  });

  it("11: 10 Questions Completion & Score Calculation (Max 40)", () => {
    const allQuestions = storageService.getQuestions("taxonomy-systematics");
    const category = storageService.getCategories().find((c) => c.id === "taxonomy-systematics");

    engine.startQuiz(category, allQuestions, "Alice");
    const snap = engine.getSnapshot();

    expect(snap.totalQuestions).toBe(10);
    expect(snap.maxPossibleScore).toBe(40);

    // Solve all 10 questions at Stage A (4 pts each = 40 pts)
    for (let i = 0; i < 10; i++) {
      const q = engine.getCurrentQuestion();
      engine.submitAnswer(q.correctOption);
      vi.advanceTimersByTime(2000);
    }

    expect(engine.isGameOver).toBe(true);
    const stats = engine.getFinalStats();
    expect(stats.score).toBe(40);
    expect(stats.maxPossibleScore).toBe(40);
    expect(stats.correctCount).toBe(10);
    expect(stats.percentage).toBe(100);
    expect(stats.unit).toBe("Unit I");
  });

  it("12: Settings - Custom timer and points settings are respected", () => {
    const customSettings = {
      timerDurationA: 15,
      pointsA: 5,
      pointsB: 3,
      pointsC: 2,
      pointsD: 1
    };

    engine.startQuiz(sampleSyllabusCategory, sampleSyllabusQuestions, "Student", customSettings);
    expect(engine.timeLeft).toBe(15);

    const res = engine.submitAnswer("Systematics");
    expect(res.points).toBe(5);
    expect(engine.score).toBe(5);
  });
});
