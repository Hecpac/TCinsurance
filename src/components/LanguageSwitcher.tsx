"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_MAX_AGE_SECONDS,
  LOCALE_COOKIE_NAME,
  type Locale,
  isLocale,
} from "@/i18n/locales";
import { trackEvent } from "@/lib/tracking";

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${LOCALE_COOKIE_NAME}=`));
  if (!match) return DEFAULT_LOCALE;
  const value = decodeURIComponent(match.split("=")[1] ?? "");
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

function writeLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE_NAME}=${encodeURIComponent(
    locale
  )}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
}

export default function LanguageSwitcher({
  className,
}: {
  className?: string;
}) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const [, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    setLocale(readLocaleCookie());
  }, []);

  function setNext(next: Locale) {
    if (next === locale) return;
    writeLocaleCookie(next);
    setLocale(next);
    trackEvent("lang_switch", { from: locale, to: next });
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className={`inline-flex items-center gap-1 text-meta uppercase tracking-[0.12em] ${
        className ?? ""
      }`}
    >
      <button
        type="button"
        onClick={() => setNext("es")}
        aria-pressed={locale === "es"}
        className={`tap-target px-2 py-1 transition-colors ${
          locale === "es"
            ? "text-[color:var(--color-tic-orange)] font-semibold"
            : "text-swiss-gray hover:text-swiss-black"
        }`}
      >
        ES
      </button>
      <span aria-hidden className="text-swiss-gray">·</span>
      <button
        type="button"
        onClick={() => setNext("en")}
        aria-pressed={locale === "en"}
        className={`tap-target px-2 py-1 transition-colors ${
          locale === "en"
            ? "text-[color:var(--color-tic-orange)] font-semibold"
            : "text-swiss-gray hover:text-swiss-black"
        }`}
      >
        EN
      </button>
    </div>
  );
}
