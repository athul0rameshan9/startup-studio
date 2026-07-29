import type { CSSProperties, ReactNode } from "react";

import type { HeroLayout } from "@/lib/content/schema";

/* ---------------------------------------------------------------------------
   The hero doodle scene.

   Two clusters of hand-drawn line art frame the headline — the studio's own
   subject matter (servers, charts, contracts, code, founders at work) rather
   than abstract shapes. Every motif is authored in a 48 × 48 box and stroked
   in `currentColor`, so:

   - a placement can flip a whole motif to the accent by setting `accent`,
   - parts that are lime *inside* a neutral motif reference var(--om-lime)
     directly, and so re-theme with Admin → Appearance,
   - the neutral stroke comes from --color-decor, a fixed theme colour.

   The two figures use their own wider boxes; `scale` is relative either way.
--------------------------------------------------------------------------- */

/** A grid of dots, the filler mark used in the corners of the scene. */
function dotGrid(cols: number, rows: number) {
  return Array.from({ length: cols * rows }, (_, i) => (
    <circle
      key={i}
      cx={6 + (i % cols) * 8.5}
      cy={6 + Math.floor(i / cols) * 8.5}
      r={1.5}
      fill="currentColor"
      stroke="none"
    />
  ));
}

const MOTIFS = {
  cloud: (
    <path d="M13 33C6 33 4.5 22.5 12.5 21C12 12 26 8.5 30 16.5C38 14.5 43 24 36 33Z" />
  ),

  shield: (
    <>
      <path d="M24 5.5L39 10.5V23.5C39 32 32.5 38.5 24 42.5C15.5 38.5 9 32 9 23.5V10.5Z" />
      <path d="M17.5 23L22 27.5L31 17.5" stroke="var(--om-lime)" />
    </>
  ),

  server: (
    <>
      <rect x="8" y="9" width="32" height="9" rx="2.5" />
      <rect x="8" y="20.5" width="32" height="9" rx="2.5" />
      <rect x="8" y="32" width="32" height="9" rx="2.5" />
      <circle cx="13.5" cy="13.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="25" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="36.5" r="1.5" fill="currentColor" stroke="none" />
      <path d="M19 13.5H34M19 25H34M19 36.5H34" opacity="0.7" />
    </>
  ),

  terminal: (
    <>
      <rect x="5" y="10" width="38" height="28" rx="3.5" />
      <path d="M5 17.5H43" />
      <circle cx="10" cy="13.8" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13.8" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="19" cy="13.8" r="1.2" fill="currentColor" stroke="none" />
      <path d="M13 23.5L18 28L13 32.5" stroke="var(--om-lime)" />
      <path d="M22 32.5H31" stroke="var(--om-lime)" />
    </>
  ),

  donut: (
    <>
      <circle cx="24" cy="24" r="15.5" />
      <circle cx="24" cy="24" r="8" />
      <path d="M24 8.5V16M39.5 24H32M24 39.5V32M8.5 24H16" opacity="0.55" />
      <path
        d="M24 12.2A11.8 11.8 0 0 1 34.2 18.1"
        stroke="var(--om-lime)"
        strokeWidth="7.4"
        strokeLinecap="butt"
      />
    </>
  ),

  barChart: (
    <>
      <rect x="5" y="8" width="38" height="32" rx="3.5" />
      <path d="M10 33.5H38" opacity="0.55" />
      <rect x="13" y="22" width="5" height="11.5" />
      <rect x="29" y="26" width="5" height="7.5" />
      <rect
        x="21"
        y="15.5"
        width="5"
        height="18"
        fill="var(--om-lime)"
        stroke="var(--om-lime)"
      />
    </>
  ),

  globe: (
    <>
      <circle cx="24" cy="24" r="15.5" />
      <path d="M24 8.5C17 14 17 34 24 39.5" />
      <path d="M24 8.5C31 14 31 34 24 39.5" />
      <path d="M9.5 18.5H38.5M9.5 29.5H38.5M8.5 24H39.5" opacity="0.8" />
    </>
  ),

  wallet: (
    <>
      <rect x="6" y="12" width="36" height="24" rx="4.5" />
      <path d="M6 19.5H42" />
      <path d="M11 27.5H20" opacity="0.6" strokeDasharray="3 3.5" />
      <rect x="26" y="24" width="12" height="7" rx="2" opacity="0.85" />
    </>
  ),

  moneyBag: (
    <>
      <path d="M18 13C12 20 8 27 11 33C14 39.5 34 39.5 37 33C40 27 36 20 30 13Z" />
      <path d="M17 13H31" />
      <path d="M24 19.5V33.5" stroke="var(--om-lime)" />
      <path
        d="M27.5 23C27.5 20.8 20.5 20.8 20.5 24C20.5 27 27.5 26.2 27.5 29.2C27.5 32.2 20.5 32.2 20.5 30"
        stroke="var(--om-lime)"
      />
    </>
  ),

  document: (
    <>
      <rect x="10" y="5" width="28" height="38" rx="3" />
      <path d="M16 13H32M16 19H32M16 25H27" opacity="0.75" />
      <path
        d="M15 34C18 30 20 37 23 33C25.5 30 27 35 31 31.5"
        stroke="var(--om-lime)"
      />
      <path d="M31 31.5L34.5 28.5" stroke="var(--om-lime)" opacity="0.7" />
    </>
  ),

  codeWindow: (
    <>
      <rect x="4" y="10" width="40" height="28" rx="3.5" />
      <path d="M4 17.5H44" />
      <circle cx="9" cy="13.8" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="13.5" cy="13.8" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="18" cy="13.8" r="1.2" fill="currentColor" stroke="none" />
      <path d="M19 23L14 28.5L19 34" stroke="var(--om-lime)" />
      <path d="M29 23L34 28.5L29 34" stroke="var(--om-lime)" />
      <path d="M26.5 21.5L21.5 35.5" stroke="var(--om-lime)" opacity="0.8" />
    </>
  ),

  circuitTree: (
    <>
      <path d="M14 26C6 22 8 11 17 10C20 4 31 4 34 10C42 13 41 23 33 26Z" />
      <path d="M24 43V25" />
      <path d="M24 36L17 29M24 31L31 25M24 40L18 37" opacity="0.85" />
      <circle cx="17" cy="29" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="31" cy="25" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="18" cy="37" r="1.6" fill="currentColor" stroke="none" />
      <path d="M20 43H28" opacity="0.6" />
    </>
  ),

  braces: (
    <>
      <rect x="9" y="11" width="30" height="26" rx="6" />
      <path
        d="M21 17C18 17 20 23 17.5 24C20 25 18 31 21 31"
        stroke="var(--om-lime)"
      />
      <path
        d="M27 17C30 17 28 23 30.5 24C28 25 30 31 27 31"
        stroke="var(--om-lime)"
      />
    </>
  ),

  checkCircle: (
    <>
      <circle cx="24" cy="24" r="15" />
      <path d="M16.5 24L21.5 29L31.5 18" />
    </>
  ),

  coin: (
    <>
      <circle cx="24" cy="24" r="15" />
      <circle cx="24" cy="24" r="11.5" opacity="0.55" />
      <path d="M24 15.5V32.5" />
      <path d="M27.5 19.5C27.5 17.3 20.5 17.3 20.5 20.5C20.5 23.5 27.5 22.7 27.5 25.7C27.5 28.7 20.5 28.7 20.5 26.5" />
    </>
  ),

  bulb: (
    <>
      <path d="M17.5 28.5A10 10 0 1 1 30.5 28.5C29 30.5 28.8 32.5 28.8 34H19.2C19.2 32.5 19 30.5 17.5 28.5Z" />
      <path d="M19.2 34H28.8M20.5 37.5H27.5" />
      <path d="M21.5 27C22.5 24 25.5 24 26.5 27" opacity="0.8" />
      <path
        d="M24 11.5V6M13.5 15L10.5 11M34.5 15L37.5 11"
        stroke="var(--om-lime)"
      />
    </>
  ),

  bank: (
    <>
      <path d="M7 18L24 8.5L41 18" />
      <path d="M5.5 20.5H42.5" />
      <path d="M12 23V34M18 23V34M24 23V34M30 23V34M36 23V34" opacity="0.85" />
      <path d="M9 36.5H39" />
      <path d="M6.5 40H41.5" />
    </>
  ),

  calculator: (
    <>
      <rect x="12" y="5" width="24" height="38" rx="3.5" />
      <rect x="16" y="9" width="16" height="8" rx="1.5" />
      <rect x="16.5" y="21" width="4" height="4" rx="1" />
      <rect x="22" y="21" width="4" height="4" rx="1" />
      <rect x="27.5" y="21" width="4" height="4" rx="1" />
      <rect x="16.5" y="27.5" width="4" height="4" rx="1" />
      <rect x="22" y="27.5" width="4" height="4" rx="1" />
      <rect x="27.5" y="27.5" width="4" height="4" rx="1" />
      <rect x="16.5" y="34" width="4" height="4" rx="1" />
      <rect x="22" y="34" width="9.5" height="4" rx="1" />
    </>
  ),

  trendArrow: (
    <>
      <path d="M6 36L16 27L23 31L34 16" />
      <path d="M28 16H34.5V22" />
      <circle cx="16" cy="27" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="23" cy="31" r="1.8" fill="currentColor" stroke="none" />
    </>
  ),

  trendDashed: <path d="M6 40L16 33L23 36L34 26" strokeDasharray="3 4" />,

  chatBubble: (
    <>
      <rect x="7" y="10" width="34" height="22" rx="8" />
      <path d="M15 31.5L13 39.5L22.5 31.5" />
      <circle cx="17" cy="21" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="24" cy="21" r="1.7" fill="currentColor" stroke="none" />
      <circle cx="31" cy="21" r="1.7" fill="currentColor" stroke="none" />
    </>
  ),

  plant: (
    <>
      <path d="M24 43C22.5 33 24 22 27 14" />
      <path d="M25 31C18 31.5 15.5 25 14.5 20C20.5 20.5 24.5 25 25 31Z" />
      <path d="M26.5 24C33 23 35.5 17 36.5 12C30.5 12.5 26.5 17.5 26.5 24Z" />
    </>
  ),

  paperPlane: (
    <>
      <path d="M7 25L41 9L26 41L21 28Z" />
      <path d="M41 9L21 28" opacity="0.7" />
    </>
  ),

  rocket: (
    <>
      <path d="M24 5C31 12 34 21 33 30C30 33 18 33 15 30C14 21 17 12 24 5Z" />
      <circle cx="24" cy="18" r="4.5" />
      <path d="M15 27C10 29 9 34 10 38C13.5 37 16 34.5 17 31" />
      <path d="M33 27C38 29 39 34 38 38C34.5 37 32 34.5 31 31" />
      <path d="M18 33H30" opacity="0.6" />
      <path
        d="M20 34C20 40 22 44 24 46C26 44 28 40 28 34C26.5 36 25.5 37 24 37C22.5 37 21.5 36 20 34Z"
        stroke="var(--om-lime)"
      />
    </>
  ),

  diamond: <path d="M24 8L38 24L24 40L10 24Z" />,

  hexagon: <path d="M24 8L37 16V32L24 40L11 32V16Z" />,

  smallCircle: <circle cx="24" cy="24" r="8" />,

  plus: <path d="M24 12V36M12 24H36" />,

  frameMark: (
    <path d="M10 18V10H18M30 10H38V18M38 30V38H30M18 38H10V30" />
  ),

  dots9: <>{dotGrid(3, 3)}</>,

  dots16: <>{dotGrid(4, 4)}</>,

  /* --- Figures. Authored larger than the icon motifs, cropped by the mask. --- */

  /**
   * A founder on their phone, coffee in the other hand. Box ≈ 140 × 190.
   * Limbs are drawn as two contours meeting at the hand, like the rest of the
   * scene — a single stroke reads as a wire next to the outlined torso.
   */
  figurePhone: (
    <>
      {/* head */}
      <path d="M68 50C68 66 76 76 86 76C96 76 104 66 104 50" />
      <path d="M68 50C64 26 90 16 102 28C107 34 105 44 104 50" />
      <path d="M74 38C82 32 94 32 101 39" opacity="0.7" />
      <circle cx="79" cy="52" r="7" />
      <circle cx="96" cy="52" r="6" />
      <path d="M86 52H90M72 51L68 50" opacity="0.85" />
      <path d="M84 64C88 67 94 66 96 62" opacity="0.9" />
      <path d="M80 76V85M94 76V82" />
      {/* torso */}
      <path d="M44 182C44 132 52 100 76 86" />
      <path d="M96 84C118 92 128 132 130 182" />
      <path d="M76 86L86 100L96 84" />
      <path d="M86 100V132" opacity="0.8" />
      {/* raised arm + phone */}
      <path d="M52 102C38 112 30 128 33 142" />
      <path d="M63 109C51 118 43 130 45 141" />
      <path d="M33 142C36 146 42 145 45 141" />
      <path d="M33 142C25 126 23 108 27 95" />
      <path d="M45 141C37 127 34 112 37 96" />
      <path d="M27 95C27 88 37 88 37 96" />
      <rect
        x="14"
        y="50"
        width="28"
        height="44"
        rx="6"
        transform="rotate(-8 28 72)"
      />
      <path d="M21 61H33" opacity="0.6" />
      <circle cx="28" cy="78" r="5" stroke="var(--om-lime)" />
      {/* arm holding the mug */}
      <path d="M106 96C118 106 124 122 120 136" />
      <path d="M99 105C109 113 114 124 111 134" />
      <path d="M120 136C117 139 114 137 111 134" />
      <path d="M120 136C110 148 96 150 86 145" />
      <path d="M111 134C104 141 95 143 88 139" />
      <path d="M86 145C81 145 81 137 88 139" />
      <rect x="56" y="124" width="30" height="28" rx="4" />
      <path d="M56 131H86" opacity="0.7" />
      <path d="M56 132C47 132 47 146 56 146" />
    </>
  ),

  /** A builder shipping from an armchair. Box ≈ 200 × 160. */
  figureLaptop: (
    <>
      {/* armchair */}
      <path d="M150 34C172 40 180 96 166 128L152 124C164 94 158 48 142 42Z" />
      <path d="M90 124H160" />
      <path d="M90 124C82 126 82 134 90 136" />
      <path d="M90 136H158" />
      <path d="M100 136V154M150 136V154" />
      <path d="M94 155H108M144 155H158" opacity="0.7" />
      {/* head — jaw plus a hair cap, so the crown never reads as a helmet */}
      <path d="M112 36C112 48 118 56 124.5 56C131 56 137 48 137 36" />
      <path d="M112 36C109 21 126 14 135 22C138.5 26 137.5 32 137 36" />
      <path d="M116 27C122 23 131 24 135 28" opacity="0.7" />
      <path d="M120 56V61M129 56V60" />
      {/* torso */}
      <path d="M119 60C110 65 104 77 103 92C102 104 104 112 107 120" />
      <path d="M130 59C144 65 150 80 150 98C150 110 149 118 147 124" />
      {/* legs */}
      <path d="M104 102C90 97 75 97 65 103" />
      <path d="M107 122C93 120 77 118 67 120" />
      <path d="M65 104C60 108 59 116 67 120" />
      <path d="M63 112C58 124 58 136 60 148" />
      <path d="M71 120C68 130 68 140 70 148" />
      <path d="M50 152C50 148 55 146 60 148H72V152Z" />
      {/* arm on the keyboard */}
      <path d="M131 63C122 66 114 74 111 80C105 85 96 86 88 84" />
      <path d="M137 70C129 74 122 80 119 85C113 91 100 93 89 90" />
      <path d="M88 84C84 84 83 87 85 90C86 91 87 90 89 90" />
      {/* laptop */}
      <path d="M52 92L96 86" />
      <path d="M52 92L56 97L100 91L96 86" />
      <path d="M52 92L42 56L51 54L61 90Z" />
    </>
  ),
} satisfies Record<string, ReactNode>;

