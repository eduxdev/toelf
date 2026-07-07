"use client";

import Link from "next/link";
import { useState } from "react";
import { List } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/components/layout/nav-links";

/**
 * Drawer-based nav shown below the `md` breakpoint. Opens from the left and
 * lists the same links as the desktop nav, one per row for easy tap targets.
 * Reads its links from a shared module so no components have to be passed
 * across the RSC boundary.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Abrir menú"
            className="md:hidden"
          />
        }
      >
        <List weight="regular" />
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="border-b border-border px-4 py-3">
          <SheetTitle className="font-heading text-sm">Menú</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col p-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 border border-transparent px-3 py-2 text-sm transition-colors hover:border-border hover:bg-muted"
            >
              <link.icon weight="regular" className="size-4" />
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
