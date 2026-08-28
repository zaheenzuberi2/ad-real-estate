import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, isSanityConfigured } from "./env";

export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});

/**
 * Server-only client with write access. Never import this into a Client
 * Component — the token must not reach the browser.
 */
export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!isSanityConfigured) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID — enquiries cannot be saved. See .env.example"
    );
  }
  if (!token) {
    throw new Error(
      "Missing SANITY_API_WRITE_TOKEN — enquiries cannot be saved. See .env.example"
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });
}
