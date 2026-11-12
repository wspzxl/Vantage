export type WatchCondition = "price_below" | "price_above" | "company_move";

export interface WatchTarget {
  id: string;
  ticker: string;
  condition: WatchCondition;
  /** Required for price_below / price_above, ignored for company_move. */
  threshold?: number;
  note?: string;
  createdAt: string; // ISO date
}

export interface TriggeredTarget extends WatchTarget {
  triggeredReason: string;
}
