import { properties } from "@/content/properties";
import { faqs } from "@/content/faqs";
import { team } from "@/content/team";
import { site, fullAddress } from "@/lib/site";
import { formatPkr } from "@/lib/format";
import { concepts, score, extract, type Entities } from "./nlp";

export type ChatAction =
  | { kind: "link"; label: string; href: string }
  | { kind: "external"; label: string; href: string }
  | { kind: "reply"; label: string };

export type ChatCard = {
  title: string;
  meta: string;
  href: string;
};

export type BotReply = {
  text: string;
  cards?: ChatCard[];
  actions?: ChatAction[];
  /** Set when the assistant knows it is out of its depth. */
  handoff?: boolean;
};

type Intent = {
  name: string;
  keywords: string[];
  answer: (e: Entities, raw: string) => BotReply;
};

const WHATSAPP = (text: string) =>
  `${site.whatsapp.href}?text=${encodeURIComponent(text)}`;

const advisorAction: ChatAction = {
  kind: "external",
  label: "Talk to an advisor",
  href: WHATSAPP("Hi, I was using the site assistant and would like to speak to someone."),
};

// ── Property matching over the real inventory ────────────────────────────

function matchProperties(e: Entities) {
  return properties
    .map((p) => {
      let s = 0;
      if (e.phase && p.phase === e.phase) s += 3;
      if (e.propertyType && p.propertyType === e.propertyType) s += 2;
      if (e.size && p.sizes.some((sz) => sz.toLowerCase() === e.size!.toLowerCase())) s += 2;
      if (e.months && p.installmentMonths && p.installmentMonths >= e.months) s += 1;
      if (e.budget && p.priceFrom && p.priceFrom <= e.budget) s += 1;
      return { p, s };
    })
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((r) => r.p);
}

function toCards(list: typeof properties): ChatCard[] {
  return list.map((p) => ({
    title: p.title,
    meta: `${p.propertyType} · ${p.phase} · ${p.sizes.join(", ")}`,
    href: `/properties/${p.slug}`,
  }));
}

function propertyReply(e: Entities): BotReply {
  const matches = matchProperties(e);
  const named: string[] = [];
  if (e.size) named.push(e.size);
  if (e.propertyType) named.push(e.propertyType.toLowerCase());
  if (e.phase) named.push(`in ${e.phase}`);
  const criteria = named.join(" ");

  if (matches.length > 0) {
    return {
      text: criteria
        ? `Here is what we currently list matching ${criteria}. Prices are confirmed per plot, so an advisor will quote you the live rate.`
        : "Here is what we currently have listed. Prices are confirmed per plot, so an advisor will quote you the live rate.",
      cards: toCards(matches),
      actions: [
        { kind: "link", label: "See all properties", href: "/properties" },
        advisorAction,
      ],
    };
  }

  return {
    text: criteria
      ? `Nothing in our published list matches ${criteria} right now. Our inventory moves quickly and plenty of what we handle never gets listed publicly, so it is worth asking an advisor directly.`
      : "I could not match that to a published listing. Our inventory moves quickly and a lot of what we handle is never listed publicly.",
    actions: [
      {
        kind: "external",
        label: "Ask an advisor on WhatsApp",
        href: WHATSAPP(
          `Hi, I am looking for ${criteria || "a property"} in DHA or Bahria Town. What do you have available?`
        ),
      },
      { kind: "link", label: "Browse all listings", href: "/properties" },
    ],
    handoff: true,
  };
}

// ── Installment maths ────────────────────────────────────────────────────

