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
    <nav className="flex gap-1 border-b border-stone-200 px-6 dark:border-stone-800">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-stone-900 text-stone-900 dark:border-stone-50 dark:text-stone-50"
                : "border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-300"
            }`}
          >
            {t(tab.labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
