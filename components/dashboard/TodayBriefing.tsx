"use client";

import Link from "next/link";
import { useTracking } from "@/components/tracking/TrackingProvider";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { evaluateTargets } from "@/lib/tracking/evaluate";
import type { MarketOption } from "@/lib/data/market-options";
import type { CatalystEvent } from "@/lib/data/types";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export function TodayBriefing({
  marketOptions,
  events,
  now,
}: {
  marketOptions: MarketOption[];
  events: CatalystEvent[];
  /** Request time, read once on the server and passed down as a plain prop
   *  so this component never calls an impure time function during render. */
  now: number;
}) {
  const { selectedMarketIds, toggleMarket, watchTargets, followedTickers } = useTracking();
  const { locale, t } = useLocale();

  const selectedMarkets = marketOptions.filter((m) => selectedMarketIds.includes(m.id));
  const unselectedMarkets = marketOptions.filter((m) => !selectedMarketIds.includes(m.id));
  const triggered = evaluateTargets(watchTargets, locale);
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
      <div className="rounded border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300">
        {t("common.demoBanner")}
      </div>

      <h1 className="text-lg font-semibold">
        {t("nav.todayBriefing")} · {today}
      </h1>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-zinc-500">{t("briefing.normalTracking")}</h2>
        {selectedMarkets.length === 0 ? (
          <div className="rounded border border-dashed border-zinc-300 p-3 text-sm text-zinc-500 dark:border-zinc-700">
            <p>{t("briefing.noMarketsSelected")}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {unselectedMarkets.map((m) => (
                <button
                  key={m.id}
                  onClick={() => toggleMarket(m.id)}
                  className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium hover:border-zinc-400 dark:border-zinc-700"
                >
                  + {m.label[locale]}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {selectedMarkets.map((m) => (
              <div key={m.id} className="rounded border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
                <div className="font-medium">{m.label[locale]}</div>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{m.summary[locale]}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.stats.map((s) => (
                    <span key={s} className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-zinc-500">
          {t("briefing.stakeoutPrefix")} ({triggered.length})
        </h2>
        {watchTargets.length === 0 ? (
          <p className="text-sm text-zinc-500">
            {t("briefing.noTargetsPart1")}{" "}
            <Link href="/dashboard/plaza" className="underline">{t("nav.topicPlaza")}</Link>{" "}
            {t("briefing.noTargetsPart2")}{" "}
            <Link href="/dashboard/tracking" className="underline">{t("nav.trackingSettings")}</Link>
            {t("briefing.noTargetsPart3")}
          </p>
        ) : triggered.length === 0 ? (
          <p className="text-sm text-zinc-500">{t("briefing.noTriggersYet")}</p>
        ) : (
          <div className="space-y-2">
            {triggered.map((tt) => (
              <div key={tt.id} className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm dark:border-emerald-900/40 dark:bg-emerald-950/30">
                <span className="font-semibold">{tt.ticker}</span> — {tt.triggeredReason}
              </div>
            ))}
          </div>
        )}
        {pending.length > 0 && (
          <p className="mt-2 text-xs text-zinc-400">
            {t("briefing.pendingPrefix")} ({pending.length}): {pending.map((p) => p.ticker).join(", ")}
          </p>
        )}
      </section>

      {showUpcomingSection && (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-zinc-500">{t("briefing.upcoming7Days")}</h2>
          {upcoming.length === 0 ? (
            <p className="text-sm text-zinc-500">{t("briefing.noUpcomingEvents")}</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {upcoming.map((e) => (
                <li key={e.id} className="flex items-center gap-2">
                  <span className="w-20 shrink-0 text-zinc-400">{e.scheduledAt}</span>
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
