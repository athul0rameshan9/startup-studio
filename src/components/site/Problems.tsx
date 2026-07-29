import type { ProblemsContent } from "@/lib/content/schema";

export function Problems({ problems }: { problems: ProblemsContent }) {
  return (
    <section
      id="problems"
      className="scroll-mt-24 px-6 py-[var(--om-pad,96px)] lg:px-8"
    >
      <div className="mx-auto max-w-[1200px]">
        {problems.eyebrow ? (
          <div className="mb-[18px] font-mono text-[13px] tracking-[0.14em] text-[var(--om-green)]">
            {problems.eyebrow}
          </div>
        ) : null}

        <h2 className="m-0 mb-[18px] max-w-[760px] text-[32px] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance sm:text-[38px] lg:text-[44px]">
          {problems.heading}
        </h2>

        {problems.intro ? (
          <p className="m-0 mb-12 max-w-[620px] text-[18px] leading-[1.6] text-body">
            {problems.intro}
          </p>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {problems.items.map((item) => (
            <div
              key={`${item.number}-${item.title}`}
              className="rounded-[20px] border border-line bg-white px-8 py-9 transition-colors hover:border-[var(--om-lime)]"
            >
              <div className="mb-5 font-mono text-[13px] text-[var(--om-green)]">
                {item.number}
              </div>
              <h3 className="m-0 mb-3 text-[23px] font-bold tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="m-0 text-[16px] leading-[1.65] text-body">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
