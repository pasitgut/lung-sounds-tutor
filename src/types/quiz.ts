export type QuestionType = "single" | "multiple";

export interface Option {
  id: string;
  label: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  correctOption: string[];
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswer: Record<number, string[]>;
  score: number;
  isFinished: boolean;
}
