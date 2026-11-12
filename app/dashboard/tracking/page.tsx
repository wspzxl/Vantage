import { TrackingSettings } from "@/components/dashboard/TrackingSettings";
import { marketOptions } from "@/lib/data/market-options";
import { curatedUniverse } from "@/lib/data/curated-universe";

export default function TrackingPage() {
  return <TrackingSettings marketOptions={marketOptions} universe={curatedUniverse} />;
}
