export const DEFAULT_SETTINGS = {
  // Gameplay timers and scoring
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

  // Behavior settings
  autoAdvanceOnCorrect: true,
  autoAdvanceDelayMs: 1600,
  revealAnswerOnD: true,
  timeoutAction: "advance", // 'advance' -> moves to next clue on A-C, marks wrong on D
  soundEnabled: true,

  // Player defaults
  defaultPlayerName: "Detective Player"
};
