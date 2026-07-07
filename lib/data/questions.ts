import type { PracticeQuestion, SectionId } from "@/lib/types/practice";
import { STRUCTURE_QUESTIONS } from "@/lib/data/structure-questions";
import { WRITTEN_EXPRESSION_QUESTIONS } from "@/lib/data/written-expression-questions";

/** Returns the full question bank for the given section id. */
export function getQuestionsBySection(section: SectionId): PracticeQuestion[] {
  switch (section) {
    case "structure":
      return STRUCTURE_QUESTIONS;
    case "written-expression":
      return WRITTEN_EXPRESSION_QUESTIONS;
    default:
      return [];
  }
}

/**
 * Returns a shuffled subset of questions for a practice session.
 * If `limit` is not provided, all section questions are returned in order.
 */
export function buildPracticeSet(
  section: SectionId,
  limit?: number
): PracticeQuestion[] {
  const bank = getQuestionsBySection(section);
  if (!limit || limit >= bank.length) return bank;

  const pool = [...bank];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, limit);
}
