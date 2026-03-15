export const KEY_EVENTS = {
  qualifyLead: "qualify_lead",
  closeConvertLead: "close_convert_lead",
  purchase: "purchase",
} as const;

export type KeyEventName = (typeof KEY_EVENTS)[keyof typeof KEY_EVENTS];

export const KEY_EVENT_NAMES = new Set<KeyEventName>(Object.values(KEY_EVENTS));
