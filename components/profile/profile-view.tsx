"use client";

import { useEffect, useState } from "react";
import { ProfileSummary } from "@/components/profile/profile-summary";
import { SectionStats } from "@/components/profile/section-stats";
import { RecentSessions } from "@/components/profile/recent-sessions";
import { readSessions } from "@/lib/services/session-store";
import type { PracticeSessionSummary } from "@/lib/types/practice";

/**
 * Client wrapper that pulls sessions from localStorage and composes the
 * three profile blocks. Keeps the page file clean.
 */
export function ProfileView() {
  const [sessions, setSessions] = useState<PracticeSessionSummary[]>([]);

  useEffect(() => {
    setSessions(readSessions());
  }, []);

  return (
    <div className="space-y-6">
      <ProfileSummary sessions={sessions} />
      <SectionStats sessions={sessions} />
      <RecentSessions sessions={sessions} />
    </div>
  );
}
