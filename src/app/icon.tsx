import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** The AD peaks on navy, sized to stay legible at 16px in a tab strip. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#060D1A",
          borderRadius: 12,
        }}
      >
        <svg width="46" height="40" viewBox="0 0 120 100">
          <defs>
            <linearGradient id="i" x1="8" y1="8" x2="112" y2="94" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#D8B15F" />
              <stop offset="0.55" stopColor="#F0D48A" />
              <stop offset="1" stopColor="#B98F42" />
            </linearGradient>
          </defs>
          <path d="M62 6 L112 92 H74 L43 38 Z" fill="url(#i)" />
          <path d="M34 34 L74 92 H0 Z" fill="url(#i)" />
          <path d="M34 52 L47 74 H21 Z" fill="#060D1A" />
        </svg>
      </div>
    ),
    size
  );
}
