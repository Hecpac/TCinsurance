import { NextRequest, NextResponse } from "next/server";
import { escapeHtml, toSafeHtmlMultiline } from "@/lib/escapeHtml";
import {
  isGa4MeasurementConfigured,
  normalizeClientId,
  sendGa4MeasurementEvent,
} from "@/lib/ga4MeasurementProtocol";
import { KEY_EVENTS } from "@/lib/keyEvents";
import { buildUserProvidedData, deriveUserIdFromContact } from "@/lib/userProvidedData";
import { checkDistributedRateLimit } from "@/lib/distributedRateLimit";

type AttributionKey =
  | "utm_source"
  | "utm_medium"
  | "utm_campaign"
  | "utm_term"
  | "utm_content"
  | "gclid"
  | "fbclid"
  | "msclkid";

interface LeadAnalyticsContext {
  clientId?: string;
}

interface LeadPayload {
  name: string;
  phone?: string;
  email?: string;
  insuranceType: string;
  message?: string;
  source?: string;
  pageUrl?: string;
  website?: string;
  attribution?: Partial<Record<AttributionKey, string>>;
  analytics?: LeadAnalyticsContext;
}

type LeadField = "name" | "phone" | "email" | "insuranceType" | "message" | "contact";

type LeadRecord = {
  id: string;
  submittedAt: string;
  source: string;
  pageUrl: string;
  name: string;
  phone: string;
  email: string;
  insuranceType: string;
  message: string;
  attribution: Partial<Record<AttributionKey, string>>;
  analytics: LeadAnalyticsContext;
};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const insuranceTypes = new Set([
  "Salud",
  "Vida",
  "Gastos Finales",
  "Dental",
  "Visión",
  "Medicare",
  "Indemnización",
  "Otro",
]);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function responseError(status: number, error: string, field?: LeadField) {
  return NextResponse.json({ ok: false, error, field }, { status });
}

