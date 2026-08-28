import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Sanity Studio pulls swr's react-server build when bundled for RSC, which
  // has no default export. Keeping it external lets Node resolve it normally.
  serverExternalPackages: ["sanity", "@sanity/vision"],

  images: {
    formats: ["image/avif", "image/webp"],
    // Sanity CDN, for property photos uploaded in Studio.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
