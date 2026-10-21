import "server-only";

// Direkter REST-Aufruf, kein Brevo-SDK (siehe docs/03_tech-architecture.md
// Abschnitt 1). `import "server-only"` sorgt dafür, dass ein versehentlicher
// Import aus Client-Code den Build fehlschlagen lässt, statt BREVO_API_KEY
// ins Bundle zu ziehen.

export class BrevoError extends Error {}

type DoubleOptinPayload = {
  email: string;
  firstName: string;
  lastName: string;
  institution: string;
  otherInstitution: string;
  role: string;
  source: string;
  language: "de" | "en";
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new BrevoError(`Umgebungsvariable ${name} fehlt – Brevo-Anbindung nicht konfiguriert.`);
  }
  return value;
}

// Double-Opt-in-Kontakt in Brevo anlegen. Löst bei fehlender Konfiguration
// oder einem API-Fehler eine BrevoError, die vom Aufrufer als generischer
// "Anmeldung hat nicht geklappt"-Zustand behandelt wird (nie eine
// Falscherfolgsmeldung, siehe docs/04_registration-flow.md Abschnitt 4).
export async function subscribeDoubleOptin(payload: DoubleOptinPayload): Promise<void> {
  const apiKey = requireEnv("BREVO_API_KEY");
  const listId = requireEnv("BREVO_LIST_ID");
  const templateIdDe = requireEnv("BREVO_DOI_TEMPLATE_ID_DE");
  const templateIdEn = requireEnv("BREVO_DOI_TEMPLATE_ID_EN");
  const siteUrl = requireEnv("NEXT_PUBLIC_SITE_URL");

  const templateId = payload.language === "en" ? templateIdEn : templateIdDe;
  const institution = payload.institution === "andere" ? payload.otherInstitution : payload.institution;

  const response = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: payload.email,
      attributes: {
        FIRSTNAME: payload.firstName,
        LASTNAME: payload.lastName,
        HOCHSCHULE: institution,
        ROLLE: payload.role,
        SOURCE: payload.source,
        SPRACHE: payload.language,
      },
      includeListIds: [Number(listId)],
      templateId: Number(templateId),
      redirectionUrl: `${siteUrl}/${payload.language}/bestaetigt`,
    }),
  });

  if (!response.ok) {
    // Nur Status und Brevos maschinenlesbaren Fehlercode loggen, nie den
    // vollen Response-Body – der könnte die eingegebene E-Mail enthalten
    // (siehe docs/03_tech-architecture.md Abschnitt 4, keine
    // personenbezogenen Daten in Logs).
    const brevoCode = await response
      .json()
      .then((body: unknown) =>
        typeof body === "object" && body !== null && "code" in body ? String(body.code) : "unknown"
      )
      .catch(() => "unparsable");
    throw new BrevoError(`Brevo doubleOptinConfirmation fehlgeschlagen: status=${response.status} code=${brevoCode}`);
  }
}
