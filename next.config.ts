import type { NextConfig } from "next";

/**
 * Content Security Policy — shipped in **Report-Only** mode.
 *
 * It does not block anything yet; violations are reported to the browser
 * console so the policy can be tightened against real traffic before it is
 * switched to the enforcing `Content-Security-Policy` header.
 *
 * `'unsafe-eval'` and the broad `'unsafe-inline'` on `script-src` are here
 * only because the embedded Sanity Studio (/studio) needs them. Once the
 * policy is enforced, the cleaner path is a separate, stricter entry for the
 * marketing routes (nonce-based, no eval) with Studio kept on this looser one.
 */
const cspReportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://maps.gstatic.com https://maps.googleapis.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sanity.io wss://*.sanity.io",
  "media-src 'self'",
  "worker-src 'self' blob:",
  // Google Maps embed on the contact page (loaded on click via the map facade).
  "frame-src 'self' https://maps.google.com https://www.google.com",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // Sanity Studio pulls swr's react-server build when bundled for RSC, which
  // has no default export. Keeping it external lets Node resolve it normally.
  serverExternalPackages: ["sanity", "@sanity/vision"],

  images: {
    formats: ["image/avif", "image/webp"],
    // Sanity CDN, for property photos uploaded in Studio.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },

  async redirects() {
    return [
      // Canonical host is the apex; www is only registered so it resolves.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.adrealestate.pk" }],
        destination: "https://adrealestate.pk/:path*",
        permanent: true,
      },
    ];
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
          // Vercel serves HTTPS only; two years, subdomains, preload-eligible.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy-Report-Only",
            value: cspReportOnly,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
