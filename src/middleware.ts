import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  GEO_COUNTRY_COOKIE_NAME,
  GEO_COOKIE_MAX_AGE_SECONDS,
  readRequestCountry,
} from "@/lib/consent";
import {
  LOCALE_COOKIE_NAME,
  LOCALE_COOKIE_MAX_AGE_SECONDS,
  resolveLocale,
} from "@/i18n/locales";

function detectLocaleFromAcceptLanguage(value: string | null): "es" | "en" {
  if (!value) return "es";
  const lower = value.toLowerCase();
  if (lower.startsWith("en") || lower.includes(",en")) return "en";
  return "es";
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.get(LOCALE_COOKIE_NAME)?.value) {
    const detected = detectLocaleFromAcceptLanguage(
      request.headers.get("accept-language")
    );
    response.cookies.set(LOCALE_COOKIE_NAME, resolveLocale(detected), {
      path: "/",
      maxAge: LOCALE_COOKIE_MAX_AGE_SECONDS,
      sameSite: "lax",
      httpOnly: false,
    });
  }

  if (!request.cookies.get(GEO_COUNTRY_COOKIE_NAME)?.value) {
    const country = readRequestCountry(request.headers);
    if (country) {
      response.cookies.set(GEO_COUNTRY_COOKIE_NAME, country, {
        path: "/",
        maxAge: GEO_COOKIE_MAX_AGE_SECONDS,
        sameSite: "lax",
        httpOnly: false,
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)$).*)",
  ],
};
