import "server-only";

import { cookies } from "next/headers";

import {
  createToken,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  verifyToken,
  type Session,
} from "@/lib/auth/token";

export { SESSION_COOKIE, verifyCredentials } from "@/lib/auth/token";
export type { Session } from "@/lib/auth/token";

/** Reads and verifies the session carried by the request cookies. */
export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return verifyToken(store.get(SESSION_COOKIE)?.value);
}

export async function startSession(): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

/**
 * Guard used by every admin page and every admin server action. Server
 * Actions are reachable by direct POST, so authorisation is enforced inside
 * each one and not only at the route boundary.
 */
export async function requireSession(): Promise<Session> {
  const session = await getSession();
  if (!session) throw new Error("Your session has expired. Please sign in again.");
  return session;
}
