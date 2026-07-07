import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthUser } from "@/lib/supabase/auth";
import type { OptionKey } from "@/lib/types/practice";

export interface ReportInput {
  questionId: string;
  reason: string;
  proposedCorrect?: OptionKey | null;
}

/**
 * Persists a user report for a question. Auth check is JWT-local via
 * getClaims(); RLS on the table enforces that a user can only insert
 * reports tied to their own profile.
 */
export async function insertQuestionReport(input: ReportInput): Promise<{
  id: string | null;
  error: string | null;
}> {
  const user = await getAuthUser();
  if (!user) return { id: null, error: "not-authenticated" };

  const reason = input.reason.trim();
  if (!reason) return { id: null, error: "empty-reason" };
  if (reason.length > 2000) return { id: null, error: "reason-too-long" };

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("question_reports")
    .insert({
      profile_id: user.id,
      question_id: input.questionId,
      reason,
      proposed_correct: input.proposedCorrect ?? null,
    })
    .select("id")
    .single();

  if (error || !data) return { id: null, error: error?.message ?? "unknown" };
  return { id: data.id as string, error: null };
}
