"use client";

import { useEffect, useState } from "react";

import { BrandMark } from "@/components/site/BrandMark";
import type { SiteContent } from "@/lib/content/schema";

export function SiteHeader({ site }: { site: SiteContent }) {
  const [open, setOpen] = useState(false);

  // Close the mobile sheet whenever the viewport grows past the breakpoint.
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => media.matches && setOpen(false);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-ink">
      <div className="mx-auto flex max-w-[1200px] items-center gap-7 px-6 py-[18px] lg:px-8">
        <a
          href="#top"
          className="flex flex-none items-center gap-2.5 text-[18px] font-extrabold tracking-[-0.02em] text-white hover:text-white"
        >
          <BrandMark markId="om-mark-h" size={28} label={site.brandName} />
          {site.brandName}
        </a>

        <nav className="ml-auto hidden min-w-0 shrink grow-0 basis-auto flex-nowrap justify-end gap-[22px] text-[15px] font-medium whitespace-nowrap lg:flex">
          {site.navLinks.map((item) => (
            <a
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="text-white/72 transition-colors hover:text-[var(--om-lime)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex flex-none items-center gap-3 lg:ml-0">
          <a
            href={site.headerGhostCta.href}
            className="hidden rounded-full border border-white/22 px-4 py-2.5 text-[15px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-white/8 hover:text-white sm:block"
          >
            {site.headerGhostCta.label}
          </a>
          <a
            href={site.headerPrimaryCta.href}
            className="rounded-full bg-[var(--om-lime)] px-5 py-[11px] text-[15px] font-bold whitespace-nowrap text-ink transition-colors hover:bg-[var(--om-lime-hi)] hover:text-ink"
          >
            {site.headerPrimaryCta.label}
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-mobile-nav"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 flex-none cursor-pointer items-center justify-center rounded-full border border-white/22 text-white lg:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6 L18 18 M18 6 L6 18" />
              ) : (
                <path d="M4 7 H20 M4 12 H20 M4 17 H20" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="site-mobile-nav"
          className="border-t border-white/8 px-6 pb-6 lg:hidden"
        >
          <ul className="flex flex-col">
            {site.navLinks.map((item) => (
              <li key={`m-${item.label}-${item.href}`}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-white/8 py-3.5 text-[16px] font-medium text-white/72 hover:text-[var(--om-lime)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.headerGhostCta.href}
                onClick={() => setOpen(false)}
                className="block py-3.5 text-[16px] font-semibold text-white hover:text-[var(--om-lime)]"
              >
                {site.headerGhostCta.label}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
