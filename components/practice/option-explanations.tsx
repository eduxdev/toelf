import { cn } from "@/lib/utils";
import type { OptionKey } from "@/lib/types/practice";

interface OptionExplanationsProps {
  explanations: Partial<Record<OptionKey, string>>;
  correct: OptionKey;
  selected: OptionKey | null;
}

/**
 * Displays per-option feedback after a review. Highlights:
 * - The correct option in green
 * - The user's wrong answer in red (if they picked incorrectly)
 * - All others in neutral
 */
export function OptionExplanations({
  explanations,
  correct,
  selected,
}: OptionExplanationsProps) {
  const keys: OptionKey[] = ["A", "B", "C", "D"];
  const hasContent = keys.some((k) => explanations[k]);
  if (!hasContent) return null;

  return (
    <div className="space-y-1.5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Por qué cada opción
      </p>
      {keys.map((key) => {
        const text = explanations[key];
        if (!text) return null;

        const isCorrect = key === correct;
        const isWrong = key === selected && !isCorrect;

        return (
          <div
            key={key}
            className={cn(
              "flex gap-2.5 border px-3 py-2 text-xs leading-relaxed",
              isCorrect
                ? "border-emerald-500/30 bg-emerald-500/5 text-emerald-800 dark:text-emerald-300"
                : isWrong
                ? "border-destructive/30 bg-destructive/5 text-destructive"
                : "border-border bg-secondary/40 text-muted-foreground"
            )}
          >
            <span
              className={cn(
                "mt-0.5 grid size-4 shrink-0 place-items-center border font-mono text-[10px] font-semibold",
                isCorrect
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : isWrong
                  ? "border-destructive bg-destructive text-white"
                  : "border-border bg-background text-foreground"
              )}
            >
              {key}
            </span>
            <span>{text}</span>
          </div>
        );
      })}
    </div>
  );
}
