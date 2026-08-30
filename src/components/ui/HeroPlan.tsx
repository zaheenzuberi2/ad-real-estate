"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

/**
 * The hero's visual anchor: a framed survey-plan of the two territories the
 * agency works — sector grids, the expressway spine between them, and the
 * parcels picked out the way a verified file is marked up before a shoot.
 *
 * The strong form of the motif the old <SurveyLight> only hinted at, but kept
 * as a contained plan sheet rather than a full-bleed wash, so it sits beside
 * the headline instead of fighting it. Pure vector geometry — no pretend
 * photography — so it stays honest on a listing brand.
 *
 * On first view the linework draws itself in once, then the marked parcels
 * settle. Under prefers-reduced-motion it renders complete and still.
 */
export function HeroPlan() {
  // Reduced-motion viewers start on the finished plan; everyone else gets the
  // draw-in a beat after mount. Computed at first render so the effect never
  // has to setState synchronously.
  const [drawn, setDrawn] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 220);
    return () => clearTimeout(t);
  }, []);

  const lat = site.geo.lat.toFixed(2);
  const lng = site.geo.lng.toFixed(2);

  return (
    <div
      data-drawn={drawn ? "true" : undefined}
      className="relative overflow-hidden rounded-[1.25rem] border border-gold/20 bg-navy-deep/40 shadow-[0_2px_8px_rgba(6,13,26,0.4),0_40px_80px_-40px_rgba(6,13,26,0.9)] backdrop-blur-[2px]"
      aria-hidden="true"
    >
      <style>{`
        .hp-line {
          stroke-dasharray: var(--len, 1400);
          stroke-dashoffset: var(--len, 1400);
          transition: stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hp-fill { opacity: 0; transition: opacity 0.7s ease 0.9s; }
        .hp-fade { opacity: 0; transition: opacity 1s ease 0.35s; }
        [data-drawn="true"] .hp-line { stroke-dashoffset: 0; }
        [data-drawn="true"] .hp-fill { opacity: 1; }
        [data-drawn="true"] .hp-fade { opacity: 1; }
        @media (prefers-reduced-motion: reduce) {
          .hp-line, .hp-fill, .hp-fade { transition: none; }
        }
      `}</style>

      <svg
        viewBox="0 0 400 360"
        className="block h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        stroke="#C6A15B"
      >
        {/* base grid */}
        <g className="hp-fade" stroke="#C6A15B" strokeWidth="0.5" opacity="0.18">
          {Array.from({ length: 11 }, (_, i) => 20 + i * 36).map((p) => (
            <path key={`v${p}`} d={`M${p} 20 V340`} />
          ))}
          {Array.from({ length: 10 }, (_, i) => 20 + i * 36).map((p) => (
            <path key={`h${p}`} d={`M20 ${p} H380`} />
          ))}
        </g>

        {/* expressway spine — the strongest line on the sheet */}
        <path
          className="hp-line"
          style={{ ["--len" as string]: 520 }}
          d="M8 132 C 96 132, 132 210, 232 210 S 372 250, 392 252"
          stroke="#EBCE8E"
          strokeWidth="12"
          opacity="0.14"
        />
        <path
          className="hp-line"
          style={{ ["--len" as string]: 520, transitionDelay: "0.1s" }}
          d="M8 132 C 96 132, 132 210, 232 210 S 372 250, 392 252"
          stroke="#EBCE8E"
          strokeWidth="1.6"
          strokeDasharray="9 7"
          opacity="0.95"
        />

        {/* sector A — DHA Phase 5 & 6 grid */}
        <g
          className="hp-line"
          style={{ ["--len" as string]: 460, transitionDelay: "0.26s" }}
          stroke="#C6A15B"
          strokeWidth="1.5"
          opacity="0.9"
        >
          <path d="M44 44 H188 V140 H44 Z" />
          <path d="M92 44 V140 M140 44 V140 M44 76 H188 M44 108 H188" />
        </g>
        <g
          className="hp-fill"
          fill="#EBCE8E"
          fillOpacity="0.24"
          stroke="#EBCE8E"
          strokeWidth="1.6"
        >
          <rect x="45" y="77" width="46" height="30" />
          <rect x="141" y="45" width="46" height="30" />
        </g>

        {/* sector B — DHA Phase 6 loop road with internal spines */}
        <path
          className="hp-line"
          style={{ ["--len" as string]: 720, transitionDelay: "0.4s" }}
          d="M244 92 q86 -16 106 62 q20 104 -78 118 q-104 8 -104 -90 q0 -78 76 -90 Z"
          stroke="#C6A15B"
          strokeWidth="1.5"
          opacity="0.88"
        />
        <g
          className="hp-line"
          style={{ ["--len" as string]: 360, transitionDelay: "0.52s" }}
          stroke="#C6A15B"
          strokeWidth="1.2"
          opacity="0.6"
        >
          <path d="M244 168 H352 M276 108 V236 M314 100 V240" />
        </g>
        <rect
          className="hp-fill"
          x="277"
          y="169"
          width="37"
          height="37"
          fill="#EBCE8E"
          fillOpacity="0.24"
          stroke="#EBCE8E"
          strokeWidth="1.6"
          style={{ transitionDelay: "1.05s" }}
        />

        {/* dimension line under sector A */}
        <g className="hp-fade" stroke="#C6A15B" strokeWidth="1" opacity="0.5">
          <path d="M44 156 H188 M44 150 V162 M188 150 V162" />
        </g>

        {/* north mark */}
        <g className="hp-fade" opacity="0.75" transform="translate(366 60)">
          <path d="M0 -16 L6 10 L0 4 L-6 10 Z" fill="#EBCE8E" stroke="none" />
          <text
            x="0"
            y="24"
            textAnchor="middle"
            fill="#EBCE8E"
            fontSize="11"
            fontWeight="700"
            letterSpacing="1"
            stroke="none"
          >
            N
          </text>
        </g>

        {/* sector labels */}
        <g
          className="hp-fade"
          fill="#C6A15B"
          stroke="none"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.5"
          opacity="0.85"
        >
          <text x="44" y="36">DHA PHASE 5</text>
          <text x="244" y="84">DHA PHASE 6</text>
        </g>
      </svg>

      {/* caption strip — reads as the sheet's title block */}
      <div className="flex items-center justify-between border-t border-gold/15 bg-navy-deep/50 px-4 py-2.5">
        <span className="eyebrow text-[9px] text-gold/80">Territory masterplan</span>
        <span className="font-display text-[11px] tracking-wide text-slate-400">
          {lat}&deg;N&nbsp; {lng}&deg;E
        </span>
      </div>
    </div>
  );
}
