import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// Module-level, so it resets on cold start/redeploy - acceptable for this
// stage: worst case someone forces one extra refresh after a redeploy, still
// nowhere near the free-tier quotas (see DEVLOG).
const COOLDOWN_MS = 10 * 60 * 1000;
let lastRefreshAt = 0;

export async function POST() {
  const now = Date.now();
  const elapsed = now - lastRefreshAt;

  if (elapsed < COOLDOWN_MS) {
    const retryAfterSeconds = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
    return NextResponse.json({ ok: false, retryAfterSeconds }, { status: 429 });
  }

  lastRefreshAt = now;
  revalidateTag("market-data", { expire: 0 });
  return NextResponse.json({ ok: true });
}
