import { Target, ChartLineUp, GraduationCap } from "@phosphor-icons/react/dist/ssr";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { PracticeSessionSummary } from "@/lib/types/practice";

interface ProfileSummaryProps {
  fullName: string;
  email: string | null;
  goalScore: number;
  sessions: PracticeSessionSummary[];
}

export function ProfileSummary({
  fullName,
  email,
  goalScore,
  sessions,
}: ProfileSummaryProps) {
  const bestScore = sessions.reduce(
    (max, s) => Math.max(max, s.scorePercent),
    0
  );
  const totalSessions = sessions.length;
  const totalQuestions = sessions.reduce(
    (acc, s) => acc + s.totalQuestions,
    0
  );

  const initials = fullName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card>
      <CardContent className="flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-14 border border-border">
            <AvatarFallback className="bg-foreground font-heading text-background">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Perfil del estudiante
            </p>
            <h2 className="font-heading text-2xl font-semibold tracking-tight">
              {fullName}
            </h2>
            <p className="text-xs text-muted-foreground">
              {email ?? "Estudiante TESJo"} · Meta {goalScore}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Stat
            icon={<GraduationCap weight="regular" className="size-4" />}
            label="Sesiones"
            value={totalSessions}
            tone="warm"
          />
          <Stat
            icon={<ChartLineUp weight="regular" className="size-4" />}
            label="Mejor %"
            value={bestScore}
            suffix="%"
            tone="sage"
          />
          <Stat
            icon={<Target weight="regular" className="size-4" />}
            label="Preguntas"
            value={totalQuestions}
            tone="warm"
          />
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({
  icon,
  label,
  value,
  suffix,
  tone = "warm",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  tone?: "warm" | "sage";
}) {
  const toneClass =
    tone === "sage"
      ? "border-sage-foreground/20 bg-sage text-sage-foreground"
      : "border-warm-foreground/20 bg-warm text-warm-foreground";
  return (
    <div className={`min-w-24 border px-3 py-2 ${toneClass}`}>
      <div className="flex items-center gap-1 text-[11px] uppercase tracking-widest opacity-80">
        {icon}
        {label}
      </div>
      <p className="font-heading text-xl font-semibold">
        {value}
        {suffix}
      </p>
    </div>
  );
}
