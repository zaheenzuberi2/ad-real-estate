import { realEstateAgentSchema, jsonLd } from "@/lib/schema";

/**
 * RealEstateAgent schema — drives the Google local / knowledge panel.
 * Keep every value in sync with the Google Business Profile (see lib/site.ts).
 */
export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(realEstateAgentSchema()) }}
    />
  );
}
