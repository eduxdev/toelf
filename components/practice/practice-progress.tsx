"use client";

import { Progress } from "@/components/ui/progress";

interface PracticeProgressProps {
  current: number;
  total: number;
  answered: number;
}

export function PracticeProgress({
  current,
  total,
  answered,
}: PracticeProgressProps) {
  const percent = total > 0 ? Math.round(((current + 1) / total) * 100) : 0;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Pregunta {current + 1} de {total}
        </span>
        <span>{answered} contestadas</span>
      </div>
      <Progress value={percent} className="h-1.5" />
    </div>
  );
}
