import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Stateless, signed session tokens: `base64url(payload).hmacSha256(payload)`.
 * Kept free of `next/headers` so the proxy (which runs on the Node runtime)
 * can verify a request without pulling in request-scoped APIs.
 */

export const SESSION_COOKIE = "ss_admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

export type Session = {
  user: string;
  issuedAt: number;
  expiresAt: number;
};

function secret(): string {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 16) {
    throw new Error(
      "AUTH_SECRET is missing or shorter than 16 characters. Set a random value in .env.local.",
    );
  }
  return value;
}

export function adminUser(): string {
  return process.env.ADMIN_EMAIL?.trim() || "admin";
}

/**
 * Returns a human-readable setup problem, or null when the auth environment is
 * usable. Rendered on the sign-in screen so a fresh clone explains itself.
 */
export function authConfigError(): string | null {
  const authSecret = process.env.AUTH_SECRET ?? "";
  if (authSecret.length < 16) {
    return "AUTH_SECRET is missing (or shorter than 16 characters). Copy .env.example to .env.local and set it.";
  }
  if (!process.env.ADMIN_PASSWORD) {
    return "ADMIN_PASSWORD is not set. Copy .env.example to .env.local and set it.";
  }
  return null;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** Compares submitted credentials with the configured admin account. */
export function verifyCredentials(email: string, password: string): boolean {
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedPassword) {
    throw new Error(
      "ADMIN_PASSWORD is not set. Add it to .env.local before signing in.",
    );
  }

  // Both comparisons always run, so timing doesn't reveal which one failed.
  const emailOk = safeEqual(email.trim().toLowerCase(), adminUser().toLowerCase());
  const passwordOk = safeEqual(password, expectedPassword);
  return emailOk && passwordOk;
}

export function createToken(): string {
  const now = Math.floor(Date.now() / 1000);
  const session: Session = {
    user: adminUser(),
    issuedAt: now,
    expiresAt: now + SESSION_TTL_SECONDS,
  };
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string | undefined | null): Session | null {
  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  try {
    if (!safeEqual(signature, sign(payload))) return null;

    const session = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    ) as Session;

    if (
      typeof session.expiresAt !== "number" ||
      session.expiresAt * 1000 <= Date.now()
    ) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}
