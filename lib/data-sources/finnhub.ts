import "server-only";

const FINNHUB_BASE = "https://finnhub.io/api/v1";

interface FinnhubEarningsEntry {
  symbol: string;
  date: string; // YYYY-MM-DD
  quarter: number;
  year: number;
}

interface FinnhubEarningsResponse {
  earningsCalendar: FinnhubEarningsEntry[];
}

/**
 * One call covers every symbol in the date range (free tier allows this -
 * verified live), so we fetch once and filter to our curated tickers
 * ourselves rather than calling per-symbol.
 */
export async function fetchEarningsCalendar(
  fromISO: string,
  toISO: string
): Promise<FinnhubEarningsEntry[]> {
  const token = process.env.FINNHUB_API_KEY;
  if (!token) return [];

  const url = `${FINNHUB_BASE}/calendar/earnings?from=${fromISO}&to=${toISO}&token=${token}`;
  const res = await fetch(url, { next: { revalidate: 86400, tags: ["market-data"] } });
  if (!res.ok) return [];

  const data: FinnhubEarningsResponse = await res.json();
  return data.earningsCalendar ?? [];
}
