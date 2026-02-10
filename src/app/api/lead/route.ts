import { NextRequest, NextResponse } from "next/server";

interface LeadPayload {
  name: string;
  phone?: string;
  email?: string;
  insuranceType: string;
  message?: string;
  source?: string;
  pageUrl?: string;
}

type LeadField = "name" | "phone" | "email" | "insuranceType" | "message" | "contact";

type RateLimitEntry = {
  count: number;
  expiresAt: number;
};

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
  ip: string;
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
const rateLimitStore = new Map<string, RateLimitEntry>();
const leadStore: LeadRecord[] = [];

function parseClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function clearExpiredRateLimitEntries(now: number) {
  for (const [ip, entry] of rateLimitStore.entries()) {
    if (entry.expiresAt <= now) rateLimitStore.delete(ip);
  }
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  clearExpiredRateLimitEntries(now);

  const existing = rateLimitStore.get(ip);
  if (!existing) {
    rateLimitStore.set(ip, {
      count: 1,
      expiresAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true } as const;
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.expiresAt - now) / 1000)),
    } as const;
  }

  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return { allowed: true } as const;
}

function responseError(status: number, error: string, field?: LeadField) {
  return NextResponse.json({ ok: false, error, field }, { status });
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
    },
  };
}

type SendLeadEmailResult =
  | { ok: true; delivered: boolean; skippedReason?: string }
  | { ok: false; error: string };

async function sendLeadEmail(lead: Omit<LeadRecord, "id" | "ip">): Promise<SendLeadEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.LEAD_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.LEAD_FROM_EMAIL ?? process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return { ok: true, delivered: false, skippedReason: "email_provider_not_configured" };
  }

  const html = `
    <h2>Nuevo lead de asesoría</h2>
    <p><strong>Fecha:</strong> ${lead.submittedAt}</p>
    <p><strong>Fuente:</strong> ${lead.source}</p>
    <p><strong>Página:</strong> ${lead.pageUrl || "-"}</p>
    <p><strong>Nombre:</strong> ${lead.name}</p>
    <p><strong>Teléfono:</strong> ${lead.phone || "-"}</p>
    <p><strong>Email:</strong> ${lead.email || "-"}</p>
    <p><strong>Tipo de seguro:</strong> ${lead.insuranceType}</p>
    <p><strong>Mensaje:</strong><br/>${(lead.message || "-").replace(/\n/g, "<br/>")}</p>
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

  return { ok: true, delivered: true };
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

  const ip = parseClientIp(request);
  const rateLimit = checkRateLimit(ip);
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
    ip,
    ...validated.value,
  };

  leadStore.unshift(lead);
  if (leadStore.length > 200) leadStore.length = 200;

  console.info("[lead_submit]", {
    id: lead.id,
    submittedAt: lead.submittedAt,
    source: lead.source,
    insuranceType: lead.insuranceType,
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
  });

  if (!emailResult.ok) {
    return responseError(500, emailResult.error);
  }

  if (!emailResult.delivered) {
    console.warn("[lead_submit_email_skipped]", {
      id: lead.id,
      reason: emailResult.skippedReason ?? "not_available",
    });
  }

  return NextResponse.json({
    ok: true,
    leadId: lead.id,
    submittedAt: lead.submittedAt,
    emailDelivered: emailResult.delivered,
  });
}
