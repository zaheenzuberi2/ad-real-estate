import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { getProperty, getProperties } from "@/lib/properties-data";
import { site } from "@/lib/site";

export const alt = "Property at AD Real Estate";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/images/logo-mark.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

export async function generateStaticParams() {
  const properties = await getProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

/**
 * A per-listing card, so a project shared into a WhatsApp group shows that
 * project rather than the generic site image.
 */
export default async function Image(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const property = await getProperty(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(135deg, #060D1A 0%, #12294A 55%, #1E3D66 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(198,161,91,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(198,161,91,0.14) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <img src={logoSrc} height={52} />
          <span style={{ fontSize: 24, fontWeight: 700, color: "#fff" }}>
            {site.name}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {property?.status && (
            <div style={{ display: "flex" }}>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: 3,
                  color: "#060D1A",
                  background: "#C6A15B",
                  padding: "8px 18px",
                  borderRadius: 999,
                  marginBottom: 24,
                }}
              >
                {property.status.toUpperCase()}
              </span>
            </div>
          )}
          <span
            style={{
              fontSize: 68,
              fontWeight: 600,
              color: "#fff",
              lineHeight: 1.06,
              maxWidth: 940,
              letterSpacing: -1.5,
            }}
          >
            {property?.title ?? "Property"}
          </span>
          <span style={{ fontSize: 26, color: "#C6A15B", marginTop: 18 }}>
            {property?.location ?? "Islamabad"}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "44px",
            borderTop: "1px solid rgba(198,161,91,0.32)",
            paddingTop: "26px",
          }}
        >
          {[
            [property?.sizes?.join("  ·  ") ?? "Various", "SIZES"],
            [property?.propertyType ?? "Property", "TYPE"],
            [site.phone.display, "ENQUIRE"],
          ].map(([value, label]) => (
            <div key={label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 25, fontWeight: 700, color: "#EBCE8E" }}>
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
