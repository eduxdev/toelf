import { fetchSections } from "@/lib/services/questions-service";
import { SectionCard } from "@/components/home/section-card";

export async function SectionsGrid() {
  const sections = await fetchSections();
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Secciones disponibles
          </p>
          <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
            Elige por dónde empezar
          </h2>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>
    </section>
  );
}
