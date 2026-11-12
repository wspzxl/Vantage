"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { TranslationKey } from "@/lib/i18n/translations";

const TABS: { href: string; labelKey: TranslationKey }[] = [
  { href: "/dashboard", labelKey: "nav.todayBriefing" },
  { href: "/dashboard/plaza", labelKey: "nav.topicPlaza" },
  { href: "/dashboard/tracking", labelKey: "nav.trackingSettings" },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { t } = useLocale();
  return (
    <nav className="flex gap-1 border-b border-zinc-200 px-6 dark:border-zinc-800">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-zinc-950 text-zinc-950 dark:border-white dark:text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
            }`}
          >
            {t(tab.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
