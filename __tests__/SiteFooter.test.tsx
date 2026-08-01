import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/SiteFooter";
import { renderWithLocale } from "./testUtils";

describe("SiteFooter", () => {
  it("shows three link sections and maintainer credit", () => {
    renderWithLocale(<SiteFooter />);

    expect(screen.getByRole("link", { name: /how to play/i })).toHaveAttribute(
      "href",
      "/how-to-play",
    );
    expect(
      screen.getByRole("link", { name: /privacy policy/i }),
    ).toHaveAttribute("href", "/privacy");
    expect(
      screen.getByRole("link", { name: /terms & conditions/i }),
    ).toHaveAttribute("href", "/terms");

    const maintainer = screen.getByRole("link", { name: /sartaj alam/i });
    expect(maintainer).toHaveAttribute("href", "https://sartajalam.in");
  });
});
