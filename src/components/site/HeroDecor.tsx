import type { HeroLayout } from "@/lib/content/schema";

/* ---------------------------------------------------------------------------
   The hero doodle scene.

   Two full-height illustrations frame the headline, one pinned to each edge.
   Both are stroked in `currentColor` (--color-decor, a fixed theme colour set
   on the wrapper below) with the lime accents pinned to `var(--om-lime)`
   directly, so they re-theme with Admin → Appearance without touching the
   neutral line work.
--------------------------------------------------------------------------- */

function LeftDoodle() {
  return (
    <svg
      viewBox="0 0 300 780"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        position: "absolute",
        left: 0,
        top: 24,
        height: 750,
        opacity: 0.75,
        animation: "om-float-a 26s ease-in-out infinite",
      }}
    >
      <g data-om-fb="" style={{ animation: "om-bob 9s ease-in-out infinite" }}>
        <path d="M42 90 H104 A20 20 0 0 0 98 51 A30 30 0 0 0 42 58 A17 17 0 0 0 42 90 Z" />
      </g>
      <path
        d="M112 72 H152"
        strokeDasharray="3 6"
        style={{ animation: "om-dash 3.4s linear infinite" }}
      />
      <g stroke="var(--om-lime,#B8E62A)">
        <path
          d="M186 42 L210 51 V72 C210 88 198 98 186 103 C174 98 162 88 162 72 V51 Z"
          stroke="currentColor"
        />
        <path
          d="M177 71 L184 78 L196 64"
          style={{ animation: "om-twinkle 4.2s ease-in-out infinite" }}
        />
      </g>
      <g>
        <rect x="30" y="122" width="92" height="26" rx="7" />
        <path d="M56 135 H104" opacity="0.55" />
        <circle
          cx="43"
          cy="135"
          r="3.2"
          fill="var(--om-lime,#B8E62A)"
          stroke="none"
          style={{ animation: "om-blink 2.2s steps(1,end) infinite" }}
        />
        <rect x="30" y="156" width="92" height="26" rx="7" />
        <path d="M56 169 H98" opacity="0.55" />
        <circle
          cx="43"
          cy="169"
          r="3.2"
          fill="currentColor"
          stroke="none"
          style={{ animation: "om-blink 2.2s steps(1,end) 0.7s infinite" }}
        />
        <rect x="30" y="190" width="92" height="26" rx="7" />
        <path d="M56 203 H92" opacity="0.55" />
        <circle
          cx="43"
          cy="203"
          r="3.2"
          fill="currentColor"
          stroke="none"
          style={{ animation: "om-blink 2.2s steps(1,end) 1.4s infinite" }}
        />
      </g>
      <g>
        <rect x="158" y="120" width="122" height="80" rx="11" />
        <path d="M158 140 H280" />
        <circle cx="169" cy="130" r="2.4" fill="currentColor" stroke="none" />
        <circle cx="179" cy="130" r="2.4" fill="currentColor" stroke="none" />
        <circle cx="189" cy="130" r="2.4" fill="currentColor" stroke="none" />
        <path
          d="M174 158 L184 166 L174 174"
          stroke="var(--om-lime,#B8E62A)"
          strokeWidth="2.4"
        />
        <path
          d="M192 176 H210"
          stroke="var(--om-lime,#B8E62A)"
          strokeWidth="2.6"
          style={{ animation: "om-blink 1.1s steps(1,end) infinite" }}
        />
      </g>
      <path
        d="M76 224 V250 A14 14 0 0 0 90 264 H150 A14 14 0 0 1 164 278 V300"
        strokeDasharray="3 7"
        opacity="0.75"
        style={{ animation: "om-dash 4.6s linear infinite" }}
      />
      <g>
        <circle cx="86" cy="352" r="46" strokeWidth="15" opacity="0.75" />
        <g
          data-om-fb=""
          style={{
            animation: "om-spin 26s linear infinite",
            transformOrigin: "86px 352px",
          }}
        >
          <path
            d="M86 306 A46 46 0 0 1 129 336"
            stroke="var(--om-lime,#B8E62A)"
            strokeWidth="15"
          />
        </g>
        <circle cx="86" cy="352" r="24" opacity="0.5" />
      </g>
      <g>
        <rect x="172" y="318" width="112" height="74" rx="10" />
        <g data-om-fb-b="">
          <rect
            x="188"
            y="342"
            width="14"
            height="34"
            rx="3"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center bottom",
              animation: "om-bar 3.2s ease-in-out infinite",
            }}
          />
          <rect
            x="210"
            y="332"
            width="14"
            height="44"
            rx="3"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center bottom",
              animation: "om-bar 3.2s ease-in-out 0.4s infinite",
            }}
          />
          <rect
            x="232"
            y="348"
            width="14"
            height="28"
            rx="3"
            fill="var(--om-lime,#B8E62A)"
            stroke="none"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center bottom",
              animation: "om-bar 3.2s ease-in-out 0.8s infinite",
            }}
          />
          <rect
            x="254"
            y="336"
            width="14"
            height="40"
            rx="3"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center bottom",
              animation: "om-bar 3.2s ease-in-out 1.2s infinite",
            }}
          />
        </g>
      </g>
      <g opacity="0.8">
        <circle
          cx="34"
          cy="440"
          r="2"
          fill="currentColor"
          stroke="none"
          style={{ animation: "om-twinkle 3s ease-in-out infinite" }}
        />
        <circle
          cx="52"
          cy="440"
          r="2"
          fill="currentColor"
          stroke="none"
          style={{ animation: "om-twinkle 3s ease-in-out 0.3s infinite" }}
        />
        <circle
          cx="70"
          cy="440"
          r="2"
          fill="currentColor"
          stroke="none"
          style={{ animation: "om-twinkle 3s ease-in-out 0.6s infinite" }}
        />
        <circle
          cx="34"
          cy="458"
          r="2"
          fill="currentColor"
          stroke="none"
          style={{ animation: "om-twinkle 3s ease-in-out 0.9s infinite" }}
        />
        <circle
          cx="52"
          cy="458"
          r="2"
          fill="currentColor"
          stroke="none"
          style={{ animation: "om-twinkle 3s ease-in-out 1.2s infinite" }}
        />
        <circle
          cx="70"
          cy="458"
          r="2"
          fill="currentColor"
          stroke="none"
          style={{ animation: "om-twinkle 3s ease-in-out 1.5s infinite" }}
        />
        <circle
          cx="34"
          cy="476"
          r="2"
          fill="currentColor"
          stroke="none"
          style={{ animation: "om-twinkle 3s ease-in-out 1.8s infinite" }}
        />
        <circle
          cx="52"
          cy="476"
          r="2"
          fill="currentColor"
          stroke="none"
          style={{ animation: "om-twinkle 3s ease-in-out 2.1s infinite" }}
        />
        <circle
          cx="70"
          cy="476"
          r="2"
          fill="currentColor"
          stroke="none"
          style={{ animation: "om-twinkle 3s ease-in-out 2.4s infinite" }}
        />
      </g>
      <g data-om-fb="" style={{ animation: "om-bob 7s ease-in-out infinite" }}>
        <path d="M168 452 H244 A10 10 0 0 1 254 462 V492 A10 10 0 0 1 244 502 H196 L182 516 V502 H168 A10 10 0 0 1 158 492 V462 A10 10 0 0 1 168 452 Z" />
        <g data-om-fb="">
          <circle
            cx="188"
            cy="477"
            r="3"
            fill="currentColor"
            stroke="none"
            style={{ animation: "om-dot 1.4s ease-in-out infinite" }}
          />
          <circle
            cx="206"
            cy="477"
            r="3"
            fill="currentColor"
            stroke="none"
            style={{ animation: "om-dot 1.4s ease-in-out 0.2s infinite" }}
          />
          <circle
            cx="224"
            cy="477"
            r="3"
            fill="var(--om-lime,#B8E62A)"
            stroke="none"
            style={{ animation: "om-dot 1.4s ease-in-out 0.4s infinite" }}
          />
        </g>
      </g>
      <g
        data-om-fb=""
        style={{ animation: "om-bob 11s ease-in-out infinite" }}
      >
        <path d="M262 574 V540 M262 552 C250 552 244 544 244 532 C258 532 264 540 262 552 M262 552 C274 552 280 544 280 532 C266 532 260 540 262 552" />
      </g>
      <g>
        <circle cx="92" cy="600" r="28" stroke="var(--om-lime,#B8E62A)" />
        <circle
          cx="92"
          cy="600"
          r="34"
          stroke="var(--om-lime,#B8E62A)"
          data-om-fb=""
          style={{ animation: "om-pulse 3.6s ease-in-out infinite" }}
        />
        <text
          x="92"
          y="609"
          textAnchor="middle"
          fill="var(--om-lime,#B8E62A)"
          stroke="none"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="24"
          fontWeight="700"
        >
          $
        </text>
      </g>
      <path
        d="M126 604 H186 A14 14 0 0 1 200 618 V662 A14 14 0 0 0 214 676 H252"
        strokeDasharray="3 7"
        opacity="0.75"
        style={{ animation: "om-dash 5.2s linear infinite" }}
      />
      <g
        data-om-fb=""
        style={{ animation: "om-bob-x 6s ease-in-out infinite" }}
      >
        <path d="M240 700 L286 682 L262 726 L256 706 Z" />
      </g>
      <g>
        <g
          data-om-fb=""
          style={{
            animation: "om-spin 18s linear infinite",
            transformOrigin: "72px 704px",
          }}
        >
          <circle cx="72" cy="704" r="20" />
          <path d="M72 676 V684 M72 724 V732 M44 704 H52 M92 704 H100 M52 684 L58 690 M86 718 L92 724 M92 684 L86 690 M58 718 L52 724" />
        </g>
        <circle cx="72" cy="704" r="7" opacity="0.6" />
        <path
          d="M110 690 A28 28 0 1 1 110 720"
          stroke="var(--om-lime,#B8E62A)"
          strokeDasharray="120"
          style={{ animation: "om-draw 4.4s ease-in-out infinite" }}
        />
        <path d="M104 712 L110 721 L119 716" stroke="var(--om-lime,#B8E62A)" />
      </g>
      <path d="M148 254 L156 246 M152 250 L152 250" opacity="0.6" />
      <g opacity="0.7">
        <path
          d="M262 200 V216 M254 208 H270"
          style={{ animation: "om-twinkle 5s ease-in-out infinite" }}
        />
        <path
          d="M34 662 L44 672 L34 682 L24 672 Z"
          style={{ animation: "om-twinkle 6s ease-in-out 1s infinite" }}
        />
        <path
          d="M120 470 L130 480 L120 490 L110 480 Z"
          style={{ animation: "om-twinkle 4.4s ease-in-out 0.5s infinite" }}
        />
      </g>
    </svg>
  );
}

