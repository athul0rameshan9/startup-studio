import Link from "next/link";

import { BrandMark } from "@/components/site/BrandMark";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-white">
      <BrandMark markId="om-mark-404" size={40} label="Startup Studio" />
      <h1 className="mt-6 mb-3 text-[40px] leading-[1.1] font-extrabold tracking-[-0.03em]">
        Page not found
      </h1>
      <p className="m-0 mb-8 max-w-[420px] text-[16px] leading-[1.6] text-white/60">
        That link doesn&rsquo;t point anywhere. The whole story lives on one
        page anyway.
      </p>
      <Link
        href="/"
        className="rounded-full bg-brand px-7 py-4 text-[16px] font-bold text-ink transition-colors hover:bg-brand-hi hover:text-ink"
      >
        Back to the site
      </Link>
    </main>
  );
}
