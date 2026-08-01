import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  DEFAULT_THEME,
  THEME_KEY,
  loadTheme,
  saveTheme,
} from "@/lib/themeStorage";

describe("themeStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    document.documentElement.dataset.theme = "light";
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("defaults to light when empty", () => {
    expect(loadTheme()).toBe(DEFAULT_THEME);
    expect(DEFAULT_THEME).toBe("light");
  });

  it("round-trips dark theme", () => {
    saveTheme("dark");
    expect(loadTheme()).toBe("dark");
  });

  it("recovers to light from corrupt data", () => {
    localStorage.setItem(THEME_KEY, "{bad");
    expect(loadTheme()).toBe("light");
  });
});
