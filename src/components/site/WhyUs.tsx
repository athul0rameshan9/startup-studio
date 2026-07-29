import type { WhyContent } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

export function WhyUs({ why }: { why: WhyContent }) {
  const last = why.reasons.length - 1;

  return (
    <section className="px-6 py-[var(--om-pad,96px)] lg:px-8">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          {why.eyebrow ? (
            <div className="mb-[18px] font-mono text-[13px] tracking-[0.14em] text-[var(--om-green)]">
              {why.eyebrow}
            </div>
          ) : null}
          <h2 className="m-0 text-[30px] leading-[1.12] font-extrabold tracking-[-0.03em] text-balance sm:text-[34px] lg:text-[40px]">
            {why.heading}
          </h2>
        </div>

        <div className="flex flex-col">
          {why.reasons.map((reason, index) => (
            <div
              key={reason.title}
              className={cn(
                "grid grid-cols-1 gap-2 border-t border-rule py-[26px] sm:grid-cols-[200px_1fr] sm:gap-7",
                index === last && "border-b",
              )}
            >
              <h3 className="m-0 text-[19px] font-bold tracking-[-0.02em]">
                {reason.title}
              </h3>
              <p className="m-0 text-[16px] leading-[1.65] text-body">
                {reason.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
