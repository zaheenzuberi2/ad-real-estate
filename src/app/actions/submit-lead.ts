"use server";

import { headers } from "next/headers";
import { Resend } from "resend";
import { leadSchema, type LeadFormState, type LeadInput } from "@/lib/lead-schema";
import { getWriteClient } from "@/sanity/client";
import { site } from "@/lib/site";
import { checkRateLimit } from "@/lib/rate-limit";

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  // Unfilled fields arrive as null; coerce so validation reports the friendly
  // message rather than a raw type error.
  const field = (key: string) => String(formData.get(key) ?? "");

  const parsed = leadSchema.safeParse({
    name: field("name"),
    whatsapp: field("whatsapp"),
    email: field("email"),
    project: field("project"),
    message: field("message"),
    company: field("company"),
  });

  if (!parsed.success) {
    const fieldErrors: LeadFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof LeadInput;
      fieldErrors[key] ??= issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  const lead = parsed.data;

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return {
      status: "error",
      message: "Too many enquiries from this connection. Please try again shortly.",
    };
  }

  const sourcePage = headerList.get("referer") ?? "unknown";
  const submittedAt = new Date().toISOString();

  try {
    await getWriteClient().create({
      _type: "lead",
      name: lead.name,
      whatsapp: lead.whatsapp,
      email: lead.email,
      project: lead.project,
      message: lead.message || undefined,
      channel: "Website form",
      submittedAt,
      sourcePage,
      status: "new",
    });
  } catch (err) {
    console.error("[submit-lead] Failed to save enquiry:", err);
    return {
      status: "error",
      message: `Something went wrong saving your enquiry. Please call us on ${site.phone.display} or message us on WhatsApp.`,
    };
  }

  await notifyTeam(lead, submittedAt);

  return {
    status: "success",
    message:
      "Thank you. Your enquiry has reached our team. An advisor will contact you on WhatsApp within one business day.",
  };
}

/**
 * Email is a convenience notification; the enquiry is already safely stored in
 * the Studio by this point, so a mail failure must not fail the submission.
 */
async function notifyTeam(lead: LeadInput, submittedAt: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.warn(
      "[submit-lead] Email notification skipped — RESEND_API_KEY, LEAD_NOTIFICATION_EMAIL or LEAD_FROM_EMAIL not set."
    );
    return;
  }

  try {
    await new Resend(apiKey).emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      replyTo: lead.email,
      subject: `New enquiry: ${lead.name} (${lead.project})`,
      text: [
        `Name:     ${lead.name}`,
        `WhatsApp: ${lead.whatsapp}`,
        `Email:    ${lead.email}`,
        `Project:  ${lead.project}`,
        lead.message ? `\nMessage:\n${lead.message}` : "",
        `\nReceived: ${new Date(submittedAt).toLocaleString("en-PK")}`,
        `\nWhatsApp this lead: https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[submit-lead] Email notification failed:", err);
  }
}
