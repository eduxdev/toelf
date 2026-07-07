"use client";

import type {
  PracticeSessionSummary,
  SectionId,
} from "@/lib/types/practice";

const STORAGE_KEY = "toelf:practice-sessions:v1";
const PROFILE_KEY = "toelf:profile:v1";

export interface LocalProfile {
  name: string;
  goalScore: number;
  createdAt: string;
}

export function readSessions(): PracticeSessionSummary[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PracticeSessionSummary[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveSession(session: PracticeSessionSummary): void {
  if (typeof window === "undefined") return;
  const sessions = readSessions();
  const next = [session, ...sessions].slice(0, 50);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function readSession(id: string): PracticeSessionSummary | null {
  return readSessions().find((s) => s.id === id) ?? null;
}

export function clearSessions(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}

export function readSessionsBySection(
  sectionId: SectionId
): PracticeSessionSummary[] {
  return readSessions().filter((s) => s.sectionId === sectionId);
}

export function readProfile(): LocalProfile {
  if (typeof window === "undefined") {
    return {
      name: "Estudiante TESJo",
      goalScore: 550,
      createdAt: new Date().toISOString(),
    };
  }
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (raw) return JSON.parse(raw) as LocalProfile;
  } catch {
    // fall through
  }
  const initial: LocalProfile = {
    name: "Estudiante TESJo",
    goalScore: 550,
    createdAt: new Date().toISOString(),
  };
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(initial));
  return initial;
}

export function saveProfile(profile: LocalProfile): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}
