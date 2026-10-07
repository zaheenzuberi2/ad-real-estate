import type { MetadataRoute } from "next";
import { getProperties } from "@/lib/properties-data";
import { guides } from "@/content/guides";
import { getPosts } from "@/lib/blog-data";
import { dhaLocations } from "@/content/locations";
import { site } from "@/lib/site";

// Without this, Next statically generates the sitemap once at build time —
// new Sanity listings silently never show up in it until the next deploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [properties, posts] = await Promise.all([getProperties(), getPosts()]);

  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/properties", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/areas", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/commercial", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/guides", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...properties.map((p) => ({
      url: `${site.url}/properties/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...guides.map((g) => ({
      url: `${site.url}/guides/${g.slug}`,
      lastModified: new Date(g.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.modified),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...dhaLocations.map((l) => ({
      url: `${site.url}/areas/${l.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
