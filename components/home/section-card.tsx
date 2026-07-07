import { ArrowRight, ListChecks, PencilLine, Shuffle } from "@phosphor-icons/react/dist/ssr";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/utils";
import type { SectionMeta } from "@/lib/types/practice";

interface SectionCardProps {
  section: SectionMeta;
}

const BATCH_PRESETS = [10, 15, 20];

const STYLES = {
  structure: {
    icon: ListChecks,
    accent: "bg-warm text-warm-foreground border-warm-foreground/20",
    tab: "bg-warm/40",
  },
  "written-expression": {
    icon: PencilLine,
    accent: "bg-sage text-sage-foreground border-sage-foreground/20",
    tab: "bg-sage/40",
  },
} as const;

export function SectionCard({ section }: SectionCardProps) {
  const style = STYLES[section.id];
  const Icon = style.icon;
  return (
    <Card className="relative flex h-full flex-col overflow-hidden border-border">
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-1",
          style.tab,
          "border-b border-border/60"
        )}
      />
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "grid size-9 place-items-center border",
              style.accent
            )}
          >
            <Icon weight="regular" className="size-5" />
          </span>
          <div>
            <CardTitle className="font-heading text-lg tracking-tight">
              {section.name}
            </CardTitle>
            <CardDescription className="text-xs">
              {section.shortDescription}
            </CardDescription>
          </div>
        </div>
        <Badge variant="outline" className="font-mono">
          {section.questionCount} en el banco
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 text-sm text-muted-foreground">
        <p>{section.longDescription}</p>
        <div className="space-y-2">
          <p className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            <Shuffle weight="regular" className="size-3" />
            Ronda al azar
          </p>
          <div className="flex flex-wrap gap-1.5">
            {BATCH_PRESETS.map((preset) => (
              <ButtonLink
                key={preset}
                href={`/practice/${section.id}?size=${preset}`}
                variant="outline"
                size="xs"
              >
                {preset} preguntas
              </ButtonLink>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs text-muted-foreground">
          ~{section.timeLimitMinutes} min
        </span>
        <ButtonLink href={`/practice/${section.id}`} size="sm">
          Practicar 15
          <ArrowRight />
        </ButtonLink>
      </CardFooter>
    </Card>
  );
}
