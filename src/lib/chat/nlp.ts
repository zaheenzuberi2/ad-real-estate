/**
 * Small, dependency-free language layer for the assistant.
 *
 * There is no model behind this. Everything it "understands" comes from
 * normalising the message, expanding domain synonyms, and scoring overlap
 * against known intents. That is a real limit, and the widget is written so it
 * says so and hands over to a person the moment it is out of its depth.
 *
 * Buyers here type in a mix of English and Roman Urdu, so the synonym table
 * carries both. "qeemat kya hai" has to reach the same place as "what price".
 */

const SYNONYMS: Record<string, string[]> = {
  price: ["price", "cost", "rate", "rates", "qeemat", "keemat", "kitna", "kitne", "budget", "afford", "expensive", "cheap", "worth"],
  installment: ["installment", "instalment", "installments", "emi", "qist", "qists", "monthly", "instalments", "plan", "payment", "downpayment", "down"],
  plot: ["plot", "plots", "land", "zameen", "file", "files", "marla", "kanal"],
  house: ["house", "home", "ghar", "villa", "villas", "bungalow", "constructed"],
  commercial: ["commercial", "shop", "office", "plaza", "business"],
  apartment: ["apartment", "flat", "flats", "apartments"],
  visit: ["visit", "see", "tour", "viewing", "site", "dekhna", "appointment", "meet", "meeting"],
  buy: ["buy", "purchase", "buying", "invest", "investment", "kharidna", "lena"],
  sell: ["sell", "selling", "resale", "bechna"],
  documents: ["document", "documents", "paper", "papers", "cnic", "nicop", "passport", "kaghaz", "requirement", "requirements", "need"],
  overseas: ["overseas", "abroad", "foreign", "outside", "uk", "usa", "dubai", "canada", "australia", "saudi", "remote", "remotely"],
  transfer: ["transfer", "possession", "registry", "intiqal", "mutation", "ownership", "title"],
  financing: ["financing", "finance", "loan", "bank", "mortgage", "leasing", "installment"],
  fee: ["fee", "fees", "commission", "charges", "charge", "service"],
  contact: ["contact", "call", "phone", "number", "whatsapp", "reach", "rabta", "talk", "speak", "advisor", "agent"],
  location: ["location", "address", "where", "office", "located", "kahan", "directions", "map", "visit"],
  hours: ["hours", "open", "timing", "timings", "closed", "when", "time"],
  team: ["team", "who", "staff", "ceo", "director", "consultant", "people"],
  greeting: ["hi", "hello", "hey", "salam", "assalam", "assalamualaikum", "aoa", "good", "morning", "evening"],
  thanks: ["thanks", "thank", "shukriya", "thankyou", "appreciated"],
  freehold: ["freehold", "leasehold", "ownership", "own"],
  legit: ["legit", "trusted", "scam", "genuine", "verify", "verified", "registered", "licence", "license", "real"],
};

/** word -> canonical concept */
const LOOKUP = new Map<string, string>();
for (const [concept, words] of Object.entries(SYNONYMS)) {
  for (const w of words) {
    if (!LOOKUP.has(w)) LOOKUP.set(w, concept);
  }
}

const STOP = new Set([
  "a", "an", "the", "is", "are", "was", "were", "be", "been", "of", "in", "on",
  "at", "to", "for", "with", "and", "or", "but", "i", "you", "we", "they", "it",
  "me", "my", "your", "our", "do", "does", "did", "can", "could", "would",
  "should", "will", "want", "have", "has", "any", "some", "please", "there",
  "that", "this", "what", "how", "am", "ka", "ki", "ke", "hai", "hain", "ko",
  "se", "mein", "may", "kya",
]);

export function normalise(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s.]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenise(input: string): string[] {
  return normalise(input)
    .split(" ")
    .filter((t) => t.length > 1 && !STOP.has(t));
}

/** Tokens plus the canonical concept for each, so synonyms score as matches. */
export function concepts(input: string): Set<string> {
  const out = new Set<string>();
  for (const t of tokenise(input)) {
    out.add(t);
    const c = LOOKUP.get(t);
    if (c) out.add(c);
    // crude stem so "plots" reaches "plot"
    if (t.endsWith("s") && t.length > 3) {
      const stem = t.slice(0, -1);
      out.add(stem);
      const cs = LOOKUP.get(stem);
      if (cs) out.add(cs);
    }
  }
  return out;
}

/**
 * Raw count of matched keywords, deliberately not normalised by list length.
 *
 * A message usually only ever touches one or two of an intent's synonyms
 * ("installments" hits just the word "installment" out of a five-word list),
 * so dividing by the list size would make longer synonym lists structurally
 * harder to trigger for no reason connected to actual match quality. A single
 * real hit is real signal; comparing raw counts and letting the highest count
 * win is more honest than pretending this has the precision to normalise.
 */
