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
  /** URL segment — keep stable once published. */
  slug: string;
  /** On-page <h1>. */
  title: string;
  /** <title> tag — may be more keyword-forward than the h1. Keep ~60 chars. */
  metaTitle: string;
  /** Meta description — keep under ~160 chars. */
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
};

export const guides: Guide[] = [
  {
    slug: "buying-a-plot-in-dha-islamabad",
    title: "Buying a Plot in DHA Islamabad: The Complete Process",
    metaTitle: "Buying a Plot in DHA Islamabad: Full Process & Checklist",
    description:
      "How a DHA Islamabad plot actually changes hands — the routes to market, file vs possession, the pre-purchase checks, the transfer step by step, and the costs beyond the plot price.",
    dek: "A DHA Islamabad plot changes hands through a documented transfer at the DHA office, not a handshake. Here is what the process involves, the paperwork you need, and the checks that protect your money.",
    category: "Buying guide",
    readingTime: "7 min read",
    date: "2026-09-05",
    dateLabel: "5 September 2026",
    body: [
      { type: "h2", text: "Three ways a plot comes to market" },
      {
        type: "p",
        text: "Almost every DHA Islamabad plot reaches a buyer through one of three routes. Knowing which one you are in sets your price, your risk, and your timeline.",
      },
      {
        type: "ul",
        items: [
          "Balloting — you apply as a DHA member, pay over instalments, and a sector and plot number are assigned to you by draw. It is the longest route and the lowest entry price.",
          "File transfer — you buy an allotment that has not yet been physically handed over. Cheaper than a developed plot and easy to resell, but its value depends entirely on the file being clean and the sector being transferable.",
          "Possession plot — a developed plot at a known location that you can stand on. It costs more and there is far less that can go wrong.",
        ],
      },
      { type: "h2", text: "File or possession: which one fits you" },
      {
        type: "p",
        text: "A file is a claim on a future plot. A possession plot is the plot itself. A file suits an investor who is comfortable holding through development and keeping an eye on transfer rules. A possession plot suits a buyer who wants certainty now, or who plans to build. Neither is better in the abstract — it depends on your horizon and your appetite for paperwork.",
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
          "Get a No Demand Certificate (NDC) from DHA. It confirms every charge on the plot — development charges, membership, instalments — has been cleared. Any unpaid balance becomes your problem the moment the plot is in your name.",
          "Check the transfer status of the sector. Newly balloted sectors sometimes carry a lock-in period during which plots cannot be transferred at all. DHA's transfer and records section confirms this in minutes.",
          "Verify the plot location and category. Corner, park-facing, boulevard, and the exact sector all affect value and must appear on the file — not just in conversation.",
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
          "Records are updated. You receive the new letter — keep the original safe, because you will need it to sell the plot or to take possession later.",
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
          "A DHA transfer fee, and — on the first transfer into your name — a membership fee.",
          "Capital Value Tax and federal advance tax. The advance tax rate depends on whether you are on the active taxpayer list.",
          "Stamp duty and registration charges where a registered deed is involved.",
          "Agent commission, agreed in writing up front.",
          "Any development charges the seller has not already cleared.",
        ],
      },
      { type: "h2", text: "Buying from abroad" },
      {
        type: "p",
        text: "You do not need to fly in. Overseas buyers complete the same transfer through a power of attorney attested by the Pakistani mission in their country and the Ministry of Foreign Affairs, together with a video verification call. Send the funds through banking channels and keep the remittance record — it matters for tax and for any future repatriation of the proceeds.",
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
        text: "We run every one of these checks before a client commits — seller verification, the NDC, the sector's transfer status, the plot's location and category, and the full cost breakdown in writing. If you are weighing a specific plot or file, send us the details and we will tell you exactly what we would do.",
      },
      {
        type: "p",
        text: "This guide is general information about how DHA Islamabad transactions work. Rules, fees, and tax rates vary by phase and change over time — confirm the specifics for your plot with DHA and a qualified advisor before you commit.",
      },
    ],
    faqs: [
      {
        q: "Should I buy a file or a possession plot in DHA Islamabad?",
        a: "A file is cheaper and easier to resell, but its value depends on the sector being transferable and the paperwork being clean. A possession plot costs more and gives you a known location you can build on. If you are investing and can hold, a clean file works well; if you want certainty, buy possession.",
      },
      {
        q: "What is a No Demand Certificate and why does it matter?",
        a: "An NDC is issued by DHA and confirms that every charge on a plot — development charges, membership, instalments — has been paid. Without it, unpaid dues transfer to you along with the plot. Never complete a purchase before the seller produces a current NDC.",
      },
      {
        q: "How long does a DHA Islamabad plot transfer take?",
        a: "Once the documents are in order and the NDC is issued, the transfer itself is usually a single appointment at the DHA office. Getting to that point — verification, clearing dues, and arranging a power of attorney if needed — typically takes one to three weeks.",
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
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
