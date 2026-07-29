"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { clientKey, rateLimit, resetRateLimit } from "@/lib/auth/rate-limit";
import { endSession, startSession, verifyCredentials } from "@/lib/auth/session";

export type LoginState = { error: string | null };

const MAX_ATTEMPTS = 8;
const WINDOW_SECONDS = 15 * 60;

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/admin");

  const key = clientKey(await headers(), "login");
  const limit = rateLimit(key, MAX_ATTEMPTS, WINDOW_SECONDS);
  if (!limit.ok) {
    const minutes = Math.max(1, Math.ceil(limit.retryAfterSeconds / 60));
    return {
      error: `Too many attempts. Try again in about ${minutes} minute${minutes === 1 ? "" : "s"}.`,
    };
  }

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  try {
    if (!verifyCredentials(email, password)) {
      return { error: "Those credentials don't match." };
    }
    resetRateLimit(key);
    await startSession();
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Sign-in is misconfigured.",
    };
  }

  // Only allow same-origin, in-app destinations.
  redirect(redirectTo.startsWith("/admin") ? redirectTo : "/admin");
}

export async function logout(): Promise<void> {
  await endSession();
  redirect("/login");
}
