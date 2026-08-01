import type { Role } from "@/lib/roles";

const CLASS: Record<Role, string> = {
  Raja: "role-chip role-chip-raja",
  Mantri: "role-chip role-chip-mantri",
  Sipahi: "role-chip role-chip-sipahi",
  Chor: "role-chip role-chip-chor",
};

export function RoleChip({ role }: { role: Role }) {
  return <span className={CLASS[role]}>{role}</span>;
}