function installmentReply(e: Entities): BotReply {
  const months = e.months ?? 36;

  if (e.budget) {
    const down = e.budget * 0.2;
    const monthly = (e.budget - down) / months;
    return {
      text:
        `On ${formatPkr(e.budget)} with a 20% down payment over ${months} months, ` +
        `that is about ${formatPkr(down)} down and ${formatPkr(monthly)} a month. ` +
        `This is a straight division with no markup, so treat it as indicative and confirm the real schedule with an advisor.`,
      actions: [
        { kind: "link", label: "Open the full calculator", href: "/#calculator" },
        advisorAction,
      ],
    };
  }

  const onPlan = properties.filter((p) => p.installmentMonths);
  return {
    text:
      onPlan.length > 0
        ? `${onPlan.map((p) => p.title).join(" and ")} ${onPlan.length === 1 ? "is" : "are"} sold on installments, typically a modest down payment then fixed monthly amounts with no balloon payment at the end. Tell me a total price, for example "installments on 85 lac", and I will work out the numbers.`
        : "Tell me a total price, for example \"installments on 85 lac over 3 years\", and I will work out the down payment and monthly amount.",
    cards: onPlan.length ? toCards(onPlan) : undefined,
    actions: [{ kind: "link", label: "Open the calculator", href: "/#calculator" }],
  };
}

// ── Intents ──────────────────────────────────────────────────────────────

const INTENTS: Intent[] = [
  {
    name: "greeting",
    keywords: ["greeting", "hi", "hello", "salam", "hey"],
    answer: () => ({
      text: "Hello. I can look up our listings, explain how buying in DHA or Bahria Town works, and work out installment numbers. What are you after?",
      actions: [
        { kind: "reply", label: "Show me properties" },
        { kind: "reply", label: "Installment plans" },
        { kind: "reply", label: "Book a site visit" },
      ],
    }),
  },
  {
    name: "thanks",
    keywords: ["thanks", "thank", "shukriya"],
    answer: () => ({
      text: "Any time. If you want to pick this up with a person, our advisors reply on WhatsApp within a business day.",
      actions: [advisorAction],
    }),
  },
  {
    name: "property",
    keywords: ["plot", "house", "commercial", "apartment", "buy", "property", "marla", "kanal", "available", "villa", "invest"],
    answer: (e) => propertyReply(e),
  },
  {
    name: "price",
    keywords: ["price", "budget", "afford"],
    answer: (e) => {
      const matches = matchProperties(e);
      return {
        text:
          "We publish rates per plot rather than as a single list price, because they move with sector, size and possession status. An advisor will confirm the current figure for anything you are interested in.",
        cards: matches.length ? toCards(matches) : toCards(properties),
        actions: [
          {
            kind: "external",
            label: "Get current rates",
            href: WHATSAPP("Hi, could you send me current rates for your available plots?"),
          },
        ],
      };
    },
  },
  {
    name: "installment",
    keywords: ["installment", "monthly", "emi", "qist", "downpayment"],
    answer: (e) => installmentReply(e),
  },
  {
    name: "visit",
    keywords: ["visit", "site", "tour", "appointment", "meet"],
    answer: () => ({
      text: `We arrange guided visits in person, or over video if you are abroad. Our office is at ${fullAddress}, open ${site.hours}.`,
      actions: [
        {
          kind: "external",
          label: "Book a site visit",
          href: WHATSAPP("Hi, I would like to book a site visit. When are you available?"),
        },
        { kind: "link", label: "Office location", href: "/contact" },
      ],
    }),
  },
  {
    name: "overseas",
    keywords: ["overseas", "abroad", "remote"],
    answer: () => ({
      text: "Yes. We regularly handle purchases for clients living abroad using power of attorney, video verification calls and secure documentation, so you do not need to travel to complete a purchase.",
      actions: [
        {
          kind: "external",
          label: "Ask about buying from abroad",
          href: WHATSAPP("Hi, I live overseas and want to buy property in Islamabad. How does the process work?"),
        },
      ],
    }),
  },
  {
    name: "contact",
    keywords: ["contact", "advisor", "whatsapp"],
    answer: () => ({
      text: `You can reach us on ${site.phone.display}, email ${site.email}, or walk into the DHA Phase 5 office. Our advisors answer WhatsApp fastest.`,
      actions: [
        advisorAction,
        { kind: "external", label: `Call ${site.phone.display}`, href: site.phone.href },
        { kind: "link", label: "Contact page", href: "/contact" },
      ],
    }),
  },
  {
    name: "location",
    keywords: ["location", "address", "office", "directions"],
    answer: () => ({
      text: `Our office is at ${fullAddress}. We are open ${site.hours}.`,
      actions: [
        { kind: "link", label: "Directions and map", href: "/contact" },
      ],
    }),
  },
  {
    name: "hours",
    keywords: ["hours", "open", "timing", "time"],
    answer: () => ({
      text: `We are open ${site.hours}. If you message on WhatsApp outside those hours an advisor will pick it up the next working day.`,
      actions: [advisorAction],
    }),
  },
  {
    name: "team",
    keywords: ["team", "who", "ceo", "director", "staff"],
    answer: () => ({
      text: `Our advisory team is ${team.map((t) => t.name).join(", ")}. Each of them handles site visits, verification and possession personally.`,
      actions: [{ kind: "link", label: "Meet the team", href: "/about" }],
    }),
  },
  {
    name: "legit",
    keywords: ["legit", "trusted", "registered", "verify", "scam"],
    answer: () => ({
      text: `We are registered as ${site.legalName} under the Real Estate Agents & Motor Vehicle Dealers (Regulation of Business) Ordinance, 1980, and hold a Zameen.com Trusted Agency award and Rawalpindi Chamber membership. The originals are on display at our office.`,
      actions: [{ kind: "link", label: "See our certifications", href: "/about" }],
    }),
  },
];

