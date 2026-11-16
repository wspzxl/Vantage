import { TodayBriefing } from "@/components/dashboard/TodayBriefing";
import { marketOptions } from "@/lib/data/market-options";
import { getEvents } from "@/lib/data/live-events";
import { getPrices } from "@/lib/data/live-prices";

export default async function DashboardPage() {
  // Cache Components is off (see next.config.ts) — this route is always
  // dynamic, so a plain per-request Date.now() is safe despite the lint rule
  // that guards against it being baked into a prerendered static shell.
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const [events, prices] = await Promise.all([getEvents(), getPrices()]);
  return <TodayBriefing marketOptions={marketOptions} events={events} prices={prices} now={now} />;
}
