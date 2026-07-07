import {
  Timer,
  Target,
  ChartBar,
  Books,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Books,
    title: "Preguntas reales",
    description:
      "Banco tomado del material usando recientemente, listo para practicar.",
    tone: "bg-warm text-warm-foreground border-warm-foreground/20",
  },
  {
    icon: Timer,
    title: "Modo cronómetro",
    description:
      "Simula la presión del examen midiendo tu ritmo por sección.",
    tone: "bg-sage text-sage-foreground border-sage-foreground/20",
  },
  {
    icon: Target,
    title: "Puntaje instantáneo",
    description:
      "Descubre tu porcentaje y aproximado ITP al terminar cada práctica.",
    tone: "bg-warm text-warm-foreground border-warm-foreground/20",
  },
  {
    icon: ChartBar,
    title: "Historial completo",
    description:
      "Revisa tus sesiones pasadas para identificar áreas por mejorar.",
    tone: "bg-sage text-sage-foreground border-sage-foreground/20",
  },
];

export function FeaturesStrip() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 py-14 md:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="space-y-2">
            <span
              className={cn(
                "grid size-9 place-items-center border",
                feature.tone
              )}
            >
              <feature.icon weight="regular" className="size-5" />
            </span>
            <h3 className="font-heading text-sm font-semibold tracking-tight">
              {feature.title}
            </h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
