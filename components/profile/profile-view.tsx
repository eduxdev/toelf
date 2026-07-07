import { ProfileSummary } from "@/components/profile/profile-summary";
import { SectionStats } from "@/components/profile/section-stats";
import { RecentSessions } from "@/components/profile/recent-sessions";
import { ReviewCta } from "@/components/profile/review-cta";
import { fetchSections } from "@/lib/services/questions-service";
import {
  fetchProfileStats,
  fetchUserSessions,
} from "@/lib/services/sessions-service";

/**
 * Server component: pulls user profile, sessions and sections from Supabase
 * and composes the three profile blocks.
 */
export async function ProfileView() {
  const [profile, sessions, sections] = await Promise.all([
    fetchProfileStats(),
    fetchUserSessions(),
    fetchSections(),
  ]);

  return (
    <div className="space-y-6">
      <ProfileSummary
        fullName={profile.fullName ?? "Estudiante"}
        email={profile.email}
        goalScore={profile.goalScore}
        sessions={sessions}
      />
      <ReviewCta />
      <SectionStats sections={sections} sessions={sessions} />
      <RecentSessions sections={sections} sessions={sessions} />
    </div>
  );
}
