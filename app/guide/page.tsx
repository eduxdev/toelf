import { PageHeader } from "@/components/shared/page-header";
import { TopicList } from "@/components/guide/topic-list";

export default function GuidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Guía"
        title="Referencia rápida para el TOEFL ITP"
        description="Reglas cortas, ejemplos y errores frecuentes. Consulta aquí cuando dudes durante la práctica."
      />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <TopicList />
      </div>
    </>
  );
}
