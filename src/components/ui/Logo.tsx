/**
 * Vector rebuild of the AD Real Estate mark: twin peaks forming the "A",
 * paired with the notched "D".
 *
 * Traced by eye from the supplied raster. Two things make it survive real use:
 * the A's counter is knocked out of the path rather than painted over, so any
 * ground shows through it, and the front peak carries a darker gold so the two
 * planes stay separate instead of merging into one silhouette.
 *
 * If the original vector (.ai / .eps / .svg) turns up, replace these paths.
 */

function GoldDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-back`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8A6A2F" />
        <stop offset="0.45" stopColor="#DDB765" />
        <stop offset="0.75" stopColor="#F2D791" />
        <stop offset="1" stopColor="#C39B4A" />
      </linearGradient>
      <linearGradient id={`${id}-front`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#6E5324" />
        <stop offset="0.5" stopColor="#B8913F" />
        <stop offset="1" stopColor="#8A6A2F" />
      </linearGradient>
    </defs>
  );
}

export function LogoMark({
  size = 36,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 104"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <GoldDefs id="mk" />

      {/* Tall peak carrying the A, counter knocked out */}
      <path
        d="M76 6 L126 98 H26 Z M76 50 L94 82 H58 Z"
        fill="url(#mk-back)"
        fillRule="evenodd"
      />

      {/* Front peak, darker so the two planes read apart */}
      <path d="M30 46 L62 98 H0 Z" fill="url(#mk-front)" />
    </svg>
  );
}

export function LogoLockup({
  className,
  tone = "onDark",
}: {
  className?: string;
  /** Only the wordmark inside the bar changes; the peaks work on any ground. */
  tone?: "onDark" | "onLight";
}) {
  return (
    <svg
      viewBox="0 0 320 148"
      fill="none"
      className={className}
      role="img"
      aria-label="AD Real Estate"
    >
      <GoldDefs id="lk" />

      {/* A */}
      <path
        d="M96 6 L146 98 H46 Z M96 50 L114 82 H78 Z"
        fill="url(#lk-back)"
        fillRule="evenodd"
      />
      <path d="M50 46 L82 98 H20 Z" fill="url(#lk-front)" />

      {/* D, with the horizontal slot cut through the bowl */}
      <path
        d="M170 6 H222 a46 46 0 0 1 0 92 H170 V64 h30 a14 14 0 0 0 0-28 h-30 Z"
        fill="url(#lk-back)"
      />

      {/* Wordmark bar */}
      <rect x="0" y="110" width="320" height="38" fill="url(#lk-back)" />
      <text
        x="160"
        y="136"
        textAnchor="middle"
        fill={tone === "onDark" ? "#060D1A" : "#FFFFFF"}
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontSize="24"
        fontWeight="800"
        letterSpacing="8"
      >
        REAL ESTATE
      </text>
    </svg>
  );
}
