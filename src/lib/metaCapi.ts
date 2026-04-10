import { createHash } from "node:crypto";
import {
  normalizeEmailForHash,
  normalizePhoneForHash,
} from "./userProvidedData";

const META_API_VERSION = "v21.0";

interface MetaCapiUserData {
  em?: string[];
  ph?: string[];
  fn?: string[];
  ln?: string[];
  ct?: string[];
  st?: string[];
  zp?: string[];
  country?: string[];
  fbp?: string;
  fbc?: string;
  client_ip_address?: string;
  client_user_agent?: string;
}

interface MetaCapiEvent {
  event_name: string;
  event_time: number;
  event_id: string;
  event_source_url?: string;
  action_source: "website";
  user_data: MetaCapiUserData;
  custom_data?: Record<string, string | number | boolean | undefined>;
}

interface SendMetaCapiResult {
  ok: boolean;
  error?: string;
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function hashIfPresent(value: string | null | undefined): string[] | undefined {
  if (!value) return undefined;
  return [sha256(value.trim().toLowerCase())];
}

function isConfigured(): boolean {
  return !!(
    process.env.META_CAPI_ACCESS_TOKEN &&
    process.env.NEXT_PUBLIC_META_PIXEL_ID &&
    process.env.NEXT_PUBLIC_META_PIXEL_ID !== "000000000000000"
  );
}

interface SendEventParams {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  fbclid?: string | null;
  clientIp?: string | null;
  clientUserAgent?: string | null;
  customData?: Record<string, string | number | boolean | undefined>;
}

async function sendEvent(params: SendEventParams): Promise<SendMetaCapiResult> {
  if (!isConfigured()) {
    return { ok: false, error: "Meta CAPI not configured" };
  }

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID!;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN!;

  const normalizedEmail = normalizeEmailForHash(params.email);
  const normalizedPhone = normalizePhoneForHash(params.phone);

  const userData: MetaCapiUserData = {
    em: normalizedEmail ? [sha256(normalizedEmail)] : undefined,
    ph: normalizedPhone ? [sha256(normalizedPhone)] : undefined,
    fn: hashIfPresent(params.firstName),
    ct: [sha256("lewisville")],
    st: [sha256("tx")],
    zp: [sha256("75057")],
    country: [sha256("us")],
    client_ip_address: params.clientIp || undefined,
    client_user_agent: params.clientUserAgent || undefined,
  };

  if (params.fbclid) {
    userData.fbc = `fb.1.${Date.now()}.${params.fbclid}`;
  }

  const event: MetaCapiEvent = {
    event_name: params.eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: params.eventId,
    event_source_url: params.eventSourceUrl || undefined,
    action_source: "website",
    user_data: userData,
    custom_data: params.customData,
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [event],
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.warn("[meta_capi_error]", { status: response.status, error: errorText });
      return { ok: false, error: `Meta CAPI ${response.status}: ${errorText}` };
    }

    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.warn("[meta_capi_fetch_error]", message);
    return { ok: false, error: message };
  }
}

export const metaCapi = {
  isConfigured,
  sendEvent,
};
