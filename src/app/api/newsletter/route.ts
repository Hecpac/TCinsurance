import { NextRequest, NextResponse } from "next/server";
import { escapeHtml } from "@/lib/escapeHtml";
import { checkDistributedRateLimit } from "@/lib/distributedRateLimit";

interface NewsletterPayload {
  email: string;
  website?: string;
}

type NewsletterField = "email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 6;
function parseClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function responseError(status: number, error: string, field?: NewsletterField) {
  return NextResponse.json({ ok: false, error, field }, { status });
}

function validatePayload(payload: NewsletterPayload) {
  const email = payload.email?.trim().toLowerCase() ?? "";
  if (!EMAIL_REGEX.test(email) || email.length > 320) {
    return {
      ok: false as const,
      error: "Email inválido.",
      field: "email" as const,
    };
  }

  return {
    ok: true as const,
    value: {
      email,
      website: payload.website?.trim() ?? "",
    },
  };
}

async function sendNewsletterEmail(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.NEWSLETTER_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.NEWSLETTER_FROM_EMAIL ?? process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return {
      ok: false as const,
      error:
        "Configuración incompleta. Define RESEND_API_KEY y un destino/origen para newsletter.",
    };
  }

  const submittedAt = new Date().toISOString();

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: "Nueva suscripción newsletter - TC Insurance",
      text: [
        "Nueva suscripción al newsletter",
        `Email: ${email}`,
        `Fecha: ${submittedAt}`,
      ].join("\n"),
      html: `
        <h2>Nueva suscripción al newsletter</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Fecha:</strong> ${escapeHtml(submittedAt)}</p>
      `,
    }),
  });

  if (!response.ok) {
    const resendError = (await response.text()) || "Error al enviar notificación.";
    return { ok: false as const, error: resendError };
  }

  return { ok: true as const };
}

export async function POST(request: NextRequest) {
  let body: NewsletterPayload;

  try {
    body = (await request.json()) as NewsletterPayload;
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
    namespace: "newsletter",
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

  const result = await sendNewsletterEmail(validated.value.email);
  if (!result.ok) {
    return responseError(500, result.error);
  }

  return NextResponse.json({ ok: true });
}
