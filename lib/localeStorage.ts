import { isLocale, type Locale } from "./i18n";

export const LOCALE_KEY = "rmcs:locale";
export const DEFAULT_LOCALE: Locale = "en";

function getStorage(): Storage | null {
  if (typeof localStorage === "undefined") return null;
  return localStorage;
}

export function loadLocale(): Locale {
  const storage = getStorage();
  if (!storage) return DEFAULT_LOCALE;
  const raw = storage.getItem(LOCALE_KEY);
  if (raw === null) return DEFAULT_LOCALE;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (isLocale(parsed)) return parsed;
    // also accept plain string stored without JSON
    if (isLocale(raw)) return raw;
    return DEFAULT_LOCALE;
  } catch {
    if (isLocale(raw)) return raw;
    return DEFAULT_LOCALE;
  }
}

export function saveLocale(locale: Locale): void {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(LOCALE_KEY, JSON.stringify(locale));
}
