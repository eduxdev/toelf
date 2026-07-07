import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Route protection matrix used by the Next.js proxy (middleware).
 * `protectedPrefixes` require an authenticated user; `authPrefixes`
 * redirect signed-in users away from login/signup pages.
 */
const protectedPrefixes = ["/practice", "/profile"];
const authPrefixes = ["/login", "/signup"];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return supabaseResponse;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  /*
   * We verify the JWT locally via the project's JWKS instead of hitting
   * the /auth/v1/user endpoint on every request. getClaims() falls back
   * to a network call only for legacy HS256 tokens; for the modern
   * asymmetric keys used by Supabase Auth today, verification stays
   * fully in-process (JWKS is cached).
   */
  const { data, error } = await supabase.auth.getClaims();
  const claims = error ? null : data?.claims ?? null;
  const isAuthenticated = Boolean(claims?.sub);

  const pathname = request.nextUrl.pathname;
  const isProtected = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );
  const isAuthRoute = authPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isAuthenticated && isProtected) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuthenticated && isAuthRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/practice";
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}
