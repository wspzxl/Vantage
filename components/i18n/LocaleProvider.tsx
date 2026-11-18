"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translate, type Locale, type TranslationKey } from "@/lib/i18n/translations";

const STORAGE_KEY = "market-tracking-locale";

interface LocaleState {
  locale: Locale;
  toggleLocale: () => void;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleState | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    // One-time sync from localStorage (an external system) on mount, so SSR/hydration
    // always renders the "en" default and the stored preference applies right after.
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored === "zh" || stored === "en") setLocale(stored);
    } catch {
      // Private window / blocked storage — fall back to the default locale.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  function toggleLocale() {
    const next: Locale = locale === "zh" ? "en" : "zh";
    setLocale(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore — persistence is a nice-to-have, not required for the toggle to work.
    }
  }

  function t(key: TranslationKey) {
    return translate(locale, key);
  }

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
