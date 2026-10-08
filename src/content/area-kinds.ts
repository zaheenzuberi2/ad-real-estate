/**
 * The property-type sub-pages under each DHA phase page
 * (/areas/dha-phase-5/plots-for-sale, and so on). Copy here is deliberately
 * limited to checks and processes the rest of the site already states. No
 * prices, availability or per-phase claims are invented; live listings are
 * pulled in by type and phase, and an advisor box covers the rest.
 */

export type AreaKind = {
  slug: string;
  /** "Plots for Sale", used as "{label} in {phase}". */
  label: string;
  /** Listing propertyType values that belong on this page. */
  types: string[];
  /** Lowercase noun used in running copy. */
  noun: string;
  intro: (phase: string) => string;
  checksTitle: string;
  checks: string[];
  faqs: (phase: string, hasListings: boolean) => { q: string; a: string }[];
  guides: string[];
};

export const areaKinds: AreaKind[] = [
  {
    slug: "plots-for-sale",
    label: "Plots for Sale",
    types: ["Residential Plot"],
    noun: "residential plots",
    intro: (phase) =>
      `Looking for a plot for sale in ${phase}, Islamabad? AD Real Estate is a registered real estate agency, property consultant and dealer in DHA Phase 5. We verify the file, the seller and the dues before you commit, then manage the transfer.`,
    checksTitle: "What we check on a plot",
    checks: [
      "Seller and ownership documents verified against the DHA record",
      "No outstanding dues or transfer charges on the file",
      "Whether it is a file or a possession plot, so you know what you are buying",
      "Transfer paperwork managed through to completion",
    ],
    faqs: (phase, hasListings) => [
      {
        q: `Do you have plots for sale in ${phase}?`,
        a: hasListings
          ? `Yes, see our current ${phase} plot listings on this page.`
          : `Not always publicly listed. We source and verify plots in ${phase} on request. Tell an advisor the size and budget you have in mind and we will check current availability.`,
      },
      {
        q: `What plot sizes can you find in ${phase}?`,
        a: `We deal in plots of any size, from 5 Marla up to 1 Kanal and above. Tell us the size you want and we confirm availability and the current rate in writing.`,
      },
      {
        q: `Is a ${phase} plot a file or a possession plot?`,
        a: `It depends on the plot, which is why we confirm it before you pay anything. A file is a membership or allotment record, a possession plot is one you can take physical possession of. Our buying guide explains the difference and the checks for each.`,
      },
    ],
    guides: [
      "buying-a-plot-in-dha-islamabad",
      "dha-plot-prices-what-drives-them",
      "dha-islamabad-rawalpindi-installment-plans",
    ],
  },
  {
    slug: "houses-for-sale",
    label: "Houses for Sale",
    types: ["House", "Apartment", "Villa"],
    noun: "houses and apartments",
    intro: (phase) =>
      `Looking for a house for sale in ${phase}, Islamabad? AD Real Estate is a registered real estate agency, property consultant and dealer in DHA Phase 5. We confirm ownership, dues and construction status before you commit, and handle the transfer.`,
    checksTitle: "What we check on a house or apartment",
    checks: [
      "Ownership and title confirmed before you commit",
      "No unpaid dues or transfer charges",
      "Construction status and approvals matched to what is being sold",
      "A guided viewing, then transfer support once a deal is agreed",
    ],
    faqs: (phase, hasListings) => [
      {
        q: `Do you have houses for sale in ${phase}?`,
        a: hasListings
          ? `Yes, see our current ${phase} house and apartment listings on this page.`
          : `Not always publicly listed. We source and verify houses in ${phase} on request. Tell an advisor the size and budget you have in mind and we will check current availability.`,
      },
      {
        q: `Can I sell my house in ${phase} through you?`,
        a: `Yes. We verify the title and dues, list qualifying properties and market them to our buyer network across DHA Islamabad-Rawalpindi.`,
      },
      {
        q: `Can overseas Pakistanis buy a house in ${phase} through you?`,
        a: `Yes. We manage guided viewings, verification and the full transfer process on your behalf and report back with photos and documents at each step.`,
      },
    ],
    guides: [
      "buying-a-plot-in-dha-islamabad",
      "selling-a-plot-in-dha-islamabad",
      "buying-dha-property-overseas-pakistani",
    ],
  },
  {
    slug: "commercial-plots",
    label: "Commercial Plots",
    types: ["Commercial Plot"],
    noun: "commercial plots",
    intro: (phase) =>
      `Looking for a commercial plot for sale in ${phase}, Islamabad? AD Real Estate is a registered real estate agency, property consultant and dealer in DHA Phase 5. We check the plot's commercial-use category and dues before you commit.`,
    checksTitle: "What we check on a commercial plot",
    checks: [
      "Title, dues and commercialization charges verified",
      "The permitted business category matches what you plan to build",
      "Corner or frontage premium reflected honestly in the asking price",
      "Guided site visit and full transfer support",
    ],
    faqs: (phase, hasListings) => [
      {
        q: `Do you have commercial plots for sale in ${phase}?`,
        a: hasListings
          ? `Yes, see our current ${phase} commercial listings on this page.`
          : `Not always publicly listed. We source and verify commercial plots in ${phase} on request. Tell an advisor what you are looking for and we will check current availability.`,
      },
      {
        q: `What should I check before buying a commercial plot in ${phase}?`,
        a: `Confirmed title, no outstanding development or transfer dues, and the plot's actual commercial-use category, since permitted business types vary. We verify all three before you commit.`,
      },
    ],
    guides: [
      "buying-a-plot-in-dha-islamabad",
      "dha-plot-prices-what-drives-them",
    ],
  },
];

export function getAreaKind(slug: string) {
  return areaKinds.find((k) => k.slug === slug);
}
