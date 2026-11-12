export type Country = "US" | "CN";
export type EventType = "earnings" | "fomc" | "cpi" | "nfp" | "china_macro" | "other";
export type Confidence = "confirmed" | "estimated";

export interface Company {
  ticker: string;
  name: string;
  exchange: string;
  isChinaAdr: boolean;
  sector: string;
}

export interface CatalystEvent {
  id: string;
  type: EventType;
  /** Tickers this event is relevant to; empty = applies to every China-exposed name. */
  tickers: string[];
  title: string;
  scheduledAt: string; // ISO date, YYYY-MM-DD
  country: Country;
  confidence: Confidence;
}

export interface AnomalySignal {
  id: string;
  ticker: string;
  detectedAt: string; // ISO date
  signalType: "volume_spike" | "price_move";
  summary: string;
}
