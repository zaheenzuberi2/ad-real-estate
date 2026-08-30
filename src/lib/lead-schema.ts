import { z } from "zod";

/**
 * Shared between the client form and the server action, so the browser and the
 * server can never disagree about what counts as a valid lead.
 */
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "That name is too long."),
  whatsapp: z
    .string()
    .trim()
    .min(7, "Please enter a valid WhatsApp number.")
    .max(20, "That number is too long.")
    .regex(/^[0-9+\-\s()]+$/, "Use digits only, e.g. 300 1234567."),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(120)
    .pipe(z.email("Please enter a valid email address.")),
  project: z.string().trim().min(1, "Please choose a project."),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  /** Hidden field — real users leave it empty, bots fill it in. */
  company: z.string().max(0, "Submission rejected.").optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof LeadInput, string>>;
};

/**
 * The chat assistant qualifies a visitor over several taps, then collects a
 * name and WhatsApp number — no email. Same name/number rules as the form so a
 * chat lead is held to the same standard once it reaches the Studio.
 */
export const chatLeadSchema = z.object({
  name: leadSchema.shape.name,
  whatsapp: leadSchema.shape.whatsapp,
  intent: z.string().trim().min(1).max(120),
  budget: z.string().trim().max(120).optional().or(z.literal("")),
  area: z.string().trim().max(120).optional().or(z.literal("")),
  features: z.string().trim().max(500).optional().or(z.literal("")),
  timeline: z.string().trim().max(120).optional().or(z.literal("")),
});

export type ChatLeadInput = z.infer<typeof chatLeadSchema>;

export type ChatLeadResult = { ok: boolean; message: string };
