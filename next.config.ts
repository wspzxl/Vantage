import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Cache Components is off: almost every page here is per-user/dynamic
     (auth, watchlists, live-ish data), so the static-shell model would just
     add Suspense-boundary overhead without a real caching win. */
};

export default nextConfig;
