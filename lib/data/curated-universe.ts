import type { Company } from "./types";

/**
 * Curated, not-arbitrary-search universe: US-listed Chinese ADRs plus a few
 * US names with heavy China revenue exposure, per the MVP scope decision
 * (sidesteps mainland A-share data entirely, reinforces the niche).
 */
export const curatedUniverse: Company[] = [
  { ticker: "BABA", name: "Alibaba Group", exchange: "NYSE", isChinaAdr: true, sector: "E-commerce" },
  { ticker: "PDD", name: "PDD Holdings (Temu/Pinduoduo)", exchange: "NASDAQ", isChinaAdr: true, sector: "E-commerce" },
  { ticker: "JD", name: "JD.com", exchange: "NASDAQ", isChinaAdr: true, sector: "E-commerce" },
  { ticker: "BIDU", name: "Baidu", exchange: "NASDAQ", isChinaAdr: true, sector: "Internet/AI" },
  { ticker: "NTES", name: "NetEase", exchange: "NASDAQ", isChinaAdr: true, sector: "Gaming" },
  { ticker: "BILI", name: "Bilibili", exchange: "NASDAQ", isChinaAdr: true, sector: "Media" },
  { ticker: "TME", name: "Tencent Music Entertainment", exchange: "NYSE", isChinaAdr: true, sector: "Media" },
  { ticker: "NIO", name: "NIO Inc.", exchange: "NYSE", isChinaAdr: true, sector: "EV/Auto" },
  { ticker: "LI", name: "Li Auto", exchange: "NASDAQ", isChinaAdr: true, sector: "EV/Auto" },
  { ticker: "XPEV", name: "XPeng", exchange: "NYSE", isChinaAdr: true, sector: "EV/Auto" },
  { ticker: "TCOM", name: "Trip.com Group", exchange: "NASDAQ", isChinaAdr: true, sector: "Travel" },
  { ticker: "YUMC", name: "Yum China", exchange: "NYSE", isChinaAdr: true, sector: "Consumer" },
  { ticker: "VIPS", name: "Vipshop", exchange: "NYSE", isChinaAdr: true, sector: "E-commerce" },
  { ticker: "ZTO", name: "ZTO Express", exchange: "NYSE", isChinaAdr: true, sector: "Logistics" },
  { ticker: "HTHT", name: "H World Group (Huazhu)", exchange: "NASDAQ", isChinaAdr: true, sector: "Travel" },
  { ticker: "BEKE", name: "KE Holdings (Beike)", exchange: "NYSE", isChinaAdr: true, sector: "Real Estate" },
  { ticker: "AAPL", name: "Apple Inc.", exchange: "NASDAQ", isChinaAdr: false, sector: "US benchmark — China revenue exposure" },
  { ticker: "TSLA", name: "Tesla Inc.", exchange: "NASDAQ", isChinaAdr: false, sector: "US benchmark — China revenue exposure" },
  { ticker: "NKE", name: "Nike Inc.", exchange: "NYSE", isChinaAdr: false, sector: "US benchmark — China revenue exposure" },
];
