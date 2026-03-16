"use client";

import { useState } from "react";
import {
  CONSENT_COOKIE_NAME,
  CONSENT_REQUIRED_COUNTRIES,
  GEO_COUNTRY_COOKIE_NAME,
} from "@/lib/consent";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const encoded = encodeURIComponent(name) + "=";
  const parts = document.cookie.split(";");
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed.startsWith(encoded)) continue;
    const raw = trimmed.slice(encoded.length);
    if (!raw) return null;
    try {
      return decodeURIComponent(raw);
    } catch {
      return raw;
    }
  }
  return null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

function updateGtagConsent(granted: boolean) {
  const state = granted ? "granted" : "denied";
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: state,
      analytics_storage: state,
      ad_user_data: state,
      ad_personalization: state,
    });
  }
}

function shouldShowBanner(): boolean {
  if (typeof document === "undefined") return false;
  const existing = getCookie(CONSENT_COOKIE_NAME);
  if (existing === "accepted" || existing === "rejected") return false;
  const country = (getCookie(GEO_COUNTRY_COOKIE_NAME) ?? "").trim().toUpperCase();
  return Boolean(country) && CONSENT_REQUIRED_COUNTRIES.has(country);
}

export default function ConsentBanner() {
  const [visible, setVisible] = useState(shouldShowBanner);

  function handleAccept() {
    setCookie(CONSENT_COOKIE_NAME, "accepted", 365);
    updateGtagConsent(true);
    setVisible(false);
  }

  function handleReject() {
    setCookie(CONSENT_COOKIE_NAME, "rejected", 365);
    updateGtagConsent(false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentimiento de cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-border)] bg-[var(--color-bg)] p-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body text-swiss-black/90">
          Usamos cookies para analytics y publicidad. {" "}
          <a href="/privacidad" className="underline hover:text-swiss-red-ink">
            Política de privacidad
          </a>
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleReject}
            className="tap-target border border-[var(--color-border)] px-5 py-2 text-meta text-swiss-gray hover:text-swiss-black"
          >
            Rechazar
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="primary-cta tap-target px-5 py-2 text-meta"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}