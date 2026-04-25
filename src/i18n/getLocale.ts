import { cookies, headers } from "next/headers";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE_NAME,
  type Locale,
  resolveLocale,
} from "./locales";

function pickLocaleFromAcceptLanguage(value: string | null): Locale {
  if (!value) return DEFAULT_LOCALE;
  const lower = value.toLowerCase();
  if (lower.startsWith("en") || lower.includes(",en")) return "en";
  return DEFAULT_LOCALE;
}

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(LOCALE_COOKIE_NAME)?.value;
  if (cookieValue) return resolveLocale(cookieValue);

  const headerStore = await headers();
  return pickLocaleFromAcceptLanguage(headerStore.get("accept-language"));
}
