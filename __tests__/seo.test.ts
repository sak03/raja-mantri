import { describe, expect, it } from "vitest";
import { SEO, SITE_NAME, absoluteUrl } from "@/lib/seo";

describe("seo config", () => {
  it("includes primary English and Hindi keywords", () => {
    expect(SEO.keywords).toContain("raja mantri chor sipahi");
    expect(SEO.keywords).toContain("राजा मंत्री चोर सिपाही");
    expect(SEO.keywords).toContain("raja mantri chor sipahi online");
  });

  it("has a keyword-rich title and description", () => {
    expect(SEO.title.toLowerCase()).toContain("raja mantri chor sipahi");
    expect(SEO.description.toLowerCase()).toContain("free");
    expect(SEO.description).toContain("राजा मंत्री चोर सिपाही");
    expect(SITE_NAME).toBe("Raja, Mantri & Sipahi");
  });

  it("builds absolute urls from the site origin", () => {
    expect(absoluteUrl("/")).toMatch(/^https?:\/\//);
    expect(absoluteUrl("/")).toMatch(/\/$/);
  });
});
