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
import type { SectionMeta } from "@/lib/types/practice";

const ICONS = {
  structure: ListChecks,
  "written-expression": PencilLine,
} as const;

interface SectionCardProps {
  section: SectionMeta;
}

const BATCH_PRESETS = [10, 15, 20];

export function SectionCard({ section }: SectionCardProps) {
  const Icon = ICONS[section.id];
  return (
    <Card className="flex h-full flex-col border-border">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center border border-border bg-secondary">
            <Icon weight="regular" className="size-5 text-foreground" />
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
