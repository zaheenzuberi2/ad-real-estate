import { budgetBands } from "@/content/properties";

export type FlowKey =
  | "intent"
  | "budget"
  | "area"
  | "features"
  | "timeline"
  | "name"
  | "whatsapp";

export type FlowStep = {
  key: FlowKey;
  /** The bot's prompt for this step. */
  question: string;
  /** Tap-to-answer chips. Absent for free-text-only steps. */
  options?: string[];
  /** Whether the visitor may type a custom answer instead of tapping. */
  allowText?: boolean;
  /** Adds a "Skip" chip; a skipped step stores an empty string. */
  skippable?: boolean;
  /** Returns an error message to show, or null when the answer is acceptable. */
  validate?: (value: string) => string | null;
};

const name: FlowStep = {
  key: "name",
  question: "Almost done. What name should the advisor ask for?",
  allowText: true,
  validate: (v) =>
    v.trim().length >= 2 ? null : "Please type your name so we know who to greet.",
};

const whatsapp: FlowStep = {
  key: "whatsapp",
  question: "And your WhatsApp number, so an advisor can reach you directly?",
  allowText: true,
  validate: (v) => {
    const t = v.trim();
    if (t.length < 7) return "That number looks too short. Include the area code.";
    if (!/^[0-9+\-\s()]+$/.test(t)) return "Digits only, e.g. 0300 1234567.";
    return null;
  },
};

/**
 * The qualification flow. Kept as plain data so the widget just walks the list;
 * the answers are handed to `submitChatLead` when the last step is done.
 */
export const LEAD_FLOW: FlowStep[] = [
  {
    key: "intent",
    question: "Happy to set that up. First, what brings you in today?",
    options: [
      "Buy a home",
      "Buy a plot",
      "Buy to invest",
      "Sell or rent out my property",
    ],
    allowText: true,
  },
  {
    key: "budget",
    question: "Roughly what budget are you working with?",
    options: [...budgetBands.slice(1).map((b) => b.label), "Not sure yet"],
    allowText: true,
  },
  {
    key: "area",
    question: "Which area are you focused on?",
    options: [
      "DHA Phase 5",
      "DHA Phase 6",
      "DHA Phase 1 to 4",
      "DHA Valley",
      "Open to suggestions",
    ],
    allowText: true,
  },
  {
    key: "features",
    question:
      "Any must-haves in the property? Type them in, or skip if nothing specific yet.",
    allowText: true,
    skippable: true,
  },
  {
    key: "timeline",
    question: "When are you looking to move on this?",
    options: [
      "Ready now",
      "In 1 to 3 months",
      "In 3 to 6 months",
      "Just exploring",
    ],
    allowText: true,
  },
  name,
  whatsapp,
];

export const FLOW_SKIP_LABEL = "Skip";
