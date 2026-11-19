"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTracking } from "@/components/tracking/TrackingProvider";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { evaluateTargets } from "@/lib/tracking/evaluate";
import type { MarketOption } from "@/lib/data/market-options";
import type { CatalystEvent } from "@/lib/data/types";
import type { NewsResult } from "@/lib/data-sources/news";
import type { Locale } from "@/lib/i18n/translations";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

type RefreshState = "idle" | "loading" | "done" | "cooldown";

/** Raw fallback link for "View details" when there's no fetched article yet — a human-readable
 *  Google News search page (not the RSS feed), same provider as lib/data-sources/news.ts. */
function googleNewsSearchUrl(query: string, locale: Locale): string {
  const hl = locale === "zh" ? "zh-CN" : "en-US";
  const gl = locale === "zh" ? "CN" : "US";
  const ceid = locale === "zh" ? "CN:zh" : "US:en";
  return `https://news.google.com/search?q=${encodeURIComponent(query)}&hl=${hl}&gl=${gl}&ceid=${ceid}`;
}

export function TodayBriefing({
  marketOptions,
  events,
  prices,
  now,
}: {
  marketOptions: MarketOption[];
  events: CatalystEvent[];
  prices: Record<string, number>;
  /** Request time, read once on the server and passed down as a plain prop
   *  so this component never calls an impure time function during render. */
  now: number;
}) {
  const { selectedMarketIds, toggleMarket, watchTargets, followedTickers, newsTopics } = useTracking();
  const { locale, t } = useLocale();
  const router = useRouter();
  const [refreshState, setRefreshState] = useState<RefreshState>("idle");
  const [newsByTopic, setNewsByTopic] = useState<Record<string, NewsResult[]>>({});

  useEffect(() => {
    if (newsTopics.length === 0) return;
    let cancelled = false;
    fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topics: newsTopics, locale }),
    })
      .then((res) => res.json())
      .then((data: { results: { topic: string; items: NewsResult[] }[] }) => {
        if (cancelled) return;
        const map: Record<string, NewsResult[]> = {};
        for (const r of data.results) map[r.topic] = r.items;
        setNewsByTopic(map);
      });
    return () => {
      cancelled = true;
    };
  }, [newsTopics, locale]);

  async function handleRefresh() {
    setRefreshState("loading");
    const res = await fetch("/api/refresh-data", { method: "POST" });
    if (res.status === 429) {
      setRefreshState("cooldown");
      return;
    }
    setRefreshState("done");
    router.refresh();
  }

  const selectedMarkets = marketOptions.filter((m) => selectedMarketIds.includes(m.id));
  const unselectedMarkets = marketOptions.filter((m) => !selectedMarketIds.includes(m.id));
  const triggered = evaluateTargets(watchTargets, locale, prices);
  const pending = watchTargets.filter((wt) => !triggered.some((h) => h.id === wt.id));

  const macroVisible = selectedMarketIds.includes("cn-adr");
  const showUpcomingSection = macroVisible || followedTickers.length > 0;

  const upcoming = events
    .filter((e) => {
      const relevant = e.tickers.length === 0 ? macroVisible : e.tickers.some((tk) => followedTickers.includes(tk));
      if (!relevant) return false;
      const scheduledTime = new Date(`${e.scheduledAt}T00:00:00`).getTime();
      return scheduledTime >= now && scheduledTime - now <= SEVEN_DAYS_MS;
    })
    .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));

  const today = new Date(now).toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-lg font-semibold text-stone-900 dark:text-stone-50">
          {t("nav.todayBriefing")} · {today}
        </h1>
        <button
          onClick={handleRefresh}
          disabled={refreshState === "loading"}
          className="shrink-0 rounded border border-stone-300 px-2 py-0.5 text-xs font-medium hover:bg-stone-100 disabled:opacity-50 dark:border-stone-700 dark:hover:bg-stone-900"
        >
          {refreshState === "loading"
            ? t("common.refreshing")
            : refreshState === "done"
              ? t("common.refreshDone")
              : refreshState === "cooldown"
                ? t("common.refreshCooldown")
                : t("common.refreshData")}
        </button>
      </div>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-stone-500">{t("briefing.normalTracking")}</h2>
        {selectedMarkets.length === 0 && newsTopics.length === 0 ? (
          <div className="rounded border border-dashed border-stone-300 p-3 text-sm text-stone-500 dark:border-stone-700">
            <p>{t("briefing.noMarketsSelected")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {unselectedMarkets.map((m) => (
                <button
                  key={m.id}
                  onClick={() => toggleMarket(m.id)}
                  className="rounded-full border border-stone-300 px-3 py-1 text-xs font-medium hover:border-stone-400 dark:border-stone-700"
                >
                  + {m.label[locale]}
                </button>
              ))}
            </div>
            <p className="mt-2">
              {t("briefing.orTrackCompanyPart1")}{" "}
              <Link href="/dashboard/tracking" className="underline">{t("nav.trackingSettings")}</Link>
              {t("briefing.orTrackCompanyPart2")}
            </p>
          </div>
        ) : (
          <>
            <div className={selectedMarkets.length + newsTopics.length > 1 ? "grid gap-3 sm:grid-cols-2" : ""}>
              {selectedMarkets.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col justify-between rounded border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950 ${
                    selectedMarkets.length + newsTopics.length > 1 ? "" : "max-w-md"
                  }`}
                >
                  <div>
                    <div className="font-medium text-stone-900 dark:text-stone-50">
                      {m.label[locale]}{" "}
                      <span className="text-xs font-normal italic text-stone-400">({t("common.sample")})</span>
                    </div>
                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{m.summary[locale]}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.stats.map((s) => (
                        <span key={s} className="rounded bg-stone-100 px-1.5 py-0.5 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-400">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  {m.id === "cn-adr" && (
                    <div className="mt-2 text-right">
                      <a
                        href={googleNewsSearchUrl(m.label[locale], locale)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-stone-500 underline hover:text-stone-900 dark:hover:text-stone-200"
                      >
                        {t("briefing.learnMore")}
                      </a>
                    </div>
                  )}
                </div>
              ))}

              {newsTopics.map((topic) => {
                const topStory = newsByTopic[topic]?.[0];
                const detailUrl = topStory?.link ?? googleNewsSearchUrl(topic, locale);
                return (
                  <div
                    key={topic}
                    className={`flex flex-col justify-between rounded border border-stone-200 bg-white p-3 dark:border-stone-800 dark:bg-stone-950 ${
                      selectedMarkets.length + newsTopics.length > 1 ? "" : "max-w-md"
                    }`}
                  >
                    <div>
                      <div className="font-medium text-stone-900 dark:text-stone-50">{topic}</div>
                      <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
                        {topStory ? topStory.title : t("briefing.newsLoading")}
                      </p>
                    </div>
                    <div className="mt-2 text-right">
                      <a
                        href={detailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-stone-500 underline hover:text-stone-900 dark:hover:text-stone-200"
                      >
                        {t("briefing.learnMore")}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
            {newsTopics.length > 0 && (
              <p className="mt-2 text-xs italic text-stone-400">{t("briefing.newsSourceNote")}</p>
            )}
          </>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-stone-500">
          {t("briefing.stakeoutPrefix")} ({triggered.length})
        </h2>
        {watchTargets.length === 0 ? (
          <p className="text-sm text-stone-500">
            {t("briefing.noTargetsPart1")}{" "}
            <Link href="/dashboard/plaza" className="underline">{t("nav.topicPlaza")}</Link>{" "}
            {t("briefing.noTargetsPart2")}{" "}
            <Link href="/dashboard/tracking" className="underline">{t("nav.trackingSettings")}</Link>
            {t("briefing.noTargetsPart3")}
          </p>
        ) : triggered.length === 0 ? (
          <p className="text-sm text-stone-500">{t("briefing.noTriggersYet")}</p>
        ) : (
          <div className="space-y-2">
            {triggered.map((tt) => (
              <div key={tt.id} className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm dark:border-emerald-900/40 dark:bg-emerald-950/30">
                <span className="font-semibold">{tt.ticker}</span> — {tt.triggeredReason}
                {tt.condition === "company_move" && (
                  <span className="ml-1.5 text-xs italic text-stone-400">({t("common.sample")})</span>
                )}
              </div>
            ))}
          </div>
        )}
        {pending.length > 0 && (
          <p className="mt-2 text-xs text-stone-400">
            {t("briefing.pendingPrefix")} ({pending.length}): {pending.map((p) => p.ticker).join(", ")}
          </p>
        )}
      </section>

      {showUpcomingSection && (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-stone-500">{t("briefing.upcoming7Days")}</h2>
          {upcoming.length === 0 ? (
            <p className="text-sm text-stone-500">{t("briefing.noUpcomingEvents")}</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {upcoming.map((e) => (
                <li key={e.id} className="flex items-center gap-2">
                  <span className="w-20 shrink-0 text-stone-400">{e.scheduledAt}</span>
                  <span>{e.title}</span>
                </li>
              ))}
            </ul>
          )}
          <Link href="/dashboard/plaza" className="mt-2 inline-block text-sm underline">
            {t("briefing.moreInPlaza")}
          </Link>
        </section>
      )}

    </div>
  );
}
