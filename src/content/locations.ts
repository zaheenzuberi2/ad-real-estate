import { phases } from "@/content/site-content";

/**
 * DHA Islamabad-Rawalpindi numbered phases we publish a dedicated service page for, so
 * the site can rank for "real estate agency in DHA Phase N" style searches.
 * Pulled from the same `phases` list the property filters use, so this can't
 * drift into a phase the site doesn't already recognise.
 */
export type DhaLocation = {
  slug: string;
  phase: string;
  phaseNumber: number;
};

export const dhaLocations: DhaLocation[] = phases
  .map((phase) => {
    const match = phase.match(/^DHA Phase (\d+)$/);
    return match ? { phase, phaseNumber: Number(match[1]) } : null;
  })
  .filter((v): v is { phase: string; phaseNumber: number } => v !== null)
  .map((v) => ({ ...v, slug: `dha-phase-${v.phaseNumber}` }));

export function getLocation(slug: string) {
  return dhaLocations.find((l) => l.slug === slug);
}

/**
 * Pull every "Phase N" number mentioned in a property's title, phase or
 * location fields, so a listing like "DHA Phase 5 & 6" surfaces on both the
 * Phase 5 and Phase 6 service pages instead of only the first number found.
 */
export function phaseNumbersIn(text: string): number[] {
  const found = new Set<number>();
  for (const match of text.matchAll(/phase\s*([\d\s&,]+)/gi)) {
    for (const part of match[1].split(/[^\d]+/)) {
      if (part) found.add(Number(part));
    }
  }
  return [...found];
}
