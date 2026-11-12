"use client";

import { useState } from "react";
import { useTracking } from "@/components/tracking/TrackingProvider";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { MarketOption } from "@/lib/data/market-options";
import type { Company } from "@/lib/data/types";
import type { WatchCondition } from "@/lib/tracking/types";

const CONDITIONS: WatchCondition[] = ["price_below", "price_above", "company_move"];
const CONDITION_KEY = {
  price_below: "condition.price_below",
  price_above: "condition.price_above",
  company_move: "condition.company_move",
} as const;

export function TrackingSettings({
  marketOptions,
  universe,
}: {
  marketOptions: MarketOption[];
  universe: Company[];
}) {
  const { selectedMarketIds, toggleMarket, watchTargets, addTarget, removeTarget, resetAll } = useTracking();
  const { locale, t } = useLocale();

  const [ticker, setTicker] = useState(universe[0]?.ticker ?? "");
  const [condition, setCondition] = useState<WatchCondition>("price_below");
  const [threshold, setThreshold] = useState("");
  const [note, setNote] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    addTarget({
      ticker,
      condition,
      threshold: condition === "company_move" ? undefined : Number(threshold) || undefined,
      note: note || undefined,
    });
    setThreshold("");
    setNote("");
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-500">{t("tracking.panelTitle")}</h2>
        <button
          onClick={resetAll}
          className="text-xs text-zinc-400 underline hover:text-zinc-700 dark:hover:text-zinc-200"
          title={t("tracking.previewEmptyStateTooltip")}
        >
          {t("tracking.previewEmptyState")}
        </button>
      </div>

      <section>
        <h1 className="mb-3 text-lg font-semibold">{t("tracking.selectMarketTitle")}</h1>
        <div className="flex flex-wrap gap-2">
          {marketOptions.map((m) => {
            const selected = selectedMarketIds.includes(m.id);
            return (
              <button
                key={m.id}
                onClick={() => toggleMarket(m.id)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  selected
                    ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
                    : "border-zinc-300 text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400"
                }`}
              >
                {m.label[locale]}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-zinc-400">{t("tracking.marketPushHint")}</p>
      </section>

      <section>
        <h1 className="mb-3 text-lg font-semibold">{t("tracking.manageTargetsTitle")}</h1>

        {watchTargets.length === 0 && (
          <p className="mb-3 text-sm text-zinc-500">{t("tracking.noTargetsHint")}</p>
        )}

        {watchTargets.length > 0 && (
          <div className="mb-4 space-y-2">
            {watchTargets.map((wt) => (
              <div
                key={wt.id}
                className="flex items-center justify-between rounded border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <span>
                  <span className="font-semibold">{wt.ticker}</span> — {t(CONDITION_KEY[wt.condition])}
                  {wt.threshold !== undefined ? ` $${wt.threshold}` : ""}
                  {wt.note ? ` · ${wt.note}` : ""}
                </span>
                <button
                  onClick={() => removeTarget(wt.id)}
                  className="text-xs text-zinc-400 underline hover:text-zinc-700 dark:hover:text-zinc-200"
                >
                  {t("tracking.delete")}
                </button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3 rounded border border-zinc-200 p-3 dark:border-zinc-800">
          <label className="flex flex-col gap-1 text-xs text-zinc-500">
            {t("tracking.stockLabel")}
            <select
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            >
              {universe.map((c) => (
                <option key={c.ticker} value={c.ticker}>
                  {c.ticker} — {c.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1 text-xs text-zinc-500">
            {t("tracking.conditionLabel")}
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value as WatchCondition)}
              className="rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            >
              {CONDITIONS.map((c) => (
                <option key={c} value={c}>
                  {t(CONDITION_KEY[c])}
                </option>
              ))}
            </select>
          </label>

          {condition !== "company_move" && (
            <label className="flex flex-col gap-1 text-xs text-zinc-500">
              {t("tracking.priceLabel")}
              <input
                type="number"
                step="0.01"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                required
                className="w-24 rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
              />
            </label>
          )}

          <label className="flex flex-col gap-1 text-xs text-zinc-500">
            {t("tracking.noteLabel")}
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-40 rounded border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>

          <button
            type="submit"
            className="rounded bg-zinc-950 px-3 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-zinc-950"
          >
            {t("tracking.addTarget")}
          </button>
        </form>
      </section>
    </div>
  );
}
