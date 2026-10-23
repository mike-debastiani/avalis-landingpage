// Die drei Rollen aus Hero und "Was avalis ist und löst" (Figma: Studierende,
// Fachstellen, Entscheidungsinstanzen), nicht zu verwechseln mit den acht
// Rollen-Werten des Registrierungsformulars in src/lib/roles.ts.
export const impactRoleKeys = ["students", "advisory", "decision"] as const;
export type ImpactRoleKey = (typeof impactRoleKeys)[number];

export const impactRoles: Record<
  ImpactRoleKey,
  { avatarSrc: string; halo: string; pillBg: string; pillFg: string }
> = {
  students: {
    avatarSrc: "/avatars/students.svg",
    halo: "bg-bewilligt-50",
    pillBg: "bg-bewilligt-100",
    pillFg: "text-bewilligt-800",
  },
  advisory: {
    avatarSrc: "/avatars/advisory.svg",
    halo: "bg-beratung-50",
    pillBg: "bg-beratung-100",
    // Figma nennt hier "badge/review/foreground" = beratung-500, das erreicht
    // auf beratung-100 aber nur ~3.6:1 Kontrast (unter WCAG AA 4.5:1 für
    // kleinen Text). Bewusste Abweichung: beratung-800 statt beratung-500,
    // siehe docs/05_design-system.md Abschnitt 5 (Kontraste prüfen, Pflicht).
    pillFg: "text-beratung-800",
  },
  decision: {
    avatarSrc: "/avatars/decision.svg",
    halo: "bg-in-decision-50",
    pillBg: "bg-in-decision-100",
    pillFg: "text-in-decision-800",
  },
};
