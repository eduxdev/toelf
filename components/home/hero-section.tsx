import { ArrowRight} from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/button-link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-col items-start gap-6 md:max-w-3xl">
         
          <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
            Domina las secciones del TOEFL ITP con práctica dirigida.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Ejercicios reales de Structure y Written Expression, puntaje al
            momento y seguimiento de tu progreso. Todo en un solo lugar para
            que llegues listo al examen del TESJo.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/practice" size="lg">
              Empezar práctica
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href="/profile" size="lg" variant="outline">
              Ver mi progreso
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
