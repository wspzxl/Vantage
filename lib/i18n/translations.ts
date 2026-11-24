export type Locale = "zh" | "en";

/** A piece of content authored in both languages, picked at render time via `value[locale]`. */
export interface Localized {
  zh: string;
  en: string;
}

const dict = {
  "nav.todayBriefing": { zh: "今日简报", en: "Today's Briefing" },
  "nav.topicPlaza": { zh: "话题广场", en: "Topic Plaza" },
  "nav.trackingSettings": { zh: "追踪设置", en: "Tracking Settings" },

  "header.demoPreview": { zh: "演示预览", en: "Demo preview" },
  "header.signOut": { zh: "退出登录", en: "Sign out" },

  "common.estimated": { zh: "预估", en: "est." },
  "common.sample": { zh: "示例，非实时", en: "sample, not live" },
  "common.refreshData": { zh: "刷新实时数据", en: "Refresh live data" },
  "common.refreshing": { zh: "刷新中…", en: "Refreshing…" },
  "common.refreshDone": { zh: "已刷新，稍后生效", en: "Refreshed — may take a moment to show" },
  "common.refreshCooldown": { zh: "刚刷新过，请稍后再试", en: "Just refreshed — try again shortly" },

  "landing.viewDemo": { zh: "查看 Demo", en: "View demo" },
  "landing.feature1Title": { zh: "正常追踪", en: "Markets you track" },
  "landing.feature1Body": {
    zh: "一份每日简报，跨境合并美股财报、FOMC/CPI 和中国宏观发布。",
    en: "One daily briefing spanning US earnings, FOMC/CPI, and China macro releases.",
  },
  "landing.feature2Title": { zh: "蹲未来", en: "Stakeouts" },
  "landing.feature2Body": {
    zh: "给你真正在意的几只股票设触发条件——到价、或者有相关消息，自动提醒。",
    en: "Set a price or news trigger on the handful of names you actually care about.",
  },
  "landing.feature3Title": { zh: "话题广场", en: "Topic Plaza" },
  "landing.feature3Body": {
    zh: "看看大家在追什么，发现同板块的相关标的。",
    en: "See what others are watching, and surface related names in the same sector.",
  },

  "briefing.normalTracking": { zh: "正常追踪", en: "Markets you track" },
  "briefing.noMarketsSelected": {
    zh: "还没追踪任何市场或其他话题 — 选一个市场试试：",
    en: "No markets or other topics tracked yet — try adding a market:",
  },
  "briefing.orTrackOtherPart1": { zh: "或者去", en: "Or track something else in" },
  "briefing.orTrackOtherPart2": { zh: "追踪其他话题。", en: "." },
  "briefing.stakeoutPrefix": { zh: "蹲未来 · 已触发目标", en: "Stakeouts · Triggered" },
  "briefing.noTargetsPart1": { zh: "还没设置追踪目标 — 去", en: "No stakeout targets yet — check" },
  "briefing.noTargetsPart2": { zh: "看看大家在追什么，或去", en: "to see what others are tracking, or add one yourself in" },
  "briefing.noTargetsPart3": { zh: "自己加一个。", en: "." },
  "briefing.noTriggersYet": { zh: "暂无触发 — 还在等待中。", en: "Nothing triggered yet — still watching." },
  "briefing.pendingPrefix": { zh: "仍在等待", en: "Still pending" },
  "briefing.upcoming7Days": { zh: "未来7天关注", en: "Next 7 days" },
  "briefing.noUpcomingEvents": {
    zh: "未来7天内没有已知的催化事件。",
    en: "No known catalysts in the next 7 days.",
  },
  "briefing.moreInPlaza": { zh: "去话题广场追踪更多 →", en: "Track more in the Topic Plaza →" },
  "briefing.newsSourceNote": {
    zh: "「其他」卡片的「了解详情」来自 Google News 搜索结果，自动匹配，未经人工核实。",
    en: "\"View details\" on Other cards links to Google News search results — automatically matched, not manually verified.",
  },
  "briefing.addTopicPlaceholder": {
    zh: "输入任意话题，比如 泡泡玛特 / 关税政策",
    en: "Any topic, e.g. Pop Mart or tariff policy",
  },
  "briefing.addTopicButton": { zh: "追踪", en: "Track" },
  "briefing.learnMore": { zh: "了解详情", en: "View details" },
  "briefing.newsLoading": { zh: "加载中…", en: "Loading…" },

  "plaza.trending": { zh: "热门追踪", en: "Trending" },
  "plaza.followersSuffix": { zh: "人在追", en: "following" },
  "plaza.recommended": { zh: "猜你想追", en: "Recommended for you" },
  "plaza.recommendEmptyHint": {
    zh: "追踪几个话题后，这里会出现更懂你的推荐。",
    en: "Follow a few topics and smarter recommendations will show up here.",
  },
  "plaza.following": { zh: "已追踪", en: "Following" },
  "plaza.followAction": { zh: "+ 追踪", en: "+ Follow" },
  "plaza.timelinePrefix": { zh: "Timeline · 我追踪的话题", en: "Timeline · Topics you follow" },
  "plaza.timelineEmptyPart1": { zh: "还没追踪任何话题 — 上面", en: "Haven't followed any topics yet — tap" },
  "plaza.timelineEmptyPart2": { zh: "里点一个 + 追踪，这里就会出现它的时间线。", en: "above and + Follow, and its timeline shows up here." },
  "plaza.timelineNoEvents": {
    zh: "追踪的话题暂无已知的催化事件。",
    en: "No known catalysts yet for the topics you follow.",
  },
  "plaza.anomaliesHeading": { zh: "异动信号 — 已发生", en: "Anomaly signals — already happened" },
  "plaza.anomaliesSampleNote": {
    zh: "量价异动信号目前是示例内容，非实时检测。",
    en: "Volume/price anomaly signals below are sample content, not live detection.",
  },
  "plaza.upcomingEventsHeading": { zh: "即将发生的事件", en: "Upcoming events" },
  "plaza.macroFooterPart1": {
    zh: "想要宏观事件（FOMC/CPI/中国宏观数据）？那些现在在",
    en: "Looking for macro events (FOMC/CPI/China macro)? Those show up in",
  },
  "plaza.macroFooterPart2": {
    zh: "里，按你在追踪设置里选的市场展示。",
    en: ", filtered by the markets you picked in Tracking Settings.",
  },

  "eventType.earnings": { zh: "财报", en: "Earnings" },
  "eventType.fomc": { zh: "FOMC", en: "FOMC" },
  "eventType.cpi": { zh: "CPI", en: "CPI" },
  "eventType.nfp": { zh: "非农数据", en: "Jobs report" },
  "eventType.china_macro": { zh: "中国宏观", en: "China macro" },
  "eventType.other": { zh: "其他", en: "Other" },

  "tracking.panelTitle": { zh: "自动化追踪面板", en: "Automated Tracking Panel" },
  "tracking.previewEmptyState": { zh: "查看新用户空状态", en: "Preview empty state" },
  "tracking.previewEmptyStateTooltip": {
    zh: "清空市场/目标/追踪话题，预览全新用户第一次打开是什么样",
    en: "Clears markets/targets/follows to preview what a brand-new user sees",
  },
  "tracking.selectMarketTitle": { zh: "正常追踪 · 选择市场", en: "Normal tracking · Select markets" },
  "tracking.marketPushHint": {
    zh: "每天早上推送所选市场的概览简报（当前是网页端展示；邮件推送是后续可选渠道）。",
    en: "A daily morning briefing for the markets you select (shown in-app for now; email is an optional channel later).",
  },
  "tracking.marketNotListedPart1": {
    zh: "想追踪的市场不在上面？还没有结构化数据的市场（比如日股），可以先在下面的",
    en: "Don't see the market you want? One we haven't built structured data for yet (e.g. Japan) can be added below under",
  },
  "tracking.marketNotListedPart2": { zh: "里输入追踪。", en: "." },
  "tracking.manageTargetsTitle": { zh: "蹲未来 · 目标管理", en: "Stake-out · Manage targets" },
  "tracking.noTargetsHint": { zh: "还没有追踪目标，下面加一个：", en: "No targets yet — add one below:" },
  "tracking.delete": { zh: "删除", en: "Delete" },
  "tracking.stockLabel": { zh: "股票", en: "Stock" },
  "tracking.conditionLabel": { zh: "条件", en: "Condition" },
  "tracking.priceLabel": { zh: "价格", en: "Price" },
  "tracking.noteLabel": { zh: "备注（可选）", en: "Note (optional)" },
  "tracking.addTarget": { zh: "添加目标", en: "Add target" },
  "tracking.otherTrackingTitle": { zh: "其他 · 追踪话题", en: "Other · Tracked topics" },
  "tracking.otherTrackingHint": {
    zh: "公司、政策、还没被收录的其他市场——只要还没有结构化数据，都可以在这里输入自由追踪，今日简报里会显示相关新闻。",
    en: "Companies, policy topics, or any other market we haven't built structured data for yet — add it here and today's briefing will show its latest news.",
  },

  "condition.price_below": { zh: "跌破价格", en: "Drops below price" },
  "condition.price_above": { zh: "突破价格", en: "Breaks above price" },
  "condition.company_move": { zh: "公司有新动作就提醒", en: "Alert on any company move" },
} satisfies Record<string, Localized>;

export type TranslationKey = keyof typeof dict;

export function translate(locale: Locale, key: TranslationKey): string {
  return dict[key][locale];
}

export function recommendReason(locale: Locale, sector: string, matchedTicker: string): string {
  return locale === "zh"
    ? `同属 ${sector}，你在追 ${matchedTicker}`
    : `Same sector (${sector}) as ${matchedTicker}, which you follow`;
}

export function priceTriggerReason(
  locale: Locale,
  ticker: string,
  direction: "below" | "above",
  price: number,
  threshold: number
): string {
  const verb = locale === "zh"
    ? (direction === "below" ? "跌至" : "涨至")
    : (direction === "below" ? "fell to" : "rose to");
  return locale === "zh"
    ? `${ticker} ${verb} $${price.toFixed(2)}（目标：$${threshold}）`
    : `${ticker} ${verb} $${price.toFixed(2)} (target: $${threshold})`;
}
