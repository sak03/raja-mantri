import { isTheme, type Theme } from "./theme";

export const THEME_KEY = "rmcs:theme";
export const DEFAULT_THEME: Theme = "light";

function getStorage(): Storage | null {
  if (typeof localStorage === "undefined") return null;
  return localStorage;
}

export function loadTheme(): Theme {
  const storage = getStorage();
  if (!storage) return DEFAULT_THEME;
  const raw = storage.getItem(THEME_KEY);
  if (raw === null) return DEFAULT_THEME;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (isTheme(parsed)) return parsed;
    if (isTheme(raw)) return raw;
    return DEFAULT_THEME;
  } catch {
    if (isTheme(raw)) return raw;
    return DEFAULT_THEME;
  }
}

export function saveTheme(theme: Theme): void {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(THEME_KEY, JSON.stringify(theme));
}