type MotifId = keyof typeof MOTIFS;

type Placement = {
  id: MotifId;
  x: number;
  y: number;
  /** Scale relative to the motif's authored box. Default 1. */
  s?: number;
  /** Rotation in degrees about the motif's own centre. */
  r?: number;
  /** Stroke the whole motif in the accent colour instead of --color-decor. */
  accent?: boolean;
  /** Slowly breathe — reserved for a couple of accent nodes. */
  pulse?: boolean;
  /** Dissolve towards the bottom of the motif instead of ending on a hard cut. */
  fade?: boolean;
};

/** Left cluster, drawn in a 340 × 540 space pinned to the left edge. */
const LEFT_SCENE: Placement[] = [
  { id: "cloud", x: 40, y: 4, s: 1.15 },
  { id: "shield", x: 178, y: 2, s: 0.95 },
  { id: "diamond", x: 118, y: 18, s: 0.42 },
  { id: "dots9", x: 258, y: 12, s: 0.85 },
  { id: "server", x: 34, y: 66, s: 1.2 },
  { id: "terminal", x: 122, y: 62, s: 1.3 },
  { id: "frameMark", x: 214, y: 82, s: 0.5 },
  { id: "donut", x: 14, y: 136, s: 1.45 },
  { id: "plus", x: 104, y: 140, s: 0.42 },
  { id: "chatBubble", x: 146, y: 142, s: 0.95 },
  { id: "smallCircle", x: 268, y: 62, s: 0.55 },
  { id: "figurePhone", x: 48, y: 186, fade: true },
  { id: "plant", x: 198, y: 252, s: 1 },
  { id: "hexagon", x: 246, y: 186, s: 0.5 },
  { id: "dots16", x: 0, y: 300, s: 0.9 },
  { id: "coin", x: 192, y: 330, s: 1.15, accent: true, pulse: true },
  { id: "rocket", x: 30, y: 378, s: 1.25 },
  { id: "paperPlane", x: 152, y: 404, s: 1 },
  { id: "chatBubble", x: 98, y: 452, s: 0.75, accent: true },
  { id: "diamond", x: 12, y: 460, s: 0.5 },
  { id: "smallCircle", x: 224, y: 440, s: 0.6 },
];

