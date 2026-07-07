"use client";

import { cn } from "@/lib/utils";
import type { OptionKey, PracticeQuestion } from "@/lib/types/practice";

interface PracticeNavigatorProps {
  questions: PracticeQuestion[];
  answers: Record<string, OptionKey | null>;
  currentIndex: number;
  onSelect: (index: number) => void;
}

/**
 * Compact grid of question indices, with visual state for answered vs current.
 */
export function PracticeNavigator({
  questions,
  answers,
  currentIndex,
  onSelect,
}: PracticeNavigatorProps) {
  return (
    <div className="space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Preguntas
      </p>
      <div className="grid grid-cols-5 gap-1.5 md:grid-cols-6 lg:grid-cols-5">
        {questions.map((question, index) => {
          const answered = Boolean(answers[question.id]);
          const isCurrent = index === currentIndex;
          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onSelect(index)}
              className={cn(
                "grid size-8 place-items-center border font-mono text-xs transition-colors",
                isCurrent
                  ? "border-foreground bg-foreground text-background"
                  : answered
                  ? "border-foreground/40 bg-foreground/5"
                  : "border-border bg-background hover:bg-muted"
              )}
              aria-label={`Ir a la pregunta ${index + 1}`}
              aria-current={isCurrent ? "true" : "false"}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
