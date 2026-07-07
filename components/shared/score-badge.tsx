import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ScoreBadgeProps {
  score: number;
  className?: string;
}

/**
 * Colored badge showing a percent score with performance tone.
 */
export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  const tone =
    score >= 80
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
      : score >= 60
      ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30"
      : "bg-destructive/10 text-destructive border-destructive/30";
  return (
    <Badge variant="outline" className={cn("border font-mono", tone, className)}>
      {score}%
    </Badge>
  );
}
