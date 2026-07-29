"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ADMIN_NAV } from "@/lib/admin/nav";
import { cn } from "@/lib/utils";

export function AdminNav({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="admin-nav"
        className="sticky top-0 z-30 flex w-full cursor-pointer items-center gap-3 border-b border-white/8 bg-ink px-6 py-4 text-[14px] font-semibold text-white lg:hidden"
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
        Menu
      </button>

      <nav
        id="admin-nav"
        className={cn(
          "flex-col gap-7 border-r border-white/8 bg-ink px-5 py-7 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[248px] lg:shrink-0 lg:overflow-y-auto",
          open ? "flex" : "hidden",
        )}
      >
        {children}

        {ADMIN_NAV.map((group) => (
          <div key={group.title} className="flex flex-col gap-1.5">
            <span className="px-3 font-mono text-[11px] tracking-[0.14em] text-white/40">
              {group.title.toUpperCase()}
            </span>
            {group.items.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2 text-[14px] font-medium transition-colors",
                    active
                      ? "bg-brand text-ink hover:text-ink"
                      : "text-white/65 hover:bg-white/6 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </>
  );
}
