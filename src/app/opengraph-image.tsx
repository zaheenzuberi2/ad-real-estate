import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { site } from "@/lib/site";

export const alt = `${site.name}: Property Advisory in DHA, Islamabad`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/images/logo-mark.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

/**
 * Shared on WhatsApp far more than anywhere else for this audience, so the
 * mark and the phone number have to survive a small thumbnail.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 72px",
          background:
            "linear-gradient(135deg, #060D1A 0%, #0B1B33 52%, #16305A 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Plot grid, the same texture the hero uses */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(198,161,91,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(198,161,91,0.16) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          <img src={logoSrc} height={64} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 38, fontWeight: 700, color: "#fff", letterSpacing: -0.5 }}>
              {site.name}
            </span>
            <span style={{ fontSize: 15, letterSpacing: 6, color: "#C6A15B", marginTop: 4 }}>
              DHA · BAHRIA TOWN · ISLAMABAD
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 70,
              fontWeight: 600,
              color: "#fff",
              lineHeight: 1.08,
              maxWidth: 880,
              letterSpacing: -1.5,
            }}
          >
            A real estate agency for DHA, Islamabad
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "46px",
            borderTop: "1px solid rgba(198,161,91,0.32)",
            paddingTop: "28px",
          }}
        >
          {[
            [`${site.rating.value.toFixed(1)} / 5`, `${site.rating.count} GOOGLE REVIEWS`],
            ["Phase 1 to 9", "FULL COVERAGE"],
            [site.phone.display, "SPEAK TO AN ADVISOR"],
          ].map(([value, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 27, fontWeight: 700, color: "#EBCE8E" }}>
                {value}
              </span>
              <span style={{ fontSize: 13, letterSpacing: 2, color: "#94a3b8", marginTop: 4 }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
