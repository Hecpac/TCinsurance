import { createHash } from "node:crypto";

const DEFAULT_ENGAGEMENT_TIME_MSEC = 1;

function getMeasurementId() {
  return process.env.GA4_MEASUREMENT_ID?.trim() || process.env.NEXT_PUBLIC_GA4_ID?.trim() || null;
}

type MeasurementValue = string | number | boolean | null | undefined;

type UserProvidedData = {
  sha256_email_address?: string;
  sha256_phone_number?: string;
};

interface MeasurementEventInput {
  eventName: string;
  clientId?: string | null;
  userId?: string | null;
  userData?: UserProvidedData;
  timestampMicros?: number;
  params?: Record<string, MeasurementValue>;
}

export function normalizeClientId(value: string | null | undefined) {
  const normalized = value?.trim();
  if (!normalized) return null;
  return /^\d+\.\d+$/.test(normalized) ? normalized : null;
}

export function deriveClientId(seed: string) {
  const hash = createHash("sha256").update(seed).digest();
  return `${hash.readUInt32BE(0)}.${hash.readUInt32BE(4)}`;
}

function sanitizeParamKey(key: string) {
  return key.trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_");
}

function sanitizeParams(params: Record<string, MeasurementValue>) {
  const clean: Record<string, string | number | boolean | null> = {};

  for (const [rawKey, rawValue] of Object.entries(params)) {
    if (rawValue === undefined) continue;
    const key = sanitizeParamKey(rawKey);
    if (!key) continue;

    if (typeof rawValue === "string") {
      clean[key] = rawValue.trim().slice(0, 120);
      continue;
    }

    clean[key] = rawValue;
  }

  return clean;
}

export function isGa4MeasurementConfigured() {
  const measurementId = getMeasurementId();
  const apiSecret = process.env.GA4_API_SECRET?.trim();
  return Boolean(measurementId && apiSecret);
}

export async function sendGa4MeasurementEvent({
  eventName,
  clientId,
  userId,
  userData,
  timestampMicros,
  params = {},
}: MeasurementEventInput) {
  const measurementId = getMeasurementId();
  const apiSecret = process.env.GA4_API_SECRET?.trim();

  if (!measurementId || !apiSecret) {
    return {
      ok: false as const,
      error: "GA4 Measurement Protocol no configurado.",
    };
  }

  const safeClientId =
    normalizeClientId(clientId) ?? deriveClientId(`${eventName}:${JSON.stringify(params)}`);

  const response = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: safeClientId,
        user_id: userId?.trim() || undefined,
        user_data: userData,
        timestamp_micros: timestampMicros ?? Date.now() * 1000,
        events: [
          {
            name: eventName,
            params: sanitizeParams({
              ...params,
              engagement_time_msec: DEFAULT_ENGAGEMENT_TIME_MSEC,
            }),
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const errorText = (await response.text()) || "GA4 rechazó el evento.";
    return {
      ok: false as const,
      error: errorText,
    };
  }

  return {
    ok: true as const,
    clientId: safeClientId,
  };
}
