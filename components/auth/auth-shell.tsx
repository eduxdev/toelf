import Link from "next/link";
import type { ReactNode } from "react";
import { GraduationCap } from "@phosphor-icons/react/dist/ssr";

interface AuthShellProps {
  title: string;
  description: string;
  footer: ReactNode;
  children: ReactNode;
}

/**
 * Minimal centered shell used by login and signup screens.
 */
export function AuthShell({
  title,
  description,
  footer,
  children,
}: AuthShellProps) {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-6.5rem)] max-w-md flex-col justify-center px-6 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 font-heading text-sm"
      >
        <span className="grid size-7 place-items-center border border-foreground bg-foreground text-background">
          <GraduationCap weight="bold" className="size-4" />
        </span>
        <span className="font-semibold tracking-tight">TOEFL ITP</span>
      </Link>
      <div className="border border-border bg-background p-6">
        <div className="mb-6 space-y-1">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {children}
      </div>
      <div className="mt-4 text-center text-xs text-muted-foreground">
        {footer}
      </div>
    </div>
  );
}
