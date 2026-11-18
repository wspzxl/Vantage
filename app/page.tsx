"use client";

import Link from "next/link";
import { Noto_Serif_SC } from "next/font/google";
import { siteConfig } from "@/lib/config/siteConfig";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocaleToggle } from "@/components/i18n/LocaleToggle";

const serif = Noto_Serif_SC({
  variable: "--font-serif-sc",
  weight: ["600", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const { locale, t } = useLocale();

  const features = [
    { title: t("landing.feature1Title"), body: t("landing.feature1Body") },
    { title: t("landing.feature2Title"), body: t("landing.feature2Body") },
    { title: t("landing.feature3Title"), body: t("landing.feature3Body") },
  ];

  return (
    <div
      className={`${serif.variable} relative flex flex-1 flex-col items-center bg-stone-50 px-6 py-24 text-center dark:bg-black`}
    >
      <div className="absolute right-6 top-6">
        <LocaleToggle />
      </div>

      <h1 className="max-w-xl font-[family-name:var(--font-serif-sc)] text-5xl font-bold tracking-tight text-stone-900 sm:text-6xl dark:text-stone-50">
        {siteConfig.name[locale]}
      </h1>
      <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-stone-600 sm:text-xl dark:text-stone-300">
        {siteConfig.tagline[locale]}
      </p>
      <p className="mt-3 max-w-lg text-base leading-relaxed text-stone-500 dark:text-stone-400">
        {siteConfig.description[locale]}
      </p>
      <Link
        href="/dashboard"
        className="mt-10 border-b-2 border-stone-900 pb-1 text-lg font-semibold text-stone-900 dark:border-stone-50 dark:text-stone-50"
      >
        {t("landing.viewDemo")}
      </Link>

      <div className="mt-24 h-px w-12 bg-stone-300 dark:bg-stone-700" />

      <div className="mt-14 flex w-full max-w-2xl flex-col text-left">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="flex gap-7 border-t border-stone-200 py-8 first:border-t-0 dark:border-stone-800"
          >
            <div className="w-7 shrink-0 pt-0.5 font-[family-name:var(--font-serif-sc)] text-sm text-stone-300 dark:text-stone-600">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50">{f.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                {f.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
