// Core data types for Kintsugi Notes

export type RepairStatus = "not_started" | "repairing" | "repaired";

export interface PracticeQuestion {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface RepairAnalysis {
  id: string;
  subject: string;
  originalMistake: string;
  currentExplanation: string;
  goal?: string;
  fractureDetected: string;
  whyItHappened: string;
  goldenRepair: string;
  miniLesson: string;
  practiceQuestions: PracticeQuestion[];
  memoryHook: string;
  nextStep: string;
  confidenceScore: number; // 0-100
  repairStatus: RepairStatus;
  createdAt: string;
}

export interface MistakeInput {
  subject: string;
  mistake: string;
  currentExplanation: string;
  goal?: string;
}

export interface PracticeProgress {
  repairId: string;
  questionsAnswered: number;
  questionsCorrect: number;
  completed: boolean;
}

export interface AppState {
  repairs: RepairAnalysis[];
  currentRepair: RepairAnalysis | null;
  practiceProgress: Record<string, PracticeProgress>;
  totalRepaired: number;
  totalInProgress: number;
}

// Preloaded example type
export interface ExampleMistake {
  label: string;
  icon: string;
  subject: string;
  mistake: string;
  currentExplanation: string;
  goal: string;
}
