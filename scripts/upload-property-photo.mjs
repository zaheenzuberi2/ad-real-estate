/**
 * One-off: upload a local image as a Sanity asset and attach it to a
 * property document's `images` array. Usage:
 *   node --experimental-strip-types scripts/upload-property-photo.mjs <slug> <file> "<alt text>"
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

try {
  for (const line of readFileSync(join(root, ".env.local"), "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
} catch {}

const [, , slug, filePath, altText] = process.argv;
if (!slug || !filePath || !altText) {
  console.error('Usage: node upload-property-photo.mjs <slug> <file> "<alt text>"');
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const docId = `property-${slug}`;
const doc = await client.getDocument(docId);
if (!doc) {
  console.error(`No property document found with id "${docId}"`);
  process.exit(1);
}

const asset = await client.assets.upload("image", readFileSync(filePath), {
  filename: `${slug}.jpg`,
});

const key = `photo-${Date.now().toString(36)}`;
await client
  .patch(docId)
  .setIfMissing({ images: [] })
  .append("images", [
    { _type: "image", _key: key, asset: { _type: "reference", _ref: asset._id }, alt: altText },
  ])
  .commit();

console.log(`Attached ${filePath} to ${docId} (asset ${asset._id})`);
