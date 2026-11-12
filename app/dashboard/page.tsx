import { TodayBriefing } from "@/components/dashboard/TodayBriefing";
import { marketOptions } from "@/lib/data/market-options";
import { mockEvents } from "@/lib/data/mock-events";

export default function DashboardPage() {
  // Cache Components is off (see next.config.ts) — this route is always
  // dynamic, so a plain per-request Date.now() is safe despite the lint rule
  // that guards against it being baked into a prerendered static shell.
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  return <TodayBriefing marketOptions={marketOptions} events={mockEvents} now={now} />;
}
