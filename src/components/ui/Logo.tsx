/**
 * The AD Real Estate mark and full lockup, cropped from the client-supplied
 * logo file (public/images/logo-mark.png / logo.png). Replaces the earlier
 * hand-rebuilt SVG approximation now that the real asset is available.
 */

export function LogoMark({
  size = 28,
  className,
}: {
  /** Rendered height in px; width follows the mark's natural ratio. */
  size?: number;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo-mark.png"
      alt="AD Real Estate"
      height={size}
      style={{ height: size, width: "auto" }}
      className={className}
    />
  );
}

export function LogoLockup({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo.png"
      alt="AD Real Estate"
      className={className}
      style={{ height: "auto", width: "100%" }}
    />
  );
}
