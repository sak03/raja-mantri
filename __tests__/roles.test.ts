import { describe, expect, it } from "vitest";
import { ROLE_POINTS, ROLES } from "@/lib/roles";

describe("roles", () => {
  it("defines the four classic roles", () => {
    expect(ROLES).toEqual(["Raja", "Mantri", "Sipahi", "Chor"]);
  });

  it("assigns the correct fixed point values", () => {
    expect(ROLE_POINTS.Raja).toBe(1000);
    expect(ROLE_POINTS.Mantri).toBe(800);
    expect(ROLE_POINTS.Sipahi).toBe(500);
    expect(ROLE_POINTS.Chor).toBe(0);
  });
});
