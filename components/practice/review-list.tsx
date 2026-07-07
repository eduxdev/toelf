"use client";

import { CheckCircle, XCircle, MinusCircle } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StructureQuestionView } from "@/components/practice/structure-question-view";
import { WrittenQuestionView } from "@/components/practice/written-question-view";
import { cn } from "@/lib/utils";
import type {
  OptionKey,
  PracticeQuestion,
  UserAnswer,
} from "@/lib/types/practice";

interface ReviewListProps {
  questions: PracticeQuestion[];
  answers: UserAnswer[];
}

/**
 * Shows every question of the session with the correct answer highlighted,
 * the user's selection and, when present, an explanation.
 */
export function ReviewList({ questions, answers }: ReviewListProps) {
  return (
    <div className="space-y-4">
      {questions.map((question, index) => {
        const answer = answers[index];
        const selected = (answer?.answer ?? null) as OptionKey | null;
        const isCorrect = answer?.isCorrect ?? false;
        const isBlank = !answer?.answer;

        return (
          <Card key={question.id} className="border-border">
            <CardHeader className="flex flex-row items-center justify-between border-b border-border">
              <CardTitle className="flex items-center gap-2 font-mono text-sm">
                <span className="grid size-6 place-items-center border border-border bg-secondary">
                  {index + 1}
                </span>
                <StatusPill
                  status={isBlank ? "blank" : isCorrect ? "correct" : "wrong"}
                />
              </CardTitle>
              <span className="text-[11px] font-mono text-muted-foreground">
                Correcta: {question.correct}
              </span>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {question.type === "structure" ? (
                <StructureQuestionView
                  question={question}
                  selected={selected}
                  reviewCorrect={question.correct}
                  disabled
                  onSelect={() => {}}
                />
              ) : (
                <WrittenQuestionView
                  question={question}
                  selected={selected}
                  reviewCorrect={question.correct}
                  disabled
                  onSelect={() => {}}
                />
              )}
              {question.type === "written-expression" && question.correction ? (
                <p className="border border-border bg-secondary/60 px-3 py-2 text-xs">
                  <span className="font-semibold">Corrección:</span>{" "}
                  {question.correction}
                </p>
              ) : null}
              {question.explanation ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {question.explanation}
                </p>
              ) : null}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function StatusPill({ status }: { status: "correct" | "wrong" | "blank" }) {
  const config = {
    correct: {
      icon: <CheckCircle weight="fill" className="size-3.5 text-emerald-500" />,
      label: "Correcta",
      tone: "border-emerald-500/40 text-emerald-700 dark:text-emerald-300",
    },
    wrong: {
      icon: <XCircle weight="fill" className="size-3.5 text-destructive" />,
      label: "Incorrecta",
      tone: "border-destructive/40 text-destructive",
    },
    blank: {
      icon: <MinusCircle weight="fill" className="size-3.5" />,
      label: "En blanco",
      tone: "border-border text-muted-foreground",
    },
  }[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border px-1.5 py-0.5 text-[11px]",
        config.tone
      )}
    >
      {config.icon}
      {config.label}
    </span>
  );
}
