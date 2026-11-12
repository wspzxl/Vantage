"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { WatchTarget } from "@/lib/tracking/types";

const DEFAULT_MARKET_IDS = ["cn-adr"];

const DEFAULT_TARGETS: WatchTarget[] = [
  { id: "t1", ticker: "NIO", condition: "price_below", threshold: 6.5, note: "Watching for a dip entry", createdAt: "2026-11-01" },
  { id: "t2", ticker: "BABA", condition: "company_move", note: "Any major AI/cloud announcement", createdAt: "2026-11-02" },
];

const DEFAULT_FOLLOWED_TICKERS = ["BABA", "PDD", "JD", "NIO", "BIDU"];

interface TrackingState {
  selectedMarketIds: string[];
  toggleMarket: (id: string) => void;
  watchTargets: WatchTarget[];
  addTarget: (target: Omit<WatchTarget, "id" | "createdAt">) => void;
  removeTarget: (id: string) => void;
  followedTickers: string[];
  followTicker: (ticker: string) => void;
  unfollowTicker: (ticker: string) => void;
  /** Clears everything, for previewing what a brand-new user actually sees. */
  resetAll: () => void;
}

const TrackingContext = createContext<TrackingState | null>(null);

export function TrackingProvider({ children }: { children: ReactNode }) {
  const [selectedMarketIds, setSelectedMarketIds] = useState<string[]>(DEFAULT_MARKET_IDS);
  const [watchTargets, setWatchTargets] = useState<WatchTarget[]>(DEFAULT_TARGETS);
  const [followedTickers, setFollowedTickers] = useState<string[]>(DEFAULT_FOLLOWED_TICKERS);

  function toggleMarket(id: string) {
    setSelectedMarketIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }

  function addTarget(target: Omit<WatchTarget, "id" | "createdAt">) {
    setWatchTargets((prev) => [
      ...prev,
      { ...target, id: crypto.randomUUID(), createdAt: new Date().toISOString().slice(0, 10) },
    ]);
  }

  function removeTarget(id: string) {
    setWatchTargets((prev) => prev.filter((t) => t.id !== id));
  }

  function followTicker(ticker: string) {
    setFollowedTickers((prev) => (prev.includes(ticker) ? prev : [...prev, ticker]));
  }

  function unfollowTicker(ticker: string) {
    setFollowedTickers((prev) => prev.filter((t) => t !== ticker));
  }

  function resetAll() {
    setSelectedMarketIds([]);
    setWatchTargets([]);
    setFollowedTickers([]);
  }

  return (
    <TrackingContext.Provider
      value={{
        selectedMarketIds,
        toggleMarket,
        watchTargets,
        addTarget,
        removeTarget,
        followedTickers,
        followTicker,
        unfollowTicker,
        resetAll,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
}

export function useTracking() {
  const ctx = useContext(TrackingContext);
  if (!ctx) throw new Error("useTracking must be used within TrackingProvider");
  return ctx;
}
