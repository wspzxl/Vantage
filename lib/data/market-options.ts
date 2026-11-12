import type { Localized } from "@/lib/i18n/translations";

export interface MarketOption {
  id: string;
  label: Localized;
  /** Short mock overview blurb for the daily briefing. Demo data — not live. */
  summary: Localized;
  stats: string[];
}

export const marketOptions: MarketOption[] = [
  {
    id: "cn-adr",
    label: { zh: "中概股（跨境）", en: "US-listed China ADRs (cross-border)" },
    summary: {
      zh: "今日涨跌不一 — 电商板块跑输新能源车板块，市场在等下周的财报季。",
      en: "Mixed session — e-commerce names underperforming EV names ahead of next week's earnings cluster.",
    },
    stats: ["BABA -1.2%", "PDD +2.1%", "NIO +4.8% on elevated volume", "BIDU -0.4%"],
  },
  {
    id: "a-share",
    label: { zh: "中国A股概览（上证/深证）", en: "China A-share overview (Shanghai/Shenzhen)" },
    summary: {
      zh: "上证指数小幅上涨，政策支持消息提振市场；消费和科技板块领涨。",
      en: "SSE Composite edged higher on renewed policy-support headlines; consumer and tech led gains.",
    },
    stats: ["SSE Composite +0.8%", "SZSE Component +1.1%", "Northbound flows positive"],
  },
  {
    id: "us-market",
    label: { zh: "美股市场概览", en: "US market overview" },
    summary: {
      zh: "大盘指数持平，市场等待明日公布的非农数据；科技龙头股小幅上涨。",
      en: "Broad indices flat into tomorrow's jobs report; tech mega-caps modestly higher.",
    },
    stats: ["S&P 500 +0.1%", "Nasdaq +0.3%", "10Y yield 4.21%"],
  },
];
