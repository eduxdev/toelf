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
    .select(
      "id, name, short_description, long_description, time_limit_minutes, question_count, group_id"
    )
    .order("id");

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id as SectionId,
    name: row.name,
    shortDescription: row.short_description,
    longDescription: row.long_description ?? "",
    timeLimitMinutes: row.time_limit_minutes,
    questionCount: row.question_count,
    group: (row.group_id ?? "practice") as SectionMeta["group"],
    instructionKey: row.id as SectionMeta["instructionKey"],
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
  type: "structure" | "written-expression" | "identify";
  payload: {
    stem?: string;
    options?: { key: string; label: string }[];
    fragments?: { text: string; underlined?: string }[];
    correction?: string;
    prompt?: string;
    option_explanations?: Partial<Record<string, string>>;
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
      optionExplanations: (row.payload.option_explanations as
        Partial<Record<string, string>> | undefined) ?? undefined,
    };
  }
  if (row.type === "identify") {
    return {
      id: row.id,
      number: row.number,
      type: "identify",
      prompt: row.payload.prompt ?? "Encuentra la palabra correcta.",
      fragments: (row.payload.fragments ??
        []) as WrittenExpressionQuestion["fragments"],
      correct: row.correct as WrittenExpressionQuestion["correct"],
      explanation: row.explanation ?? undefined,
      optionExplanations: (row.payload.option_explanations as
        Partial<Record<string, string>> | undefined) ?? undefined,
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
    optionExplanations: (row.payload.option_explanations as
      Partial<Record<string, string>> | undefined) ?? undefined,
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


/**
 * Pulls a review batch: questions the user has answered incorrectly or left
 * blank at least once. Ordered by worst mastery first.
 */
export async function fetchReviewBatch(
  sectionId?: SectionId,
  size = 15
): Promise<PracticeQuestion[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("get_review_batch", {
    p_section_id: sectionId ?? null,
    p_size: size,
  });
  if (error || !data) return [];
  return (data as QuestionRow[]).map(hydrateQuestion);
}

/** Counts the number of questions currently pending review for the user. */
export async function fetchReviewPoolSize(
  sectionId?: SectionId
): Promise<number> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("count_review_pool", {
    p_section_id: sectionId ?? null,
  });
  if (error || typeof data !== "number") return 0;
  return data;
}
