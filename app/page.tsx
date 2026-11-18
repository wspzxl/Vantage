"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config/siteConfig";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocaleToggle } from "@/components/i18n/LocaleToggle";

export default function Home() {
  const { locale, t } = useLocale();

  const features = [
    { title: t("landing.feature1Title"), body: t("landing.feature1Body") },
    { title: t("landing.feature2Title"), body: t("landing.feature2Body") },
    { title: t("landing.feature3Title"), body: t("landing.feature3Body") },
  ];

  return (
    <div className="relative flex flex-1 flex-col items-center bg-zinc-50 px-6 py-16 text-center dark:bg-black">
      <div className="absolute right-6 top-6">
        <LocaleToggle />
      </div>
      <h1 className="max-w-lg text-3xl font-semibold tracking-tight">
        {siteConfig.name[locale]}
      </h1>
      <p className="mt-3 max-w-md text-lg text-zinc-600 dark:text-zinc-400">
        {siteConfig.tagline[locale]}
      </p>
      <p className="mt-3 max-w-md text-sm text-zinc-500 dark:text-zinc-500">
        {siteConfig.description[locale]}
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/dashboard"
          className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          {t("landing.viewDemo")}
        </Link>
      </div>

      <div className="mt-14 grid max-w-3xl gap-4 text-left sm:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="text-sm font-semibold">{f.title}</div>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
