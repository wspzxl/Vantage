import { curatedUniverse } from "./curated-universe";
import { mockPrices } from "./mock-prices";
import { fetchQuotes } from "@/lib/data-sources/fmp";

/**
 * Real quotes for the curated universe, cached by Next's fetch cache (see
 * fmp.ts - revalidate: 86400, tag "market-data") so this only hits FMP about
 * once a day plus whenever /api/refresh-data invalidates the tag. Falls back
 * to mock prices whenever the key is missing or FMP returns nothing, so the
 * app never breaks without real credentials.
 */
export async function getPrices(): Promise<Record<string, number>> {
  if (!process.env.FMP_API_KEY) return mockPrices;

  const tickers = curatedUniverse.map((c) => c.ticker);
  const live = await fetchQuotes(tickers);
  if (Object.keys(live).length === 0) return mockPrices;

  return { ...mockPrices, ...live };
}
