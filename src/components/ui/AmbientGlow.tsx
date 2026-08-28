/**
 * Atmospheric backdrop: a dark ground carrying two large, soft glows (warm
 * gold, cool navy-teal) plus a fine film-grain so the gradient never looks
 * like flat computer output. Same device as the reference the client sent —
 * ported into the site's own navy/gold palette rather than its orange/blue,
 * so it reads as this brand's atmosphere, not a borrowed one.
 */
export function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {/* Base + two soft directional glows */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 82% -8%, rgba(235,206,142,0.22) 0%, rgba(198,161,91,0.10) 32%, transparent 62%)," +
            "radial-gradient(ellipse 70% 60% at 8% 108%, rgba(30,86,120,0.42) 0%, rgba(19,41,75,0.28) 38%, transparent 68%)," +
            "linear-gradient(155deg, #060D1A 0%, #0B1B33 55%, #0E2340 100%)",
        }}
      />

      {/* Fine grain so the glows read as light on a surface, not a flat gradient */}
      <div
        className="absolute inset-0 mix-blend-overlay"
        style={{
          opacity: 0.5,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
