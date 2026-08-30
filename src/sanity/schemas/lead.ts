import { defineField, defineType } from "sanity";

/**
 * Leads are written server-side only. The Studio is the agency's inbox for
 * them — staff triage here rather than in a separate CRM.
 */
export const leadType = defineType({
  name: "lead",
  title: "Enquiry",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string", readOnly: true }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({
      name: "channel",
      title: "Came From",
      type: "string",
      readOnly: true,
      description: "Website form or the chat assistant.",
    }),
    defineField({ name: "project", title: "Project Of Interest", type: "string", readOnly: true }),
    defineField({
      name: "intent",
      title: "Looking To",
      type: "string",
      readOnly: true,
      description: "What the visitor said they want to do (chat leads only).",
    }),
    defineField({ name: "budget", title: "Budget", type: "string", readOnly: true }),
    defineField({ name: "area", title: "Preferred Area", type: "string", readOnly: true }),
    defineField({ name: "features", title: "Requested Features", type: "text", rows: 2, readOnly: true }),
    defineField({ name: "timeline", title: "Timeframe", type: "string", readOnly: true }),
    defineField({ name: "message", title: "Message", type: "text", rows: 4, readOnly: true }),
    defineField({
      name: "submittedAt",
      title: "Received",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "sourcePage",
      title: "Submitted From",
      type: "string",
      readOnly: true,
      description: "Which page the enquiry came from.",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Site Visit Booked", value: "visit" },
          { title: "Won", value: "won" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({
      name: "assignedTo",
      title: "Assigned Advisor",
      type: "string",
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      rows: 4,
      description: "Not visible on the website.",
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "newest",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      project: "project",
      status: "status",
      channel: "channel",
      submittedAt: "submittedAt",
    },
    prepare({ title, project, status, channel, submittedAt }) {
      const date = submittedAt
        ? new Date(submittedAt).toLocaleDateString("en-PK", {
            day: "numeric",
            month: "short",
          })
        : "";
      const tag = channel === "Chat assistant" ? "Chat" : null;
      return {
        title: `${title ?? "Unknown"}${status === "new" ? "  ● NEW" : ""}`,
        subtitle: [tag, project, date].filter(Boolean).join(" · "),
      };
    },
  },
});