// ── Public entry point ───────────────────────────────────────────────────

// Both thresholds are raw keyword-match counts (see nlp.ts `score`), not
// normalised scores — one genuine hit is enough to act on.
const FAQ_MIN_HITS = 3;
const INTENT_MIN_HITS = 1;

export function respond(message: string): BotReply {
  const c = concepts(message);
  const e = extract(message);

  // A concrete property description outranks a generic intent match.
  const hasPropertySignal = Boolean(e.phase || e.size || e.propertyType);

  let bestIntent: { intent: Intent; s: number } | null = null;
  for (const intent of INTENTS) {
    const s = score(c, intent.keywords);
    if (!bestIntent || s > bestIntent.s) bestIntent = { intent, s };
  }

  let bestFaq: { index: number; s: number } | null = null;
  faqs.forEach((f, index) => {
    const s = score(c, [...concepts(`${f.q} ${f.a}`)]);
    if (!bestFaq || s > bestFaq.s) bestFaq = { index, s };
  });

  const faqHit = bestFaq as { index: number; s: number } | null;

  // An FAQ that clearly beats the intent match answers in the client's own words.
  if (
    faqHit &&
    faqHit.s >= FAQ_MIN_HITS &&
    (!bestIntent || faqHit.s > bestIntent.s) &&
    !hasPropertySignal
  ) {
    return {
      text: faqs[faqHit.index].a,
      actions: [
        { kind: "link", label: "More common questions", href: "/contact#faq" },
        advisorAction,
      ],
    };
  }

  if (hasPropertySignal && (!bestIntent || bestIntent.s < 2)) {
    return propertyReply(e);
  }

  if (bestIntent && bestIntent.s >= INTENT_MIN_HITS) {
    return bestIntent.intent.answer(e, message);
  }

  // Out of depth. Say so plainly rather than guessing.
  return {
    text: "I did not follow that one. I can help with our listings, installment numbers, documents, buying from overseas, and booking a visit. For anything else an advisor is the better answer.",
    actions: [
      { kind: "reply", label: "Show me properties" },
      { kind: "reply", label: "What documents do I need?" },
      advisorAction,
    ],
    handoff: true,
  };
}

export const OPENING: BotReply = {
  text: "Hello. I am an automated assistant for AD Real Estate, not a person. I can search our listings, answer the common questions and work out installment numbers. For anything specific I will put you through to an advisor.",
  actions: [
    { kind: "reply", label: "Show me properties" },
    { kind: "reply", label: "Installment plans" },
    { kind: "reply", label: "Buying from overseas" },
    { kind: "reply", label: "Book a site visit" },
  ],
};
