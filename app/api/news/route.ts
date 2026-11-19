import { NextResponse } from "next/server";
import { fetchCompanyNews, type NewsResult } from "@/lib/data-sources/news";

export async function POST(req: Request) {
  const body = await req.json();
  const topics: unknown = body?.topics;
  const locale = body?.locale === "en" ? "en" : "zh";

  if (!Array.isArray(topics) || topics.some((t) => typeof t !== "string")) {
    return NextResponse.json({ error: "topics must be a string array" }, { status: 400 });
  }

  const results: { topic: string; items: NewsResult[] }[] = await Promise.all(
    topics.slice(0, 10).map(async (topic: string) => ({
      topic,
      items: await fetchCompanyNews(topic, locale),
    }))
  );

  return NextResponse.json({ results });
}
