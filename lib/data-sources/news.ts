import "server-only";

export interface NewsResult {
  title: string;
  link: string;
  publishedAt: string;
}

function decodeEntities(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

function extractTag(block: string, tag: string): string {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  return match ? decodeEntities(match[1]) : "";
}

/**
 * A free-text topic (e.g. "Pop Mart") searches in whatever script it's typed in,
 * which skews results to that language regardless of the hl/gl params below. For
 * names we know a Chinese alias for, search in the alias matching the viewer's
 * locale so Chinese-locale viewers get Chinese-language coverage, not a translation.
 */
const BILINGUAL_ALIASES: Record<string, { zh: string; en: string }> = {
  "pop mart": { zh: "泡泡玛特", en: "Pop Mart" },
  "泡泡玛特": { zh: "泡泡玛特", en: "Pop Mart" },
};

function localizedQuery(query: string, locale: "zh" | "en"): string {
  const alias = BILINGUAL_ALIASES[query.trim().toLowerCase()];
  return alias ? alias[locale] : query;
}

/**
 * Google News RSS search — free, no API key. Used as a keyword-filtered news
 * signal for companies outside the curated universe (e.g. HK/A-share names),
 * per the MVP plan's "unconfirmed early signal" fallback.
 */
export async function fetchCompanyNews(
  query: string,
  locale: "zh" | "en",
  limit = 3
): Promise<NewsResult[]> {
  const hl = locale === "zh" ? "zh-CN" : "en-US";
  const gl = locale === "zh" ? "CN" : "US";
  const ceid = locale === "zh" ? "CN:zh" : "US:en";
  const q = localizedQuery(query, locale);
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=${hl}&gl=${gl}&ceid=${ceid}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return [];

  const xml = await res.text();
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

  return items.slice(0, limit).map((item) => {
    // The <link> tag is Google's own redirect page, which can show a consent/error
    // interstitial. <description> embeds the real publisher URL in its <a href>, so
    // prefer that — falls back to <link> if that pattern isn't found.
    const description = extractTag(item, "description");
    const sourceLink = description.match(/href="([^"]+)"/)?.[1];
    return {
      title: extractTag(item, "title"),
      link: sourceLink ?? extractTag(item, "link"),
      publishedAt: extractTag(item, "pubDate"),
    };
  });
}
