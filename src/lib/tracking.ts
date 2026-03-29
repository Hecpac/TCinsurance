type EventValue = string | number | boolean | null | undefined;
type EventParams = Record<string, EventValue>;

interface TrackEventOptions {
  dedupeKey?: string;
  dedupeWindowMs?: number;
  sendToDataLayer?: boolean;
  sendToGa4?: boolean;
  sendToMeta?: boolean;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    __tcGtagEventsEnabled?: boolean;
  }
}

const DEFAULT_DEDUPE_WINDOW_MS = 900;
const DEDUPE_TTL_MS = 30_000;
const MAX_RECENT_EVENTS = 500;
const recentEvents = new Map<string, number>();

function sanitizeEventName(eventName: string) {
  return eventName.trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_");
}

function sanitizeParamKey(key: string) {
  return key.trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_");
}

function sanitizeParams(params: EventParams) {
  const clean: Record<string, string | number | boolean | null> = {};

  for (const [rawKey, value] of Object.entries(params)) {
    if (value === undefined) continue;
    const key = sanitizeParamKey(rawKey);
    if (!key) continue;
    clean[key] = value;
  }

  return clean;
}

function cleanupRecentEvents(now: number) {
  for (const [key, timestamp] of recentEvents.entries()) {
    if (now - timestamp > DEDUPE_TTL_MS) recentEvents.delete(key);
  }

  if (recentEvents.size <= MAX_RECENT_EVENTS) return;

  const sortedEntries = [...recentEvents.entries()].sort((a, b) => a[1] - b[1]);
  const toDelete = sortedEntries.slice(0, recentEvents.size - MAX_RECENT_EVENTS);
  for (const [key] of toDelete) recentEvents.delete(key);
}

function shouldSendEvent(signature: string, dedupeWindowMs: number) {
  const now = Date.now();
  cleanupRecentEvents(now);

  const lastFiredAt = recentEvents.get(signature);
  if (lastFiredAt && now - lastFiredAt < dedupeWindowMs) {
    return false;
  }

  recentEvents.set(signature, now);
  return true;
}

function pushDataLayer(payload: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

function pushGa4(eventName: string, params: Record<string, unknown>) {
  if (window.__tcGtagEventsEnabled !== true) return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params);
}

function pushMeta(eventName: string, params: Record<string, unknown>) {
  if (typeof window.fbq !== "function") return;
  window.fbq("trackCustom", eventName, params);
}

export function trackEvent(
  eventName: string,
  params: EventParams = {},
  options: TrackEventOptions = {}
) {
  if (typeof window === "undefined") return;

  const safeEventName = sanitizeEventName(eventName);
  if (!safeEventName) return;

  const cleanParams = sanitizeParams(params);
  const dedupeWindowMs = options.dedupeWindowMs ?? DEFAULT_DEDUPE_WINDOW_MS;
  const dedupeKey = options.dedupeKey ?? "default";
  const signature = `${safeEventName}:${dedupeKey}`;

  if (!shouldSendEvent(signature, dedupeWindowMs)) return;

  const payload = {
    event: safeEventName,
    ...cleanParams,
  };

  if (options.sendToDataLayer ?? true) pushDataLayer(payload);
  if (options.sendToGa4 ?? true) pushGa4(safeEventName, cleanParams);
  if (options.sendToMeta ?? true) pushMeta(safeEventName, cleanParams);
}
