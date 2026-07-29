import { Media } from "@/components/ui/Media";
import type { ServicesContent } from "@/lib/content/schema";

export function Services({ services }: { services: ServicesContent }) {
  return (
    <section
      id="services"
      className="scroll-mt-24 border-y border-line bg-white px-6 py-[var(--om-pad,96px)] lg:px-8"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-[52px] grid grid-cols-1 items-end gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            {services.eyebrow ? (
              <div className="mb-[18px] font-mono text-[13px] tracking-[0.14em] text-[var(--om-green)]">
                {services.eyebrow}
              </div>
            ) : null}
            <h2 className="m-0 text-[32px] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance sm:text-[38px] lg:text-[44px]">
              {services.heading}
            </h2>
          </div>
          {services.intro ? (
            <p className="m-0 text-[18px] leading-[1.6] text-body">
              {services.intro}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.cards.map((card) => (
            <div
              key={card.title}
              className="rounded-[20px] border border-line bg-mist px-[30px] py-[34px]"
            >
              <Media
                src={card.icon}
                alt=""
                width={52}
                height={52}
                className="mb-5 block h-[52px] w-[52px]"
              />
              <h3 className="m-0 mb-2.5 text-[21px] font-bold tracking-[-0.02em]">
                {card.title}
              </h3>
              <p className="m-0 text-[16px] leading-[1.65] text-body">
                {card.body}
              </p>
            </div>
          ))}

          <div className="grid grid-cols-1 gap-6 md:col-span-2 lg:col-span-3 lg:grid-cols-2">
            <div className="rounded-[20px] border border-dashed border-rule-soft bg-mist px-[30px] py-[34px]">
              <Media
                src={services.addon.icon}
                alt=""
                width={52}
                height={52}
                className="mb-5 block h-[52px] w-[52px]"
              />
              {services.addon.eyebrow ? (
                <div className="mb-3.5 font-mono text-[12px] tracking-[0.12em] text-muted">
                  {services.addon.eyebrow}
                </div>
              ) : null}
              <h3 className="m-0 mb-2.5 text-[21px] font-bold tracking-[-0.02em]">
                {services.addon.title}
              </h3>
              <p className="m-0 text-[16px] leading-[1.65] text-body">
                {services.addon.body}
              </p>
            </div>

            <div className="flex flex-col justify-between gap-[22px] rounded-[20px] bg-ink px-8 py-[34px] text-white">
              <h3 className="m-0 text-[24px] leading-[1.25] font-bold tracking-[-0.02em] text-balance">
                {services.callout.title}
              </h3>
              <a
                href={services.callout.cta.href}
                className="self-start rounded-full bg-[var(--om-lime)] px-[26px] py-3.5 text-[16px] font-bold text-ink transition-colors hover:bg-[var(--om-lime-hi)] hover:text-ink"
              >
                {services.callout.cta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
