// Die drei Rollen aus Hero und "Was avalis ist und löst" (Figma: Studierende,
// Fachstellen, Entscheidungsinstanzen), nicht zu verwechseln mit den acht
// Rollen-Werten des Registrierungsformulars in src/lib/roles.ts.
export const impactRoleKeys = ["students", "advisory", "decision"] as const;
export type ImpactRoleKey = (typeof impactRoleKeys)[number];

// Farben nach Figma V5 (Landingpage-Frame 10099:3422):
// - halo: Kreis hinter dem Avatar (Studierende: "button/success/background" =
//   bewilligt-200, Fachstellen/Entscheidungsinstanzen: die -50-Stufen)
// - labelFg: Beschriftung unter dem Avatar
// - pillBg/pillFg: Pill "Für …" in der Solution-Section
//
// Bewusste Abweichungen von Figma, damit kleiner Text WCAG AA (4.5:1) erreicht:
// - Studierenden-Label im Hero: Figma "green/500" (~2:1 auf Hellgrau), wir
//   nutzen wie in der Solution-Section bewilligt-800.
// - Fachstellen-Pill: Figma "badge/review/foreground" = beratung-500 (~3.6:1
//   auf beratung-100), wir nutzen beratung-600 (~4.8:1), visuell nahezu gleich.
// Siehe docs/05_design-system.md Abschnitt 5.
export const impactRoles: Record<
  ImpactRoleKey,
  { avatarSrc: string; halo: string; labelFg: string; pillBg: string; pillFg: string }
> = {
  students: {
    avatarSrc: "/avatars/students.svg",
    halo: "bg-bewilligt-200",
    labelFg: "text-bewilligt-800",
    pillBg: "bg-bewilligt-100",
    pillFg: "text-bewilligt-800",
  },
  advisory: {
    avatarSrc: "/avatars/advisory.svg",
    halo: "bg-beratung-50",
    labelFg: "text-beratung-600",
    pillBg: "bg-beratung-100",
    pillFg: "text-beratung-600",
  },
  decision: {
    avatarSrc: "/avatars/decision.svg",
    halo: "bg-in-decision-50",
    labelFg: "text-in-decision-700",
    pillBg: "bg-in-decision-100",
    pillFg: "text-in-decision-800",
  },
};
