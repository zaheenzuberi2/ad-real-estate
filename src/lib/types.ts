export type PropertyType =
  | "Residential Plot"
  | "Commercial Plot"
  | "House"
  | "Apartment"
  | "Farmhouse"
  | "Villa";

export type PropertyStatus =
  | "Available"
  | "New Launch"
  | "Limited Units"
  | "Sold Out";

export type PropertyFeature = {
  icon: IconName;
  label: string;
};

export type Property = {
  /** URL segment — this is the indexable page, keep it stable once published. */
  slug: string;
  title: string;
  eyebrow: string;
  /** Human-readable address line shown under the title. */
  location: string;
  /** Must match one of `phases` so the filter can group listings. */
  phase: string;
  propertyType: PropertyType;
  status: PropertyStatus;
  /** Short card/meta description. Keep under ~160 chars for search snippets. */
  description: string;
  /** Long-form copy for the detail page. */
  overview: string[];
  /** Lowest asking price in PKR — used for sorting and budget filtering. */
  priceFrom: number | null;
  priceNote: string;
  sizes: string[];
  features: PropertyFeature[];
  badge?: { text: string; highlight?: boolean };
  /** Tailwind gradient stops for the illustrated card art. */
  gradient: string;
  art: "road" | "orchard" | "villa";
  installmentMonths?: number;
  /** Structured spec for JSON-LD. Only set on built units; never guessed. */
  bedrooms?: number;
  bathrooms?: number;
  highlights: string[];
  featured: boolean;
  /** Real photography uploaded in Studio. Falls back to the illustrated
   *  PropertyArt when absent, e.g. before the client has supplied photos. */
  photos?: { url: string; alt: string }[];
  /** Listing-specific FAQs — drive the on-page accordion and FAQPage schema.
   *  General information only; nothing here invents a price or a rate. */
  faqs?: { q: string; a: string }[];
  /** Guide slugs to surface as "related reading" on the detail page. */
  relatedGuides?: string[];
  /** SEO <title> override. When absent the page falls back to a generated
   *  "{title}: {propertyType} in {phase}". Keep ~60 chars, keyword-forward. */
  metaTitle?: string;
  /** SEO meta description override. Falls back to `description`. Keep <160. */
  metaDescription?: string;
};

export type IconName =
  | "ruler"
  | "route"
  | "map-pin"
  | "calendar-clock"
  | "flag"
  | "heart-pulse"
  | "message-circle"
  | "navigation"
  | "shield-check"
  | "key"
  | "phone"
  | "mail"
  | "user"
  | "whatsapp"
  | "chevron-down"
  | "arrow-right"
  | "check"
  | "star"
  | "clock"
  | "search"
  | "menu"
  | "close"
  | "quote"
  | "award"
  | "building";

export type Lead = {
  name: string;
  whatsapp: string;
  email: string;
  project: string;
  message?: string;
};
