export type SectionId = "structure" | "written-expression";

export type OptionKey = "A" | "B" | "C" | "D";

export interface QuestionOption {
  key: OptionKey;
  label: string;
}

/**
 * Structure question: fill in the blank with one of four options.
 * The stem uses a `___` marker to indicate where the answer is inserted.
 */
export interface StructureQuestion {
  id: string;
  type: "structure";
  number: number;
  stem: string;
  options: QuestionOption[];
  correct: OptionKey;
  explanation?: string;
}

/**
 * Written expression question: choose the underlined segment that must
 * be changed for the sentence to be correct.
 */
export interface WrittenExpressionSegment {
  key: OptionKey;
  text: string;
}

export interface WrittenExpressionQuestion {
  id: string;
  type: "written-expression";
  number: number;
  /** Sentence in fragments; segments marked A-D are underlined choices. */
  fragments: Array<{ text: string; underlined?: OptionKey }>;
  correct: OptionKey;
  correction?: string;
  explanation?: string;
}

export type PracticeQuestion = StructureQuestion | WrittenExpressionQuestion;

export interface UserAnswer {
  questionId: string;
  answer: OptionKey | null;
  isCorrect: boolean;
}

export interface PracticeSessionSummary {
  id: string;
  sectionId: SectionId;
  totalQuestions: number;
  correctAnswers: number;
  scorePercent: number;
  durationSeconds: number;
  completedAt: string;
  answers: UserAnswer[];
}

export interface SectionMeta {
  id: SectionId;
  name: string;
  shortDescription: string;
  longDescription: string;
  timeLimitMinutes: number;
  questionCount: number;
  instructionKey: "structure" | "written-expression";
}
