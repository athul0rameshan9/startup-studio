import { Media } from "@/components/ui/Media";
import type { WorkContent } from "@/lib/content/schema";

export function FeaturedWork({ work }: { work: WorkContent }) {
  return (
    <section
      id="work"
      className="scroll-mt-24 bg-ink px-6 py-[var(--om-pad,96px)] text-white lg:px-8"
    >
      <div className="mx-auto max-w-[1200px]">
        {work.eyebrow ? (
          <div className="mb-[18px] font-mono text-[13px] tracking-[0.14em] text-[var(--om-lime)]">
            {work.eyebrow}
          </div>
        ) : null}

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="m-0 mb-[26px] text-[32px] leading-[1.12] font-extrabold tracking-[-0.03em] text-balance sm:text-[36px] lg:text-[42px]">
              {work.heading}
            </h2>

            <div className="mb-[34px] flex flex-col gap-[22px]">
              {work.blocks.map((block) => (
                <div key={block.label}>
                  <div className="mb-1.5 font-mono text-[12px] tracking-[0.12em] text-[var(--om-lime)]">
                    {block.label}
                  </div>
                  <p className="m-0 text-[16px] leading-[1.65] text-white/70">
                    {block.body}
                    {block.emphasis ? (
                      <>
                        {" "}
                        <em className="font-semibold text-white not-italic">
                          {block.emphasis}
                        </em>
                      </>
                    ) : null}
                  </p>
                </div>
              ))}
            </div>

            <a
              href={work.cta.href}
              className="pb-[3px] text-[16px] font-bold text-[var(--om-lime)] transition-colors hover:text-[var(--om-lime-hi)]"
              style={{
                borderBottom:
                  "2px solid color-mix(in oklab, var(--om-lime, #B8E62A) 50%, transparent)",
              }}
            >
              {work.cta.label}
            </a>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -right-[18px] -bottom-[18px] z-0 h-[62%] w-[62%] rounded-3xl"
              style={{
                border:
                  "1px solid color-mix(in oklab, var(--om-lime, #B8E62A) 45%, transparent)",
              }}
            />
            <Media
              src={work.image.src}
              alt={work.image.alt}
              width={560}
              height={560}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="relative z-[1] block aspect-square w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
