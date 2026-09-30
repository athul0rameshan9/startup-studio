import { Media } from "@/components/ui/Media";
import type { TrustedByContent } from "@/lib/content/schema";

const PLACEHOLDER_STRIPES =
  "repeating-linear-gradient(135deg,#DCEAE4 0 8px,#EDF6F2 8px 16px)";

// Logo widths in content are set against a 26px-tall strip; scale them to the
// rendered height so next/image requests a sharp enough source.
const BASE_HEIGHT = 26;
const LOGO_HEIGHT = 44;
const scaleWidth = (width: number) =>
  Math.round((width * LOGO_HEIGHT) / BASE_HEIGHT);

export function TrustedBy({ trustedBy }: { trustedBy: TrustedByContent }) {
  if (!trustedBy.enabled) return null;

  return (
    <section className="bg-mist px-6 pt-11 lg:px-8">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-14 gap-y-8">
        {trustedBy.label ? (
          <span className="font-mono text-[13px] tracking-[0.12em] text-muted">
            {trustedBy.label}
          </span>
        ) : null}

        {trustedBy.logos.map((logo, index) =>
          logo.image ? (
            <Media
              key={`${logo.name}-${index}`}
              src={logo.image}
              alt={logo.name}
              width={scaleWidth(logo.width)}
              height={LOGO_HEIGHT}
              className="h-9 w-auto object-contain lg:h-11"
            />
          ) : (
            <div
              key={`${logo.name}-${index}`}
              role="img"
              aria-label={logo.name}
              className="h-9 rounded-md lg:h-11"
              style={{
                width: scaleWidth(logo.width),
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
