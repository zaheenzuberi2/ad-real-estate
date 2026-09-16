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
  /** DHA phase area-page slugs (src/content/locations.ts) this guide directly applies to. */
  relatedAreas?: string[];
};

export const guides: Guide[] = [
  {
    slug: "buying-a-plot-in-dha-islamabad",
    title: "Buying a Plot in DHA Islamabad-Rawalpindi: The Complete Process",
    metaTitle: "Buying a Plot in DHA Islamabad-Rawalpindi: Checklist",
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
    relatedAreas: ["dha-phase-5", "dha-phase-6"],
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
    relatedAreas: ["dha-phase-5", "dha-phase-6"],
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
  {
    slug: "dha-plot-prices-what-drives-them",
    title: "DHA Islamabad-Rawalpindi Plot Prices: What Actually Drives Them",
    metaTitle: "DHA Islamabad-Rawalpindi Plot Prices: What Drives Them",
    description:
      "There is no single per-marla rate for DHA Islamabad-Rawalpindi. Here is what actually moves the price of a plot: phase, sector, file versus possession, size and payment structure.",
    dek: "There is no single per-marla rate for DHA Islamabad-Rawalpindi. Here is what actually moves the price of a specific plot, so you know what you are really paying for.",
    category: "Pricing guide",
    readingTime: "6 min read",
    date: "2026-09-16",
    dateLabel: "16 September 2026",
    body: [
      { type: "h2", text: "Why we don't quote a flat rate per marla" },
      {
        type: "p",
        text: "Ask five different sellers the price of a 10 Marla plot in DHA and you will get five different numbers, because the plot on paper is not the whole story. Phase, sector, development stage, file status and even the direction the plot faces all move the number independently. A flat per-marla rate would be misleading the moment you moved to a real file, so we quote every plot individually rather than off a rate card.",
      },
      { type: "h2", text: "The phase and the sector move price first" },
      {
        type: "ul",
        items: [
          "Phase: an older, fully developed phase with possession handed over generally commands a premium over a newer phase still under development, because certainty costs more than potential.",
          "Sector within the phase: development status varies block by block even inside one phase, and that difference matters more than the phase number on its own.",
          "Position: corner plots, park-facing plots, and plots on a main boulevard or with expressway frontage carry a premium over an interior plot of the same size.",
        ],
      },
      { type: "h2", text: "File or possession changes the structure, not just the number" },
      {
        type: "p",
        text: "A file is a claim on a future plot and generally costs less, but its value depends on the sector being transferable and the paperwork being clean. A possession plot is developed and handed over, costs more, and carries far less uncertainty. Comparing a file price to a possession price for the same phase and calling one \"cheaper\" is comparing two different products, not the same product at two prices.",
      },
      { type: "h2", text: "Size, shape and frontage" },
      {
        type: "ul",
        items: [
          "Larger plots (1 Kanal and above) do not scale linearly from smaller sizes; per-marla value often shifts at the larger sizes.",
          "An irregularly shaped or oddly dimensioned plot typically prices below a regular rectangular plot of the same area.",
          "Extra road frontage, especially onto the Islamabad Expressway or a main boulevard, adds value beyond the plot's raw size.",
        ],
      },
      { type: "h2", text: "How you pay changes what you pay" },
      {
        type: "p",
        text: "A lump-sum purchase and an instalment plan are not the same offer at different speeds. A new-launch instalment structure, like the 36-month plan on a project such as Margalla Orchard, is usually priced to reflect the early-stage entry point and the fact that you are paying over time rather than up front. Model the down payment and monthly figure with the calculator on our homepage before you compare it to a lump-sum price elsewhere.",
      },
      { type: "h2", text: "Costs beyond the headline price" },
      {
        type: "p",
        text: "Whatever price you agree, budget separately for the DHA transfer fee, membership fee on first transfer, Capital Value Tax, federal advance tax, stamp duty where applicable, and any development charges the seller has not already cleared. Our guide on buying a plot in DHA Islamabad-Rawalpindi covers each of these in full.",
      },
      { type: "h2", text: "How to get an actual number" },
      {
        type: "p",
        text: "Prices move with the market and with the specific file, so anything published today can be out of date by the time you read it. The reliable way to get a current number is to tell us the phase, sector or budget you have in mind and we will come back with what is actually available and what it costs, including the file's development and transfer status.",
      },
      { type: "h2", text: "How we help" },
      {
        type: "p",
        text: "We do not quote off a rate card. For every plot we present, we confirm the current asking price, the file's transfer status, and the full cost breakdown in writing before you decide anything.",
      },
      {
        type: "p",
        text: "This guide is general information about what drives price, not a price list. Actual figures vary by phase, sector and file, and change over time, so confirm current pricing for any specific plot with an advisor.",
      },
    ],
    faqs: [
      {
        q: "How much does a plot cost in DHA Phase 5 or 6?",
        a: "There is no single figure. Price depends on the sector, the plot's size and position, whether it is a file or a possession plot, and current market conditions. Tell us your budget and what you are looking for and we will come back with current options and prices.",
      },
      {
        q: "Why do two plots in the same phase cost different amounts?",
        a: "Sector development status, position (corner, park-facing, boulevard), size, shape, and file versus possession status all move the price independently, even within the same phase.",
      },
      {
        q: "Is a file always cheaper than a possession plot?",
        a: "Usually, but they are different products, not the same product at different prices. A file's value depends on the sector being transferable and the paperwork being clean; a possession plot costs more for the certainty of a known, developed location.",
      },
      {
        q: "Do installment plans cost more overall than paying in full?",
        a: "It depends on the specific project and its terms. Some new-launch instalment structures price in the early-stage entry point rather than adding a markup. Always ask for the full schedule in writing and compare it to any lump-sum alternative before deciding.",
      },
      {
        q: "Can I estimate my own monthly payment before speaking to an advisor?",
        a: "Yes. Use the installment plan calculator on our homepage to model a down payment and monthly figure for a given price and tenure. It is indicative only; confirm the actual schedule for a specific plot with an advisor.",
      },
    ],
    relatedProperties: ["dha-phase-5-6-plots", "margalla-orchard"],
    relatedAreas: ["dha-phase-5", "dha-phase-6"],
  },
  {
    slug: "dha-vs-bahria-town-islamabad",
    title: "DHA vs Bahria Town, Islamabad-Rawalpindi: Which to Choose",
    metaTitle: "DHA vs Bahria Town Islamabad-Rawalpindi: Which to Pick",
    description:
      "DHA and Bahria Town are run on different models, not just different addresses. How they compare on development, amenities and buyer fit, and how to choose between them.",
    dek: "DHA and Bahria Town are built on different models, not just different addresses. Here is how they actually compare, and how to decide which fits you.",
    category: "Comparison guide",
    readingTime: "7 min read",
    date: "2026-09-16",
    dateLabel: "16 September 2026",
    body: [
      { type: "h2", text: "Two different models, not just two addresses" },
      {
        type: "p",
        text: "DHA Islamabad-Rawalpindi is developed and regulated by the Defence Housing Authority, a body originally set up to house armed forces personnel that now also sells and transfers plots to the general public through its own membership and balloting system. Bahria Town is a privately developed, master-planned community built and marketed by a private real estate developer. That structural difference runs through everything else: how plots are allotted, how records are kept, and how amenities get funded and built.",
      },
      { type: "h2", text: "Location and layout" },
      {
        type: "p",
        text: "Both communities sit along the same broad corridor between Islamabad and Rawalpindi and are organised into numbered phases developed in stages. DHA's phases run along the Islamabad Expressway; Bahria Town Islamabad-Rawalpindi has its own numbered phases and enclaves nearby. Development stage varies by phase and sector in both, so the specific phase matters more than which society it belongs to.",
      },
      { type: "h2", text: "Development style and amenities" },
      {
        type: "ul",
        items: [
          "DHA phases develop progressively as an extension of the wider city, with a mix of established and newer sectors, and no single unifying amenity theme.",
          "Bahria Town is known for concentrating branded amenities, such as golf facilities and sports and leisure complexes, within its master plan as part of the sales proposition.",
          "Both run separate societies for commercial, residential and villa-style development, so compare the specific sector or scheme rather than the brand as a whole.",
        ],
      },
      { type: "h2", text: "Price positioning" },
      {
        type: "p",
        text: "Neither society is uniformly cheaper or more expensive than the other. Entry price in both depends on the phase, the sector's development stage, and whether you are buying a file or a developed, possession-ready plot. A developed sector in one society can cost more than an early-stage sector in the other, and the reverse is also true. Compare specific sectors against each other, not the society names.",
      },
      { type: "h2", text: "Who tends to prefer each" },
      {
        type: "ul",
        items: [
          "Buyers who value DHA's authority-run allotment structure and its established sectors along the Expressway often lean toward DHA.",
          "Buyers drawn to resort-style, single-developer amenities and newer master-planned enclaves often lean toward Bahria Town.",
          "Investors comfortable researching sector-level detail can find opportunities in either, since the phase and sector matter more than the brand.",
        ],
      },
      { type: "h2", text: "The same checks apply either way" },
      {
        type: "p",
        text: "Whichever society you choose, the discipline is identical: confirm the seller is the recorded allottee, get a current No Demand Certificate, check the sector's transfer status, and verify the plot's exact location and category before any money moves. Our guide on buying a plot in DHA Islamabad-Rawalpindi walks through each of these checks in detail, and the same logic applies in Bahria Town.",
      },
      { type: "h2", text: "How we help" },
      {
        type: "p",
        text: "We work across both DHA and Bahria Town Islamabad-Rawalpindi. Tell us your budget, purpose and timeline and we will point you at the specific phases and sectors worth looking at in each, rather than a blanket recommendation for one society over the other.",
      },
      {
        type: "p",
        text: "This guide is general information based on the well-known structure of each society. Specific pricing, development status and amenities vary by phase and sector and change over time, so confirm current details for any plot with an advisor before you commit.",
      },
    ],
    faqs: [
      {
        q: "Is DHA or Bahria Town a better investment in Islamabad-Rawalpindi?",
        a: "Neither wins outright. It depends on the specific phase and sector, your budget, and your timeline. We compare like-for-like sectors across both societies rather than recommending one brand over the other by default.",
      },
      {
        q: "What is the difference between how DHA and Bahria Town are run?",
        a: "DHA is developed and regulated by the Defence Housing Authority, a body originally established for armed forces personnel that also sells to the general public. Bahria Town is a privately developed and marketed master-planned community. This affects allotment, records and how amenities are funded.",
      },
      {
        q: "Are prices higher in DHA or Bahria Town?",
        a: "Neither is uniformly higher. Price depends on the phase, the sector's development stage, and file versus possession status in both societies. Compare specific sectors rather than the society names.",
      },
      {
        q: "Do you help buyers in both DHA and Bahria Town?",
        a: "Yes. We work across both and can point you at the phases and sectors that fit your budget and purpose in either.",
      },
      {
        q: "Which is better for rental income, DHA or Bahria Town?",
        a: "It depends on the specific sector's population, development status and proximity to amenities, in either society. We can walk you through the rental picture for the sectors you are considering.",
      },
    ],
    relatedProperties: ["dha-phase-5-6-plots", "bahria-town-villas"],
  },
  {
    slug: "dha-islamabad-rawalpindi-installment-plans",
    title: "Installment Plans for DHA Islamabad-Rawalpindi Plots, Explained",
    metaTitle: "DHA Islamabad-Rawalpindi Installment Plans Explained",
    description:
      "Not all 'installment plans' in DHA Islamabad-Rawalpindi mean the same thing. How DHA's own membership instalments differ from a developer's new-launch plan, and what to check before you sign.",
    dek: "Not every 'installment plan' in DHA Islamabad-Rawalpindi means the same thing. Here is how the two common structures work, and what to check before you sign either one.",
    category: "Buying guide",
    readingTime: "6 min read",
    date: "2026-09-16",
    dateLabel: "16 September 2026",
    body: [
      { type: "h2", text: "Two different things get called \"installments\"" },
      {
        type: "p",
        text: "Buyers often assume every instalment plan works the same way. In practice there are two distinct structures in DHA Islamabad-Rawalpindi, and confusing them is a common way to misjudge what you are actually signing up for.",
      },
      { type: "h2", text: "DHA's own membership and balloting instalments" },
      {
        type: "p",
        text: "When DHA opens a new scheme, members pay a down payment followed by periodic instalments directly to the authority over the period set for that scheme, before a plot number is assigned by ballot. This is the original route into DHA membership, is paid to DHA itself rather than a private seller, and missing instalments can put your membership and allotment at risk. It is separate from buying an already-allotted file or plot from an existing owner.",
      },
      { type: "h2", text: "Developer instalment plans on a new launch" },
      {
        type: "p",
        text: "A newly launched private development, such as Margalla Orchard, offers its own instalment structure to the buyer: a down payment, then fixed monthly instalments over a set tenure, sometimes with no balloon payment at the end. This is an agreement with the developer or seller, not with DHA directly, so the terms, protections and what happens if you miss a payment are set out in that specific contract.",
      },
      { type: "h2", text: "What to check before you sign either one" },
      {
        type: "ol",
        items: [
          "Get the full payment schedule in writing: every instalment amount and due date, not just the headline down payment and monthly figure.",
          "Confirm what happens if you miss a payment. Some agreements charge a penalty; others can cancel the allotment and forfeit instalments already paid.",
          "Confirm whether the price is fixed for the full tenure or can escalate partway through.",
          "Confirm exactly what you own during the instalment period. In many structures a file only converts to a transferable allotment once it is fully paid.",
          "Keep every payment receipt. It is your proof of payment if a dispute ever arises over how much you have paid.",
        ],
      },
      { type: "h2", text: "Modelling your own numbers" },
      {
        type: "p",
        text: "Use the installment plan calculator on our homepage to estimate a down payment and monthly figure for a given price and tenure of 12 to 60 months. The figures are indicative only and assume equal monthly instalments with no markup; always confirm the actual schedule for a specific project with an advisor before committing.",
      },
      { type: "h2", text: "What goes wrong with instalment purchases" },
      {
        type: "ul",
        items: [
          "Stopping payments partway through without checking the contract's cancellation and refund terms first.",
          "Assuming instalments already paid are automatically refundable if you cannot continue. Confirm this in writing before you sign, not after.",
          "Not confirming whether taxes and dues are included in the monthly figure or billed separately.",
          "Treating a developer's instalment plan as equivalent to DHA's own membership instalments, when the protections and process differ.",
        ],
      },
      { type: "h2", text: "How we help" },
      {
        type: "p",
        text: "Before you commit to any instalment plan, we confirm the full schedule, the cancellation terms, and exactly what you own at each stage, in writing, so there are no surprises partway through.",
      },
      {
        type: "p",
        text: "This guide is general information about how instalment structures typically work. Terms vary by scheme and by developer and change over time, so confirm the current terms for a specific project with an advisor before you sign.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between a DHA installment plan and a developer's installment plan?",
        a: "A DHA membership instalment is paid directly to the authority as part of joining and being balloted a plot. A developer's instalment plan, like Margalla Orchard's, is a payment agreement with a private seller for an already-launched project. The terms and protections differ, so check which one you are actually being offered.",
      },
      {
        q: "Is there always a down payment on an installment plan?",
        a: "Typically yes, followed by fixed monthly instalments over an agreed tenure. The exact down payment percentage and tenure vary by scheme, so confirm the specific terms in writing before committing.",
      },
      {
        q: "What happens if I miss an installment?",
        a: "It depends on the contract. Some agreements apply a penalty; others can cancel the allotment and forfeit instalments already paid. Confirm this in writing before you sign, since it varies by scheme.",
      },
      {
        q: "Can I use your calculator to estimate my payments?",
        a: "Yes. The installment plan calculator on our homepage estimates a down payment and monthly figure for tenures from 12 to 60 months. It is indicative only, so confirm the actual schedule for a specific project with an advisor.",
      },
      {
        q: "Do installment plans include markup or interest?",
        a: "It depends on the project. Our calculator assumes equal monthly instalments with no markup as a baseline estimate, but always confirm whether a specific plan includes any markup or additional charges before you sign.",
      },
    ],
    relatedProperties: ["margalla-orchard", "dha-phase-5-6-plots"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
