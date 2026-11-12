export interface NewsItem {
  id: string;
  ticker: string;
  headline: string;
  date: string; // ISO date
}

/** Demo data — not live. Real version: keyword-filtered RSS ingestion. */
export const mockNews: NewsItem[] = [
  { id: "n1", ticker: "NIO", headline: "NIO announces new battery-swap partnership expanding to 3 more provinces", date: "2026-11-08" },
  { id: "n2", ticker: "BABA", headline: "Alibaba cloud unit announces new AI infrastructure investment", date: "2026-11-07" },
  { id: "n3", ticker: "PDD", headline: "PDD Holdings expands Temu logistics footprint in Southeast Asia", date: "2026-11-06" },
];
