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
