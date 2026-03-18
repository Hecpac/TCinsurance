import { NextRequest, NextResponse } from "next/server";
import {
  isGa4MeasurementConfigured,
  normalizeClientId,
  sendGa4MeasurementEvent,
} from "@/lib/ga4MeasurementProtocol";
import { KEY_EVENT_NAMES, type KeyEventName } from "@/lib/keyEvents";
import { buildUserProvidedData, deriveUserIdFromContact } from "@/lib/userProvidedData";

type AttributionKey =
  | "utm_source"
  | "utm_medium"
  | "utm_campaign"
  | "utm_term"
  | "utm_content"
  | "gclid"
  | "fbclid"
  | "msclkid";

interface ConversionPayload {
  event: KeyEventName;
  leadId?: string;
  transactionId?: string;
  clientId?: string;
  email?: string;
  phone?: string;
  value?: number;
  currency?: string;
  source?: string;
  pageUrl?: string;
  insuranceType?: string;
  timestampMicros?: number;
  occurredAt?: string;
  attribution?: Partial<Record<AttributionKey, string>>;
}

function sanitizeAttribution(
  attribution: ConversionPayload["attribution"]
): Partial<Record<AttributionKey, string>> {
  if (!attribution) return {};

  const allowedKeys: AttributionKey[] = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "msclkid",
  ];

  const sanitized: Partial<Record<AttributionKey, string>> = {};
  for (const key of allowedKeys) {
    const value = attribution[key]?.trim();
    if (!value) continue;
    sanitized[key] = value.slice(0, 120);
  }

  return sanitized;
}

function responseError(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

function isAuthorized(request: NextRequest) {
  const secret = process.env.CONVERSION_API_KEY?.trim();
  if (!secret) return false;

  const authHeader = request.headers.get("authorization")?.trim();
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;
  const fallbackToken = request.headers.get("x-conversion-key")?.trim() || null;

  return token === secret || fallbackToken === secret;
}

function parseTimestampMicros(payload: ConversionPayload) {
  if (typeof payload.timestampMicros === "number" && Number.isFinite(payload.timestampMicros)) {
    return Math.round(payload.timestampMicros);
  }

  if (payload.occurredAt) {
    const millis = Date.parse(payload.occurredAt);
    if (!Number.isNaN(millis)) return millis * 1000;
  }

  return Date.now() * 1000;
}

function validatePayload(payload: ConversionPayload) {
  if (!KEY_EVENT_NAMES.has(payload.event)) {
    return { ok: false as const, error: "Evento inválido." };
  }

  const leadId = payload.leadId?.trim() || "";
  const transactionId = payload.transactionId?.trim() || "";
  const clientId = normalizeClientId(payload.clientId);
  const email = payload.email?.trim().toLowerCase() || "";
  const phone = payload.phone?.trim() || "";
  const source = payload.source?.trim() || "/";
  const pageUrl = payload.pageUrl?.trim() || "";
  const insuranceType = payload.insuranceType?.trim() || "";
  const attribution = sanitizeAttribution(payload.attribution);
  const timestampMicros = parseTimestampMicros(payload);

  if (!leadId && !transactionId && !email && !phone) {
    return {
      ok: false as const,
      error: "Debes enviar leadId, transactionId, email o phone para identificar la conversión.",
    };
  }

  if (payload.event === "purchase") {
    const value = typeof payload.value === "number" ? payload.value : Number.NaN;
    const currency = payload.currency?.trim().toUpperCase() || "";

    if (!transactionId) {
      return {
        ok: false as const,
        error: "purchase requiere transactionId.",
      };
    }

    if (!Number.isFinite(value) || value <= 0) {
      return {
        ok: false as const,
        error: "purchase requiere value numérico mayor que 0.",
      };
    }

    if (!/^[A-Z]{3}$/.test(currency)) {
      return {
        ok: false as const,
        error: "purchase requiere currency ISO de 3 letras.",
      };
    }

    return {
      ok: true as const,
      value: {
        event: payload.event,
        leadId,
        transactionId,
        clientId,
        email,
        phone,
        value,
        currency,
        source,
        pageUrl,
        insuranceType,
        attribution,
        timestampMicros,
      },
    };
  }

  return {
    ok: true as const,
    value: {
      event: payload.event,
      leadId,
      transactionId,
      clientId,
      email,
      phone,
      value: undefined,
      currency: undefined,
      source,
      pageUrl,
      insuranceType,
      attribution,
      timestampMicros,
    },
  };
}

export async function POST(request: NextRequest) {
  if (!process.env.CONVERSION_API_KEY?.trim()) {
    return responseError(503, "Define CONVERSION_API_KEY para habilitar este endpoint.");
  }

  if (!isAuthorized(request)) {
    return responseError(401, "No autorizado.");
  }

  if (!isGa4MeasurementConfigured()) {
    return responseError(503, "Define GA4_MEASUREMENT_ID y GA4_API_SECRET para reenviar conversiones.");
  }

  let body: ConversionPayload;

  try {
    body = (await request.json()) as ConversionPayload;
  } catch {
    return responseError(400, "Payload inválido.");
  }

  const validated = validatePayload(body);
  if (!validated.ok) {
    return responseError(400, validated.error);
  }

  const conversion = validated.value;
  const measurementResult = await sendGa4MeasurementEvent({
    eventName: conversion.event,
    clientId: conversion.clientId,
    userId: deriveUserIdFromContact({ email: conversion.email, phone: conversion.phone }),
    userData: buildUserProvidedData({ email: conversion.email, phone: conversion.phone }),
    timestampMicros: conversion.timestampMicros,
    params: {
      lead_id: conversion.leadId || undefined,
      transaction_id: conversion.transactionId || undefined,
      value: conversion.value,
      currency: conversion.currency,
      source: conversion.source,
      page_location: conversion.pageUrl || undefined,
      insurance_type: conversion.insuranceType || undefined,
      gclid: conversion.attribution.gclid,
      utm_source: conversion.attribution.utm_source,
      utm_medium: conversion.attribution.utm_medium,
      utm_campaign: conversion.attribution.utm_campaign,
      utm_term: conversion.attribution.utm_term,
      utm_content: conversion.attribution.utm_content,
      fbclid: conversion.attribution.fbclid,
      msclkid: conversion.attribution.msclkid,
    },
  });

  if (!measurementResult.ok) {
    return responseError(502, measurementResult.error);
  }

  console.info("[conversion_forwarded]", {
    event: conversion.event,
    leadId: conversion.leadId || null,
    transactionId: conversion.transactionId || null,
    source: conversion.source,
    clientId: measurementResult.clientId,
    hasEmail: Boolean(conversion.email),
    hasPhone: Boolean(conversion.phone),
  });

  return NextResponse.json({
    ok: true,
    forwarded: true,
    event: conversion.event,
    clientId: measurementResult.clientId,
  });
}
