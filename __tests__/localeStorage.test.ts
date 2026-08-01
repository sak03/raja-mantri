import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  LOCALE_KEY,
  loadLocale,
  saveLocale,
} from "@/lib/localeStorage";

describe("localeStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("defaults to English when empty", () => {
    expect(loadLocale()).toBe(DEFAULT_LOCALE);
  });

  it("round-trips a locale", () => {
    saveLocale("hi");
    expect(loadLocale()).toBe("hi");
  });

  it("recovers to English from corrupt data", () => {
    localStorage.setItem(LOCALE_KEY, "{bad");
    expect(loadLocale()).toBe("en");
  });
});
