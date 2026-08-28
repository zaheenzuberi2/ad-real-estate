/**
 * Pushes the seed inventory in src/content/properties.ts into Sanity.
 * Run once after creating the Sanity project:  npm run seed
 *
 * Safe to re-run: documents are keyed by slug, so this updates rather than
 * duplicating. It will overwrite Studio edits to those same documents.
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Minimal .env.local reader so the script needs no extra dependency.
try {
  for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
} catch {
  // No .env.local — fall back to the real environment.
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.\n" +
      "Fill them into .env.local first — see .env.example."
  );
  process.exit(1);
}

const { properties } = await import("../src/content/properties.ts");

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01",
  token,
  useCdn: false,
});

const key = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);

const docs = properties.map((p, i) => ({
  _id: `property-${p.slug}`,
  _type: "property",
  title: p.title,
  slug: { _type: "slug", current: p.slug },
  eyebrow: p.eyebrow,
  location: p.location,
  phase: p.phase,
  propertyType: p.propertyType,
  status: p.status,
  description: p.description,
  overview: p.overview,
  priceFrom: p.priceFrom ?? undefined,
  priceNote: p.priceNote,
  sizes: p.sizes,
  features: p.features.map((f) => ({ _key: key(f.label), icon: f.icon, label: f.label })),
  highlights: p.highlights,
  installmentMonths: p.installmentMonths ?? undefined,
  featured: p.featured,
  order: (i + 1) * 10,
}));

try {
  await docs
    .reduce((tx, doc) => tx.createOrReplace(doc), client.transaction())
    .commit();
  console.log(`Seeded ${docs.length} properties into "${dataset}":`);
  for (const d of docs) console.log(`  · ${d.title}`);
  console.log("\nOpen /studio to edit them.");
} catch (err) {
  console.error("Seed failed:", err.message);
  process.exit(1);
}
