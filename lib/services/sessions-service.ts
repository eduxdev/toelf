import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  PracticeSessionSummary,
  SectionId,
  UserAnswer,
} from "@/lib/types/practice";

export interface InsertSessionInput {
  sectionId: SectionId;
  totalQuestions: number;
  correctAnswers: number;
  scorePercent: number;
  durationSeconds: number;
  answers: UserAnswer[];
}

/**
 * Persists a completed practice session and its per-question answers.
 * Requires an authenticated user.
 */
export async function insertPracticeSession(
  input: InsertSessionInput
): Promise<{ id: string | null; error: string | null }> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { id: null, error: "not-authenticated" };

  const { data, error } = await supabase
    .from("practice_sessions")
    .insert({
      profile_id: user.id,
      section_id: input.sectionId,
      total_questions: input.totalQuestions,
      correct_answers: input.correctAnswers,
      score_percent: input.scorePercent,
      duration_seconds: input.durationSeconds,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { id: null, error: error?.message ?? "unknown" };
  }

  const rows = input.answers
    .filter((a) => a.answer !== null || a.answer === null)
    .map((a) => ({
      session_id: data.id,
      question_id: a.questionId,
      answer: a.answer,
      is_correct: a.isCorrect,
    }));

  if (rows.length > 0) {
    await supabase.from("session_answers").insert(rows);
  }

  return { id: data.id as string, error: null };
}

/**
 * Retrieves the most recent sessions for the signed-in user.
 */
export async function fetchUserSessions(
  limit = 25
): Promise<PracticeSessionSummary[]> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("practice_sessions")
    .select(
      "id, section_id, total_questions, correct_answers, score_percent, duration_seconds, completed_at"
    )
    .eq("profile_id", user.id)
    .order("completed_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    sectionId: row.section_id as SectionId,
    totalQuestions: row.total_questions,
    correctAnswers: row.correct_answers,
    scorePercent: row.score_percent,
    durationSeconds: row.duration_seconds,
    completedAt: row.completed_at,
    answers: [],
  }));
}

/** Total counts to display on the profile summary. */
export async function fetchProfileStats() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { fullName: null, email: null, goalScore: 550 };
  }

  const { data } = await supabase
    .from("profiles")
    .select("full_name, goal_score")
    .eq("id", user.id)
    .maybeSingle();

  return {
    fullName: data?.full_name ?? user.email ?? "Estudiante",
    email: user.email ?? null,
    goalScore: data?.goal_score ?? 550,
  };
}
