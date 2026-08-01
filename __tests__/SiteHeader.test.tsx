import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/SiteHeader";
import { renderWithLocale } from "./testUtils";

describe("SiteHeader", () => {
  it("shows brand link and language/theme controls", () => {
    renderWithLocale(<SiteHeader />);

    expect(screen.getByRole("link", { name: /raja/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("button", { name: /^EN$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Light$/i })).toBeInTheDocument();
  });
});
