/**
 * The AD Real Estate mark: a single gold peak forming the "A" (its crossbar
 * counter knocked out), fused with a notched "D". Warm diagonal gold gradient
 * to match the supplied logo.
 *
 * Hand rebuild from a raster. If the designer's vector (.ai / .eps / .svg)
 * turns up, swap these paths for it.
 */

function GoldDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-gold`} x1="0.05" y1="0" x2="0.95" y2="1">
        <stop offset="0" stopColor="#6F5326" />
        <stop offset="0.32" stopColor="#B98F44" />
        <stop offset="0.56" stopColor="#EBD29A" />
        <stop offset="0.8" stopColor="#C8A253" />
        <stop offset="1" stopColor="#9A7734" />
      </linearGradient>
      <linearGradient id={`${id}-gold-front`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8B6C33" />
        <stop offset="0.5" stopColor="#C7A459" />
        <stop offset="1" stopColor="#E4CA85" />
      </linearGradient>
      <linearGradient id={`${id}-bar`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#A9843C" />
        <stop offset="0.55" stopColor="#D8B463" />
        <stop offset="1" stopColor="#E7CA80" />
      </linearGradient>
    </defs>
  );
}

/** The AD monogram: twin gold peaks forming the A + a notched D. */
function Monogram({ id }: { id: string }) {
  return (
    <>
      {/* Back peak — carries the A, its crossbar counter knocked out */}
      <path
        d="M78 6 L134 116 L30 116 Z M78 58 L96 116 L60 116 Z"
        fill={`url(#${id}-gold)`}
        fillRule="evenodd"
      />
      {/* Front peak — a flatter, lighter gold so the ridge reads as two planes */}
      <path d="M44 42 L80 116 L8 116 Z" fill={`url(#${id}-gold-front)`} />

      {/* D — solid bowl with the counter and the horizontal slot knocked out */}
      <path
        d="M112 8 H142 A54 54 0 0 1 142 116 H112 Z
           M112 34 H138 A30 30 0 0 1 138 90 H112 Z
           M134 52 H194 V72 H134 Z"
        fill={`url(#${id}-gold)`}
        fillRule="evenodd"
      />
    </>
  );
}

export function LogoMark({
  size = 28,
  className,
}: {
  /** Rendered height in px; width follows the mark's natural ratio. */
  size?: number;
  className?: string;
}) {
  return (
    <svg
      height={size}
      width={(size * 200) / 124}
      viewBox="0 0 200 124"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <GoldDefs id="mk" />
      <Monogram id="mk" />
    </svg>
  );
}

export function LogoLockup({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 178"
      fill="none"
      className={className}
      role="img"
      aria-label="AD Real Estate"
    >
      <GoldDefs id="lk" />
      <Monogram id="lk" />

      <rect x="0" y="134" width="200" height="40" rx="2" fill="url(#lk-bar)" />
      <text
        x="100"
        y="162"
        textAnchor="middle"
        textLength="168"
        lengthAdjust="spacingAndGlyphs"
        fill="#FFFFFF"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontSize="24"
        fontWeight="800"
      >
        REAL ESTATE
      </text>
    </svg>
  );
}
