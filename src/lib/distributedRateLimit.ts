type LocalRateLimitEntry = {
  count: number;
  expiresAt: number;
};

type RateLimitOptions = {
  namespace: string;
  key: string;
  windowSeconds: number;
  maxRequests: number;
};

type AllowedRateLimitResult = {
  allowed: true;
  backend: "upstash" | "memory";
};

type BlockedRateLimitResult = {
  allowed: false;
  backend: "upstash" | "memory" | "unconfigured";
  retryAfterSeconds?: number;
  error?: string;
};

export type RateLimitResult = AllowedRateLimitResult | BlockedRateLimitResult;

const UPSTASH_REDIS_URL = process.env.UPSTASH_REDIS_REST_URL?.trim() || "";
const UPSTASH_REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN?.trim() || "";
const ALLOW_MEMORY_FALLBACK = process.env.ALLOW_MEMORY_RATE_LIMIT_FALLBACK === "true";
const localRateLimitStore = new Map<string, LocalRateLimitEntry>();

function isUpstashConfigured() {
  return Boolean(UPSTASH_REDIS_URL && UPSTASH_REDIS_TOKEN);
}

function canUseMemoryFallback() {
  return process.env.NODE_ENV !== "production" || ALLOW_MEMORY_FALLBACK;
}

function buildStorageKey(namespace: string, key: string) {
  return `tc:${namespace}:${key || "unknown"}`;
}

function clearExpiredLocalEntries(now: number) {
  for (const [key, entry] of localRateLimitStore.entries()) {
    if (entry.expiresAt <= now) localRateLimitStore.delete(key);
  }
}

function checkLocalRateLimit({
  namespace,
  key,
  windowSeconds,
  maxRequests,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  clearExpiredLocalEntries(now);

  const storageKey = buildStorageKey(namespace, key);
  const existing = localRateLimitStore.get(storageKey);
  const expiresAt = now + windowSeconds * 1000;

  if (!existing) {
    localRateLimitStore.set(storageKey, { count: 1, expiresAt });
    return { allowed: true, backend: "memory" };
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      backend: "memory",
      retryAfterSeconds: Math.max(1, Math.ceil((existing.expiresAt - now) / 1000)),
    };
  }

  existing.count += 1;
  localRateLimitStore.set(storageKey, existing);
  return { allowed: true, backend: "memory" };
}

async function runUpstashCommand(command: Array<string | number>) {
  const response = await fetch(UPSTASH_REDIS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Upstash request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as { result?: unknown; error?: string };
  if (payload.error) {
    throw new Error(payload.error);
  }

  return payload.result;
}

async function checkUpstashRateLimit({
  namespace,
  key,
  windowSeconds,
  maxRequests,
}: RateLimitOptions): Promise<RateLimitResult> {
  const storageKey = buildStorageKey(namespace, key);
  const nextCount = Number(await runUpstashCommand(["INCR", storageKey]));

  let ttl = Number(await runUpstashCommand(["TTL", storageKey]));
  if (!Number.isFinite(ttl) || ttl < 0) {
    await runUpstashCommand(["EXPIRE", storageKey, windowSeconds]);
    ttl = windowSeconds;
  }

  if (nextCount > maxRequests) {
    return {
      allowed: false,
      backend: "upstash",
      retryAfterSeconds: Math.max(1, ttl),
    };
  }

  return { allowed: true, backend: "upstash" };
}

export async function checkDistributedRateLimit(
  options: RateLimitOptions
): Promise<RateLimitResult> {
  if (isUpstashConfigured()) {
    try {
      return await checkUpstashRateLimit(options);
    } catch (error) {
      if (canUseMemoryFallback()) {
        console.warn("[rate_limit_fallback]", {
          namespace: options.namespace,
          message: error instanceof Error ? error.message : "Unknown rate limit error.",
        });
        return checkLocalRateLimit(options);
      }

      return {
        allowed: false,
        backend: "unconfigured",
        error: "Protección temporalmente no disponible. Intenta de nuevo en unos minutos.",
      };
    }
  }

  if (canUseMemoryFallback()) {
    return checkLocalRateLimit(options);
  }

  return {
    allowed: false,
    backend: "unconfigured",
    error:
      "Rate limiting no configurado. Define UPSTASH_REDIS_REST_URL y UPSTASH_REDIS_REST_TOKEN.",
  };
}
