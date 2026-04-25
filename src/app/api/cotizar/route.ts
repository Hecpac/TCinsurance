import { NextRequest, NextResponse } from "next/server";
import { escapeHtml, toSafeHtmlMultiline } from "@/lib/escapeHtml";
import { checkDistributedRateLimit } from "@/lib/distributedRateLimit";

interface CotizarPayload {
  service: string;
  fullName: string;
  age: string;
  zip: string;
  email: string;
  phone: string;
  notes?: string;
  lang?: string;
  website?: string;
}

const RATE_LIMIT_WINDOW_SEC = 15 * 60;
const RATE_LIMIT_MAX_REQUESTS = 4;

const SERVICE_LABELS: Record<string, string> = {
  salud: "Seguro de salud",
  vida: "Seguro de vida",
  "gastos-finales": "Gastos finales",
  medicare: "Medicare",
  "dental-vision": "Dental y visión",
};

function parseClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function err(status: number, error: string, field?: keyof CotizarPayload) {
  return NextResponse.json({ ok: false, error, field }, { status });
}

function validate(payload: CotizarPayload) {
  const service = payload.service?.trim();
  if (!service || !SERVICE_LABELS[service]) {
    return { ok: false as const, error: "Tipo de seguro inválido.", field: "service" as const };
  }
  const fullName = payload.fullName?.trim() ?? "";
  if (fullName.length < 2) {
    return { ok: false as const, error: "Nombre inválido.", field: "fullName" as const };
  }
  const age = payload.age?.trim() ?? "";
  const ageNumber = Number.parseInt(age, 10);
  if (!Number.isFinite(ageNumber) || ageNumber < 0 || ageNumber > 120) {
    return { ok: false as const, error: "Edad inválida.", field: "age" as const };
  }
  const zip = payload.zip?.trim() ?? "";
  if (!/^\d{5}$/.test(zip)) {
    return { ok: false as const, error: "Código postal inválido.", field: "zip" as const };
  }
  const email = payload.email?.trim() ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false as const, error: "Email inválido.", field: "email" as const };
  }
  const phone = payload.phone?.trim() ?? "";
  if (phone.replace(/[^\d+]/g, "").length < 10) {
    return { ok: false as const, error: "Teléfono inválido.", field: "phone" as const };
  }
  const notes = (payload.notes ?? "").trim();
  if (notes.length > 2000) {
    return { ok: false as const, error: "Notas demasiado largas.", field: "notes" as const };
  }
  const lang: "es" | "en" =
    (payload.lang ?? "es").trim().toLowerCase() === "en" ? "en" : "es";
  return {
    ok: true as const,
    value: {
      service,
      serviceLabel: SERVICE_LABELS[service],
      fullName,
      age: String(ageNumber),
      zip,
      email,
      phone,
      notes,
      lang,
      website: payload.website?.trim() ?? "",
    },
  };
}

type ValidatedLead = {
  service: string;
  serviceLabel: string;
  fullName: string;
  age: string;
  zip: string;
  email: string;
  phone: string;
  notes: string;
  lang: "es" | "en";
  website: string;
};

async function sendLeadEmail(lead: ValidatedLead) {
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
    <h2>Nuevo lead — Cotizador TIC Insurance</h2>
    <p><strong>Servicio:</strong> ${escapeHtml(lead.serviceLabel)}</p>
    <p><strong>Nombre:</strong> ${escapeHtml(lead.fullName)}</p>
    <p><strong>Edad:</strong> ${escapeHtml(lead.age)}</p>
    <p><strong>Código postal:</strong> ${escapeHtml(lead.zip)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(lead.phone)}</p>
    <p><strong>Idioma:</strong> ${escapeHtml(lead.lang)}</p>
    ${lead.notes ? `<p><strong>Notas:</strong><br/>${toSafeHtmlMultiline(lead.notes)}</p>` : ""}
  `;

  const text = [
    "Nuevo lead — Cotizador TIC Insurance",
    `Servicio: ${lead.serviceLabel}`,
    `Nombre: ${lead.fullName}`,
    `Edad: ${lead.age}`,
    `Código postal: ${lead.zip}`,
    `Email: ${lead.email}`,
    `Teléfono: ${lead.phone}`,
    `Idioma: ${lead.lang}`,
    lead.notes ? `Notas:\n${lead.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: lead.email,
      subject: `Cotizador TIC — ${lead.serviceLabel} — ${lead.fullName}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    return { ok: false as const, error: (await response.text()) || "Error al enviar email." };
  }
  return { ok: true as const };
}

export async function POST(request: NextRequest) {
  let body: CotizarPayload;
  try {
    body = (await request.json()) as CotizarPayload;
  } catch {
    return err(400, "Payload inválido.");
  }

  const validated = validate(body);
  if (!validated.ok) {
    return err(400, validated.error, validated.field);
  }

  if (validated.value.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = parseClientIp(request);
  const rateLimit = await checkDistributedRateLimit({
    namespace: "cotizar",
    key: ip,
    windowSeconds: RATE_LIMIT_WINDOW_SEC,
    maxRequests: RATE_LIMIT_MAX_REQUESTS,
  });

  if (!rateLimit.allowed && rateLimit.backend === "unconfigured") {
    return err(503, rateLimit.error || "Protección temporalmente no disponible.");
  }
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas solicitudes. Intenta en unos minutos." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds ?? 60) },
      }
    );
  }

  const result = await sendLeadEmail(validated.value);
  if (!result.ok) {
    return err(500, result.error);
  }
  return NextResponse.json({ ok: true });
}
