/** Joins class names, dropping falsy values. */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/** `#B8E62A` + `1F` → `#B8E62A1F` (an 8-digit hex with alpha). */
export function withAlpha(hex: string, alphaHex: string): string {
  return `${hex}${alphaHex}`;
}

/**
 * True for images next/image can optimize: local files only, and not SVG —
 * the optimizer rejects SVG unless `dangerouslyAllowSVG` is turned on.
 */
export function isOptimizableAsset(src: string): boolean {
  if (!src.startsWith("/") || src.startsWith("//")) return false;
  return !src.split("?")[0].toLowerCase().endsWith(".svg");
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
