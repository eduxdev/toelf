import Link from "next/link";
import { ArrowRight, ArrowsClockwise } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/shared/page-header";
import { PracticeRunner } from "@/components/practice/practice-runner";
import { ButtonLink } from "@/components/ui/button-link";
import { Card, CardContent } from "@/components/ui/card";
import {
  fetchReviewBatch,
  fetchReviewPoolSize,
  fetchSection,
  fetchSections,
} from "@/lib/services/questions-service";
import type { SectionId, SectionMeta } from "@/lib/types/practice";

interface ReviewPageProps {
  searchParams: Promise<{ section?: string; size?: string }>;
}

const DEFAULT_BATCH = 15;
const MIN_BATCH = 5;
const MAX_BATCH = 40;

function parseSize(raw: string | undefined): number {
  const parsed = Number.parseInt(raw ?? "", 10);
  if (Number.isNaN(parsed)) return DEFAULT_BATCH;
  return Math.min(MAX_BATCH, Math.max(MIN_BATCH, parsed));
}

export default async function ReviewPage({ searchParams }: ReviewPageProps) {
  const { section: sectionParam, size: sizeParam } = await searchParams;
  const sectionId = (sectionParam as SectionId | undefined) ?? undefined;
  const size = parseSize(sizeParam);

  const [poolSize, sections, questions] = await Promise.all([
    fetchReviewPoolSize(sectionId),
    fetchSections(),
    fetchReviewBatch(sectionId, size),
  ]);

  const currentSection: SectionMeta = sectionId
    ? (await fetchSection(sectionId)) ??
      buildReviewFallbackSection(sectionId, sections)
    : buildReviewFallbackSection(null, sections);

  return (
    <>
      <PageHeader
        eyebrow="Repaso"
        title="Vuelve sobre lo que has fallado"
        description={`${questions.length} preguntas en esta ronda · ${poolSize} pendientes por dominar en tu buzón.`}
        actions={
          poolSize > 0 ? (
            <ButtonLink href="/practice" variant="outline" size="sm">
              Nueva práctica
              <ArrowRight />
            </ButtonLink>
          ) : null
        }
      />
      <div className="mx-auto max-w-6xl px-6 py-10">
        {questions.length === 0 ? (
          <EmptyReviewState />
        ) : (
          <div className="space-y-4">
            <SectionSelector sections={sections} activeSection={sectionId} />
            <PracticeRunner
              section={currentSection}
              questions={questions}
              reviewMode
            />
          </div>
        )}
      </div>
    </>
  );
}

function buildReviewFallbackSection(
  sectionId: SectionId | null,
  sections: SectionMeta[]
): SectionMeta {
  if (sectionId) {
    const found = sections.find((s) => s.id === sectionId);
    if (found) return found;
  }
  return {
    id: "structure",
    name: "Repaso general",
    shortDescription: "Preguntas por dominar",
    longDescription:
      "Mezcla de preguntas que has fallado o dejado en blanco. Prioridad al peor puntaje.",
    timeLimitMinutes: 15,
    questionCount: sections.reduce((acc, s) => acc + s.questionCount, 0),
    group: "practice",
    instructionKey: "structure",
  };
}

function SectionSelector({
  sections,
  activeSection,
}: {
  sections: SectionMeta[];
  activeSection: SectionId | undefined;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-muted-foreground">Filtrar:</span>
      <ButtonLink
        href="/practice/review"
        variant={!activeSection ? "default" : "outline"}
        size="xs"
      >
        Todas
      </ButtonLink>
      {sections.map((section) => (
        <ButtonLink
          key={section.id}
          href={`/practice/review?section=${section.id}`}
          variant={activeSection === section.id ? "default" : "outline"}
          size="xs"
        >
          {section.name}
        </ButtonLink>
      ))}
    </div>
  );
}

function EmptyReviewState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
        <span className="grid size-12 place-items-center border border-border bg-secondary">
          <ArrowsClockwise weight="regular" className="size-6" />
        </span>
        <div className="space-y-1">
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Aún no hay nada por repasar
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Cuando falles o dejes preguntas en blanco durante una sesión
            regular, aparecerán aquí para dominarlas.
          </p>
        </div>
        <ButtonLink href="/practice">
          Ir a practicar
          <ArrowRight />
        </ButtonLink>
      </CardContent>
    </Card>
  );
}
