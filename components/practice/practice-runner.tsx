"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Flag,
  ArrowsClockwise,
  ListMagnifyingGlass,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PracticeInstructions } from "@/components/practice/practice-instructions";
import { PracticeProgress } from "@/components/practice/practice-progress";
import { PracticeTimer } from "@/components/practice/practice-timer";
import { PracticeNavigator } from "@/components/practice/practice-navigator";
import { StructureQuestionView } from "@/components/practice/structure-question-view";
import { WrittenQuestionView } from "@/components/practice/written-question-view";
import { PracticeSummary } from "@/components/practice/practice-summary";
import { ReviewList } from "@/components/practice/review-list";
import { usePracticeSession } from "@/hooks/use-practice-session";
import { usePracticeTimer } from "@/hooks/use-practice-timer";
import { savePracticeSession } from "@/app/practice/actions";
import type {
  PracticeQuestion,
  SectionMeta,
} from "@/lib/types/practice";

interface PracticeRunnerProps {
  section: SectionMeta;
  questions: PracticeQuestion[];
}

/**
 * Client-side orchestrator: renders the correct question view, handles
 * navigation, timing and stores the final session locally.
 */
export function PracticeRunner({ section, questions }: PracticeRunnerProps) {
  const session = usePracticeSession(questions);
  const elapsed = usePracticeTimer(!session.finished);
  const [savedDuration, setSavedDuration] = useState<number>(0);
  const [isSaving, startSaving] = useTransition();

  const currentAnswer = session.answers[session.question.id] ?? null;

  const finishPractice = () => {
    const evaluated = session.finish();
    const correct = evaluated.filter((a) => a.isCorrect).length;
    const duration = elapsed;
    setSavedDuration(duration);

    startSaving(async () => {
      const result = await savePracticeSession({
        sectionId: section.id,
        totalQuestions: questions.length,
        correctAnswers: correct,
        scorePercent: questions.length
          ? Math.round((correct / questions.length) * 100)
          : 0,
        durationSeconds: duration,
        answers: evaluated,
      });
      if (result.error) {
        toast.error("No se pudo guardar la sesión", {
          description: result.error,
        });
      } else {
        toast.success("Sesión guardada en tu perfil");
      }
    });
  };

  const restart = () => {
    session.reset();
    setSavedDuration(0);
  };

  const answeredIds = useMemo(
    () => Object.values(session.answers).filter(Boolean).length,
    [session.answers]
  );

  if (session.finished && session.results) {
    return (
      <div className="space-y-6">
        <PracticeSummary
          sectionName={section.name}
          questions={questions}
          answers={session.results}
          durationSeconds={savedDuration || elapsed}
        />
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={restart} disabled={isSaving}>
            <ArrowsClockwise />
            Volver a practicar
          </Button>
          <ButtonLink href="/practice" variant="outline">
            Otras secciones
          </ButtonLink>
          <ButtonLink href="/profile" variant="ghost">
            <ListMagnifyingGlass />
            Ver historial
          </ButtonLink>
        </div>
        <ReviewList questions={questions} answers={session.results} />
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
      <div className="space-y-4">
        <PracticeInstructions instructionKey={section.instructionKey} />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between border-b border-border">
            <CardTitle className="flex items-center gap-2 font-mono text-sm">
              <Badge variant="outline" className="font-mono">
                #{session.index + 1}
              </Badge>
              <span className="uppercase tracking-widest text-[11px] text-muted-foreground">
                {section.name}
              </span>
            </CardTitle>
            <PracticeTimer seconds={elapsed} />
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {session.question.type === "structure" ? (
              <StructureQuestionView
                question={session.question}
                selected={currentAnswer}
                onSelect={session.select}
              />
            ) : (
              <WrittenQuestionView
                question={session.question}
                selected={currentAnswer}
                onSelect={session.select}
              />
            )}
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={session.isFirst}
              onClick={session.prev}
            >
              <ArrowLeft />
              Anterior
            </Button>
            {session.isLast ? (
              <Button onClick={finishPractice}>
                <Flag />
                Terminar y calificar
              </Button>
            ) : (
              <Button onClick={session.next}>
                Siguiente
                <ArrowRight />
              </Button>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {answeredIds}/{questions.length} contestadas
          </span>
        </div>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <PracticeProgress
          current={session.index}
          total={questions.length}
          answered={session.answeredCount}
        />
        <PracticeNavigator
          questions={questions}
          answers={session.answers}
          currentIndex={session.index}
          onSelect={session.goTo}
        />
        <Button
          variant="secondary"
          className="w-full"
          onClick={finishPractice}
          disabled={session.answeredCount === 0}
        >
          <Flag />
          Terminar y calificar
        </Button>
      </aside>
    </div>
  );
}
