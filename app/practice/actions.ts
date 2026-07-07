"use server";

import { revalidatePath } from "next/cache";
import {
  insertPracticeSession,
  type InsertSessionInput,
} from "@/lib/services/sessions-service";

export interface SavePracticeResult {
  id: string | null;
  error: string | null;
}

/**
 * Persists a completed practice session for the authenticated user.
 * Called from the client PracticeRunner once the user finishes.
 */
export async function savePracticeSession(
  input: InsertSessionInput
): Promise<SavePracticeResult> {
  const result = await insertPracticeSession(input);
  if (result.id) {
    revalidatePath("/profile");
  }
  return result;
}


import { insertQuestionReport, type ReportInput } from "@/lib/services/reports-service";

export interface ReportPracticeResult {
  id: string | null;
  error: string | null;
}

/**
 * Persists a user report for a question that seems wrong.
 * Errors bubble up so the UI can show them.
 */
export async function reportPracticeQuestion(
  input: ReportInput
): Promise<ReportPracticeResult> {
  return insertQuestionReport(input);
}
