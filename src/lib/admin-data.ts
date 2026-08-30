import "server-only";
import { getWriteClient } from "@/sanity/client";

/** Everything the admin panel needs about one enquiry. */
export type AdminLead = {
  _id: string;
  name?: string;
  whatsapp?: string;
  email?: string;
  channel?: string;
  project?: string;
  intent?: string;
  budget?: string;
  area?: string;
  features?: string;
  timeline?: string;
  message?: string;
  submittedAt?: string;
  sourcePage?: string;
  status?: string;
  assignedTo?: string;
  notes?: string;
};

const LEAD_FIELDS = `
  _id, name, whatsapp, email, channel, project,
  intent, budget, area, features, timeline, message,
  submittedAt, sourcePage, status, assignedTo, notes
`;

export async function getLeads(): Promise<AdminLead[]> {
  return getWriteClient().fetch(
    `*[_type == "lead"] | order(submittedAt desc) { ${LEAD_FIELDS} }`,
  );
}

export async function getLead(id: string): Promise<AdminLead | null> {
  return getWriteClient().fetch(
    `*[_type == "lead" && _id == $id][0] { ${LEAD_FIELDS} }`,
    { id },
  );
}

/** One listing in the shape the edit form works with (raw, not the site shape). */
export type AdminProperty = {
  _id: string;
  title?: string;
  slug?: string;
  eyebrow?: string;
  location?: string;
  phase?: string;
  propertyType?: string;
  status?: string;
  description?: string;
  overview?: string[];
  priceFrom?: number | null;
  priceNote?: string;
  sizes?: string[];
  features?: { icon: string; label: string }[];
  highlights?: string[];
  installmentMonths?: number | null;
  featured?: boolean;
  order?: number;
  images?: { _key: string; alt?: string; url?: string }[];
};

const PROPERTY_FIELDS = `
  _id, title, "slug": slug.current, eyebrow, location, phase,
  propertyType, status, description, overview, priceFrom, priceNote,
  sizes, features[]{ icon, label }, highlights, installmentMonths,
  featured, order,
  images[]{ _key, alt, "url": asset->url }
`;

export async function getAdminProperties(): Promise<AdminProperty[]> {
  return getWriteClient().fetch(
    `*[_type == "property"] | order(order asc) { ${PROPERTY_FIELDS} }`,
  );
}

export async function getAdminProperty(id: string): Promise<AdminProperty | null> {
  return getWriteClient().fetch(
    `*[_type == "property" && _id == $id][0] { ${PROPERTY_FIELDS} }`,
    { id },
  );
}

export const LEAD_STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "visit", label: "Site Visit Booked" },
  { value: "won", label: "Won" },
  { value: "closed", label: "Closed" },
] as const;

export const PROPERTY_STATUSES = [
  "Available",
  "New Launch",
  "Limited Units",
  "Sold Out",
] as const;

export const FEATURE_ICONS = [
  "ruler",
  "route",
  "map-pin",
  "calendar-clock",
  "flag",
  "heart-pulse",
  "building",
] as const;
