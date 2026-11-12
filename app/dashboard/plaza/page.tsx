import { TopicPlaza } from "@/components/dashboard/TopicPlaza";
import { curatedUniverse } from "@/lib/data/curated-universe";
import { trendingTopics } from "@/lib/data/trending";
import { mockEvents } from "@/lib/data/mock-events";
import { mockAnomalies } from "@/lib/data/mock-anomalies";

export default function PlazaPage() {
  return (
    <TopicPlaza
      universe={curatedUniverse}
      trending={trendingTopics}
      events={mockEvents}
      anomalies={mockAnomalies}
    />
  );
}
