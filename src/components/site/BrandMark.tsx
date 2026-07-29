type BrandMarkProps = {
  /** Unique per instance — the SVG clip path is referenced by id. */
  markId: string;
  size: number;
  label: string;
};

/** The Startup Studio monogram, ported verbatim from the reference design. */
export function BrandMark({ markId, size, label }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label={label}
      className="block"
      style={{ width: size, height: size, flex: `0 0 ${size}px` }}
    >
      <defs>
        <clipPath id={markId}>
          <rect x="0" y="0" width="48" height="48" rx="15" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${markId})`}>
        <rect
          x="0"
          y="0"
          width="48"
          height="48"
          fill="var(--om-lime, #B8E62A)"
        />
        <path d="M48 0 L48 21 L27 0 Z" fill="#14172B" opacity="0.22" />
        <path d="M0 48 L0 27 L21 48 Z" fill="#14172B" opacity="0.22" />
        <path
          d="M31.5 12.5 C27.5 7 14.5 9 15 17 C15.5 24.5 31 22 32.8 29.5 C34.6 37.2 22.5 42 16.5 36.4"
          fill="none"
          stroke="#14172B"
          strokeWidth="5.4"
          strokeLinecap="round"
        />
        <circle cx="31.5" cy="12.5" r="3.6" fill="#14172B" />
        <circle cx="32.8" cy="11.4" r="1.15" fill="var(--om-lime, #B8E62A)" />
        <circle cx="10.5" cy="12" r="1.9" fill="#14172B" opacity="0.35" />
        <circle cx="38" cy="38.5" r="1.4" fill="#14172B" opacity="0.35" />
      </g>
    </svg>
  );
}
