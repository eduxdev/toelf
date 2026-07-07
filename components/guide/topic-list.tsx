import { GUIDE_TOPICS } from "@/lib/data/guide";
import { TopicCard } from "@/components/guide/topic-card";

const CATEGORY_ORDER: Array<{
  id: "grammar" | "usage" | "structure";
  title: string;
  description: string;
}> = [
  {
    id: "grammar",
    title: "Gramática",
    description: "Reglas base: artículos, modales, superlativos, formas.",
  },
  {
    id: "usage",
    title: "Uso",
    description: "Palabras que te confunden en el examen: only, by, conectores.",
  },
  {
    id: "structure",
    title: "Estructura",
    description: "Orden, inversión y paralelismo.",
  },
];

export function TopicList() {
  return (
    <div className="space-y-10">
      {CATEGORY_ORDER.map((category) => {
        const topics = GUIDE_TOPICS.filter((t) => t.category === category.id);
        if (topics.length === 0) return null;
        return (
          <section key={category.id} className="space-y-4">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                {category.title}
              </p>
              <h2 className="font-heading text-2xl font-semibold tracking-tight">
                {category.description}
              </h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {topics.map((topic) => (
                <TopicCard key={topic.slug} topic={topic} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
