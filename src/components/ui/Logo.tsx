import Image from "next/image";

/**
 * The AD Real Estate mark and full lockup, cropped from the client-supplied
 * logo file (public/images/logo-mark.png / logo.png). Replaces the earlier
 * hand-rebuilt SVG approximation now that the real asset is available.
 */

const MARK_RATIO = 780 / 300;
const LOCKUP_RATIO = 900 / 308;

export function LogoMark({
  size = 28,
  className,
}: {
  /** Rendered height in px; width follows the mark's natural ratio. */
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/images/logo-mark.png"
      alt="AD Real Estate"
      width={Math.round(size * MARK_RATIO)}
      height={size}
      className={className}
    />
  );
}

export function LogoLockup({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo.png"
      alt="AD Real Estate"
      width={900}
      height={308}
      sizes="(max-width: 640px) 90vw, 340px"
      style={{ height: "auto", width: "100%", aspectRatio: LOCKUP_RATIO }}
      className={className}
    />
  );
}
