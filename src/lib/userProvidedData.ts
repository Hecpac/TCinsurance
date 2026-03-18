import { createHash } from "node:crypto";

interface UserProvidedData {
  sha256_email_address?: string;
  sha256_phone_number?: string;
}

interface ContactIdentifiers {
  email?: string | null;
  phone?: string | null;
}

function sha256Hex(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export function normalizeEmailForHash(value: string | null | undefined) {
  const normalized = value?.trim().toLowerCase().replace(/\s+/g, "") || "";
  if (!normalized.includes("@")) return null;

  const [localPart, domain] = normalized.split("@", 2);
  if (!localPart || !domain) return null;

  if (domain === "gmail.com" || domain === "googlemail.com") {
    return `${localPart.replace(/\./g, "")}@${domain}`;
  }

  return `${localPart}@${domain}`;
}

export function normalizePhoneForHash(value: string | null | undefined) {
  const digits = value?.replace(/[^\d]/g, "") || "";
  if (!digits) return null;

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length >= 11 && digits.length <= 15) {
    return `+${digits}`;
  }

  return null;
}

export function buildUserProvidedData({ email, phone }: ContactIdentifiers): UserProvidedData | undefined {
  const normalizedEmail = normalizeEmailForHash(email);
  const normalizedPhone = normalizePhoneForHash(phone);
  const userData: UserProvidedData = {};

  if (normalizedEmail) {
    userData.sha256_email_address = sha256Hex(normalizedEmail);
  }

  if (normalizedPhone) {
    userData.sha256_phone_number = sha256Hex(normalizedPhone);
  }

  return Object.keys(userData).length ? userData : undefined;
}

export function deriveUserIdFromContact({ email, phone }: ContactIdentifiers) {
  const normalizedEmail = normalizeEmailForHash(email);
  if (normalizedEmail) return `email_${sha256Hex(normalizedEmail)}`;

  const normalizedPhone = normalizePhoneForHash(phone);
  if (normalizedPhone) return `phone_${sha256Hex(normalizedPhone)}`;

  return null;
}
