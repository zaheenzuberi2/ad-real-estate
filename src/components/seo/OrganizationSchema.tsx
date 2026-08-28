import { site } from "@/lib/site";

/**
 * RealEstateAgent schema drives the Google local/knowledge panel.
 * Keep every value in sync with the Google Business Profile.
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
    telephone: site.phone.intl,
    email: site.email,
    priceRange: "$$$",
    areaServed: [
      { "@type": "Place", name: "DHA Islamabad" },
      { "@type": "Place", name: "Bahria Town Islamabad" },
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: 5,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
