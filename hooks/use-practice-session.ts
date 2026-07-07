"use client";

import { useMemo, useState, useCallback } from "react";
import type {
  OptionKey,
  PracticeQuestion,
  UserAnswer,
} from "@/lib/types/practice";
import { computeAnswers } from "@/lib/scoring";

export interface PracticeSessionState {
  index: number;
  question: PracticeQuestion;
  answers: Record<string, OptionKey | null>;
  answeredCount: number;
  progressPercent: number;
  isFirst: boolean;
  isLast: boolean;
  finished: boolean;
  results: UserAnswer[] | null;
  select: (key: OptionKey) => void;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  finish: () => UserAnswer[];
  reset: () => void;
}

/**
 * Orchestrates a full practice session: current index, selected answers,
 * navigation and final scoring.
 */
export function usePracticeSession(
  questions: PracticeQuestion[]
): PracticeSessionState {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, OptionKey | null>>({});
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState<UserAnswer[] | null>(null);

  const question = questions[index];
  const answeredCount = useMemo(
    () => Object.values(answers).filter(Boolean).length,
    [answers]
  );
  const progressPercent = questions.length
    ? Math.round(((index + 1) / questions.length) * 100)
    : 0;

  const select = useCallback(
    (key: OptionKey) => {
      setAnswers((prev) => ({ ...prev, [question.id]: key }));
    },
    [question]
  );

  const next = useCallback(() => {
    setIndex((i) => Math.min(i + 1, questions.length - 1));
  }, [questions.length]);

  const prev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setIndex(Math.min(Math.max(i, 0), questions.length - 1));
    },
    [questions.length]
  );

  const finish = useCallback(() => {
    const evaluated = computeAnswers(questions, answers);
    setResults(evaluated);
    setFinished(true);
    return evaluated;
  }, [questions, answers]);

  const reset = useCallback(() => {
    setIndex(0);
    setAnswers({});
    setFinished(false);
    setResults(null);
  }, []);

  return {
    index,
    question,
    answers,
    answeredCount,
    progressPercent,
    isFirst: index === 0,
    isLast: index === questions.length - 1,
    finished,
    results,
    select,
    next,
    prev,
    goTo,
    finish,
    reset,
  };
}
