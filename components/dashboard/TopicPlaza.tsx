"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useTracking } from "@/components/tracking/TrackingProvider";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { recommendTopics } from "@/lib/tracking/recommend";
import { recommendReason, type TranslationKey } from "@/lib/i18n/translations";
import type { Company, AnomalySignal, CatalystEvent } from "@/lib/data/types";
import type { TrendingTopic } from "@/lib/data/trending";

const EVENT_TYPE_KEY: Record<CatalystEvent["type"], TranslationKey> = {
  earnings: "eventType.earnings",
  fomc: "eventType.fomc",
  cpi: "eventType.cpi",
  nfp: "eventType.nfp",
  china_macro: "eventType.china_macro",
  other: "eventType.other",
};

function CountryBadge({ country }: { country: "US" | "CN" }) {
  const styles =
    country === "US"
      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
      : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
  return <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${styles}`}>{country}</span>;
}

function FollowButton({ ticker }: { ticker: string }) {
  const { followedTickers, followTicker, unfollowTicker } = useTracking();
  const { t } = useLocale();
  const following = followedTickers.includes(ticker);
  return (
    <button
      onClick={() => (following ? unfollowTicker(ticker) : followTicker(ticker))}
      className={`rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
        following
          ? "border-zinc-300 text-zinc-500 hover:border-red-300 hover:text-red-600 dark:border-zinc-700 dark:hover:text-red-400"
          : "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950"
      }`}
    >
      {following ? t("plaza.following") : t("plaza.followAction")}
    </button>
  );
}

export function TopicPlaza({
  universe,
  trending,
  events,
  anomalies,
}: {
  universe: Company[];
  trending: TrendingTopic[];
  events: CatalystEvent[];
  anomalies: AnomalySignal[];
}) {
  const { followedTickers } = useTracking();
  const { locale, t } = useLocale();
  const byTicker = useMemo(
    () => new Map(universe.map((c) => [c.ticker, c])),
    [universe]
  );

  const recommendations = recommendTopics(followedTickers, universe).slice(0, 6);

  const timelineEvents = useMemo(() => {
    const filtered = events.filter(
      (e) => e.tickers.length === 0 ? false : e.tickers.some((tk) => followedTickers.includes(tk))
    );
    return [...filtered].sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
  }, [events, followedTickers]);

  const groupedByDate = useMemo(() => {
    const groups = new Map<string, CatalystEvent[]>();
    for (const event of timelineEvents) {
      const list = groups.get(event.scheduledAt) ?? [];
      list.push(event);
      groups.set(event.scheduledAt, list);
    }
    return [...groups.entries()];
  }, [timelineEvents]);

  const timelineAnomalies = anomalies.filter((a) => followedTickers.includes(a.ticker));
  const quote = locale === "zh" ? ["“", "”"] : ['"', '"'];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-2 text-sm font-semibold text-zinc-500">
          {t("plaza.trending")}{" "}
          <span className="text-xs font-normal italic text-zinc-400">({t("common.sample")})</span>
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {trending.slice(0, 8).map((tr) => {
            const company = byTicker.get(tr.ticker);
            if (!company) return null;
            return (
              <div
                key={tr.ticker}
                className="flex items-center justify-between rounded border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div>
                  <div className="text-sm font-semibold">
                    {tr.ticker} <span className="font-normal text-zinc-400">· {company.name}</span>
                  </div>
                  <div className="text-xs text-zinc-500">
                    {tr.followers.toLocaleString()} {t("plaza.followersSuffix")}
                    {tr.trendNote ? ` · ${tr.trendNote[locale]}` : ""}
                  </div>
                </div>
                <FollowButton ticker={tr.ticker} />
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-zinc-500">{t("plaza.recommended")}</h2>
        {recommendations.length === 0 ? (
          <p className="text-sm text-zinc-500">{t("plaza.recommendEmptyHint")}</p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {recommendations.map((r) => (
              <div
                key={r.company.ticker}
                className="flex items-center justify-between rounded border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div>
                  <div className="text-sm font-semibold">
                    {r.company.ticker}{" "}
                    <span className="font-normal text-zinc-400">· {r.company.name}</span>
                  </div>
                  <div className="text-xs text-zinc-500">
                    {recommendReason(locale, r.company.sector, r.matchedTicker)}
                  </div>
                </div>
                <FollowButton ticker={r.company.ticker} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-zinc-500">
          {t("plaza.timelinePrefix")} ({followedTickers.length})
        </h2>

        {followedTickers.length === 0 ? (
          <p className="text-sm text-zinc-500">
            {t("plaza.timelineEmptyPart1")} {quote[0]}{t("plaza.trending")}{quote[1]}{" "}
            {t("plaza.timelineEmptyPart2")}
          </p>
        ) : (
          <>
            {timelineAnomalies.length > 0 && (
              <div className="mb-4 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {t("plaza.anomaliesHeading")}
                </h3>
                <p className="text-xs italic text-zinc-400">
                  {t("plaza.anomaliesSampleNote")}
                </p>
                {timelineAnomalies.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded border border-amber-200 bg-white px-3 py-2 text-sm dark:border-amber-900/40 dark:bg-zinc-950"
                  >
                    <span>
                      <span className="font-semibold">{a.ticker}</span> — {a.summary}
                    </span>
                    <span className="text-xs text-zinc-400">{a.detectedAt}</span>
                  </div>
                ))}
              </div>
            )}

            {groupedByDate.length === 0 ? (
              <p className="text-sm text-zinc-500">{t("plaza.timelineNoEvents")}</p>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  {t("plaza.upcomingEventsHeading")}
                </h3>
                {groupedByDate.map(([date, dayEvents]) => (
                  <div key={date} className="flex gap-4">
                    <div className="w-24 shrink-0 pt-2 text-sm font-medium text-zinc-500">
                      {new Date(`${date}T00:00:00`).toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex-1 space-y-2">
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center gap-3 rounded border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-800 dark:bg-zinc-950"
                        >
                          <CountryBadge country={event.country} />
                          <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                            {t(EVENT_TYPE_KEY[event.type])}
                          </span>
                          <span className="flex-1 text-sm">{event.title}</span>
                          <span className="text-xs font-semibold text-zinc-500">
                            {event.tickers.join(", ")}
                          </span>
                          {event.confidence === "estimated" && (
                            <span className="text-xs italic text-zinc-400">{t("common.estimated")}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      <p className="text-xs text-zinc-400">
        {t("plaza.macroFooterPart1")}{" "}
        <Link href="/dashboard" className="underline">
          {t("nav.todayBriefing")}
        </Link>
        {t("plaza.macroFooterPart2")}
      </p>
    </div>
  );
}
