"use client";

import { CheckCircle, XCircle, MinusCircle } from "@phosphor-icons/react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScoreBadge } from "@/components/shared/score-badge";
import type {
  PracticeQuestion,
  UserAnswer,
} from "@/lib/types/practice";
import { formatDuration, toItpSectionScore } from "@/lib/scoring";

interface PracticeSummaryProps {
  sectionName: string;
  questions: PracticeQuestion[];
  answers: UserAnswer[];
  durationSeconds: number;
}

export function PracticeSummary({
  sectionName,
  questions,
  answers,
  durationSeconds,
}: PracticeSummaryProps) {
  const total = questions.length;
  const correct = answers.filter((a) => a.isCorrect).length;
  const wrong = answers.filter((a) => a.answer && !a.isCorrect).length;
  const blank = answers.filter((a) => !a.answer).length;
  const scorePercent = total ? Math.round((correct / total) * 100) : 0;
  const itp = toItpSectionScore(correct, total);

  return (
    <Card>
      <CardContent className="grid gap-6 py-6 md:grid-cols-4">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Sección
          </p>
          <p className="font-heading text-lg font-semibold tracking-tight">
            {sectionName}
          </p>
          <p className="text-xs text-muted-foreground">
            Tiempo: {formatDuration(durationSeconds)}
          </p>
        </div>
        <div className="flex items-center gap-4 md:col-span-3 md:justify-end">
          <Stat
            icon={<CheckCircle weight="fill" className="size-4 text-emerald-500" />}
            label="Correctas"
            value={correct}
          />
          <Separator orientation="vertical" className="h-8" />
          <Stat
            icon={<XCircle weight="fill" className="size-4 text-destructive" />}
            label="Incorrectas"
            value={wrong}
          />
          <Separator orientation="vertical" className="h-8" />
          <Stat
            icon={<MinusCircle weight="fill" className="size-4 text-muted-foreground" />}
            label="En blanco"
            value={blank}
          />
          <Separator orientation="vertical" className="h-8" />
          <div className="text-right">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Puntaje
            </p>
            <div className="flex items-center gap-2">
              <ScoreBadge score={scorePercent} />
              <span className="font-mono text-xs text-muted-foreground">
                ITP ≈ {itp}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-1 text-xs font-medium">
        {icon}
        {label}
      </div>
      <p className="font-heading text-2xl font-semibold">{value}</p>
    </div>
  );
}
