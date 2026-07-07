import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-2">
          {eyebrow ? (
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="text-sm text-muted-foreground md:text-base">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>
    </section>
  );
}
