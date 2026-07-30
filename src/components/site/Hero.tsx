import { HeroDecor } from "@/components/site/HeroDecor";
import type { HeroContent, HeroLayout } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

type HeroProps = {
  hero: HeroContent;
  layout: HeroLayout;
};

export function Hero({ hero, layout }: HeroProps) {
  const editorial = layout === "Editorial";

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ink text-white scroll-mt-24"
    >
      <HeroDecor layout={layout} />

      <div
        className={cn(
          "relative z-[1] mx-auto flex max-w-[1200px] flex-col px-6 pt-[var(--om-hero-pad,104px)] lg:px-8",
          editorial ? "items-start text-left" : "items-center text-center",
        )}
      >
        {hero.eyebrow ? (
          <div className="mb-3 font-mono text-[13px] tracking-[0.14em] text-[var(--om-lime)]">
            {hero.eyebrow}
          </div>
        ) : null}

        <h1 className="m-0 mb-4 max-w-[860px] text-[38px] leading-[1.06] font-extrabold tracking-[-0.035em] text-balance sm:text-[52px] lg:text-[68px] lg:leading-[1.04]">
          {hero.title}
        </h1>

        {hero.subtitle ? (
          <p className="m-0 mb-6 max-w-[620px] text-[17px] leading-[1.6] text-white/68 text-pretty lg:text-[19px]">
            {hero.subtitle}
          </p>
        ) : null}

        <div
          className={cn(
            "mb-4 flex flex-wrap gap-3.5",
            editorial ? "justify-start" : "justify-center",
          )}
        >
          <a
            href={hero.primaryCta.href}
            className="rounded-full bg-[var(--om-lime)] px-7 py-4 text-[16px] font-bold text-ink transition-colors hover:bg-[var(--om-lime-hi)] hover:text-ink"
          >
            {hero.primaryCta.label}
          </a>
          <a
            href={hero.secondaryCta.href}
            className="flex items-center gap-2.5 rounded-full border border-white/24 px-[26px] py-4 text-[16px] font-semibold text-white transition-colors hover:bg-white/8 hover:text-white"
          >
            <span className="block h-2 w-2 flex-none rounded-full bg-[#DCF58A]" />
            {hero.secondaryCta.label}
          </a>
        </div>

        {hero.note ? (
          <div className="text-[14px] text-white/45">{hero.note}</div>
        ) : null}
      </div>

      {hero.stats.length > 0 ? (
        <div className="relative mx-auto max-w-[1200px] px-6 pt-[var(--om-pad-sm,80px)] lg:px-8">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-px overflow-hidden rounded-t-[20px] border border-b-0 border-white/12 bg-white/12">
            {hero.stats.map((stat) => (
              <div
                key={`${stat.value}-${stat.label}`}
                className="bg-ink px-7 py-5"
              >
                <div className="text-[34px] font-extrabold tracking-[-0.03em] text-[var(--om-lime)]">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-[14px] text-white/60">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
