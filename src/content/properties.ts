import type { Property } from "@/lib/types";

/**
 * Seed inventory. This is the payload the Sanity import script pushes, and the
 * shape the Studio schema mirrors — once the CMS is connected, staff edit there
 * and this file stops being the source of truth.
 *
 * UNVERIFIED CONTENT — do not publish as-is:
 *  · Every `priceFrom` is null on purpose. Real figures were not supplied, and
 *    an invented price on a live listing is false advertising. Listings show
 *    "On Request" until the client confirms actual numbers.
 *  · `overview`, `highlights`, and `sizes` are drafted marketing copy written
 *    from general knowledge of these developments, NOT from client-supplied
 *    facts. Have the client confirm or correct each one before launch.
 */
export const properties: Property[] = [
  {
    slug: "dha-phase-5-6-plots",
    title: "DHA Phase 5 & 6",
    eyebrow: "Residential & Commercial Plots",
    location: "Islamabad Expressway, DHA Islamabad",
    phase: "DHA Phase 5",
    propertyType: "Residential Plot",
    status: "Available",
    description:
      "Surveyed residential plots from 5 Marla to 1 Kanal along the Islamabad Expressway, with direct gate-free access into the city.",
    overview: [
      "DHA Phase 5 and 6 sit directly on the Islamabad Expressway, which makes them the most practically connected addresses in the DHA masterplan. You reach the city without routing through interior sectors or secondary gates.",
      "We handle surveyed plots only in these phases: every file we present has had its title, dues, and transfer history checked before it reaches you. Where a plot has an outstanding development charge or a contested transfer, we tell you before you see the paperwork, not after.",
      "Both phases suit two very different buyers: people who want to build within a defined timeline, and investors holding for resale as the surrounding sectors complete. We'll tell you honestly which one a given plot is actually good for.",
    ],
    priceFrom: null,
    priceNote: "Price varies by sector, size and possession status, and is confirmed per plot.",
    sizes: ["5 Marla", "10 Marla", "1 Kanal"],
    features: [
      { icon: "ruler", label: "5 Marla – 1 Kanal Plots" },
      { icon: "route", label: "Direct Expressway Frontage" },
      { icon: "map-pin", label: "Phase 5 & 6, DHA Islamabad" },
    ],
    badge: { text: "Direct Expressway Access" },
    gradient: "linear-gradient(135deg, #060D1A 0%, #13294B 60%, #1E3D66 100%)",
    art: "road",
    highlights: [
      "Title and dues verified before you commit",
      "Gate-free access onto the Islamabad Expressway",
      "Both possession plots and files available",
    ],
    featured: true,
    relatedGuides: [
      "buying-a-plot-in-dha-islamabad",
      "dha-phase-5-vs-phase-6",
    ],
    metaTitle: "DHA Phase 5 & 6 Plots for Sale, Islamabad",
    metaDescription:
      "Surveyed 5 Marla to 1 Kanal residential plots for sale in DHA Phase 5 & 6, Islamabad, on the Expressway. Title and dues verified before you commit.",
    faqs: [
      {
        q: "Are plots in DHA Phase 5 and 6 freehold?",
        a: "Plots in these phases are held on a transferable DHA allotment, recorded in the buyer's name at the DHA office. The exact ownership status varies by sector and file, so we confirm it in writing for the specific plot before you commit.",
      },
      {
        q: "What is the difference between a file and a possession plot in Phase 5 or 6?",
        a: "A file is an allotment that does not yet have a demarcated location on the ground. A possession plot is developed and physically handed over. Files usually cost less but carry different resale and risk considerations. We tell you which one a given plot is, and whether it suits your plan, before you see the paperwork.",
      },
      {
        q: "Can I start building as soon as I buy?",
        a: "Only on a possession plot in a developed sector, and after the DHA building approval process. A file cannot be built on until it is balloted and possession is handed over. We confirm the build status of any plot you are considering.",
      },
      {
        q: "How is the price of a plot decided?",
        a: "Price varies by sector, plot size and possession status, and is confirmed per plot rather than quoted as a fixed rate. Speak to an advisor for current figures on a specific plot.",
      },
    ],
  },
  {
    slug: "margalla-orchard",
    title: "Margalla Orchard",
    eyebrow: "New Launch, Sector Enclave",
    location: "Park Road, Islamabad",
    phase: "Bahria Enclave",
    propertyType: "Residential Plot",
    status: "New Launch",
    description:
      "A newly launched enclave at the base of the Margalla Hills with 36-month installment plans, built for first-time buyers and long-term investors.",
    overview: [
      "Margalla Orchard is a new launch on Park Road, positioned at the base of the Margalla Hills. Because it is early-stage, entry pricing sits below comparable developed sectors. That is the opportunity and the risk together, and we'll walk you through both.",
      "The 36-month installment structure is what makes this reachable for first-time buyers: a modest down payment, then fixed monthly instalments with no balloon payment at the end. Use the calculator on this page to model your own numbers before you speak to an advisor.",
      "As a new launch, this is sold as files rather than possession plots. That means lower entry cost and different resale mechanics, so we explain exactly what you're buying and what has to happen before possession.",
    ],
    priceFrom: null,
    priceNote: "Launch pricing is indicative. Confirm current rates with an advisor.",
    sizes: ["5 Marla", "7 Marla", "10 Marla"],
    features: [
      { icon: "calendar-clock", label: "36-Month Installment Plans" },
      { icon: "ruler", label: "5 Marla – 10 Marla Options" },
      { icon: "map-pin", label: "Park Road, Islamabad" },
    ],
    badge: { text: "3-Year Installment Plans Available", highlight: true },
    gradient: "linear-gradient(135deg, #0E2038 0%, #1B3860 55%, #274873 100%)",
    art: "orchard",
    installmentMonths: 36,
    highlights: [
      "36-month plan with no balloon payment",
      "Early-launch entry pricing",
      "At the base of the Margalla Hills, off Park Road",
    ],
    featured: true,
    relatedGuides: ["buying-a-plot-in-dha-islamabad"],
    metaTitle: "Margalla Orchard Installment Plots, Islamabad",
    metaDescription:
      "Newly launched 5 to 10 Marla plots on 36-month installment plans at the base of the Margalla Hills, off Park Road, Islamabad. Built for first-time buyers and investors.",
    faqs: [
      {
        q: "Is Margalla Orchard sold as files or possession plots?",
        a: "As a new launch, it is sold as files rather than developed possession plots. That means a lower entry cost and different resale mechanics, and a wait before possession. We explain exactly what has to happen between purchase and possession.",
      },
      {
        q: "How does the 36-month installment plan work?",
        a: "A modest down payment followed by fixed monthly instalments over 36 months, with no balloon payment at the end. Use the calculator on the page to model a down payment and monthly figure, then confirm current pricing with an advisor.",
      },
      {
        q: "Is there a lump sum due at the end of the plan?",
        a: "No. The structure is designed without a final balloon payment — the monthly instalments complete the plan. Always confirm the current terms in writing before you sign.",
      },
      {
        q: "Who is a new launch like this suitable for?",
        a: "First-time buyers who want a reachable entry point, and longer-term investors comfortable holding through the development phase. It suits you less if you need to build or resell quickly. We give you an honest read for your situation.",
      },
    ],
  },
  {
    slug: "bahria-town-villas",
    title: "Bahria Town Villas",
    eyebrow: "Luxury Villas",
    location: "Bahria Town, Islamabad",
    phase: "Bahria Town Phase 7",
    propertyType: "Villa",
    status: "Limited Units",
    description:
      "1 & 2 Kanal grey-structure villas inside Bahria Town's master-planned community, moments from the golf course and health facilities.",
    overview: [
      "These are grey-structure villas. The structure, roof and blockwork are complete, and the interior finish is left to you. For buyers who care about how their home is finished, this is the point of it: you control the fit-out rather than paying for someone else's taste.",
      "Location inside Bahria Town matters more than the plot size for resale here. These units sit adjacent to the golf club with the health centre nearby, which is the pocket of the community that holds value most reliably.",
      "Grey structure carries a real completion cost that buyers routinely underestimate. Before you commit, we'll give you a realistic finishing budget for the size and standard you have in mind, not an optimistic one.",
    ],
    priceFrom: null,
    priceNote: "Excludes interior finishing. We provide a realistic completion estimate.",
    sizes: ["1 Kanal", "2 Kanal"],
    features: [
      { icon: "ruler", label: "1 & 2 Kanal Grey Structures" },
      { icon: "flag", label: "Adjacent to Golf Club" },
      { icon: "heart-pulse", label: "Near Health Center" },
    ],
    badge: { text: "Grey Structure, Ready to Finish" },
    gradient: "linear-gradient(135deg, #0A1830 0%, #142C4E 55%, #1F3E68 100%)",
    art: "villa",
    highlights: [
      "You control the interior finish",
      "Adjacent to the Bahria golf club",
      "Realistic finishing budget provided upfront",
    ],
    featured: true,
    relatedGuides: ["buying-a-plot-in-dha-islamabad"],
    metaTitle: "Bahria Town Villas for Sale, Islamabad",
    metaDescription:
      "1 & 2 Kanal grey-structure villas for sale in Bahria Town Phase 7, Islamabad, beside the golf club. You control the interior finish; we give you a realistic completion budget.",
    faqs: [
      {
        q: "What does grey structure mean?",
        a: "The structure, roof and blockwork are complete; the interior finish — flooring, kitchen, bathrooms, paint, fixtures — is left for the buyer to do. You control the fit-out rather than paying for someone else's finish.",
      },
      {
        q: "How much does it cost to finish a grey-structure villa?",
        a: "Finishing carries a real cost that buyers routinely underestimate, and it depends on the size and the standard you want. We give you a realistic completion estimate for your plan before you commit, rather than an optimistic one.",
      },
      {
        q: "Why does the location inside Bahria Town matter so much?",
        a: "For resale, the pocket of the community matters more than the plot size. These units sit adjacent to the golf club with the health centre nearby, which is the area that has held value most reliably.",
      },
      {
        q: "Are these villas ready to move into?",
        a: "Not as sold. They need interior finishing first. Plan for the finishing timeline and budget on top of the purchase, and we will help you scope both.",
      },
    ],
  },
];

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}

export const propertyTypes = [
  "Residential Plot",
  "Commercial Plot",
  "House",
  "Apartment",
  "Farmhouse",
  "Villa",
] as const;

/** Bedroom filtering only makes sense for built homes. */
export const bedroomTypes = ["House", "Apartment", "Villa"] as const;

/** Values that go into the URL (`?beds=`); "5+" means five or more. */
export const bedroomOptions = ["1", "2", "3", "4", "5+"] as const;

export function bedsToMin(value: string): number | null {
  if (value === "5+") return 5;
  const n = Number(value);
  return Number.isInteger(n) && n > 0 ? n : null;
}

export const budgetBands = [
  { label: "Any Budget", min: 0, max: Infinity },
  { label: "Under PKR 50 Lac", min: 0, max: 5_000_000 },
  { label: "PKR 50 Lac – 1 Crore", min: 5_000_000, max: 10_000_000 },
  { label: "PKR 1 – 3 Crore", min: 10_000_000, max: 30_000_000 },
  { label: "PKR 3 – 5 Crore", min: 30_000_000, max: 50_000_000 },
  { label: "PKR 5 Crore+", min: 50_000_000, max: Infinity },
];
