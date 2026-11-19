"use client";

import { siteConfig } from "@/lib/config/siteConfig";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocaleToggle } from "@/components/i18n/LocaleToggle";

export function DashboardHeader({
  userEmail,
  isSupabaseConfigured,
  signOutAction,
}: {
  userEmail: string;
  isSupabaseConfigured: boolean;
  signOutAction: () => void | Promise<void>;
}) {
  const { locale, t } = useLocale();

  return (
    <header className="flex items-center justify-between border-b border-stone-200 px-6 py-3 dark:border-stone-800">
      <span className="font-semibold text-stone-900 dark:text-stone-50">{siteConfig.name[locale]}</span>
      <div className="flex items-center gap-4 text-sm text-stone-500 dark:text-stone-400">
        {!isSupabaseConfigured && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
            {t("header.demoPreview")}
          </span>
        )}
        <span>{userEmail}</span>
        {isSupabaseConfigured && (
          <form action={signOutAction}>
            <button type="submit" className="underline hover:text-stone-900 dark:hover:text-stone-100">
              {t("header.signOut")}
            </button>
          </form>
        )}
        <LocaleToggle />
      </div>
    </header>
  );
}
