"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { applyThemeToDocument, type Theme } from "@/lib/theme";
import { DEFAULT_THEME, loadTheme, saveTheme } from "@/lib/themeStorage";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  hydrated: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [hydrated, setHydrated] = useState(false);

  useLayoutEffect(() => {
    const saved = loadTheme();
    setThemeState(saved);
    applyThemeToDocument(saved);
    setHydrated(true);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    saveTheme(next);
    applyThemeToDocument(next);
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, hydrated }),
    [theme, setTheme, hydrated],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
