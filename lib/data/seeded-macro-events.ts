import type { CatalystEvent } from "./types";

/**
 * FOMC/BLS/NBS release dates are published up to a year+ in advance and
 * essentially never move, so per the MVP plan these are seeded once by hand
 * rather than scraped from an API. Company earnings are NOT seeded here -
 * see lib/data/live-events.ts, which pulls those live from Finnhub.
 */
export const seededMacroEvents: CatalystEvent[] = [
  { id: "m1", type: "china_macro", tickers: [], title: "China Manufacturing PMI (NBS)", scheduledAt: "2026-11-30", country: "CN", confidence: "estimated" },
  { id: "m2", type: "nfp", tickers: [], title: "US Non-Farm Payrolls (BLS)", scheduledAt: "2026-12-04", country: "US", confidence: "estimated" },
  { id: "m3", type: "fomc", tickers: [], title: "FOMC meeting — rate decision", scheduledAt: "2026-12-08", country: "US", confidence: "confirmed" },
  { id: "m4", type: "cpi", tickers: [], title: "US CPI release (BLS)", scheduledAt: "2026-12-10", country: "US", confidence: "estimated" },
];