function sanitizeAttribution(
  attribution: LeadPayload["attribution"]
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

function sanitizeAnalyticsContext(analytics: LeadPayload["analytics"]): LeadAnalyticsContext {
  const clientId = normalizeClientId(analytics?.clientId);
  return clientId ? { clientId } : {};
}

function validatePayload(payload: LeadPayload) {
  const name = payload.name?.trim() ?? "";
  if (name.length < 2) {
    return { ok: false as const, error: "Nombre inválido.", field: "name" as const };
  }

  const phone = payload.phone?.trim() ?? "";
  const email = payload.email?.trim().toLowerCase() ?? "";
  const hasPhone = phone.length > 0;
  const hasEmail = email.length > 0;

  if (!hasPhone && !hasEmail) {
    return {
      ok: false as const,
      error: "Para ayudarte, comparte al menos un canal de contacto: teléfono o email.",
      field: "contact" as const,
    };
  }

  if (hasPhone) {
    const normalizedPhone = phone.replace(/[^\d]/g, "");
    if (normalizedPhone.length < 10) {
      return { ok: false as const, error: "Teléfono inválido.", field: "phone" as const };
    }
  }

  if (hasEmail && !emailRegex.test(email)) {
    return { ok: false as const, error: "Email inválido.", field: "email" as const };
  }

  const insuranceType = payload.insuranceType?.trim() ?? "";
  if (!insuranceTypes.has(insuranceType)) {
    return {
      ok: false as const,
      error: "Tipo de seguro inválido.",
      field: "insuranceType" as const,
    };
  }

  const message = payload.message?.trim() ?? "";
  if (message.length > 600) {
    return {
      ok: false as const,
      error: "El mensaje no debe superar 600 caracteres.",
      field: "message" as const,
    };
  }

  const source = payload.source?.trim() || "/";
  const pageUrl = payload.pageUrl?.trim() || "";
  const website = payload.website?.trim() || "";
  const attribution = sanitizeAttribution(payload.attribution);
  const analytics = sanitizeAnalyticsContext(payload.analytics);

  return {
    ok: true as const,
    value: {
      name,
      phone,
      email,
      insuranceType,
      message,
      source,
      pageUrl,
      website,
      attribution,
      analytics,
    },
  };
}

type SendLeadEmailResult = { ok: true } | { ok: false; error: string };

function formatAttributionRows(attribution: Partial<Record<AttributionKey, string>>) {
  const entries = Object.entries(attribution);
  if (!entries.length) {
    return {
      html: "<li>-</li>",
      text: ["-"],
    };
  }

  const html = entries
    .map(([key, value]) => `<li><strong>${escapeHtml(key)}:</strong> ${escapeHtml(value)}</li>`)
    .join("");

  const text = entries.map(([key, value]) => `${key}: ${value}`);

  return { html, text };
}

async function sendLeadEmail(lead: Omit<LeadRecord, "id">): Promise<SendLeadEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.LEAD_FROM_EMAIL ?? process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return {
      ok: false,
      error:
        "Configuración incompleta. Define RESEND_API_KEY y un destino/origen para leads.",
    };
  }

  const attributionRows = formatAttributionRows(lead.attribution);

  const html = `
    <h2>Nuevo lead de asesoría</h2>
    <p><strong>Fecha:</strong> ${escapeHtml(lead.submittedAt)}</p>
    <p><strong>Fuente:</strong> ${escapeHtml(lead.source)}</p>
    <p><strong>Página:</strong> ${escapeHtml(lead.pageUrl || "-")}</p>
    <p><strong>Nombre:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(lead.phone || "-")}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email || "-")}</p>
    <p><strong>Tipo de seguro:</strong> ${escapeHtml(lead.insuranceType)}</p>
    <p><strong>GA client ID:</strong> ${escapeHtml(lead.analytics.clientId || "-")}</p>
    <p><strong>Atribución:</strong></p>
    <ul>${attributionRows.html}</ul>
    <p><strong>Mensaje:</strong><br/>${toSafeHtmlMultiline(lead.message || "-")}</p>
  `;

  const text = [
    "Nuevo lead de asesoría",
    `Fecha: ${lead.submittedAt}`,
    `Fuente: ${lead.source}`,
    `Página: ${lead.pageUrl || "-"}`,
    `Nombre: ${lead.name}`,
    `Teléfono: ${lead.phone || "-"}`,
    `Email: ${lead.email || "-"}`,
    `Tipo de seguro: ${lead.insuranceType}`,
    `GA client ID: ${lead.analytics.clientId || "-"}`,
    "Atribución:",
    ...attributionRows.text,
    "Mensaje:",
    lead.message || "-",
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: lead.email || undefined,
      subject: `Nuevo lead - ${lead.name}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const resendError = (await response.text()) || "Error al enviar email.";
    return { ok: false, error: resendError };
  }

  return { ok: true };
}

export async function POST(request: NextRequest) {
  let body: LeadPayload;

  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return responseError(400, "Payload inválido.");
  }

  const validated = validatePayload(body);
  if (!validated.ok) {
    return responseError(400, validated.error, validated.field);
  }

  if (validated.value.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = parseClientIp(request);
  const rateLimit = await checkDistributedRateLimit({
    namespace: "lead",
    key: ip,
    windowSeconds: RATE_LIMIT_WINDOW_MS / 1000,
    maxRequests: RATE_LIMIT_MAX_REQUESTS,
  });

  if (!rateLimit.allowed && rateLimit.backend === "unconfigured") {
    return responseError(503, rateLimit.error || "Protección temporalmente no disponible.");
  }

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Demasiadas solicitudes. Intenta en unos minutos.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds ?? 60),
        },
      }
    );
  }

  const lead: LeadRecord = {
    id: `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
    name: validated.value.name,
    phone: validated.value.phone,
    email: validated.value.email,
    insuranceType: validated.value.insuranceType,
    message: validated.value.message,
    attribution: validated.value.attribution,
    analytics: validated.value.analytics,
    source: validated.value.source,
    pageUrl: validated.value.pageUrl,
  };

  console.info("[lead_submit]", {
    id: lead.id,
    submittedAt: lead.submittedAt,
    source: lead.source,
    insuranceType: lead.insuranceType,
    attribution: lead.attribution,
    clientId: lead.analytics.clientId ?? null,
  });

  const emailResult = await sendLeadEmail({
    submittedAt: lead.submittedAt,
    source: lead.source,
    pageUrl: lead.pageUrl,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    insuranceType: lead.insuranceType,
    message: lead.message,
    attribution: lead.attribution,
    analytics: lead.analytics,
  });

  if (!emailResult.ok) {
    return responseError(500, emailResult.error);
  }

  if (isGa4MeasurementConfigured()) {
    const measurementResult = await sendGa4MeasurementEvent({
      eventName: KEY_EVENTS.qualifyLead,
      clientId: lead.analytics.clientId,
      userId: deriveUserIdFromContact({ email: lead.email, phone: lead.phone }),
      userData: buildUserProvidedData({ email: lead.email, phone: lead.phone }),
      params: {
        lead_id: lead.id,
        source: lead.source,
        page_location: lead.pageUrl || undefined,
        insurance_type: lead.insuranceType,
        gclid: lead.attribution.gclid,
        utm_source: lead.attribution.utm_source,
        utm_medium: lead.attribution.utm_medium,
        utm_campaign: lead.attribution.utm_campaign,
      },
    });

    if (!measurementResult.ok) {
      console.warn("[qualify_lead_forward_failed]", {
        leadId: lead.id,
        error: measurementResult.error,
      });
    }
  }

  return NextResponse.json({
    ok: true,
    leadId: lead.id,
    submittedAt: lead.submittedAt,
    emailDelivered: true,
    gaClientId: lead.analytics.clientId ?? null,
  });
}
