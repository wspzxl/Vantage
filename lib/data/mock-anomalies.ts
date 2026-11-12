import type { AnomalySignal } from "./types";

/** Demo data — not live. Real version: daily volume/price z-score job (Phase 4). */
export const mockAnomalies: AnomalySignal[] = [
  { id: "a1", ticker: "NIO", detectedAt: "2026-11-04", signalType: "volume_spike", summary: "Volume ~3.1x the 20-day average" },
  { id: "a2", ticker: "BABA", detectedAt: "2026-11-03", signalType: "price_move", summary: "Intraday move of -6.2%, outside its usual range" },
  { id: "a3", ticker: "PDD", detectedAt: "2026-11-05", signalType: "volume_spike", summary: "Volume ~2.4x the 20-day average" },
];
