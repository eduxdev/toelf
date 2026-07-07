"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScoreBadge } from "@/components/shared/score-badge";
import { getSection } from "@/lib/data/sections";
import { formatDuration } from "@/lib/scoring";
import type { PracticeSessionSummary } from "@/lib/types/practice";

interface RecentSessionsProps {
  sessions: PracticeSessionSummary[];
}

export function RecentSessions({ sessions }: RecentSessionsProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between border-b border-border">
        <CardTitle className="font-heading">Historial de sesiones</CardTitle>
        <Button variant="outline" size="sm" render={<Link href="/practice" />}>
          Nueva práctica
          <ArrowRight />
        </Button>
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
              const section = getSection(session.sectionId);
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
