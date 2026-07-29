import type { CSSProperties } from "react";

import type { HeroLayout } from "@/lib/content/schema";

/**
 * The decorative layer behind the hero: two concentric line marks pinned to
 * the section edges, plus the floating flow-diagram line art. Positions shift
 * with the hero layout, exactly as in the reference design.
 */
export function HeroDecor({ layout }: { layout: HeroLayout }) {
  const editorial = layout === "Editorial";

  const left: CSSProperties = {
    position: "absolute",
    left: editorial ? -190 : -130,
    top: editorial ? -70 : -20,
    width: editorial ? 300 : 280,
    aspectRatio: "1 / 1",
    opacity: 0.22,
    zIndex: 0,
    pointerEvents: "none",
    overflow: "visible",
  };

  const right: CSSProperties = {
    position: "absolute",
    right: editorial ? -120 : -140,
    top: editorial ? 110 : 140,
    width: editorial ? 300 : 280,
    aspectRatio: "1 / 1",
    opacity: 0.2,
    zIndex: 0,
    pointerEvents: "none",
    overflow: "visible",
  };

  return (
    <>
      <svg viewBox="0 0 200 200" aria-hidden="true" style={left}>
        <g fill="none" stroke="var(--om-lime, #B8E62A)" strokeWidth="3">
          <circle cx="100" cy="100" r="96" />
          <circle cx="100" cy="100" r="68" />
          <circle cx="100" cy="100" r="40" />
        </g>
      </svg>

      <svg viewBox="0 0 200 200" aria-hidden="true" style={right}>
        <g fill="none" stroke="var(--om-lime, #B8E62A)" strokeWidth="3">
          <path d="M4 196 C 4 90 90 4 196 4" />
          <path d="M4 196 C 4 124 124 4 196 4" />
          <path d="M4 196 C 40 160 160 40 196 4" />
        </g>
      </svg>

      <div
        aria-hidden="true"
        className="hero-decor-mask pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-[540px] text-[var(--om-lime)] md:block"
      >
        <svg
          viewBox="0 0 240 460"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            position: "absolute",
            left: 0,
            top: 40,
            height: 440,
            opacity: 0.22,
            animation: "om-float-a 22s ease-in-out infinite",
          }}
        >
          <path
            d="M20 60 H96 A14 14 0 0 1 110 74 V150 A14 14 0 0 0 124 164 H196"
            strokeDasharray="3 7"
            opacity="0.7"
          />
          <path
            d="M20 300 H96 A14 14 0 0 0 110 286 V214 A14 14 0 0 1 124 200 H196"
            strokeDasharray="3 7"
            opacity="0.7"
          />
          <rect x="18" y="34" width="88" height="52" rx="10" />
          <path d="M18 48 H106" />
          <circle cx="27" cy="41" r="2" fill="currentColor" stroke="none" />
          <path d="M30 66 L37 71 L30 76 M43 76 H58" />
          <circle cx="196" cy="164" r="13" />
          <circle cx="196" cy="200" r="13" />
          <circle
            cx="110"
            cy="182"
            r="5"
            fill="currentColor"
            stroke="none"
            opacity="0.5"
          />
          <rect x="18" y="274" width="88" height="52" rx="10" />
          <path d="M42 300 H82 M42 288 H70 M42 312 H62" opacity="0.8" />
          <path d="M150 372 A22 22 0 1 1 132 361" />
          <path d="M128 350 V363 H141" />
          <circle
            cx="62"
            cy="404"
            r="4"
            fill="currentColor"
            stroke="none"
            opacity="0.45"
          />
        </svg>

        <svg
          viewBox="0 0 240 460"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            position: "absolute",
            right: 0,
            top: 56,
            height: 440,
            opacity: 0.2,
            animation: "om-float-b 26s ease-in-out infinite",
          }}
        >
          <path
            d="M220 96 H150 A14 14 0 0 0 136 110 V182 A14 14 0 0 1 122 196 H44"
            strokeDasharray="3 7"
            opacity="0.7"
          />
          <path
            d="M220 300 H150 A14 14 0 0 1 136 286 V240"
            strokeDasharray="3 7"
            opacity="0.7"
          />
          <path d="M198 70 L182 86 L198 102 M212 60 L206 112" />
          <path d="M122 168 L150 182 L122 196 L94 182 Z" />
          <path d="M94 196 L122 210 L150 196" opacity="0.7" />
          <rect x="188" y="276" width="48" height="48" rx="10" />
          <path d="M212 268 V276 M212 324 V332 M180 300 H188 M236 300 H244" />
          <rect x="202" y="290" width="20" height="20" rx="5" opacity="0.75" />
          <circle cx="136" cy="228" r="12" />
          <circle
            cx="136"
            cy="228"
            r="4"
            fill="currentColor"
            stroke="none"
            opacity="0.5"
          />
          <path d="M60 372 H120 M60 386 H98" opacity="0.65" />
          <circle
            cx="180"
            cy="404"
            r="4"
            fill="currentColor"
            stroke="none"
            opacity="0.45"
          />
        </svg>
      </div>
    </>
  );
}
