import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon. iOS applies its own mask, so the mark stays well inset. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #060D1A 0%, #13294B 100%)",
        }}
      >
        <svg width="118" height="100" viewBox="0 0 120 100">
          <defs>
            <linearGradient id="ai" x1="8" y1="8" x2="112" y2="94" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#D8B15F" />
              <stop offset="0.55" stopColor="#F0D48A" />
              <stop offset="1" stopColor="#B98F42" />
            </linearGradient>
          </defs>
          <path d="M62 6 L112 92 H74 L43 38 Z" fill="url(#ai)" />
          <path d="M34 34 L74 92 H0 Z" fill="url(#ai)" />
          <path d="M34 52 L47 74 H21 Z" fill="#0B1B33" />
        </svg>
      </div>
    ),
    size
  );
}
