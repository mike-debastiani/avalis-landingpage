// Platzhalter-Institutionstypen, keine echten Hochschulnamen: die reale
// Institutionsliste folgt separat (siehe docs/04_registration-flow.md,
// "Nicht von Claude generieren lassen") und ersetzt dieses Array 1:1.
export const institutionValues = ["uni", "fh", "ph", "andere"] as const;

export type InstitutionValue = (typeof institutionValues)[number];
