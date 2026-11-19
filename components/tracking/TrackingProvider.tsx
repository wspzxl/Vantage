"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { WatchTarget } from "@/lib/tracking/types";

const DEFAULT_MARKET_IDS = ["cn-adr"];

const DEFAULT_TARGETS: WatchTarget[] = [
  { id: "t1", ticker: "NIO", condition: "price_below", threshold: 6.5, note: "Watching for a dip entry", createdAt: "2026-11-01" },
  { id: "t2", ticker: "BABA", condition: "company_move", note: "Any major AI/cloud announcement", createdAt: "2026-11-02" },
];

const DEFAULT_FOLLOWED_TICKERS = ["BABA", "PDD", "JD", "NIO", "BIDU"];

const DEFAULT_NEWS_TOPICS: string[] = ["Pop Mart"];

interface TrackingState {
  selectedMarketIds: string[];
  toggleMarket: (id: string) => void;
  watchTargets: WatchTarget[];
  addTarget: (target: Omit<WatchTarget, "id" | "createdAt">) => void;
  removeTarget: (id: string) => void;
  followedTickers: string[];
  followTicker: (ticker: string) => void;
  unfollowTicker: (ticker: string) => void;
  /** Free-text company names tracked for a news digest — not limited to the curated universe. */
  newsTopics: string[];
  addNewsTopic: (topic: string) => void;
  removeNewsTopic: (topic: string) => void;
  /** Clears everything, for previewing what a brand-new user actually sees. */
  resetAll: () => void;
}

const TrackingContext = createContext<TrackingState | null>(null);

export function TrackingProvider({ children }: { children: ReactNode }) {
  const [selectedMarketIds, setSelectedMarketIds] = useState<string[]>(DEFAULT_MARKET_IDS);
  const [watchTargets, setWatchTargets] = useState<WatchTarget[]>(DEFAULT_TARGETS);
  const [followedTickers, setFollowedTickers] = useState<string[]>(DEFAULT_FOLLOWED_TICKERS);
  const [newsTopics, setNewsTopics] = useState<string[]>(DEFAULT_NEWS_TOPICS);

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

  function addNewsTopic(topic: string) {
    const trimmed = topic.trim();
    if (!trimmed) return;
    setNewsTopics((prev) => (prev.includes(trimmed) ? prev : [...prev, trimmed]));
  }

  function removeNewsTopic(topic: string) {
    setNewsTopics((prev) => prev.filter((t) => t !== topic));
  }

  function resetAll() {
    setSelectedMarketIds([]);
    setWatchTargets([]);
    setFollowedTickers([]);
    setNewsTopics([]);
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
        newsTopics,
        addNewsTopic,
        removeNewsTopic,
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
