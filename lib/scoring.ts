import type { PracticeQuestion, UserAnswer } from "@/lib/types/practice";

/**
 * Computes correctness for a raw answer map.
 */
export function computeAnswers(
  questions: PracticeQuestion[],
  answers: Record<string, string | null>
): UserAnswer[] {
  return questions.map((question) => {
    const answer = answers[question.id] ?? null;
    return {
      questionId: question.id,
      answer: answer as UserAnswer["answer"],
      isCorrect: answer !== null && answer === question.correct,
    };
  });
}

export function calculateScorePercent(answers: UserAnswer[]): number {
  if (answers.length === 0) return 0;
  const correct = answers.filter((a) => a.isCorrect).length;
  return Math.round((correct / answers.length) * 100);
}

/**
 * Rough conversion to a TOEFL ITP Section 2 style score (23-68).
 * Not the official conversion table, but a useful proxy for progress.
 */
export function toItpSectionScore(correctCount: number, total: number): number {
  if (total === 0) return 23;
  const ratio = correctCount / total;
  const raw = Math.round(23 + ratio * (68 - 23));
  return Math.min(68, Math.max(23, raw));
}

export function formatDuration(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
