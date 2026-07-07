import Link from "next/link";
import { ArrowRight, ListChecks, PencilLine } from "@phosphor-icons/react/dist/ssr";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SectionMeta } from "@/lib/types/practice";

const ICONS = {
  structure: ListChecks,
  "written-expression": PencilLine,
} as const;

interface SectionCardProps {
  section: SectionMeta;
}

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
          {section.questionCount} q
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 text-sm text-muted-foreground">
        {section.longDescription}
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs text-muted-foreground">
          ~{section.timeLimitMinutes} min
        </span>
        <Button size="sm" render={<Link href={`/practice/${section.id}`} />}>
          Practicar
          <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
