import type { Company } from "@/lib/data/types";

export interface Recommendation {
  company: Company;
  /** Same-sector topic the user already follows that this recommendation is matched against. */
  matchedTicker: string;
}

/**
 * Content-based "because you follow X" recommendations: same-sector names
 * the user doesn't already follow. Empty input -> empty output; the caller
 * shows the "follow something first" empty state instead of a fallback.
 * Returns structured data rather than a pre-formatted sentence so the
 * caller can render the reason in whichever language the UI is in.
 */
export function recommendTopics(followedTickers: string[], universe: Company[]): Recommendation[] {
  if (followedTickers.length === 0) return [];

  const followed = universe.filter((c) => followedTickers.includes(c.ticker));
  const results: Recommendation[] = [];

  for (const candidate of universe) {
    if (followedTickers.includes(candidate.ticker)) continue;
    const match = followed.find((f) => f.sector === candidate.sector);
    if (match) {
      results.push({ company: candidate, matchedTicker: match.ticker });
    }
  }

  return results;
}
