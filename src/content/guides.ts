import type { Faq } from "@/content/faqs";

/**
 * Long-form SEO guides. Authored here as structured data (same pattern as
 * faqs.ts / site-content.ts) so they stay version-controlled and reviewable.
 * If the client's team later needs to edit these without a deploy, move the
 * collection into Sanity and mirror this shape.
 *
 * Honesty rules, same as the rest of the site: no invented prices, rates, or
 * figures. Anything that varies by phase or changes over time is deferred to
 * "confirm with DHA / an advisor".
 */

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type Guide = {
  /** URL segment. Keep stable once published. */
  slug: string;
  /** On-page <h1>. */
  title: string;
  /** <title> tag. May be more keyword-forward than the h1. Keep ~60 chars. */
  metaTitle: string;
  /** Meta description. Keep under ~160 chars. */
  description: string;
  /** Short standfirst under the h1. */
  dek: string;
  category: string;
  readingTime: string;
  /** ISO date, used in Article schema. */
  date: string;
  /** Human-readable date shown on the page. */
  dateLabel: string;
  body: GuideBlock[];
  faqs: Faq[];
  /** Listing slugs this guide directly applies to. Cross-linked on the page. */
  relatedProperties?: string[];
};

export const guides: Guide[] = [
  {
    slug: "buying-a-plot-in-dha-islamabad",
    title: "Buying a Plot in DHA Islamabad-Rawalpindi: The Complete Process",
    metaTitle: "Buying a Plot in DHA Islamabad-Rawalpindi: Full Process & Checklist",
    description:
      "How a DHA Islamabad-Rawalpindi plot actually changes hands. The routes to market, file versus possession, the pre-purchase checks, the transfer step by step, and the costs beyond the plot price.",
    dek: "A DHA Islamabad-Rawalpindi plot changes hands through a documented transfer at the DHA office, not a handshake. Here is what the process involves, the paperwork you need, and the checks that protect your money.",
    category: "Buying guide",
    readingTime: "7 min read",
    date: "2026-09-05",
    dateLabel: "5 September 2026",
    body: [
      { type: "h2", text: "Three ways a plot comes to market" },
      {
        type: "p",
        text: "Almost every DHA Islamabad-Rawalpindi plot reaches a buyer through one of three routes. Knowing which one you are in sets your price, your risk, and your timeline.",
      },
      {
        type: "ul",
        items: [
          "Balloting: you apply as a DHA member, pay over instalments, and a sector and plot number are assigned to you by draw. It is the longest route and the lowest entry price.",
          "File transfer: you buy an allotment that has not yet been physically handed over. Cheaper than a developed plot and easy to resell, but its value depends entirely on the file being clean and the sector being transferable.",
          "Possession plot: a developed plot at a known location that you can stand on. It costs more and there is far less that can go wrong.",
        ],
      },
      { type: "h2", text: "File or possession: which one fits you" },
      {
        type: "p",
        text: "A file is a claim on a future plot. A possession plot is the plot itself. A file suits an investor who is comfortable holding through development and keeping an eye on transfer rules. A possession plot suits a buyer who wants certainty now, or who plans to build. Neither is better in the abstract. It depends on your horizon and your appetite for paperwork.",
      },
      { type: "h2", text: "Before you pay: the checks that matter" },
      {
        type: "p",
        text: "Most losses in DHA transactions trace back to a check that was skipped. Run all of these before any money moves.",
      },
      {
        type: "ol",
        items: [
          "Confirm the seller is the recorded allottee. The name on the allotment or transfer letter must match the seller's CNIC. If someone is selling on another person's behalf, you need a registered power of attorney, not a verbal arrangement.",
          "Get a No Demand Certificate (NDC) from DHA. It confirms that every charge on the plot, from development charges to membership to instalments, has been cleared. Any unpaid balance becomes your problem the moment the plot is in your name.",
          "Check the transfer status of the sector. Newly balloted sectors sometimes carry a lock-in period during which plots cannot be transferred at all. DHA's transfer and records section confirms this in minutes.",
          "Verify the plot location and category. Corner, park-facing, boulevard, and the exact sector all affect value and must appear on the file, not just in conversation.",
          "Look for holds or litigation. DHA flags plots under dispute, attachment, or inheritance transfer. These are not necessarily deal-breakers, but they take longer and need extra documents.",
        ],
      },
      { type: "h2", text: "The transfer, step by step" },
      {
        type: "ol",
        items: [
          "Agree terms in writing. Price, what is included, the timeline, the token amount, and the payment schedule go into a short sale agreement (bayana).",
          "The seller applies for the NDC and clears any outstanding dues.",
          "Both parties, or their attorneys, book a transfer appointment at the DHA office with original documents and passport-size photographs.",
          "DHA verifies identities and documents, cancels the seller's allocation, and issues a fresh transfer letter in your name.",
          "Records are updated. You receive the new letter. Keep the original safe, because you will need it to sell the plot or to take possession later.",
        ],
      },
      { type: "h2", text: "What you will pay beyond the plot price" },
      {
        type: "p",
        text: "Budget for these on top of the agreed price. The exact amounts are set by DHA and the Federal Board of Revenue and change from year to year, so confirm current figures before you sign anything.",
      },
      {
        type: "ul",
        items: [
          "A DHA transfer fee, plus a membership fee on the first transfer into your name.",
          "Capital Value Tax and federal advance tax. The advance tax rate depends on whether you are on the active taxpayer list.",
          "Stamp duty and registration charges where a registered deed is involved.",
          "Agent commission, agreed in writing up front.",
          "Any development charges the seller has not already cleared.",
        ],
      },
      { type: "h2", text: "Buying from abroad" },
      {
        type: "p",
        text: "You do not need to fly in. Overseas buyers complete the same transfer through a power of attorney attested by the Pakistani mission in their country and the Ministry of Foreign Affairs, together with a video verification call. Send the funds through banking channels and keep the remittance record, because it matters for tax and for any future repatriation of the proceeds.",
      },
      { type: "h2", text: "Common ways buyers lose money" },
      {
        type: "ul",
        items: [
          "Paying the seller in full before DHA has verified the file.",
          "Buying a file in a sector that is not yet transferable, then paying to hold it for years.",
          "Skipping the NDC and inheriting unpaid development charges.",
          "Trusting a verbal plot location that does not match the letter.",
          "Relying on an unregistered power of attorney.",
        ],
      },
      { type: "h2", text: "How we handle it" },
      {
        type: "p",
        text: "We run every one of these checks before a client commits: seller verification, the NDC, the sector's transfer status, the plot's location and category, and the full cost breakdown in writing. If you are weighing a specific plot or file, send us the details and we will tell you exactly what we would do.",
      },
      {
        type: "p",
        text: "This guide is general information about how DHA Islamabad-Rawalpindi transactions work. Rules, fees, and tax rates vary by phase and change over time, so confirm the specifics for your plot with DHA and a qualified advisor before you commit.",
      },
    ],
    faqs: [
      {
        q: "Should I buy a file or a possession plot in DHA Islamabad-Rawalpindi?",
        a: "A file is cheaper and easier to resell, but its value depends on the sector being transferable and the paperwork being clean. A possession plot costs more and gives you a known location you can build on. If you are investing and can hold, a clean file works well; if you want certainty, buy possession.",
      },
      {
        q: "What is a No Demand Certificate and why does it matter?",
        a: "An NDC is issued by DHA and confirms that every charge on a plot, from development charges to membership to instalments, has been paid. Without it, unpaid dues transfer to you along with the plot. Never complete a purchase before the seller produces a current NDC.",
      },
      {
        q: "How long does a DHA Islamabad-Rawalpindi plot transfer take?",
        a: "Once the documents are in order and the NDC is issued, the transfer itself is usually a single appointment at the DHA office. Getting to that point, which means verification, clearing dues, and arranging a power of attorney if needed, typically takes one to three weeks.",
      },
      {
        q: "Can I complete the purchase without travelling to Pakistan?",
        a: "Yes. Overseas buyers transfer through a power of attorney attested by the Pakistani embassy or consulate and the Ministry of Foreign Affairs, along with a video verification call. Funds should move through banking channels so the remittance is on record.",
      },
      {
        q: "What taxes and fees apply when buying a plot?",
        a: "Expect a DHA transfer fee, a membership fee on your first transfer, Capital Value Tax, federal advance tax at the filer or non-filer rate, and stamp duty where a registered deed is used. Rates are set by DHA and the FBR and change, so confirm current figures before signing.",
      },
    ],
    relatedProperties: ["dha-phase-5-6-plots"],
  },
  {
    slug: "dha-phase-5-vs-phase-6",
    title: "DHA Phase 5 vs Phase 6, Islamabad: Which to Buy",
    metaTitle: "DHA Phase 5 vs Phase 6 Islamabad: Which to Buy",
    description:
      "Phase 5 is the settled choice, Phase 6 is the growth bet. How the two DHA Islamabad-Rawalpindi phases compare on development, price, risk and buyer fit, and why the sector matters more than the phase.",
    dek: "Phase 5 is the settled choice; Phase 6 is the growth bet. The right answer depends on whether you want to build now or hold for appreciation, and, more than that, on the specific sector.",
    category: "Buying guide",
    readingTime: "6 min read",
    date: "2026-09-05",
    dateLabel: "5 September 2026",
    body: [
      { type: "h2", text: "The short version" },
      {
        type: "p",
        text: "Phase 5 is older, largely developed and lived in. You pay more, you get certainty, you can build today. Phase 6 is newer and far larger, development is uneven across its sectors, prices are lower, and the upside is bigger if you pick well and wait. Neither wins outright. It comes down to your timeline and the exact sector.",
      },
      { type: "h2", text: "Phase 5: the settled option" },
      {
        type: "ul",
        items: [
          "Development: most sectors are developed with possession handed over. Roads, utilities, parks and commercial areas are in place and in use.",
          "Who is there: an established residential population, active construction, functioning markets.",
          "Price: a higher entry cost than Phase 6, with steadier, slower appreciation.",
          "Best for: end users who want to build and move in now, and investors who prioritise low risk and rental potential over maximum capital gain.",
          "Watch for: the premium is already priced in, and corner, park-facing and boulevard plots carry a further premium on top.",
        ],
      },
      { type: "h2", text: "Phase 6: the growth option" },
      {
        type: "ul",
        items: [
          "Development: Phase 6 is much larger and progress is uneven. Some sectors are developed with possession; others are still developing or remain files only. Its development timeline was extended for years by land acquisition and legal matters, and different blocks moved at very different speeds.",
          "Who is there: fewer built houses so far. In most sectors there are more plots than people.",
          "Price: a lower entry cost, with more room for appreciation as development completes, and more downside if a sector stalls.",
          "Best for: investors with a multi-year horizon who can research sectors and wait.",
          "Watch for: large differences between sectors. On its own, “a Phase 6 plot” tells you very little.",
        ],
      },
      {
        type: "h2",
        text: "The decision comes down to the sector, not the phase",
      },
      {
        type: "p",
        text: "Averages across a whole phase hide the thing that actually decides your outcome. Within Phase 6, a developed sector with possession behaves nothing like a file in a sector still under development. Before you compare prices, pin down four things about the specific plot: is the sector developed, is possession available, are the development charges paid, and is the plot transferable right now. Those answers matter more than the phase number.",
      },
      { type: "h2", text: "Questions to ask before you choose" },
      {
        type: "ol",
        items: [
          "What is my horizon: building within a year or two, or holding for five years or more?",
          "Do I need possession now, or can I wait for development to reach the plot?",
          "What is my risk tolerance if a sector's timeline slips?",
          "For this specific plot: developed or file, possession or not, dues cleared, transferable now?",
          "What is the realistic resale market for this sector today?",
        ],
      },
      { type: "h2", text: "How we help" },
      {
        type: "p",
        text: "We work in both phases every week. For a specific plot or a budget, we can tell you which sectors are worth looking at and which to avoid right now, based on current development status, transfer rules and what is actually selling. Send us your budget and timeline and we will point you at the right shortlist.",
      },
      {
        type: "p",
        text: "This guide is general information. Development status, transfer rules and prices vary by sector and change over time, so confirm the current position for any plot with DHA and a qualified advisor before you commit.",
      },
    ],
    faqs: [
      {
        q: "Is Phase 5 or Phase 6 a better investment in DHA Islamabad-Rawalpindi?",
        a: "Phase 5 offers lower risk and steadier value because it is developed and populated. Phase 6 offers more appreciation potential, but over a longer horizon and with more variation between sectors. Which is better depends on your timeline and the specific sector you are looking at.",
      },
      {
        q: "Can I build a house in DHA Phase 6 now?",
        a: "In Phase 6 sectors where development is complete and possession has been handed over, yes. In sectors still under development, or where you hold only a file, not yet. Confirm the possession status of the specific sector before assuming you can build.",
      },
      {
        q: "Why is Phase 6 cheaper than Phase 5?",
        a: "Phase 5 is older, fully developed and lived in, so its price reflects certainty and immediate usability. Phase 6 is newer, larger and still developing in parts, so plots are priced lower with the expectation that value rises as development completes.",
      },
      {
        q: "Which phase is better for overseas buyers?",
        a: "Both work. Overseas buyers who want a low-maintenance hold often prefer a developed sector with possession, in either phase, so there is less uncertainty to manage from abroad. The transfer is handled remotely either way.",
      },
      {
        q: "How do I check the development status of a DHA sector?",
        a: "DHA's records and transfer section confirms whether a sector is developed, whether possession has been handed over, and whether plots are currently transferable. We check this for every plot before a client commits.",
      },
    ],
    relatedProperties: ["dha-phase-5-6-plots"],
  },
  {
    slug: "buying-dha-property-overseas-pakistani",
    title: "Buying DHA Islamabad-Rawalpindi Property as an Overseas Pakistani",
    metaTitle: "Overseas Pakistani Guide: Buying DHA Islamabad-Rawalpindi Property",
    description:
      "Buy, transfer and hold a DHA Islamabad-Rawalpindi plot without flying home. The process for overseas buyers: the power of attorney, video verification, moving the money, and the tax to plan for.",
    dek: "You can buy, transfer and hold a DHA Islamabad-Rawalpindi plot without flying home. Here is the process for overseas buyers: the power of attorney, the verification, moving the money, and the tax you need to plan for.",
    category: "Buying guide",
    readingTime: "6 min read",
    date: "2026-09-05",
    dateLabel: "5 September 2026",
    body: [
      { type: "h2", text: "You do not need to be in Pakistan" },
      {
        type: "p",
        text: "Every step of a DHA transfer can be completed for you by an attorney you appoint, with you verifying by video call. The trade-off is paperwork done in the right order: a power of attorney that is properly attested, funds that move through banking channels, and tax handled correctly as a non-resident.",
      },
      { type: "h2", text: "Step 1: Appoint a power of attorney" },
      {
        type: "p",
        text: "You choose someone in Pakistan you trust, a family member or your advisor's nominated representative, to sign and attend the DHA office on your behalf.",
      },
      {
        type: "ul",
        items: [
          "Draft the power of attorney specifically for this transaction, meaning property purchase and transfer, naming the plot if it is known.",
          "Have it attested by the Pakistani embassy or consulate in your country of residence.",
          "Then have it attested by the Ministry of Foreign Affairs in Islamabad and, where required, registered locally.",
          "A general power of attorney is not always accepted. A special power of attorney that names the transaction is the safer choice.",
        ],
      },
      { type: "h2", text: "Step 2: Verification" },
      {
        type: "p",
        text: "DHA and the seller's side will confirm you are who you say you are and that you consent to the purchase. Expect a video verification call, copies of your passport and NICOP or POC, and photographs. Keep your NICOP current, because an expired card stalls the transfer.",
      },
      { type: "h2", text: "Step 3: Move the money the right way" },
      {
        type: "ul",
        items: [
          "Send funds from your own account abroad to a Pakistani account through normal banking channels, not through informal transfer.",
          "Keep every remittance advice and bank record. This proves the source of funds for tax, and it is what allows you to repatriate the proceeds if you sell later.",
          "Pay the seller only after DHA has verified the file, never before.",
        ],
      },
      { type: "h2", text: "Step 4: The transfer itself" },
      {
        type: "p",
        text: "Your attorney attends the DHA office with the original documents, the No Demand Certificate, the attested power of attorney, and ID. DHA cancels the seller's allocation and issues a new transfer letter in your name. Your attorney collects it, so arrange to get the original to you or into safe keeping.",
      },
      { type: "h2", text: "Tax you need to plan for" },
      {
        type: "p",
        text: "As a non-resident buyer you still pay the standard transaction taxes, and your filer status matters.",
      },
      {
        type: "ul",
        items: [
          "Federal advance tax on the purchase, at a rate that is lower for those on the Active Taxpayer List. Overseas Pakistanis may be exempt from the higher non-filer rate on the basis of their NICOP or POC. Confirm your status before the transfer, as it can materially change the amount.",
          "Capital Value Tax, and provincial stamp duty and registration where applicable.",
          "On a future sale, capital gains tax may apply depending on how long you held the plot.",
          "Keep your remittance records, as they support both the source of funds and any later repatriation.",
        ],
      },
      { type: "h2", text: "What usually goes wrong" },
      {
        type: "ul",
        items: [
          "A power of attorney attested at the embassy but not by the Ministry of Foreign Affairs, so the DHA office rejects it.",
          "A general power of attorney where a special one naming the transaction was needed.",
          "Paying the seller before DHA verification.",
          "An expired NICOP or POC.",
          "Cash or informal money transfer, leaving no record for tax or repatriation.",
        ],
      },
      { type: "h2", text: "How we handle overseas buyers" },
      {
        type: "p",
        text: "We do this regularly. We tell you exactly which power of attorney wording to use, coordinate the video verification, run the same file checks covered in our guide on buying a plot, and keep you updated at each step. You approve; we execute on the ground.",
      },
      {
        type: "p",
        text: "This guide is general information. Attestation requirements and tax rules change and vary by country and province, so confirm the current requirements with the Pakistani mission in your country and a qualified tax advisor before you proceed.",
      },
    ],
    faqs: [
      {
        q: "Can an overseas Pakistani buy DHA Islamabad-Rawalpindi property without visiting?",
        a: "Yes. The purchase and transfer are completed by an attorney you appoint through a properly attested power of attorney, with you verifying by video call.",
      },
      {
        q: "What kind of power of attorney do I need?",
        a: "A special power of attorney that names the property transaction, attested by the Pakistani embassy or consulate in your country and then by the Ministry of Foreign Affairs in Islamabad. A general power of attorney is often not accepted for property transfers.",
      },
      {
        q: "How should I send the money for the purchase?",
        a: "Through formal banking channels from your own account abroad, and keep every remittance record. This establishes the source of funds for tax and is what lets you repatriate the proceeds if you sell later. Avoid informal transfers.",
      },
      {
        q: "Do overseas Pakistanis pay more tax when buying property?",
        a: "Not automatically. The main variable is filer status. Advance tax is lower for those on the Active Taxpayer List, and overseas Pakistanis may be exempt from the higher non-filer rate on the basis of their NICOP or POC. Confirm your status before the transfer.",
      },
      {
        q: "Can I sell the plot later and send the money back abroad?",
        a: "Yes, provided you bought it with funds remitted through banking channels and kept the records. That documentation is what supports repatriation of the sale proceeds.",
      },
    ],
    relatedProperties: ["dha-phase-5-6-plots", "margalla-orchard"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
