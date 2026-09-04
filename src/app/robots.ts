import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Studio and the custom admin panel both hold client enquiries — keep
      // both, and their login screens, out of the index.
      disallow: ["/studio", "/studio/", "/admin", "/admin/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
