import { describe, expect, it } from "vitest";
import { dealRoles } from "@/lib/deal";
import { ROLES, type Role } from "@/lib/roles";

/** Deterministic LCG for seeded tests */
function createSeededRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

describe("dealRoles", () => {
  it("deals exactly four roles", () => {
    const dealt = dealRoles(createSeededRng(1));
    expect(dealt).toHaveLength(4);
  });

  it("deals exactly one of each role", () => {
    const dealt = dealRoles(createSeededRng(42));
    expect([...dealt].sort()).toEqual([...ROLES].sort());
  });

  it("produces no duplicates across many seeded runs", () => {
    for (let seed = 0; seed < 200; seed++) {
      const dealt = dealRoles(createSeededRng(seed));
      const unique = new Set(dealt);
      expect(unique.size).toBe(4);
      for (const role of ROLES) {
        expect(dealt).toContain(role);
      }
    }
  });

  it("is deterministic for the same seed", () => {
    const a = dealRoles(createSeededRng(99));
    const b = dealRoles(createSeededRng(99));
    expect(a).toEqual(b);
  });

  it("can produce different orders for different seeds", () => {
    const orders = new Set<string>();
    for (let seed = 0; seed < 50; seed++) {
      orders.add(dealRoles(createSeededRng(seed)).join(","));
    }
    expect(orders.size).toBeGreaterThan(1);
  });

  it("defaults to Math.random when no rng is provided", () => {
    const dealt = dealRoles();
    expect(dealt).toHaveLength(4);
    const counts: Record<Role, number> = {
      Raja: 0,
      Mantri: 0,
      Sipahi: 0,
      Chor: 0,
    };
    for (const role of dealt) {
      counts[role]++;
    }
    expect(counts).toEqual({ Raja: 1, Mantri: 1, Sipahi: 1, Chor: 1 });
  });
});
