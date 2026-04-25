import esMessages from "../../messages/es.json";
import enMessages from "../../messages/en.json";
import { type Locale } from "./locales";

export type Messages = typeof esMessages;

const MESSAGES: Record<Locale, Messages> = {
  es: esMessages,
  en: enMessages,
};

export function getMessages(locale: Locale): Messages {
  return MESSAGES[locale];
}
