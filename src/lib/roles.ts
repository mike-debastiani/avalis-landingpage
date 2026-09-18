// Werte gemäss docs/04_registration-flow.md, stabil für das Brevo-Attribut
// ROLLE. Nur die Labels werden übersetzt, siehe messages/*.json Registration.roles.
export const roleValues = [
  "fachstelle",
  "gleichstellung",
  "studiengangsleitung",
  "dozierende",
  "pruefungsadministration",
  "hochschulleitung",
  "studierende",
  "andere",
] as const;

export type RoleValue = (typeof roleValues)[number];
