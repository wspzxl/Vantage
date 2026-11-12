"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";

export function LocaleToggle() {
  const { locale, toggleLocale } = useLocale();
  return (
    <button
      onClick={toggleLocale}
      className="rounded-full border border-zinc-300 px-2.5 py-1 text-xs font-medium text-zinc-600 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-400"
      title={locale === "zh" ? "Switch to English" : "切换到中文"}
    >
      {locale === "zh" ? "EN" : "中文"}
    </button>
  );
}