/** Right cluster, drawn in a 340 × 540 space pinned to the right edge. */
const RIGHT_SCENE: Placement[] = [
  { id: "bulb", x: 8, y: 6, s: 1.3 },
  { id: "barChart", x: 108, y: 10, s: 1.3 },
  { id: "globe", x: 250, y: 20, s: 1.2 },
  { id: "frameMark", x: 196, y: 26, s: 0.5 },
  { id: "dots9", x: 322, y: 118, s: 0.8 },
  { id: "wallet", x: 86, y: 104, s: 1.1 },
  { id: "moneyBag", x: 166, y: 110, s: 1.05 },
  { id: "document", x: 250, y: 96, s: 1.3 },
  { id: "plus", x: 222, y: 180, s: 0.42 },
  { id: "codeWindow", x: 100, y: 206, s: 1.35 },
  { id: "circuitTree", x: 248, y: 186, s: 1.45 },
  { id: "braces", x: 186, y: 262, s: 0.95 },
  { id: "checkCircle", x: 250, y: 300, s: 1, accent: true, pulse: true },
  { id: "cloud", x: 300, y: 332, s: 0.8 },
  { id: "chatBubble", x: 30, y: 318, s: 0.9, accent: true },
  { id: "hexagon", x: 226, y: 316, s: 0.5 },
  { id: "figureLaptop", x: 52, y: 336, fade: true },
  { id: "bank", x: 248, y: 376, s: 1.3 },
  { id: "calculator", x: 250, y: 452, s: 1 },
  { id: "trendArrow", x: 6, y: 470, s: 1.05, accent: true },
  { id: "trendDashed", x: 6, y: 470, s: 1.05 },
];

