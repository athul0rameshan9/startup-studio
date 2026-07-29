import type { ProcessContent } from "@/lib/content/schema";
import { cn } from "@/lib/utils";

export function ProcessSection({ process }: { process: ProcessContent }) {
  const last = process.steps.length - 1;

  return (
    <section
      id="process"
      className="scroll-mt-24 px-6 py-[var(--om-pad,96px)] lg:px-8"
    >
      <div className="mx-auto max-w-[1200px]">
        {process.eyebrow ? (
          <div className="mb-[18px] font-mono text-[13px] tracking-[0.14em] text-[var(--om-green)]">
            {process.eyebrow}
          </div>
        ) : null}

        <h2 className="m-0 mb-12 max-w-[680px] text-[32px] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance sm:text-[38px] lg:text-[44px]">
          {process.heading}
        </h2>

        <div className="grid grid-cols-1 border-t border-rule sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, index) => (
            <div
              key={step.label}
              className={cn(
                // Stacked below `lg`; the reference's ruled four-up above it.
                "border-rule py-[30px] sm:px-[26px] sm:first:pl-0 sm:last:pr-0",
                index !== last &&
                  "border-b sm:border-b-0 sm:border-r sm:even:border-r-0 lg:even:border-r",
                index === 0 && "lg:pr-[26px] lg:pl-0",
                index === last && "lg:pr-0 lg:pl-[26px]",
                index !== 0 && index !== last && "lg:px-[26px]",
              )}
            >
              <div className="mb-4 font-mono text-[13px] text-[var(--om-green)]">
                {step.label}
              </div>
              <h3 className="m-0 mb-2.5 text-[20px] font-bold tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="m-0 text-[15px] leading-[1.6] text-body">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
