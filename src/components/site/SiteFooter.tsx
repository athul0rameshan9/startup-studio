import { BrandMark } from "@/components/site/BrandMark";
import type { SiteContent } from "@/lib/content/schema";

export function SiteFooter({ site }: { site: SiteContent }) {
  return (
    <footer className="border-t border-white/10 bg-ink px-6 py-11 text-white/55 lg:px-8">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-8 text-[14px]">
        <div className="flex items-center gap-2.5 text-[16px] font-extrabold text-white">
          <BrandMark markId="om-mark-f" size={24} label={site.brandName} />
          {site.brandName}
        </div>

        <div className="flex flex-wrap gap-6">
          {site.footerLinks.map((item) => (
            <a
              key={`${item.label}-${item.href}`}
              href={item.href}
              className="text-white/55 transition-colors hover:text-[var(--om-lime)]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div>{site.footerCopyright}</div>
      </div>
    </footer>
  );
}