/**
 * Below xl there is no gutter to draw in — the headline is 860px wide on its
 * own — so the scene shrinks to the band above the eyebrow, which is clear at
 * every width down to 375px.
 */
const LEFT_COMPACT: Placement[] = [
  { id: "cloud", x: 10, y: 20, s: 0.85 },
  { id: "server", x: 62, y: 16, s: 0.8 },
  { id: "dots9", x: 112, y: 22, s: 0.6 },
  { id: "diamond", x: 108, y: 50, s: 0.35 },
];

const RIGHT_COMPACT: Placement[] = [
  { id: "globe", x: 288, y: 18, s: 0.85 },
  { id: "barChart", x: 228, y: 16, s: 0.8 },
  { id: "dots9", x: 208, y: 24, s: 0.6 },
  { id: "plus", x: 200, y: 52, s: 0.35 },
];

/** Dashed connectors, drawn in cluster space — the "everything is wired up" cue. */
const LEFT_WIRES = [
  "M99 32H142A11 11 0 0 0 153 21V14H174",
  "M192 94H214A11 11 0 0 1 225 105V128A11 11 0 0 0 236 139H258",
  "M96 424H130A12 12 0 0 0 142 412V378A12 12 0 0 1 154 366H200",
];

const RIGHT_WIRES = [
  "M64 34H82A12 12 0 0 1 94 46V72A12 12 0 0 0 106 84H140",
  "M246 132H230A11 11 0 0 0 219 143V152",
  "M168 236H206A12 12 0 0 0 218 224V206A12 12 0 0 1 230 194H248",
];

