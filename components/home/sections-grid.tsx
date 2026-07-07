import { fetchSections } from "@/lib/services/questions-service";
import { SectionCard } from "@/components/home/section-card";
import type { SectionGroup, SectionMeta } from "@/lib/types/practice";

const GROUP_ORDER: Array<{
  id: SectionGroup;
  eyebrow: string;
  title: string;
  description: string;
}> = [
  {
    id: "exam",
    eyebrow: "Formato del examen",
    title: "Practica como si fuera el examen",
    description:
      "Las dos secciones que aparecen tal cual en el TOEFL ITP. Empieza aquí para simular el examen real.",
  },
  {
    id: "practice",
    eyebrow: "Refuerzo",
    title: "Fortalece los fundamentos",
    description:
      "Ejercicios dirigidos para identificar piezas gramaticales y dominar tiempos y verbos antes de volver al examen.",
  },
];

function groupSections(sections: SectionMeta[]): Record<
  SectionGroup,
  SectionMeta[]
> {
  return sections.reduce(
    (acc, section) => {
      acc[section.group] = acc[section.group] ?? [];
      acc[section.group].push(section);
      return acc;
    },
    { exam: [], practice: [] } as Record<SectionGroup, SectionMeta[]>
  );
}

export async function SectionsGrid() {
  const sections = await fetchSections();
  const grouped = groupSections(sections);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="space-y-14">
        {GROUP_ORDER.map((group) => {
          const items = grouped[group.id] ?? [];
          if (items.length === 0) return null;
          return (
            <div key={group.id} className="space-y-6">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {group.eyebrow}
                </p>
                <h2 className="font-heading text-2xl font-semibold tracking-tight md:text-3xl">
                  {group.title}
                </h2>
                <p className="max-w-2xl text-sm text-muted-foreground">
                  {group.description}
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {items.map((section) => (
                  <SectionCard key={section.id} section={section} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
