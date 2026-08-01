import { describe, expect, it } from "vitest";
import { t } from "@/lib/i18n";

describe("i18n", () => {
  it("returns English brand by default key path", () => {
    expect(t("en", "brand")).toBe("Raja, Mantri & Sipahi");
  });

  it("returns Hindi brand", () => {
    expect(t("hi", "brand")).toBe("राजा, मंत्री और सिपाही");
  });

  it("interpolates variables", () => {
    expect(t("en", "handoffTitle", { name: "Ada" })).toBe(
      "Pass the phone to Ada",
    );
    expect(t("hi", "handoffTitle", { name: "Ada" })).toContain("Ada");
  });

  it("keeps English start CTA distinct from Hindi", () => {
    expect(t("en", "startGame")).toBe("Start game");
    expect(t("hi", "startGame")).toBe("खेल शुरू");
  });
});
