import "server-only";

// FMP's older /api/v3/* endpoints were retired 2025-08-31 - current free-tier
// quotes live under /stable/ (verified live against a real key).
const FMP_BASE = "https://financialmodelingprep.com/stable";

interface FmpQuote {
  symbol: string;
  price: number;
}

/** Free tier has no batch quote endpoint (comma-separated symbols is a paid
 *  feature - verified live, returns 402), so one request per ticker. */
async function fetchQuote(ticker: string): Promise<FmpQuote | null> {
  const apikey = process.env.FMP_API_KEY;
  if (!apikey) return null;

  const url = `${FMP_BASE}/quote?symbol=${ticker}&apikey=${apikey}`;
  const res = await fetch(url, { next: { revalidate: 86400, tags: ["market-data"] } });
  if (!res.ok) return null;

  const data: FmpQuote[] = await res.json();
  return data[0] ?? null;
}

export async function fetchQuotes(tickers: string[]): Promise<Record<string, number>> {
  const results = await Promise.all(tickers.map(fetchQuote));
  const prices: Record<string, number> = {};
  results.forEach((quote, i) => {
    if (quote) prices[tickers[i]] = quote.price;
  });
  return prices;
}
