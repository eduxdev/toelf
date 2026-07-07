import type { ComponentType } from "react";
import type { IconProps } from "@phosphor-icons/react";
import {
  GraduationCap,
  ChartLineUp,
  House,
  BookOpen,
} from "@phosphor-icons/react/dist/ssr";

export interface NavLink {
  href: string;
  label: string;
  icon: ComponentType<IconProps>;
}

/**
 * Primary navigation. Shared between the server-rendered desktop bar and
 * the client-rendered mobile drawer so the icons never cross the RSC
 * boundary as props.
 */
export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Inicio", icon: House },
  { href: "/practice", label: "Practicar", icon: GraduationCap },
  { href: "/guide", label: "Guía", icon: BookOpen },
  { href: "/profile", label: "Perfil", icon: ChartLineUp },
];
