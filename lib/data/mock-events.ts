import type { CatalystEvent } from "./types";

/**
 * Demo data — not live. Earnings/macro dates here are plausible placeholders
 * for the interaction preview, not verified real dates, EXCEPT the FOMC
 * meeting below, which is the Fed's actual published 2026 date. Once Phase 3
 * wires real ingestion (Finnhub/FMP for earnings, seeded Fed/BLS/NBS
 * calendars), this file goes away.
 */
export const mockEvents: CatalystEvent[] = [
  { id: "e1", type: "earnings", tickers: ["JD"], title: "JD.com Q3 earnings", scheduledAt: "2026-11-13", country: "CN", confidence: "estimated" },
  { id: "e2", type: "earnings", tickers: ["BIDU"], title: "Baidu Q3 earnings", scheduledAt: "2026-11-13", country: "CN", confidence: "estimated" },
  { id: "e3", type: "earnings", tickers: ["BABA"], title: "Alibaba fiscal Q2 earnings", scheduledAt: "2026-11-14", country: "CN", confidence: "estimated" },
  { id: "e4", type: "earnings", tickers: ["PDD"], title: "PDD Holdings Q3 earnings", scheduledAt: "2026-11-18", country: "CN", confidence: "estimated" },
  { id: "e5", type: "earnings", tickers: ["TCOM"], title: "Trip.com Q3 earnings", scheduledAt: "2026-11-18", country: "CN", confidence: "estimated" },
  { id: "e6", type: "earnings", tickers: ["NTES"], title: "NetEase Q3 earnings", scheduledAt: "2026-11-19", country: "CN", confidence: "estimated" },
  { id: "e7", type: "earnings", tickers: ["NIO"], title: "NIO Q3 earnings", scheduledAt: "2026-11-20", country: "CN", confidence: "estimated" },
  { id: "e8", type: "earnings", tickers: ["XPEV"], title: "XPeng Q3 earnings", scheduledAt: "2026-11-25", country: "CN", confidence: "estimated" },
  { id: "e9", type: "earnings", tickers: ["LI"], title: "Li Auto Q3 earnings", scheduledAt: "2026-11-26", country: "CN", confidence: "estimated" },
  { id: "e10", type: "china_macro", tickers: [], title: "China Manufacturing PMI (NBS)", scheduledAt: "2026-11-30", country: "CN", confidence: "estimated" },
  { id: "e11", type: "nfp", tickers: [], title: "US Non-Farm Payrolls (BLS)", scheduledAt: "2026-12-04", country: "US", confidence: "estimated" },
  { id: "e12", type: "fomc", tickers: [], title: "FOMC meeting — rate decision", scheduledAt: "2026-12-08", country: "US", confidence: "confirmed" },
  { id: "e13", type: "cpi", tickers: [], title: "US CPI release (BLS)", scheduledAt: "2026-12-10", country: "US", confidence: "estimated" },
  { id: "e14", type: "earnings", tickers: ["NKE"], title: "Nike fiscal Q2 earnings", scheduledAt: "2026-12-18", country: "US", confidence: "estimated" },
];
