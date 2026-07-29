import type { SectionKey } from "@/lib/content/schema";

export type AdminNavItem = {
  href: string;
  label: string;
  /** Set when the page edits one content section. */
  section?: SectionKey;
};

export type AdminNavGroup = {
  title: string;
  items: AdminNavItem[];
};

export const ADMIN_NAV: AdminNavGroup[] = [
  {
    title: "Overview",
    items: [
      { href: "/admin", label: "Dashboard" },
      { href: "/admin/leads", label: "Enquiries" },
    ],
  },
  {
    title: "Page content",
    items: [
      { href: "/admin/hero", label: "Hero", section: "hero" },
      { href: "/admin/trusted-by", label: "Trusted by", section: "trustedBy" },
      { href: "/admin/problems", label: "Problems", section: "problems" },
      { href: "/admin/services", label: "Services", section: "services" },
      { href: "/admin/stack", label: "Tech stack", section: "stack" },
      { href: "/admin/process", label: "Process", section: "process" },
      { href: "/admin/work", label: "Featured work", section: "work" },
      { href: "/admin/why", label: "Why us", section: "why" },
      { href: "/admin/team", label: "Team", section: "team" },
      { href: "/admin/faq", label: "FAQ", section: "faq" },
      { href: "/admin/booking", label: "Booking form", section: "booking" },
    ],
  },
  {
    title: "Site",
    items: [
      { href: "/admin/brand", label: "Brand & navigation", section: "site" },
      { href: "/admin/appearance", label: "Appearance", section: "settings" },
    ],
  },
];
