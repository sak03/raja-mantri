export type Role = "Raja" | "Mantri" | "Sipahi" | "Chor";

export const ROLES: readonly Role[] = ["Raja", "Mantri", "Sipahi", "Chor"] as const;

export const ROLE_POINTS: Record<Role, number> = {
  Raja: 1000,
  Mantri: 800,
  Sipahi: 500,
  Chor: 0,
};
