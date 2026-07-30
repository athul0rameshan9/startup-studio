import type { CSSProperties } from "react";

import type { PaletteId, RhythmId, Settings } from "@/lib/content/schema";

/**
 * The four accent palettes offered by the reference design.
 * Each triple is [base, highlight, deep] and maps to
 * --om-lime / --om-lime-hi / --om-green.
 */
export const PALETTES: Record<
  PaletteId,
  { label: string; base: string; hi: string; deep: string }
> = {
  lime: { label: "Lime", base: "#B8E62A", hi: "#CDF556", deep: "#3FA80B" },
  sky: { label: "Sky", base: "#5AC8FA", hi: "#8FDCFF", deep: "#0A6FB8" },
  amber: { label: "Amber", base: "#F2A93B", hi: "#FFC46B", deep: "#B96A06" },
  coral: { label: "Coral", base: "#FF7A5C", hi: "#FFA78F", deep: "#C4381A" },
};

export const PALETTE_IDS = Object.keys(PALETTES) as PaletteId[];

/**
 * Vertical rhythm presets: [section padding, tight section padding, hero padding].
 */
export const RHYTHMS: Record<
  RhythmId,
  { pad: number; padSm: number; heroPad: number }
> = {
  Airy: { pad: 124, padSm: 96, heroPad: 92 },
  Balanced: { pad: 96, padSm: 80, heroPad: 72 },
  Tight: { pad: 68, padSm: 56, heroPad: 56 },
};

export const RHYTHM_IDS = Object.keys(RHYTHMS) as RhythmId[];

/**
 * CSS custom properties applied to the site wrapper. Every accent colour and
 * every section padding in the site components reads from these, so changing
 * the appearance settings re-themes the whole page.
 */
export function themeStyle(settings: Settings): CSSProperties {
  const palette = PALETTES[settings.palette] ?? PALETTES.lime;
  const rhythm = RHYTHMS[settings.rhythm] ?? RHYTHMS.Balanced;

  return {
    "--om-lime": palette.base,
    "--om-lime-hi": palette.hi,
    "--om-green": palette.deep,
    "--om-pad": `${rhythm.pad}px`,
    "--om-pad-sm": `${rhythm.padSm}px`,
    "--om-hero-pad": `${rhythm.heroPad}px`,
  } as CSSProperties;
}

/** Strips the leading `#` — simpleicons CDN URLs take bare hex. */
export function bareHex(hex: string): string {
  return hex.replace(/^#/, "");
}
