"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  type Locale,
  isLocale,
} from "./locales";
import { getMessages, type Messages } from "./messages";

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${LOCALE_COOKIE_NAME}=`));
  if (!match) return DEFAULT_LOCALE;
  const value = decodeURIComponent(match.split("=")[1] ?? "");
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function useClientLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  useEffect(() => {
    setLocale(readLocaleCookie());
  }, []);
  return locale;
}

export function useClientMessages(): Messages {
  return getMessages(useClientLocale());
}
