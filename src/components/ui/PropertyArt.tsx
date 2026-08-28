/**
 * Site-plan geometry, standing in until real photography arrives.
 *
 * The earlier version drew little scenes: a road with a vanishing point, trees,
 * a house with windows. Illustrated pictures pretending to be photographs read
 * as amateur on a listing, and they imply a view of the plot that nobody has
 * actually seen. This draws what an agency genuinely has before a shoot: the
 * parcel layout, with the offered plots picked out. It shares the survey grid
 * with the hero, so it belongs to the same world rather than borrowing one.
 */
export function PropertyArt({
  variant,
}: {
  variant: "road" | "orchard" | "villa";
}) {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id={`grid-${variant}`} width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0 H0 V25" fill="none" stroke="#EBCE8E" strokeWidth="0.5" opacity="0.16" />
        </pattern>
      </defs>

      <rect width="400" height="300" fill={`url(#grid-${variant})`} />

      {variant === "road" && (
        <>
          {/* Expressway spine, with plots fronting it */}
          <path d="M0 196 H400" stroke="#EBCE8E" strokeWidth="14" opacity="0.1" />
          <path
            d="M0 196 H400"
            stroke="#EBCE8E"
            strokeWidth="1"
            opacity="0.5"
            strokeDasharray="14 12"
          />
          {[30, 105, 180, 255, 330].map((x, i) => (
            <rect
              key={x}
              x={x}
              y={112}
              width="62"
              height="62"
              fill={i === 2 ? "#EBCE8E" : "none"}
              fillOpacity={i === 2 ? 0.22 : 0}
              stroke="#EBCE8E"
              strokeWidth="1.1"
              opacity={i === 2 ? 0.85 : 0.4}
            />
          ))}
          {[30, 105, 180, 255, 330].map((x) => (
            <rect
              key={`s-${x}`}
              x={x}
              y={216}
              width="62"
              height="52"
              fill="none"
              stroke="#EBCE8E"
              strokeWidth="1.1"
              opacity="0.28"
            />
          ))}
        </>
      )}

      {variant === "orchard" && (
        <>
          {/* Curved enclave loop with parcels on the outer edge */}
          <path
            d="M-10 236 Q110 150 200 196 T410 150"
            fill="none"
            stroke="#EBCE8E"
            strokeWidth="12"
            opacity="0.1"
          />
          <path
            d="M-10 236 Q110 150 200 196 T410 150"
            fill="none"
            stroke="#EBCE8E"
            strokeWidth="1"
            opacity="0.45"
            strokeDasharray="12 10"
          />
          {[
            { x: 42, y: 118, on: false },
            { x: 118, y: 96, on: true },
            { x: 194, y: 108, on: false },
            { x: 270, y: 82, on: false },
            { x: 330, y: 68, on: false },
          ].map((p) => (
            <rect
              key={p.x}
              x={p.x}
              y={p.y}
              width="56"
              height="56"
              fill={p.on ? "#EBCE8E" : "none"}
              fillOpacity={p.on ? 0.22 : 0}
              stroke="#EBCE8E"
              strokeWidth="1.1"
              opacity={p.on ? 0.85 : 0.36}
            />
          ))}
        </>
      )}

      {variant === "villa" && (
        <>
          {/* Larger kanal parcels, one with a footprint set inside */}
          {[
            { x: 34, y: 92, w: 104, h: 116, on: false },
            { x: 150, y: 92, w: 104, h: 116, on: true },
            { x: 266, y: 92, w: 104, h: 116, on: false },
          ].map((p) => (
            <rect
              key={p.x}
              x={p.x}
              y={p.y}
              width={p.w}
              height={p.h}
              fill={p.on ? "#EBCE8E" : "none"}
              fillOpacity={p.on ? 0.18 : 0}
              stroke="#EBCE8E"
              strokeWidth="1.2"
              opacity={p.on ? 0.85 : 0.36}
            />
          ))}
          {/* Building footprint on the highlighted parcel */}
          <rect
            x="168"
            y="118"
            width="68"
            height="58"
            fill="none"
            stroke="#EBCE8E"
            strokeWidth="1.4"
            opacity="0.8"
          />
          <path d="M168 176 H236" stroke="#EBCE8E" strokeWidth="1.4" opacity="0.5" />
          <path d="M150 208 H370" stroke="#EBCE8E" strokeWidth="1" opacity="0.32" strokeDasharray="10 8" />
        </>
      )}

      {/* North mark, the way a plan sheet carries one */}
      <g opacity="0.5" transform="translate(360 46)">
        <path d="M0 -14 L6 8 L0 3 L-6 8 Z" fill="#EBCE8E" />
        <text
          x="0"
          y="24"
          textAnchor="middle"
          fill="#EBCE8E"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1"
        >
          N
        </text>
      </g>
    </svg>
  );
}
