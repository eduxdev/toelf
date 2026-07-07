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

interface QuestionRow {
  id: string;
  number: number;
  type: "structure" | "written-expression";
  payload: {
    stem?: string;
    options?: { key: string; label: string }[];
    fragments?: { text: string; underlined?: string }[];
    correction?: string;
  };
  correct: string;
  explanation: string | null;
}

function hydrateQuestion(row: QuestionRow): PracticeQuestion {
  if (row.type === "structure") {
    return {
      id: row.id,
      number: row.number,
      type: "structure",
      stem: row.payload.stem ?? "",
      options: (row.payload.options ?? []) as StructureQuestion["options"],
      correct: row.correct as StructureQuestion["correct"],
      explanation: row.explanation ?? undefined,
    };
  }
  return {
    id: row.id,
    number: row.number,
    type: "written-expression",
    fragments: (row.payload.fragments ??
      []) as WrittenExpressionQuestion["fragments"],
    correction: row.payload.correction,
    correct: row.correct as WrittenExpressionQuestion["correct"],
    explanation: row.explanation ?? undefined,
  };
}

/**
 * Loads a full question bank for a section, ordered by number.
 * Used mostly for admin/preview scenarios.
 */
export async function fetchQuestionsBySection(
  sectionId: SectionId
): Promise<PracticeQuestion[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("questions")
    .select("id, number, type, payload, correct, explanation")
    .eq("section_id", sectionId)
    .order("number");

  if (error || !data) return [];
  return (data as QuestionRow[]).map(hydrateQuestion);
}

/**
 * Pulls a randomized practice batch for the current user via the
 * `get_practice_batch` RPC. The RPC prioritises questions the user
 * has never seen and, after that, the ones they answered longest ago.
 */
export async function fetchPracticeBatch(
  sectionId: SectionId,
  size = 15
): Promise<PracticeQuestion[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_practice_batch", {
    p_section_id: sectionId,
    p_size: size,
  });

  if (error || !data) return [];
  return (data as QuestionRow[]).map(hydrateQuestion);
}
