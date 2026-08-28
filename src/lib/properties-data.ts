import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import type { Property } from "@/lib/types";
import { properties as staticProperties } from "@/content/properties";

/**
 * Live property data, sourced from Sanity when it's configured and falling
 * back to the seed file otherwise — so the site never breaks in an
 * environment without Sanity env vars (a fresh clone, a preview deploy that
 * hasn't been given secrets yet, or Sanity itself being briefly down).
 *
 * This is the one place that turns a Sanity document into the same `Property`
 * shape the rest of the site already renders, so components don't need to
 * know or care where the data came from.
 */

const builder = isSanityConfigured ? createImageUrlBuilder(sanityClient) : null;

export function urlForImage(source: SanityImageSource) {
  if (!builder) return undefined;
  return builder.image(source).auto("format").url();
}

// Cycled by document order so any listing added purely through Studio still
// gets a sensible card look before real photos exist for it.
const ART_CYCLE = ["road", "orchard", "villa"] as const;
const GRADIENT_CYCLE = [
  "linear-gradient(135deg, #060D1A 0%, #13294B 60%, #1E3D66 100%)",
  "linear-gradient(135deg, #0E2038 0%, #1B3860 55%, #274873 100%)",
  "linear-gradient(135deg, #0A1830 0%, #142C4E 55%, #1F3E68 100%)",
];

type SanityImage = {
  asset?: { _ref: string };
  alt?: string;
};

type SanityProperty = {
  title: string;
  slug: { current: string };
  eyebrow: string;
  location: string;
  phase: string;
  propertyType: Property["propertyType"];
  status: Property["status"];
  description: string;
  overview?: string[];
  images?: SanityImage[];
  priceFrom?: number | null;
  priceNote?: string;
  sizes?: string[];
  features?: { icon: Property["features"][number]["icon"]; label: string }[];
  highlights?: string[];
  installmentMonths?: number;
  featured?: boolean;
};

const PROPERTY_PROJECTION = `{
  title,
  slug,
  eyebrow,
  location,
  phase,
  propertyType,
  status,
  description,
  overview,
  images[]{ asset, alt },
  priceFrom,
  priceNote,
  sizes,
  features[]{ icon, label },
  highlights,
  installmentMonths,
  featured
}`;

function toProperty(doc: SanityProperty, index: number): Property {
  const photos = (doc.images ?? [])
    .filter((img) => img.asset)
    .map((img) => ({ url: urlForImage(img)!, alt: img.alt ?? doc.title }))
    .filter((p) => p.url);

  return {
    slug: doc.slug.current,
    title: doc.title,
    eyebrow: doc.eyebrow,
    location: doc.location,
    phase: doc.phase,
    propertyType: doc.propertyType,
    status: doc.status,
    description: doc.description,
    overview: doc.overview ?? [],
    priceFrom: doc.priceFrom ?? null,
    priceNote: doc.priceNote ?? "",
    sizes: doc.sizes ?? [],
    features: doc.features ?? [],
    badge: doc.installmentMonths
      ? { text: `${doc.installmentMonths}-Month Installment Plans Available`, highlight: true }
      : undefined,
    gradient: GRADIENT_CYCLE[index % GRADIENT_CYCLE.length],
    art: ART_CYCLE[index % ART_CYCLE.length],
    installmentMonths: doc.installmentMonths,
    highlights: doc.highlights ?? [],
    featured: doc.featured ?? false,
    photos: photos.length > 0 ? photos : undefined,
  };
}

/**
 * All published properties, ordered the way Studio's "Sort Order" field
 * defines.
 *
 * Deliberately NOT cached across requests in process memory: a hand-rolled
 * `let cache` here previously kept serving the first result for the entire
 * life of the server process, silently breaking the one promise a CMS makes —
 * that editing in Studio updates the live site. Sanity's CDN-backed client
 * (`useCdn: true`) is already fast; that is the right layer to cache at, not
 * a module-level variable with no invalidation path.
 */
export async function getProperties(): Promise<Property[]> {
  if (!isSanityConfigured) return staticProperties;

  try {
    const docs = await sanityClient.fetch<SanityProperty[]>(
      `*[_type == "property"] | order(order asc) ${PROPERTY_PROJECTION}`
    );
    if (docs.length === 0) return staticProperties;
    return docs.map(toProperty);
  } catch (err) {
    console.error("[properties-data] Sanity fetch failed, using seed data:", err);
    return staticProperties;
  }
}

export async function getProperty(slug: string): Promise<Property | undefined> {
  const all = await getProperties();
  return all.find((p) => p.slug === slug);
}
