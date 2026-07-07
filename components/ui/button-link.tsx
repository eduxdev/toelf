import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> &
  VariantProps<typeof buttonVariants>;

/**
 * Next.js Link styled with the same variants as `<Button>`. Use whenever
 * the target is navigation (has `href`) instead of Base UI's `<Button
 * render={<Link/>}>` pattern to keep native semantics correct.
 */
export function ButtonLink({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      data-slot="button-link"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
