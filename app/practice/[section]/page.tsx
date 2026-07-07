import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { PracticeRunner } from "@/components/practice/practice-runner";
import {
  fetchSection,
  fetchPracticeBatch,
} from "@/lib/services/questions-service";
import type { SectionId } from "@/lib/types/practice";

interface PracticeSectionPageProps {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ size?: string }>;
}

const DEFAULT_BATCH = 15;
const MIN_BATCH = 5;
const MAX_BATCH = 40;

function parseSize(raw: string | undefined): number {
  const parsed = Number.parseInt(raw ?? "", 10);
  if (Number.isNaN(parsed)) return DEFAULT_BATCH;
  return Math.min(MAX_BATCH, Math.max(MIN_BATCH, parsed));
}

export default async function PracticeSectionPage({
  params,
  searchParams,
}: PracticeSectionPageProps) {
  const [{ section: sectionParam }, resolvedSearch] = await Promise.all([
    params,
    searchParams,
  ]);
  const section = await fetchSection(sectionParam);
  if (!section) notFound();

  const size = parseSize(resolvedSearch.size);
  const questions = await fetchPracticeBatch(section.id as SectionId, size);

  return (
    <>
      <PageHeader
        eyebrow={`Sección · ${section.name}`}
        title={section.longDescription.split(".")[0] + "."}
        description={`${questions.length} preguntas de esta ronda · banco total: ${section.questionCount}.`}
      />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <PracticeRunner section={section} questions={questions} />
      </div>
    </>
  );
}
