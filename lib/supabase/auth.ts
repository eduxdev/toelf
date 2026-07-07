import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Slim user snapshot derived from the Supabase JWT claims. Everything here
 * is verified statically by the JWKS check — no `/auth/v1/user` roundtrip.
 */
export interface AuthUser {
  id: string;
  email: string | null;
  fullName: string | null;
  role: string | null;
  /** Auth assurance level ('aal1' password, 'aal2' MFA). */
  aal: string | null;
  /** JWT expiry (unix seconds). */
  expiresAt: number | null;
}

/**
 * Resolves the current user by verifying the Supabase JWT locally via
 * getClaims(). Returns `null` when the request is unauthenticated or the
 * token failed verification.
 */
export async function getAuthUser(): Promise<AuthUser | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) return null;

  const claims = data.claims as Record<string, unknown>;
  const sub = typeof claims.sub === "string" ? claims.sub : null;
  if (!sub) return null;

  const metadata =
    (claims.user_metadata as Record<string, unknown> | undefined) ?? {};

  return {
    id: sub,
    email: typeof claims.email === "string" ? claims.email : null,
    fullName:
      typeof metadata.full_name === "string" ? metadata.full_name : null,
    role: typeof claims.role === "string" ? claims.role : null,
    aal: typeof claims.aal === "string" ? claims.aal : null,
    expiresAt: typeof claims.exp === "number" ? claims.exp : null,
  };
}

/**
 * Same as getAuthUser but throws when the user is not authenticated.
 * Use inside protected server actions/services to keep the code linear.
 */
export async function requireAuthUser(): Promise<AuthUser> {
  const user = await getAuthUser();
  if (!user) {
    throw new AuthRequiredError();
  }
  return user;
}

/** Thrown by `requireAuthUser` when no valid JWT is present. */
export class AuthRequiredError extends Error {
  code = "not-authenticated" as const;
  constructor() {
    super("Authentication required");
    this.name = "AuthRequiredError";
  }
}
