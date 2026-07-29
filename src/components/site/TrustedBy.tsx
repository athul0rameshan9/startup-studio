import { Media } from "@/components/ui/Media";
import type { TrustedByContent } from "@/lib/content/schema";

const PLACEHOLDER_STRIPES =
  "repeating-linear-gradient(135deg,#DCEAE4 0 8px,#EDF6F2 8px 16px)";

export function TrustedBy({ trustedBy }: { trustedBy: TrustedByContent }) {
  if (!trustedBy.enabled) return null;

  return (
    <section className="bg-mist px-6 pt-11 lg:px-8">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-11">
        {trustedBy.label ? (
          <span className="font-mono text-[12px] tracking-[0.12em] text-muted">
            {trustedBy.label}
          </span>
        ) : null}

        {trustedBy.logos.map((logo, index) =>
          logo.image ? (
            <Media
              key={`${logo.name}-${index}`}
              src={logo.image}
              alt={logo.name}
              width={logo.width}
              height={26}
              className="h-[26px] w-auto object-contain"
            />
          ) : (
            <div
              key={`${logo.name}-${index}`}
              role="img"
              aria-label={logo.name}
              className="h-[26px] rounded-md"
              style={{
                width: logo.width,
                backgroundImage: PLACEHOLDER_STRIPES,
              }}
            />
          ),
        )}

        {trustedBy.note ? (
          <span className="font-mono text-[11px] text-faint">
            {trustedBy.note}
          </span>
        ) : null}
      </div>
    </section>
  );
}
