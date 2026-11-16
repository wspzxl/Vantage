import type { WatchTarget, TriggeredTarget } from "./types";
import { mockPrices } from "@/lib/data/mock-prices";
import { mockNews } from "@/lib/data/mock-news";
import { priceTriggerReason, type Locale } from "@/lib/i18n/translations";

/**
 * Pure evaluation so the same logic can back the in-app briefing today and
 * an email digest later. `prices` is injected (defaults to the mock set)
 * rather than imported directly, so callers can pass live FMP quotes
 * without this function needing to know where prices come from. News is
 * still mock - no free structured China-news source yet (see DEVLOG).
 */
export function evaluateTarget(
  target: WatchTarget,
  locale: Locale = "en",
  prices: Record<string, number> = mockPrices
): TriggeredTarget | null {
  if (target.condition === "price_below" || target.condition === "price_above") {
    const price = prices[target.ticker];
    if (price === undefined || target.threshold === undefined) return null;
    const hit =
      target.condition === "price_below" ? price <= target.threshold : price >= target.threshold;
    if (!hit) return null;
    const direction = target.condition === "price_below" ? "below" : "above";
    return {
      ...target,
      triggeredReason: priceTriggerReason(locale, target.ticker, direction, price, target.threshold),
    };
  }

  // company_move: triggered if there's recent mock news for this ticker.
  const news = mockNews.find((n) => n.ticker === target.ticker);
  if (!news) return null;
  return { ...target, triggeredReason: news.headline };
}

export function evaluateTargets(
  targets: WatchTarget[],
  locale: Locale = "en",
  prices: Record<string, number> = mockPrices
): TriggeredTarget[] {
  return targets
    .map((t) => evaluateTarget(t, locale, prices))
    .filter((t): t is TriggeredTarget => t !== null);
}
