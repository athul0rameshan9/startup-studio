import type { StackContent, StackDisplay, StackItem } from "@/lib/content/schema";
import { bareHex } from "@/lib/theme";

type TechStackProps = {
  stack: StackContent;
  display: StackDisplay;
  speed: number;
};

function StackPill({
  item,
  decorative,
}: {
  item: StackItem;
  decorative?: boolean;
}) {
  return (
    <div
      aria-hidden={decorative || undefined}
      className="flex flex-none items-center gap-3 rounded-full border border-white/14 bg-white/4 px-[22px] py-3.5"
    >
      {item.type === "logo" ? (
        <span
          role="img"
          aria-label={item.name}
          className="block h-[26px] w-[26px] flex-none bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://cdn.simpleicons.org/${item.mark}/${bareHex(item.tint)})`,
          }}
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-[26px] w-[26px] flex-none items-center justify-center rounded-lg font-mono text-[10px] font-semibold tracking-[0.02em]"
          style={{
            border: `1px solid ${item.tint}66`,
            background: `${item.tint}1F`,
            color: item.tint,
          }}
        >
          {item.mark}
        </span>
      )}
      <span className="text-[16px] font-semibold whitespace-nowrap text-white/90">
        {item.name}
      </span>
    </div>
  );
}

export function TechStack({ stack, display, speed }: TechStackProps) {
  const isGrid = display === "Grid";
  const safeSpeed = speed > 0 ? speed : 1;
  const gridItems = stack.rows.flatMap((row) => row.items);

  return (
    <section
      id="stack"
      className="scroll-mt-24 overflow-hidden bg-ink py-[var(--om-pad,88px)] text-white"
    >
      <div className="mx-auto max-w-[1200px] px-6 pb-11 lg:px-8">
        {stack.eyebrow ? (
          <div className="mb-[18px] font-mono text-[13px] tracking-[0.14em] text-[var(--om-lime)]">
            {stack.eyebrow}
          </div>
        ) : null}
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-2 lg:gap-16">
          <h2 className="m-0 text-[30px] leading-[1.12] font-extrabold tracking-[-0.03em] text-balance sm:text-[34px] lg:text-[40px]">
            {stack.heading}
          </h2>
          {stack.intro ? (
            <p className="m-0 text-[17px] leading-[1.65] text-white/68">
              {stack.intro}
            </p>
          ) : null}
        </div>
      </div>

      {isGrid ? (
        <div className="mx-auto flex max-w-[1200px] flex-wrap gap-3.5 px-6 lg:px-8">
          {gridItems.map((item, index) => (
            <StackPill key={`grid-${item.name}-${index}`} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3.5">
          {stack.rows.map((row, rowIndex) => (
            <div key={`lane-${rowIndex}`} className="lane-mask">
              <div
                className="flex w-max gap-3.5"
                style={{
                  animation: `om-marquee-${row.direction} ${Math.max(
                    1,
                    Math.round(row.duration / safeSpeed),
                  )}s linear infinite`,
                }}
              >
                {/* Four copies keep the -50% translate seamless at any width. */}
                {[0, 1, 2, 3].flatMap((copy) =>
                  row.items.map((item, index) => (
                    <StackPill
                      key={`lane-${rowIndex}-${copy}-${index}`}
                      item={item}
                      decorative={copy > 0}
                    />
                  )),
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
