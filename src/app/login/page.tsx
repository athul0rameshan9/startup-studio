import type { Metadata } from "next";
import Link from "next/link";

import { LoginForm } from "@/components/admin/LoginForm";
import { BrandMark } from "@/components/site/BrandMark";
import { authConfigError } from "@/lib/auth/token";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const redirectTo = next?.startsWith("/admin") ? next : "/admin";
  const configError = authConfigError();

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6 py-16">
      <div className="w-full max-w-[400px]">
        <div className="mb-8 flex items-center gap-2.5 text-[18px] font-extrabold tracking-[-0.02em] text-white">
          <BrandMark markId="om-mark-login" size={28} label="Startup Studio" />
          Startup Studio
        </div>

        <h1 className="m-0 mb-2 text-[28px] leading-[1.15] font-extrabold tracking-[-0.03em] text-white">
          Sign in to the admin
        </h1>
        <p className="m-0 mb-8 text-[15px] leading-[1.6] text-white/60">
          Edit every word, image and colour on the public site.
        </p>

        {configError ? (
          <p className="m-0 mb-6 rounded-xl border border-white/16 bg-white/6 px-3.5 py-3 text-[13px] leading-[1.6] text-white/75">
            {configError}
          </p>
        ) : null}

        <LoginForm redirectTo={redirectTo} />

        <p className="m-0 mt-8 text-[13px] text-white/40">
          <Link href="/" className="text-white/40 hover:text-brand">
            ← Back to the site
          </Link>
        </p>
      </div>
    </main>
  );
}
