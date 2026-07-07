import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  PracticeQuestion,
  SectionId,
  SectionMeta,
  StructureQuestion,
  WrittenExpressionQuestion,
} from "@/lib/types/practice";

/**
 * Loads every practice section from Supabase.
 */
export async function fetchSections(): Promise<SectionMeta[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("sections")
    .select("id, name, short_description, long_description, time_limit_minutes, question_count")
    .order("id");

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id as SectionId,
    name: row.name,
    shortDescription: row.short_description,
    longDescription: row.long_description ?? "",
    timeLimitMinutes: row.time_limit_minutes,
    questionCount: row.question_count,
    instructionKey: row.id as "structure" | "written-expression",
  }));
}

/** Loads one section metadata by id (or null when not found). */
export async function fetchSection(id: string): Promise<SectionMeta | null> {
  const sections = await fetchSections();
  return sections.find((section) => section.id === id) ?? null;
}

/**
 * Loads all questions for a given section, hydrated to the client
 * TypeScript shape used by the UI components.
 */
export async function fetchQuestionsBySection(
  sectionId: SectionId
): Promise<PracticeQuestion[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("questions")
    .select("id, section_id, number, type, payload, correct, explanation")
    .eq("section_id", sectionId)
    .order("number");

  if (error || !data) return [];

  return data.map((row) => {
    if (row.type === "structure") {
      return {
        id: row.id,
        number: row.number,
        type: "structure",
        stem: row.payload.stem,
        options: row.payload.options,
        correct: row.correct,
        explanation: row.explanation ?? undefined,
      } as StructureQuestion;
    }
    return {
      id: row.id,
      number: row.number,
      type: "written-expression",
      fragments: row.payload.fragments,
      correction: row.payload.correction,
      correct: row.correct,
      explanation: row.explanation ?? undefined,
    } as WrittenExpressionQuestion;
  });
}
