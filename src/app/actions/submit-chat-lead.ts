"use server";

import { headers } from "next/headers";
import {
  chatLeadSchema,
  type ChatLeadInput,
  type ChatLeadResult,
} from "@/lib/lead-schema";
import { getWriteClient } from "@/sanity/client";
import { site } from "@/lib/site";
import { checkRateLimit } from "@/lib/rate-limit";

/**
 * Called directly from the chat widget once the qualification flow completes.
 * Writes the same `lead` document the contact form does, so both channels land
 * in one Studio inbox — tagged so an advisor can tell them apart.
 */
export async function submitChatLead(
  input: ChatLeadInput
): Promise<ChatLeadResult> {
  const parsed = chatLeadSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message:
        "Some of those answers did not come through. You can also reach us straight on WhatsApp.",
    };
  }

  const lead = parsed.data;

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return {
      ok: false,
      message: "That is a lot of enquiries from one connection. Try again shortly.",
    };
  }

  const summary = [lead.intent, lead.area].filter(Boolean).join(" · ");
  const recap = [
    `Looking to: ${lead.intent}`,
    lead.budget && `Budget: ${lead.budget}`,
    lead.area && `Area: ${lead.area}`,
    lead.features && `Must-haves: ${lead.features}`,
    lead.timeline && `Timeframe: ${lead.timeline}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await getWriteClient().create({
      _type: "lead",
      name: lead.name,
      whatsapp: lead.whatsapp,
      project: summary || "Chat enquiry",
      message: recap,
      channel: "Chat assistant",
      intent: lead.intent,
      budget: lead.budget || undefined,
      area: lead.area || undefined,
      features: lead.features || undefined,
      timeline: lead.timeline || undefined,
      submittedAt: new Date().toISOString(),
      sourcePage: headerList.get("referer") ?? "chat assistant",
      status: "new",
    });
  } catch (err) {
    console.error("[submit-chat-lead] Failed to save enquiry:", err);
    return {
      ok: false,
      message: `Something went wrong on our side. Please call ${site.phone.display} or message us on WhatsApp.`,
    };
  }

  return {
    ok: true,
    message: `Thanks ${lead.name.split(" ")[0]}, an advisor has everything you told me and will message you on WhatsApp within one business day.`,
  };
}
