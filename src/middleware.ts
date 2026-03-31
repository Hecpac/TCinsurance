import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  GEO_COUNTRY_COOKIE_NAME,
  GEO_COOKIE_MAX_AGE_SECONDS,
  readRequestCountry,
} from "@/lib/consent";

export function middleware(request: NextRequest) {
  const existing = request.cookies.get(GEO_COUNTRY_COOKIE_NAME)?.value;
  if (existing) return NextResponse.next();

  const country = readRequestCountry(request.headers);
  if (!country) return NextResponse.next();

  const response = NextResponse.next();
  response.cookies.set(GEO_COUNTRY_COOKIE_NAME, country, {
    path: "/",
    maxAge: GEO_COOKIE_MAX_AGE_SECONDS,
    sameSite: "lax",
    httpOnly: false,
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)$).*)",
  ],
};
