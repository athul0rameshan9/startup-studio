"use client";

import { useActionState } from "react";

import { login, type LoginState } from "@/lib/auth/actions";

const initialState: LoginState = { error: null };

const fieldClass =
  "w-full rounded-xl border border-white/16 bg-white/6 px-3.5 py-3 font-sans text-[15px] text-white outline-none transition-colors placeholder:text-white/35 focus:border-[var(--color-brand)]";

export function LoginForm({ redirectTo }: { redirectTo: string }) {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="redirectTo" value={redirectTo} />

      <label className="flex flex-col gap-2">
        <span className="text-[13px] font-semibold text-white/70">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="username"
          required
          className={fieldClass}
          placeholder="you@example.com"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[13px] font-semibold text-white/70">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={fieldClass}
          placeholder="••••••••"
        />
      </label>

      {state.error ? (
        <p
          role="alert"
          className="m-0 rounded-xl border border-[#C4381A]/40 bg-[#C4381A]/12 px-3.5 py-3 text-[13px] font-medium text-[#FFB4A2]"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 cursor-pointer rounded-full bg-brand px-6 py-3.5 text-[15px] font-bold text-ink transition-colors hover:bg-brand-hi disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
