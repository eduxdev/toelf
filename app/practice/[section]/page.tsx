import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { PracticeRunner } from "@/components/practice/practice-runner";
import {
  fetchSection,
  fetchQuestionsBySection,
} from "@/lib/services/questions-service";
import type { SectionId } from "@/lib/types/practice";

interface PracticeSectionPageProps {
  params: Promise<{ section: string }>;
}

export default async function PracticeSectionPage({
  params,
}: PracticeSectionPageProps) {
  const { section: sectionParam } = await params;
  const section = await fetchSection(sectionParam);
  if (!section) notFound();

  const questions = await fetchQuestionsBySection(section.id as SectionId);

  return (
    <>
      <PageHeader
        eyebrow={`Sección · ${section.name}`}
        title={section.longDescription.split(".")[0] + "."}
        description={`${questions.length} preguntas · ${section.timeLimitMinutes} minutos sugeridos.`}
      />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <PracticeRunner section={section} questions={questions} />
      </div>
    </>
  );
}
