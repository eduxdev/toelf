import Link from "next/link";
import {
  GraduationCap,
  ChartLineUp,
  House,
  BookOpen,
} from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ui/button-link";
import { UserMenu } from "@/components/layout/user-menu";
import { MobileNav } from "@/components/layout/mobile-nav";

const NAV_LINKS = [
  { href: "/", label: "Inicio", icon: House },
  { href: "/practice", label: "Practicar", icon: GraduationCap },
  { href: "/guide", label: "Guía", icon: BookOpen },
  { href: "/profile", label: "Perfil", icon: ChartLineUp },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <MobileNav links={NAV_LINKS} />
          <Link
            href="/"
            className="flex items-center gap-2 font-heading"
            aria-label="Ir al inicio"
          >
            <span className="grid size-7 place-items-center border border-foreground/80 bg-foreground text-background">
              <GraduationCap weight="bold" className="size-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              TOEFL ITP
            </span>
          </Link>
        </div>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <ButtonLink
              key={link.href}
              href={link.href}
              variant="ghost"
              size="sm"
            >
              <link.icon weight="regular" />
              {link.label}
            </ButtonLink>
          ))}
        </nav>
        <UserMenu />
      </div>
    </header>
  );
}
