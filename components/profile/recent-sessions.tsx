import { ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";
import { Separator } from "@/components/ui/separator";
import { ScoreBadge } from "@/components/shared/score-badge";
import { formatDuration } from "@/lib/scoring";
import type {
  PracticeSessionSummary,
  SectionMeta,
} from "@/lib/types/practice";

interface RecentSessionsProps {
  sections: SectionMeta[];
  sessions: PracticeSessionSummary[];
}

export function RecentSessions({ sections, sessions }: RecentSessionsProps) {
  const sectionMap = new Map(sections.map((s) => [s.id, s]));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between border-b border-border">
        <CardTitle className="font-heading">Historial de sesiones</CardTitle>
        <ButtonLink href="/practice" variant="outline" size="sm">
          Nueva práctica
          <ArrowRight />
        </ButtonLink>
      </CardHeader>
      <CardContent className="p-0">
        {sessions.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">
            Aún no tienes sesiones registradas. Empieza una para ver tu
            progreso aquí.
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {sessions.map((session) => {
              const section = sectionMap.get(session.sectionId);
              const date = new Date(session.completedAt);
              return (
                <li
                  key={session.id}
                  className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <ScoreBadge score={session.scorePercent} />
                    <div>
                      <p className="font-medium">
                        {section?.name ?? session.sectionId}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {session.correctAnswers}/{session.totalQuestions}{" "}
                        correctas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 font-mono">
                      <Clock weight="regular" className="size-3.5" />
                      {formatDuration(session.durationSeconds)}
                    </span>
                    <Separator orientation="vertical" className="h-4" />
                    <span className="font-mono">
                      {date.toLocaleDateString("es-MX", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
