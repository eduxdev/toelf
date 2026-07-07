import Link from "next/link";
import { ArrowRight, BookOpen } from "@phosphor-icons/react/dist/ssr";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { GuideTopic } from "@/lib/data/guide";

interface TopicCardProps {
  topic: GuideTopic;
}

const CATEGORY_LABEL = {
  grammar: "Gramática",
  usage: "Uso",
  structure: "Estructura",
} as const;

export function TopicCard({ topic }: TopicCardProps) {
  return (
    <Link
      href={`/guide/${topic.slug}`}
      className="group focus-visible:outline focus-visible:outline-1 focus-visible:outline-ring"
    >
      <Card className="h-full transition-colors group-hover:bg-secondary/40">
        <CardHeader className="flex flex-row items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="grid size-8 place-items-center border border-border bg-secondary">
              <BookOpen weight="regular" className="size-4" />
            </span>
            <div>
              <CardTitle className="font-heading text-base tracking-tight">
                {topic.title}
              </CardTitle>
              <CardDescription className="text-xs">
                {topic.shortDescription}
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="text-[10px]">
            {CATEGORY_LABEL[topic.category]}
          </Badge>
        </CardHeader>
        <CardContent className="flex items-center justify-between pt-2">
          <div className="flex flex-wrap gap-1">
            {topic.keywords.slice(0, 4).map((kw) => (
              <span
                key={kw}
                className="border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {kw}
              </span>
            ))}
          </div>
          <ArrowRight
            weight="regular"
            className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
          />
        </CardContent>
      </Card>
    </Link>
  );
}
