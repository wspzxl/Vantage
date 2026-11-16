import type { CatalystEvent } from "./types";
import { curatedUniverse } from "./curated-universe";
import { seededMacroEvents } from "./seeded-macro-events";
import { mockEvents } from "./mock-events";
import { fetchEarningsCalendar } from "@/lib/data-sources/finnhub";

const LOOKAHEAD_DAYS = 60;

function toISODate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * Earnings dates for the curated universe, live from Finnhub, merged with
 * the hand-seeded macro calendar. Cached by Next's fetch cache (see
 * finnhub.ts - revalidate: 86400, tag "market-data"). Falls back to the
 * fully-mock calendar whenever the key is missing or Finnhub returns
 * nothing, so the app never breaks without real credentials.
 */
export async function getEvents(): Promise<CatalystEvent[]> {
  if (!process.env.FINNHUB_API_KEY) return mockEvents;

  const from = toISODate(new Date());
  const to = toISODate(new Date(Date.now() + LOOKAHEAD_DAYS * 24 * 60 * 60 * 1000));
  const entries = await fetchEarningsCalendar(from, to);
  if (entries.length === 0) return mockEvents;

  const universeByTicker = new Map(curatedUniverse.map((c) => [c.ticker, c]));

  const liveEarnings: CatalystEvent[] = entries
    .filter((e) => universeByTicker.has(e.symbol))
    .map((e) => {
      const company = universeByTicker.get(e.symbol)!;
      return {
        id: `earnings-${e.symbol}-${e.date}`,
        type: "earnings",
        tickers: [e.symbol],
        title: `${company.name} Q${e.quarter} earnings`,
        scheduledAt: e.date,
        country: company.isChinaAdr ? "CN" : "US",
        confidence: "estimated",
      };
    });

  return [...seededMacroEvents, ...liveEarnings];
}
