import { Check, X, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { GuideTopic } from "@/lib/data/guide";

interface TopicDetailProps {
  topic: GuideTopic;
}

export function TopicDetail({ topic }: TopicDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-1.5">
        {topic.keywords.map((kw) => (
          <Badge key={kw} variant="outline" className="font-mono text-[11px]">
            {kw}
          </Badge>
        ))}
      </div>

      <div className="space-y-4">
        {topic.rules.map((rule, index) => (
          <Card key={`${topic.slug}-rule-${index}`} className="border-border">
            <CardHeader className="flex flex-row items-center gap-3 border-b border-border">
              <span className="grid size-6 place-items-center border border-foreground bg-foreground font-mono text-xs text-background">
                {index + 1}
              </span>
              <CardTitle className="font-heading text-base tracking-tight">
                {rule.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {rule.body}
              </p>
              {rule.examples?.length ? (
                <div className="space-y-2">
                  {rule.examples.map((example, exIndex) => (
                    <div
                      key={`${topic.slug}-rule-${index}-ex-${exIndex}`}
                      className="space-y-1"
                    >
                      {example.wrong ? (
                        <p className="flex items-start gap-2 border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm">
                          <X
                            weight="bold"
                            className="mt-0.5 size-3.5 shrink-0 text-destructive"
                          />
                          <span className="text-destructive">
                            {example.wrong}
                          </span>
                        </p>
                      ) : null}
                      <p className="flex items-start gap-2 border border-emerald-500/30 bg-emerald-500/5 px-3 py-2 text-sm">
                        <Check
                          weight="bold"
                          className="mt-0.5 size-3.5 shrink-0 text-emerald-600 dark:text-emerald-400"
                        />
                        <span>{example.right}</span>
                      </p>
                      {example.note ? (
                        <p className="flex items-start gap-2 pl-1 text-xs text-muted-foreground">
                          <WarningCircle
                            weight="regular"
                            className="mt-0.5 size-3.5 shrink-0"
                          />
                          {example.note}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
