import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  GEO_COOKIE_MAX_AGE_SECONDS,
  GEO_COUNTRY_COOKIE_NAME,
  normalizeCountryCode,
  readRequestCountry,
} from "@/lib/consent";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const currentCookieValue = normalizeCountryCode(
    request.cookies.get(GEO_COUNTRY_COOKIE_NAME)?.value
  );
  const countryCode = readRequestCountry(request.headers);

  if (!countryCode) {
    if (currentCookieValue) {
      response.cookies.delete(GEO_COUNTRY_COOKIE_NAME);
    }

    return response;
  }

  if (currentCookieValue === countryCode) return response;

  response.cookies.set({
    name: GEO_COUNTRY_COOKIE_NAME,
    value: countryCode,
    maxAge: GEO_COOKIE_MAX_AGE_SECONDS,
    sameSite: "lax",
    secure: request.nextUrl.protocol === "https:",
    path: "/",
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};
