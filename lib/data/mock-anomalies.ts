import type { AnomalySignal } from "./types";

/**
 * Demo data — not live. Real version: daily volume/price z-score job (Phase 4).
 * One entry per curated-universe ticker, so following any of them shows
 * something in the Topic Plaza timeline instead of just a follower count.
 */
export const mockAnomalies: AnomalySignal[] = [
  { id: "a1", ticker: "NIO", detectedAt: "2026-11-04", signalType: "volume_spike", summary: "Volume ~3.1x the 20-day average" },
  { id: "a2", ticker: "BABA", detectedAt: "2026-11-03", signalType: "price_move", summary: "Intraday move of -6.2%, outside its usual range" },
  { id: "a3", ticker: "PDD", detectedAt: "2026-11-05", signalType: "volume_spike", summary: "Volume ~2.4x the 20-day average" },
  { id: "a4", ticker: "JD", detectedAt: "2026-11-06", signalType: "price_move", summary: "Intraday move of +4.1%, outside its usual range" },
  { id: "a5", ticker: "BIDU", detectedAt: "2026-11-07", signalType: "volume_spike", summary: "Volume ~1.8x the 20-day average" },
  { id: "a6", ticker: "NTES", detectedAt: "2026-11-08", signalType: "price_move", summary: "Intraday move of -3.4%, outside its usual range" },
  { id: "a7", ticker: "BILI", detectedAt: "2026-11-09", signalType: "volume_spike", summary: "Volume ~2.9x the 20-day average" },
  { id: "a8", ticker: "TME", detectedAt: "2026-11-10", signalType: "price_move", summary: "Intraday move of +5.0%, outside its usual range" },
  { id: "a9", ticker: "LI", detectedAt: "2026-11-11", signalType: "volume_spike", summary: "Volume ~2.2x the 20-day average" },
  { id: "a10", ticker: "XPEV", detectedAt: "2026-11-12", signalType: "price_move", summary: "Intraday move of -4.7%, outside its usual range" },
  { id: "a11", ticker: "TCOM", detectedAt: "2026-11-13", signalType: "volume_spike", summary: "Volume ~1.6x the 20-day average" },
  { id: "a12", ticker: "YUMC", detectedAt: "2026-11-14", signalType: "price_move", summary: "Intraday move of +3.2%, outside its usual range" },
  { id: "a13", ticker: "VIPS", detectedAt: "2026-11-15", signalType: "volume_spike", summary: "Volume ~2.0x the 20-day average" },
  { id: "a14", ticker: "ZTO", detectedAt: "2026-11-16", signalType: "price_move", summary: "Intraday move of -2.8%, outside its usual range" },
  { id: "a15", ticker: "HTHT", detectedAt: "2026-11-17", signalType: "volume_spike", summary: "Volume ~1.9x the 20-day average" },
  { id: "a16", ticker: "BEKE", detectedAt: "2026-11-18", signalType: "price_move", summary: "Intraday move of +4.6%, outside its usual range" },
  { id: "a17", ticker: "AAPL", detectedAt: "2026-11-19", signalType: "volume_spike", summary: "Volume ~1.4x the 20-day average" },
  { id: "a18", ticker: "TSLA", detectedAt: "2026-11-20", signalType: "price_move", summary: "Intraday move of -5.3%, outside its usual range" },
  { id: "a19", ticker: "NKE", detectedAt: "2026-11-21", signalType: "volume_spike", summary: "Volume ~1.7x the 20-day average" },
];
