import { Timestamp } from "firebase/firestore";

export interface UserProgress {}

export interface PreTestData {
  createdAt: Date;
}

export interface PostTestData {
  createdAt: Date;
}

export interface SimulationData {
  simulationId: number;
  data: string[];
  createdAt: Date;
}
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Date;
  progress: {
    isPreTestDone: Date | null;
    isSimulationDone: boolean;
    isPostTestDone: boolean;
  };
}

interface ExamResult {
  userId: string;
  totalScore: number;
  maxScore: number;
  startedAt: Timestamp;
  submittedAt: Timestamp;
  answers: string[];
}

interface Answer {
  question: string;
  type: "single" | "multiple";
  answer: string[];
  isCorrect: boolean;
}
