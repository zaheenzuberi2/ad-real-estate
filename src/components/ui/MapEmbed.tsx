"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Facade for the Google Maps embed.
 *
 * The real <iframe> loads a full third-party app (its own JS, tiles, fonts) and
 * is the slowest thing on the contact section. Until the visitor actually wants
 * the map we show a lightweight branded placeholder and only mount the iframe on
 * click. Hovering the placeholder warms the connection so the click feels
 * instant.
 */
export function MapEmbed({
  query,
  addressLine,
}: {
  /** URL-encoded search string, e.g. `encodeURIComponent("AD Real Estate, ...")`. */
  query: string;
  /** Short human-readable address shown on the placeholder. */
  addressLine: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [warm, setWarm] = useState(false);

  return (
    <div className="relative h-72 overflow-hidden rounded-2xl border border-hairline shadow-[0_1px_2px_rgba(11,27,51,0.06),0_12px_28px_-12px_rgba(11,27,51,0.18)]">
      {/* React 19 hoists these to <head>; rendered on hover to warm the connection. */}
      {warm && !loaded && (
        <>
          <link rel="preconnect" href="https://maps.google.com" />
          <link rel="preconnect" href="https://maps.gstatic.com" />
        </>
      )}

      {loaded ? (
        <iframe
          title="Interactive map to the AD Real Estate office in DHA Phase 5, Islamabad"
          src={`https://maps.google.com/maps?q=${query}&output=embed`}
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          onMouseEnter={() => setWarm(true)}
          onFocus={() => setWarm(true)}
          aria-label="Load the interactive map"
          className="tap group relative flex h-full w-full flex-col items-center justify-center gap-3 bg-navy-deep text-center"
        >
          {/* Street-grid motif, purely decorative. */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]"
          >
            <defs>
              <pattern id="map-grid" width="44" height="44" patternUnits="userSpaceOnUse">
                <path d="M44 0H0V44" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#map-grid)" />
            <path d="M-20 130 L520 40" stroke="currentColor" strokeWidth="6" className="text-gold/70" fill="none" />
          </svg>

          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gold text-navy-deep shadow-[0_8px_20px_-6px_rgba(198,161,91,0.6)] transition-transform duration-300 ease-brand group-hover:scale-105">
            <Icon name="map-pin" className="h-5 w-5" />
          </span>
          <span className="relative max-w-[16rem] px-6 text-xs leading-relaxed text-slate-300">
            {addressLine}
          </span>
          <span className="relative inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-gold">
            View interactive map
            <Icon name="arrow-right" className="h-3.5 w-3.5" />
          </span>
        </button>
      )}
    </div>
  );
}
