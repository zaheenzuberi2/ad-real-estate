import type { Property } from "@/lib/types";
import { site } from "@/lib/site";

/**
 * JSON-LD builders for the site. All emitted with @context so each block is a
 * standalone graph node; `@id` cross-links the agent to every offer.
 *
 * Honesty rules baked in:
 *  - No structural spec (beds, baths, size, price) is ever guessed. A field is
 *    present only when the CMS actually holds the value.
 *  - "On Request" listings emit a valid Offer with availability + currency but
 *    no invented `price`.
 */

const ORG_ID = `${site.url}/#organization`;

/**
 * Serialise a schema object for a `<script type="application/ld+json">` body.
 * `<` is escaped so a stray "</script>" inside any CMS-supplied string (a
 * project title, an FAQ answer) can never break out of the script tag.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** DHA / Bahria Town, Islamabad conventional land-area conversions. */
const SQFT_PER_MARLA = 225;
const MARLA_PER_KANAL = 20;

function sizeLabelToMarla(label: string): number | null {
  const match = label.match(/([\d.]+)\s*(kanal|marla)/i);
  if (!match) return null;
  const amount = Number.parseFloat(match[1]);
  if (!Number.isFinite(amount)) return null;
  return /kanal/i.test(match[2]) ? amount * MARLA_PER_KANAL : amount;
}

/**
 * Turns the listing's size labels ("5 Marla", "1 Kanal") into a schema.org
 * floorSize. When the listing spans a range it becomes min/maxValue; a machine
 * readable square-foot equivalent rides along in additionalProperty.
 */
function floorSizeFromSizes(sizes: string[]) {
  const marla = sizes
    .map(sizeLabelToMarla)
    .filter((n): n is number => n !== null);
  if (marla.length === 0) return undefined;

  const min = Math.min(...marla);
  const max = Math.max(...marla);
  const spread = min === max ? { value: min } : { minValue: min, maxValue: max };

  return {
    "@type": "QuantitativeValue",
    unitText: "Marla",
    ...spread,
    additionalProperty: {
      "@type": "PropertyValue",
      name: "Area (square feet)",
      unitCode: "FTK",
      minValue: Math.round(min * SQFT_PER_MARLA),
      maxValue: Math.round(max * SQFT_PER_MARLA),
    },
  };
}

function availabilityFor(status: Property["status"]) {
  switch (status) {
    case "Sold Out":
      return "https://schema.org/SoldOut";
    case "Limited Units":
      return "https://schema.org/LimitedAvailability";
    default:
      return "https://schema.org/InStock";
  }
}

/** The agency itself. Rendered once, site-wide. */
export function realEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    telephone: site.phone.intl,
    email: site.email,
    priceRange: "$$$",
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/icon`,
    areaServed: [
      { "@type": "Place", name: "DHA Islamabad" },
      { "@type": "Place", name: "DHA Phase 5, Islamabad" },
      { "@type": "Place", name: "DHA Phase 6, Islamabad" },
      { "@type": "City", name: "Islamabad" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.openingHoursSpec.days,
        opens: site.openingHoursSpec.opens,
        closes: site.openingHoursSpec.closes,
      },
    ],
    sameAs: [site.social.facebook, site.social.instagram, site.social.youtube],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
  };
}

/**
 * One featured project. Bare plots stay `Residence`; anything built (villas,
 * houses, apartments) is `SingleFamilyResidence` so the structural fields have
 * a type that accepts them.
 */
export function propertySchema(property: Property) {
  const isPlot = /Plot/i.test(property.propertyType);
  const floorSize = floorSizeFromSizes(property.sizes);

  return {
    "@context": "https://schema.org",
    "@type": isPlot ? "Residence" : "SingleFamilyResidence",
    "@id": `${site.url}/properties/${property.slug}#residence`,
    name: property.title,
    description: property.description,
    url: `${site.url}/properties/${property.slug}`,
    ...(property.photos?.length
      ? { image: property.photos.map((photo) => photo.url) }
      : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: property.location,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },

    // ── Structural specification — emitted only when the CMS holds a value ──
    ...(property.bedrooms ? { numberOfBedrooms: property.bedrooms } : {}),
    ...(property.bathrooms
      ? { numberOfBathroomsTotal: property.bathrooms }
      : {}),
    ...(floorSize ? { floorSize } : {}),
    ...(property.sizes.length
      ? {
          additionalProperty: property.sizes.map((size) => ({
            "@type": "PropertyValue",
            name: isPlot ? "Plot size" : "Unit size",
            value: size,
          })),
        }
      : {}),
    ...(property.installmentMonths
      ? {
          amenityFeature: {
            "@type": "LocationFeatureSpecification",
            name: `${property.installmentMonths}-month installment plan`,
            value: true,
          },
        }
      : {}),

    // ── Offer ─────────────────────────────────────────────────────────────
    offers: {
      "@type": "Offer",
      url: `${site.url}/properties/${property.slug}`,
      availability: availabilityFor(property.status),
      priceCurrency: "PKR",
      ...(property.priceFrom
        ? { price: property.priceFrom }
        : {
            // "On Request": a valid offer with no invented figure.
            description: "Price confirmed per plot on request.",
          }),
      seller: { "@id": ORG_ID },
    },
  };
}

/** Home > Properties > {project} */
export function breadcrumbSchema(property: Property) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Properties",
        item: `${site.url}/properties`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: property.title,
        item: `${site.url}/properties/${property.slug}`,
      },
    ],
  };
}