export function score(messageConcepts: Set<string>, keywords: string[]): number {
  let hits = 0;
  for (const k of keywords) {
    if (messageConcepts.has(k)) hits += 1;
  }
  return hits;
}

// ── Entity extraction ────────────────────────────────────────────────────

export type Entities = {
  phase?: string;
  size?: string;
  propertyType?: string;
  /** Budget in PKR, parsed from "1 crore", "85 lac", "50 lakh". */
  budget?: number;
  months?: number;
};

const PHASE_PATTERNS: [RegExp, string][] = [
  [/\bdha\s*(?:phase\s*)?1\b|\bdha\s*one\b/, "DHA Phase 1"],
  [/\bdha\s*(?:phase\s*)?2\b|\bdha\s*two\b/, "DHA Phase 2"],
  [/\bdha\s*(?:phase\s*)?3\b/, "DHA Phase 3"],
  [/\bdha\s*(?:phase\s*)?4\b/, "DHA Phase 4"],
  [/\bdha\s*(?:phase\s*)?5\b|\bdha\s*five\b/, "DHA Phase 5"],
  [/\bdha\s*(?:phase\s*)?6\b/, "DHA Phase 6"],
  [/\bdha\s*valley\b/, "DHA Valley"],
  [/\bbahria\s*(?:town\s*)?(?:phase\s*)?1\b/, "Bahria Town Phase 1"],
  [/\bbahria\s*(?:town\s*)?(?:phase\s*)?2\b/, "Bahria Town Phase 2"],
  [/\bbahria\s*(?:town\s*)?(?:phase\s*)?4\b/, "Bahria Town Phase 4"],
  [/\bbahria\s*(?:town\s*)?(?:phase\s*)?6\b/, "Bahria Town Phase 6"],
  [/\bbahria\s*(?:town\s*)?(?:phase\s*)?7\b/, "Bahria Town Phase 7"],
  [/\bbahria\s*(?:town\s*)?(?:phase\s*)?8\b/, "Bahria Town Phase 8"],
  [/\bbahria\s*enclave\b|\benclave\b/, "Bahria Enclave"],
  [/\bgolf\s*city\b/, "Bahria Golf City"],
  [/\bmargalla\s*orchard\b|\borchard\b/, "Bahria Enclave"],
];

const TYPE_PATTERNS: [RegExp, string][] = [
  [/\bcommercial\b|\bshop\b|\boffice\b|\bplaza\b/, "Commercial Plot"],
  [/\bvilla\b|\bvillas\b|\bbungalow\b/, "Villa"],
  [/\bapartment\b|\bflat\b/, "Apartment"],
  [/\bfarm\s*house\b|\bfarmhouse\b/, "Farmhouse"],
  [/\bhouse\b|\bghar\b|\bhome\b/, "House"],
  [/\bplot\b|\bplots\b|\bzameen\b|\bfile\b|\bmarla\b|\bkanal\b/, "Residential Plot"],
];

export function extract(input: string): Entities {
  const text = normalise(input);
  const e: Entities = {};

  for (const [re, value] of PHASE_PATTERNS) {
    if (re.test(text)) {
      e.phase = value;
      break;
    }
  }

  for (const [re, value] of TYPE_PATTERNS) {
    if (re.test(text)) {
      e.propertyType = value;
      break;
    }
  }

  const sizeMatch = text.match(/(\d+(?:\.\d+)?)\s*(marla|kanal)/);
  if (sizeMatch) {
    const n = sizeMatch[1];
    const unit = sizeMatch[2] === "kanal" ? "Kanal" : "Marla";
    e.size = `${n} ${unit}`;
  }

  // "1 crore", "85 lac", "50 lakh", "1.5 crore"
  const croreMatch = text.match(/(\d+(?:\.\d+)?)\s*(crore|cr)\b/);
  const lacMatch = text.match(/(\d+(?:\.\d+)?)\s*(lac|lakh|lacs|lakhs)\b/);
  if (croreMatch) e.budget = Math.round(parseFloat(croreMatch[1]) * 10_000_000);
  else if (lacMatch) e.budget = Math.round(parseFloat(lacMatch[1]) * 100_000);

  const yearMatch = text.match(/(\d+)\s*(?:year|years|saal|sal)\b/);
  const monthMatch = text.match(/(\d+)\s*(?:month|months|mahine|maheene)\b/);
  if (yearMatch) e.months = parseInt(yearMatch[1], 10) * 12;
  else if (monthMatch) e.months = parseInt(monthMatch[1], 10);

  return e;
}
