/**
 * Deliberately non-throwing at module load.
 *
 * These values are read during the build of every route that touches Sanity,
 * so throwing here would take the whole marketing site down over a missing CMS
 * variable. Instead the public pages build and serve regardless, and the two
 * places that genuinely cannot work without credentials — the Studio route and
 * the lead write client — report a clear error at the point of use.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export const isSanityConfigured = projectId.length > 0;
