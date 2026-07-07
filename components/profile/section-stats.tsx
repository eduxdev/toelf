"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SECTIONS } from "@/lib/data/sections";
import type { PracticeSessionSummary } from "@/lib/types/practice";

interface SectionStatsProps {
  sessions: PracticeSessionSummary[];
}

/**
 * Aggregate stats per section (attempts, average and best scores).
 */
export function SectionStats({ sessions }: SectionStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {SECTIONS.map((section) => {
        const sectionSessions = sessions.filter(
          (s) => s.sectionId === section.id
        );
        const attempts = sectionSessions.length;
        const best = sectionSessions.reduce(
          (max, s) => Math.max(max, s.scorePercent),
          0
        );
        const average = attempts
          ? Math.round(
              sectionSessions.reduce((acc, s) => acc + s.scorePercent, 0) /
                attempts
            )
          : 0;

        return (
          <Card key={section.id}>
            <CardContent className="space-y-4 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {section.shortDescription}
                  </p>
                  <h3 className="font-heading text-lg font-semibold tracking-tight">
                    {section.name}
                  </h3>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {attempts} sesiones
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Promedio</span>
                  <span className="font-mono font-semibold">{average}%</span>
                </div>
                <Progress value={average} className="h-1.5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Mejor puntaje</span>
                  <span className="font-mono font-semibold">{best}%</span>
                </div>
                <Progress value={best} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
