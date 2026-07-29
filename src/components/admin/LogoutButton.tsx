"use client";

import { useTransition } from "react";

import { logout } from "@/lib/auth/actions";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => logout())}
      className="cursor-pointer rounded-lg border border-white/16 px-3 py-2 text-left text-[13px] font-semibold text-white/70 transition-colors hover:border-white/30 hover:text-white disabled:opacity-50"
    >
      {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}
