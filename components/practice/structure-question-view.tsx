"use client";

import { OptionItem } from "@/components/practice/option-item";
import type {
  OptionKey,
  StructureQuestion,
} from "@/lib/types/practice";

interface StructureQuestionViewProps {
  question: StructureQuestion;
  selected: OptionKey | null;
  reviewCorrect?: OptionKey;
  disabled?: boolean;
  onSelect: (key: OptionKey) => void;
}

/**
 * Renders a Structure question stem with a highlighted blank marker
 * and its four options.
 */
export function StructureQuestionView({
  question,
  selected,
  reviewCorrect,
  disabled,
  onSelect,
}: StructureQuestionViewProps) {
  const parts = question.stem.split("___");
  return (
    <div className="space-y-6">
      <p className="text-base leading-relaxed md:text-lg">
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 ? (
              <span className="mx-1 inline-block min-w-16 border-b-2 border-dashed border-foreground/40 align-baseline">
                {selected ? (
                  <span className="px-1 font-semibold">
                    {
                      question.options.find((o) => o.key === selected)?.label
                    }
                  </span>
                ) : (
                  <span className="px-1 text-muted-foreground">___</span>
                )}
              </span>
            ) : null}
          </span>
        ))}
      </p>
      <div className="grid gap-2 md:grid-cols-2">
        {question.options.map((option) => {
          let status: "idle" | "correct" | "incorrect" | "neutral" = "idle";
          if (reviewCorrect) {
            if (option.key === reviewCorrect) status = "correct";
            else if (option.key === selected) status = "incorrect";
            else status = "neutral";
          }
          return (
            <OptionItem
              key={option.key}
              optionKey={option.key}
              label={option.label}
              selected={selected === option.key}
              status={status}
              disabled={disabled}
              onSelect={onSelect}
            />
          );
        })}
      </div>
    </div>
  );
}
