"use client";

import { useId, useState } from "react";

import type { FaqContent } from "@/lib/content/schema";

export function Faq({ faq }: { faq: FaqContent }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <section
      id="faq"
      className="scroll-mt-24 px-6 py-[var(--om-pad,96px)] lg:px-8"
    >
      <div className="mx-auto max-w-[900px]">
        {faq.eyebrow ? (
          <div className="mb-[18px] font-mono text-[13px] tracking-[0.14em] text-[var(--om-green)]">
            {faq.eyebrow}
          </div>
        ) : null}

        <h2 className="m-0 mb-11 text-[32px] leading-[1.1] font-extrabold tracking-[-0.03em] text-balance sm:text-[38px] lg:text-[44px]">
          {faq.heading}
        </h2>

        <div className="flex flex-col">
          {faq.items.map((item, index) => {
            const isOpen = open === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <div key={item.question} className="border-t border-rule">
                <h3 className="m-0">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 border-none bg-none py-6 text-left font-sans text-ink"
                  >
                    <span className="text-[19px] font-bold tracking-[-0.02em]">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-[26px] leading-none font-normal text-[var(--om-green)] transition-transform duration-200"
                      style={{
                        transform: `rotate(${isOpen ? "45deg" : "0deg"})`,
                      }}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <p className="m-0 mb-6 max-w-[680px] text-[16px] leading-[1.7] text-body">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
          <div className="border-t border-rule" />
        </div>
      </div>
    </section>
  );
}
