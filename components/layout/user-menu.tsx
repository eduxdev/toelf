import Link from "next/link";
import { User, SignIn, SignOut, ChartLineUp } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/app/(auth)/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Server component: shows either a signed-in avatar/menu or Login/Signup
 * calls to action in the header.
 */
export async function UserMenu() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex items-center gap-1">
        <ButtonLink href="/login" variant="ghost" size="sm">
          <SignIn />
          Ingresar
        </ButtonLink>
        <ButtonLink href="/signup" size="sm">
          Registrarse
        </ButtonLink>
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const displayName =
    profile?.full_name || user.email?.split("@")[0] || "Estudiante";
  const initials = displayName
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="sm">
            <span className="grid size-4 place-items-center border border-foreground bg-foreground text-[10px] text-background">
              {initials}
            </span>
            {displayName}
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="min-w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col">
              <span className="font-medium">{displayName}</span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/profile" />}>
            <ChartLineUp />
            Mi perfil
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/practice" />}>
            <User />
            Practicar
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center gap-2 rounded-none px-2 py-1.5 text-sm hover:bg-muted"
          >
            <SignOut />
            Cerrar sesión
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
