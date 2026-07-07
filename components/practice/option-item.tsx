"use client";

import { cn } from "@/lib/utils";
import type { OptionKey } from "@/lib/types/practice";

interface OptionItemProps {
  optionKey: OptionKey;
  label: string;
  selected: boolean;
  status?: "idle" | "correct" | "incorrect" | "neutral";
  disabled?: boolean;
  onSelect?: (key: OptionKey) => void;
}

/**
 * A large clickable answer option with letter indicator (A, B, C, D).
 * Supports review states (correct / incorrect / neutral) for the results view.
 */
export function OptionItem({
  optionKey,
  label,
  selected,
  status = "idle",
  disabled = false,
  onSelect,
}: OptionItemProps) {
  const stateClass =
    status === "correct"
      ? "border-emerald-500/60 bg-emerald-500/10 text-foreground"
      : status === "incorrect"
      ? "border-destructive/60 bg-destructive/10 text-foreground"
      : selected
      ? "border-foreground bg-foreground/[0.04]"
      : "border-border bg-background hover:bg-muted";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect?.(optionKey)}
      className={cn(
        "group flex w-full items-start gap-3 border p-3 text-left text-sm transition-colors",
        "focus-visible:outline focus-visible:outline-1 focus-visible:outline-ring",
        stateClass,
        disabled && "cursor-not-allowed opacity-80"
      )}
      aria-pressed={selected}
    >
      <span
        className={cn(
          "grid size-6 shrink-0 place-items-center border font-mono text-xs font-semibold",
          selected || status !== "idle"
            ? "border-foreground bg-foreground text-background"
            : "border-border bg-secondary text-foreground"
        )}
      >
        {optionKey}
      </span>
      <span className="flex-1 leading-relaxed">{label}</span>
    </button>
  );
}
