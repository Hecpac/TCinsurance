import { NextRequest, NextResponse } from "next/server";
import { escapeHtml, toSafeHtmlMultiline } from "@/lib/escapeHtml";

interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  insuranceType: string;
  message: string;
  website?: string;
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 4;
const insuranceTypes = new Set([
  "Salud",
  "Vida",
  "Gastos Finales",
  "Dental",
  "Medicare",
  "Visión",
  "Otro",
]);

type RateLimitEntry = {
  count: number;
  expiresAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

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
    return { allowed: true };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.expiresAt - now) / 1000)),
    };
  }

  existing.count += 1;
  rateLimitStore.set(ip, existing);
  return { allowed: true };
}

function responseError(status: number, error: string, field?: keyof ContactPayload) {
  return NextResponse.json({ ok: false, error, field }, { status });
}

function validatePayload(payload: ContactPayload) {
  const name = payload.name?.trim() ?? "";
  if (name.length < 2) {
    return { ok: false as const, error: "Nombre inválido.", field: "name" as const };
  }

  const phone = payload.phone?.trim() ?? "";
  const normalizedPhone = phone.replace(/[^\d+]/g, "");
  if (normalizedPhone.length < 10) {
    return { ok: false as const, error: "Teléfono inválido.", field: "phone" as const };
  }

  const email = payload.email?.trim() ?? "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
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
  if (message.length < 20 || message.length > 2000) {
    return {
      ok: false as const,
      error: "Mensaje inválido.",
      field: "message" as const,
    };
  }

  return {
    ok: true as const,
    value: {
      name,
      phone,
      email,
      insuranceType,
      message,
      website: payload.website?.trim() ?? "",
    },
  };
}

async function sendLeadEmail(payload: Omit<ContactPayload, "website">) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return {
      ok: false as const,
      error:
        "Configuración incompleta. Define RESEND_API_KEY, CONTACT_TO_EMAIL y CONTACT_FROM_EMAIL.",
    };
  }

  const html = `
    <h2>Nuevo lead desde TC Insurance</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(payload.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>Tipo de seguro:</strong> ${escapeHtml(payload.insuranceType)}</p>
    <p><strong>Mensaje:</strong><br/>${toSafeHtmlMultiline(payload.message)}</p>
  `;

  const text = [
    "Nuevo lead desde TC Insurance",
    `Nombre: ${payload.name}`,
    `Teléfono: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Tipo de seguro: ${payload.insuranceType}`,
    "Mensaje:",
    payload.message,
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
      reply_to: payload.email,
      subject: `Nuevo lead - ${payload.name}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const resendError = (await response.text()) || "Error al enviar email.";
    return { ok: false as const, error: resendError };
  }

  return { ok: true as const };
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
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

  const result = await sendLeadEmail({
    name: validated.value.name,
    phone: validated.value.phone,
    email: validated.value.email,
    insuranceType: validated.value.insuranceType,
    message: validated.value.message,
  });

  if (!result.ok) {
    return responseError(500, result.error);
  }

  return NextResponse.json({ ok: true });
}
