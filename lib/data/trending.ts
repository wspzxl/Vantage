import type { Localized } from "@/lib/i18n/translations";

export interface TrendingTopic {
  ticker: string;
  followers: number;
  trendNote?: Localized;
}

/** Demo data — not live. Real version: aggregate follow counts across users. */
export const trendingTopics: TrendingTopic[] = [
  { ticker: "NIO", followers: 1842, trendNote: { zh: "财报本周公布", en: "Earnings due this week" } },
  { ticker: "BABA", followers: 1630, trendNote: { zh: "AI云业务新动作", en: "New move in AI/cloud" } },
  { ticker: "PDD", followers: 1205 },
  { ticker: "XPEV", followers: 980, trendNote: { zh: "交付量超预期", en: "Deliveries beat expectations" } },
  { ticker: "JD", followers: 874 },
  { ticker: "BIDU", followers: 711 },
  { ticker: "LI", followers: 664 },
  { ticker: "TCOM", followers: 492 },
  { ticker: "NTES", followers: 455 },
  { ticker: "BILI", followers: 338 },
  { ticker: "AAPL", followers: 2210, trendNote: { zh: "中国区营收占比受关注", en: "China revenue share in focus" } },
  { ticker: "TSLA", followers: 1977 },
].sort((a, b) => b.followers - a.followers);