function RightDoodle() {
  return (
    <svg
      viewBox="0 0 300 780"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        position: "absolute",
        right: 0,
        top: 34,
        height: 750,
        opacity: 0.72,
        animation: "om-float-b 30s ease-in-out infinite",
      }}
    >
      <g
        data-om-fb=""
        style={{ animation: "om-bob 10s ease-in-out infinite" }}
      >
        <path d="M46 96 A26 26 0 1 1 78 96 C78 106 70 108 70 116 H54 C54 108 46 106 46 96 Z" />
        <path d="M56 124 H68" />
        <path
          d="M62 30 V16 M40 40 L32 28 M84 40 L92 28"
          stroke="var(--om-lime,#B8E62A)"
          style={{ animation: "om-glow 2.8s ease-in-out infinite" }}
        />
      </g>
      <path
        d="M92 110 H140 A14 14 0 0 1 154 124 V150"
        strokeDasharray="3 6"
        style={{ animation: "om-dash-rev 3.8s linear infinite" }}
      />
      <g>
        <rect x="120" y="40" width="112" height="72" rx="9" />
        <g data-om-fb-b="">
          <rect
            x="136"
            y="64"
            width="14"
            height="32"
            rx="3"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center bottom",
              animation: "om-bar 3s ease-in-out infinite",
            }}
          />
          <rect
            x="158"
            y="56"
            width="14"
            height="40"
            rx="3"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center bottom",
              animation: "om-bar 3s ease-in-out 0.5s infinite",
            }}
          />
          <rect
            x="180"
            y="70"
            width="14"
            height="26"
            rx="3"
            fill="var(--om-lime,#B8E62A)"
            stroke="none"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center bottom",
              animation: "om-bar 3s ease-in-out 1s infinite",
            }}
          />
          <rect
            x="202"
            y="60"
            width="14"
            height="36"
            rx="3"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center bottom",
              animation: "om-bar 3s ease-in-out 1.5s infinite",
            }}
          />
        </g>
      </g>
      <g
        data-om-fb=""
        style={{
          animation: "om-spin 40s linear infinite",
          transformOrigin: "266px 80px",
        }}
      >
        <circle cx="266" cy="80" r="30" />
        <ellipse cx="266" cy="80" rx="12" ry="30" opacity="0.65" />
        <path d="M238 68 H294 M238 92 H294" opacity="0.65" />
      </g>
      <g>
        <path d="M196 176 H272 A8 8 0 0 1 280 184 V286 A8 8 0 0 1 272 294 H196 A8 8 0 0 1 188 286 V184 A8 8 0 0 1 196 176 Z" />
        <path d="M204 200 H262 M204 216 H262 M204 232 H240" opacity="0.6" />
        <path
          d="M204 268 C216 252 224 278 236 262 C244 252 252 268 264 256"
          stroke="var(--om-lime,#B8E62A)"
          strokeDasharray="90"
          style={{ animation: "om-draw 5s ease-in-out infinite" }}
        />
      </g>
      <g data-om-fb="" style={{ animation: "om-bob 8s ease-in-out infinite" }}>
        <rect x="30" y="212" width="72" height="46" rx="8" />
        <path d="M30 228 H102" opacity="0.6" />
        <path d="M42 246 H60" opacity="0.6" />
        <path d="M118 276 C118 258 132 250 146 250 C160 250 174 258 174 276 A28 14 0 0 1 118 276 Z" />
        <path d="M146 236 V250" />
        <text
          x="146"
          y="284"
          textAnchor="middle"
          fill="var(--om-lime,#B8E62A)"
          stroke="none"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="20"
          fontWeight="700"
        >
          $
        </text>
      </g>
      <path
        d="M164 320 H120 A14 14 0 0 0 106 334 V400 A14 14 0 0 1 92 414 H60"
        strokeDasharray="3 7"
        opacity="0.75"
        style={{ animation: "om-dash-rev 5s linear infinite" }}
      />
      <g>
        <rect x="118" y="352" width="122" height="80" rx="11" />
        <path d="M118 372 H240" />
        <circle cx="129" cy="362" r="2.4" fill="currentColor" stroke="none" />
        <circle cx="139" cy="362" r="2.4" fill="currentColor" stroke="none" />
        <circle cx="149" cy="362" r="2.4" fill="currentColor" stroke="none" />
        <text
          x="179"
          y="412"
          textAnchor="middle"
          fill="var(--om-lime,#B8E62A)"
          stroke="none"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="24"
          fontWeight="700"
          style={{ animation: "om-glow 3.4s ease-in-out infinite" }}
        >
          {"</>"}
        </text>
      </g>
      <g>
        <path
          d="M228 372 L262 356 M228 372 L262 400 M228 372 L262 444 M228 420 L262 356 M228 420 L262 400 M228 420 L262 444 M228 468 L262 400 M228 468 L262 444"
          opacity="0.5"
          strokeDasharray="4 6"
          style={{ animation: "om-dash 4.2s linear infinite" }}
        />
        <path
          d="M262 356 L292 396 M262 400 L292 396 M262 400 L292 440 M262 444 L292 440"
          opacity="0.5"
          strokeDasharray="4 6"
          style={{ animation: "om-dash 3.2s linear infinite" }}
        />
        <circle
          cx="228"
          cy="372"
          r="6"
          data-om-fb=""
          style={{ animation: "om-pulse 3.2s ease-in-out infinite" }}
        />
        <circle
          cx="228"
          cy="420"
          r="6"
          data-om-fb=""
          style={{ animation: "om-pulse 3.2s ease-in-out 0.5s infinite" }}
        />
        <circle
          cx="228"
          cy="468"
          r="6"
          data-om-fb=""
          style={{ animation: "om-pulse 3.2s ease-in-out 1s infinite" }}
        />
        <circle
          cx="262"
          cy="356"
          r="7"
          stroke="var(--om-lime,#B8E62A)"
          data-om-fb=""
          style={{ animation: "om-pulse 3.6s ease-in-out 0.3s infinite" }}
        />
        <circle
          cx="262"
          cy="400"
          r="7"
          data-om-fb=""
          style={{ animation: "om-pulse 3.6s ease-in-out 1.2s infinite" }}
        />
        <circle
          cx="262"
          cy="444"
          r="7"
          data-om-fb=""
          style={{ animation: "om-pulse 3.6s ease-in-out 2s infinite" }}
        />
        <circle
          cx="292"
          cy="396"
          r="6"
          fill="var(--om-lime,#B8E62A)"
          stroke="none"
          data-om-fb=""
          style={{ animation: "om-pulse 2.8s ease-in-out 0.9s infinite" }}
        />
        <circle
          cx="292"
          cy="440"
          r="6"
          data-om-fb=""
          style={{ animation: "om-pulse 2.8s ease-in-out 1.7s infinite" }}
        />
      </g>
      <g>
        <rect x="140" y="470" width="52" height="52" rx="10" />
        <text
          x="166"
          y="506"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="22"
        >
          {"{ }"}
        </text>
      </g>
      <g>
        <circle cx="238" cy="556" r="18" stroke="var(--om-lime,#B8E62A)" />
        <path
          d="M230 556 L236 563 L248 549"
          stroke="var(--om-lime,#B8E62A)"
          strokeDasharray="40"
          style={{ animation: "om-draw 4.5s ease-in-out infinite" }}
        />
      </g>
      <g
        data-om-fb=""
        style={{ animation: "om-bob 7.5s ease-in-out infinite" }}
      >
        <path
          d="M30 592 H98 A10 10 0 0 1 108 602 V630 A10 10 0 0 1 98 640 H62 L48 654 V640 H30 A10 10 0 0 1 20 630 V602 A10 10 0 0 1 30 592 Z"
          stroke="var(--om-lime,#B8E62A)"
        />
        <g data-om-fb="">
          <circle
            cx="48"
            cy="616"
            r="3"
            fill="var(--om-lime,#B8E62A)"
            stroke="none"
            style={{ animation: "om-dot 1.5s ease-in-out infinite" }}
          />
          <circle
            cx="64"
            cy="616"
            r="3"
            fill="var(--om-lime,#B8E62A)"
            stroke="none"
            style={{ animation: "om-dot 1.5s ease-in-out 0.2s infinite" }}
          />
          <circle
            cx="80"
            cy="616"
            r="3"
            fill="var(--om-lime,#B8E62A)"
            stroke="none"
            style={{ animation: "om-dot 1.5s ease-in-out 0.4s infinite" }}
          />
        </g>
      </g>
      <g>
        <path d="M196 618 L246 592 L296 618 H196 Z" />
        <path
          d="M204 618 V694 M222 618 V694 M240 618 V694 M258 618 V694 M276 618 V694 M288 618 V694"
          opacity="0.7"
        />
        <path d="M190 700 H302" />
      </g>
      <g>
        <rect x="128" y="672" width="46" height="66" rx="8" />
        <path d="M136 686 H166" opacity="0.6" />
        <circle cx="140" cy="704" r="2.6" fill="currentColor" stroke="none" />
        <circle cx="152" cy="704" r="2.6" fill="currentColor" stroke="none" />
        <circle
          cx="164"
          cy="704"
          r="2.6"
          fill="currentColor"
          stroke="none"
          style={{ animation: "om-blink 1.8s steps(1,end) infinite" }}
        />
        <circle cx="140" cy="720" r="2.6" fill="currentColor" stroke="none" />
        <circle cx="152" cy="720" r="2.6" fill="currentColor" stroke="none" />
        <circle cx="164" cy="720" r="2.6" fill="currentColor" stroke="none" />
      </g>
      <g stroke="var(--om-lime,#B8E62A)">
        <path
          d="M20 730 L44 706 L62 718 L92 682"
          strokeDasharray="120"
          style={{ animation: "om-draw 4.8s ease-in-out infinite" }}
        />
        <path d="M80 682 H92 V694" />
      </g>
      <g opacity="0.7">
        <path
          d="M112 168 V184 M104 176 H120"
          style={{ animation: "om-twinkle 4.6s ease-in-out infinite" }}
        />
        <path
          d="M282 508 L292 518 L282 528 L272 518 Z"
          style={{ animation: "om-twinkle 5.4s ease-in-out 0.7s infinite" }}
        />
        <path
          d="M108 540 L116 548 L108 556 L100 548 Z"
          style={{ animation: "om-twinkle 4s ease-in-out 1.4s infinite" }}
        />
        <circle
          cx="196"
          cy="548"
          r="3"
          fill="currentColor"
          stroke="none"
          style={{ animation: "om-twinkle 3.6s ease-in-out infinite" }}
        />
      </g>
    </svg>
  );
}

/**
 * The decorative layer behind the hero. Both illustrations are pinned to the
 * xl+ breakpoint, where there's a gutter beside the centred headline for them
 * to sit in. Editorial starts its copy at the container's left edge, so that
 * side drops its doodle and the right illustration carries the composition.
 */
export function HeroDecor({ layout }: { layout: HeroLayout }) {
  const editorial = layout === "Editorial";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-[780px] select-none xl:block"
    >
      {/* The field the line art sits in — the corners catch a little light. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 62% at 2% 20%, color-mix(in oklab, var(--color-decor) 22%, transparent), transparent 72%), radial-gradient(54% 58% at 99% 34%, color-mix(in oklab, var(--color-decor) 18%, transparent), transparent 72%)",
        }}
      />

      {/* The alpha lives in each SVG's own opacity, not an element opacity, so
          the lime accents inside the art stay vivid instead of being dimmed
          with it. */}
      <div className="hero-decor-mask absolute inset-0 text-decor">
        {!editorial && <LeftDoodle />}
        <RightDoodle />
      </div>
    </div>
  );
}
