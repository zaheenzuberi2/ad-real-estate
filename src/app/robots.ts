import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The Studio is the agency's admin panel — it holds client enquiries.
      disallow: ["/studio", "/studio/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
