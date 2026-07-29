import Image from "next/image";
import type { CSSProperties } from "react";

import { isOptimizableAsset } from "@/lib/utils";

type MediaProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  sizes?: string;
};

/**
 * Image sources are content, so they can be a local upload or any URL an
 * editor pastes in. Local raster files go through next/image; remote URLs and
 * SVGs render as a plain <img>, which avoids maintaining a `remotePatterns`
 * allow-list and avoids turning on `dangerouslyAllowSVG`.
 */
export function Media({
  src,
  alt,
  width,
  height,
  className,
  style,
  priority,
  sizes,
}: MediaProps) {
  if (isOptimizableAsset(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={style}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote URL or SVG
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={style}
    />
  );
}
