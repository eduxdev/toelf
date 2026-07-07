import Link from "next/link";
import { ArrowRight, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-col items-start gap-6 md:max-w-3xl">
          <span className="inline-flex items-center gap-2 border border-border bg-secondary px-2 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            <Sparkle weight="fill" className="size-3" />
            Preparación TOEFL ITP · TESJo
          </span>
          <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
            Domina las secciones del TOEFL ITP con práctica dirigida.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Ejercicios reales de Structure y Written Expression, puntaje al
            momento y seguimiento de tu progreso. Todo en un solo lugar para
            que llegues listo al examen del TESJo.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" render={<Link href="/practice" />}>
              Empezar práctica
              <ArrowRight />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/profile" />}>
              Ver mi progreso
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
