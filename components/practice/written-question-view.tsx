"use client";

import { cn } from "@/lib/utils";
import type {
  OptionKey,
  WrittenExpressionQuestion,
} from "@/lib/types/practice";

interface WrittenQuestionViewProps {
  question: WrittenExpressionQuestion;
  selected: OptionKey | null;
  reviewCorrect?: OptionKey;
  disabled?: boolean;
  onSelect: (key: OptionKey) => void;
}

/**
 * Renders the sentence with the four underlined choices as inline
 * clickable segments (A, B, C, D).
 */
export function WrittenQuestionView({
  question,
  selected,
  reviewCorrect,
  disabled,
  onSelect,
}: WrittenQuestionViewProps) {
  return (
    <div className="space-y-6">
      <p className="text-base leading-loose md:text-lg">
        {question.fragments.map((fragment, index) => {
          if (!fragment.underlined) {
            return <span key={index}>{fragment.text}</span>;
          }
          const key = fragment.underlined;
          const isSelected = selected === key;
          const isCorrect = reviewCorrect === key;
          const isWrong = reviewCorrect && isSelected && !isCorrect;
          const stateClass = reviewCorrect
            ? isCorrect
              ? "border-emerald-500/70 bg-emerald-500/10"
              : isWrong
              ? "border-destructive/70 bg-destructive/10"
              : "border-border"
            : isSelected
            ? "border-foreground bg-foreground/5"
            : "border-border hover:bg-muted";
          return (
            <button
              key={index}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(key)}
              className={cn(
                "mx-0.5 inline-flex items-baseline gap-1 border-b px-1 py-0.5 align-baseline transition-colors",
                "focus-visible:outline focus-visible:outline-1 focus-visible:outline-ring",
                stateClass,
                disabled && "cursor-not-allowed"
              )}
            >
              <span>{fragment.text}</span>
              <span
                className={cn(
                  "grid size-4 place-items-center border font-mono text-[10px] font-semibold",
                  isSelected || isCorrect
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-secondary"
                )}
              >
                {key}
              </span>
            </button>
          );
        })}
      </p>
      <p className="text-xs text-muted-foreground">
        Toca la sección subrayada que debe corregirse.
      </p>
    </div>
  );
}
