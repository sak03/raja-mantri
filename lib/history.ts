import type { MatchHistoryEntry } from "./types";

export const HISTORY_KEY = "rmcs:history";
export const MAX_HISTORY = 10;

function getStorage(): Storage | null {
  if (typeof localStorage === "undefined") return null;
  return localStorage;
}

function isEntry(value: unknown): value is MatchHistoryEntry {
  if (typeof value !== "object" || value === null) return false;
  const v = value as MatchHistoryEntry;
  return (
    typeof v.finishedAt === "string" &&
    typeof v.targetScore === "number" &&
    Array.isArray(v.winners) &&
    Array.isArray(v.standings) &&
    typeof v.rounds === "number"
  );
}

export function loadHistory(): MatchHistoryEntry[] {
  const storage = getStorage();
  if (!storage) return [];
  const raw = storage.getItem(HISTORY_KEY);
  if (raw === null) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isEntry).slice(0, MAX_HISTORY);
  } catch {
    return [];
  }
}

export function appendHistory(entry: MatchHistoryEntry): MatchHistoryEntry[] {
  const next = [entry, ...loadHistory()].slice(0, MAX_HISTORY);
  const storage = getStorage();
  if (storage) {
    storage.setItem(HISTORY_KEY, JSON.stringify(next));
  }
  return next;
}

export function clearHistory(): void {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(HISTORY_KEY);
}
