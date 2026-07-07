import { ArrowRight, ArrowsClockwise } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";
import { fetchReviewPoolSize } from "@/lib/services/questions-service";

/**
 * Server card that shows how many questions are pending review and
 * links to the review practice flow. Hidden when nothing to review.
 */
export async function ReviewCta() {
  const pool = await fetchReviewPoolSize();
  if (pool === 0) return null;

  return (
    <Card className="border-warm-foreground/20 bg-warm">
      <CardContent className="flex flex-col items-start gap-4 py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid size-10 place-items-center border border-warm-foreground/30 bg-background text-warm-foreground">
            <ArrowsClockwise weight="regular" className="size-5" />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-warm-foreground/80">
              Repaso pendiente
            </p>
            <h3 className="font-heading text-lg font-semibold tracking-tight text-warm-foreground">
              Tienes {pool} pregunta{pool === 1 ? "" : "s"} por dominar
            </h3>
            <p className="text-xs text-warm-foreground/80">
              Toca las que has fallado antes, priorizando las que peor te van.
            </p>
          </div>
        </div>
        <ButtonLink href="/practice/review">
          Empezar repaso
          <ArrowRight />
        </ButtonLink>
      </CardContent>
    </Card>
  );
}
