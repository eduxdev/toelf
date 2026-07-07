import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/shared/page-header";
import { TopicDetail } from "@/components/guide/topic-detail";
import { ButtonLink } from "@/components/ui/button-link";
import { getGuideTopic, GUIDE_TOPICS } from "@/lib/data/guide";

interface GuideTopicPageProps {
  params: Promise<{ topic: string }>;
}

export function generateStaticParams() {
  return GUIDE_TOPICS.map((topic) => ({ topic: topic.slug }));
}

export default async function GuideTopicPage({ params }: GuideTopicPageProps) {
  const { topic: slug } = await params;
  const topic = getGuideTopic(slug);
  if (!topic) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Guía"
        title={topic.title}
        description={topic.shortDescription}
        actions={
          <ButtonLink href="/guide" variant="outline" size="sm">
            <ArrowLeft />
            Todos los temas
          </ButtonLink>
        }
      />
      <div className="mx-auto max-w-4xl px-6 py-10">
        <TopicDetail topic={topic} />
      </div>
    </>
  );
}