function Cluster({
  scene,
  wires,
  /** Unique per cluster: the fade mask is referenced by id. */
  name,
  /** Local y range over which `fade` motifs dissolve. */
  fadeRange,
  className,
  style,
}: {
  scene: Placement[];
  wires: string[];
  name: string;
  fadeRange: [number, number];
  className?: string;
  style?: CSSProperties;
}) {
  const maskId = `om-decor-fade-${name}`;

  return (
    <svg
      viewBox="0 0 340 540"
      width="340"
      height="540"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient
          id={`${maskId}-grad`}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={fadeRange[0]}
          x2="0"
          y2={fadeRange[1]}
        >
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x="-40"
          y="-40"
          width="440"
          height={fadeRange[1] + 80}
        >
          <rect
            x="-40"
            y="-40"
            width="440"
            height={fadeRange[1] + 80}
            fill={`url(#${maskId}-grad)`}
          />
        </mask>
      </defs>

      <g opacity="0.75" strokeDasharray="3 7">
        {wires.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      {scene.map(({ id, x, y, s = 1, r = 0, accent, pulse, fade }, i) => (
        <g
          key={`${id}-${i}`}
          transform={`translate(${x} ${y}) scale(${s})${
            r ? ` rotate(${r} 24 24)` : ""
          }`}
          strokeWidth={1.5 / s}
          mask={fade ? `url(#${maskId})` : undefined}
          style={{
            color: accent ? "var(--om-lime)" : undefined,
            animation: pulse
              ? `om-doodle-pulse ${11 + i}s ease-in-out infinite`
              : undefined,
          }}
        >
          {MOTIFS[id]}
        </g>
      ))}
    </svg>
  );
}

/**
 * The decorative layer behind the hero. The scene follows the hero layout so it
 * never crowds the copy: Centered leaves a margin on both sides and gets both
 * clusters, while Editorial starts its copy at the container's left edge, so
 * that side falls back to the corner band and the right cluster carries the
 * composition.
 */
export function HeroDecor({ layout }: { layout: HeroLayout }) {
  const editorial = layout === "Editorial";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[620px] select-none"
    >
      {/* The field the line art sits in — the corners catch a little light. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(58% 62% at 2% 20%, color-mix(in oklab, var(--color-decor) 22%, transparent), transparent 72%), radial-gradient(54% 58% at 99% 34%, color-mix(in oklab, var(--color-decor) 18%, transparent), transparent 72%)",
        }}
      />

      {/* The alpha lives in the stroke colour, not in an element opacity, so the
          lime accents inside the art stay vivid instead of being dimmed with it. */}
      <div className="hero-decor-mask absolute inset-0">
        <Cluster
          name="lc"
          scene={LEFT_COMPACT}
          wires={[]}
          fadeRange={[148, 190]}
          className="absolute top-0 left-0 origin-top-left scale-[0.82] text-decor/55 xl:hidden"
        />

        <Cluster
          name="rc"
          scene={RIGHT_COMPACT}
          wires={[]}
          fadeRange={[148, 190]}
          className="absolute top-0 right-0 origin-top-right scale-[0.82] text-decor/55 xl:hidden"
        />

        <Cluster
          name="l"
          scene={editorial ? LEFT_COMPACT : LEFT_SCENE}
          wires={editorial ? [] : LEFT_WIRES}
          fadeRange={[148, 190]}
          className="absolute top-0 hidden origin-top-left text-decor/70 xl:block"
          style={{
            left: editorial ? 0 : -14,
            animation: "om-doodle-a 24s ease-in-out infinite",
          }}
        />

        <Cluster
          name="r"
          scene={RIGHT_SCENE}
          wires={RIGHT_WIRES}
          fadeRange={[124, 162]}
          className="absolute top-6 hidden origin-top-right text-decor/70 xl:block"
          style={{
            right: editorial ? -26 : -14,
            animation: "om-doodle-b 28s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}
