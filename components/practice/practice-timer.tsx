"use client";

import { Timer } from "@phosphor-icons/react";
import { formatDuration } from "@/lib/scoring";

interface PracticeTimerProps {
  seconds: number;
}

export function PracticeTimer({ seconds }: PracticeTimerProps) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-border bg-secondary px-2 py-1 font-mono text-xs">
      <Timer weight="regular" className="size-3.5" />
      {formatDuration(seconds)}
    </span>
  );
}
