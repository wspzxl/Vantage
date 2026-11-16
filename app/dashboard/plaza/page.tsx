import { TopicPlaza } from "@/components/dashboard/TopicPlaza";
import { curatedUniverse } from "@/lib/data/curated-universe";
import { trendingTopics } from "@/lib/data/trending";
import { getEvents } from "@/lib/data/live-events";
import { mockAnomalies } from "@/lib/data/mock-anomalies";

export default async function PlazaPage() {
  const events = await getEvents();
  return (
    <TopicPlaza
      universe={curatedUniverse}
      trending={trendingTopics}
      events={events}
      anomalies={mockAnomalies}
    />
  );
}
