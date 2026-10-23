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
  role: string;
  otherRole: string;
  source: string;
  // Nur für die redirectionUrl der (weiterhin zweisprachigen)
  // Bestätigungsseite – kein Brevo-Attribut. Mail und Report sind
  // unabhängig davon immer deutsch, siehe docs/04_registration-flow.md.
  locale: "de" | "en";
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
  const templateId = requireEnv("BREVO_DOI_TEMPLATE_ID");
  const siteUrl = requireEnv("NEXT_PUBLIC_SITE_URL");

  const role = payload.role === "andere" ? payload.otherRole : payload.role;

  const response = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: payload.email,
      attributes: {
        // VORNAME/NACHNAME statt FIRSTNAME/LASTNAME: in diesem (deutsch-
        // sprachigen) Brevo-Account heissen die Standard-Namensattribute so,
        // im Brevo-Dashboard unter Settings → Contact attributes verifiziert.
        VORNAME: payload.firstName,
        NACHNAME: payload.lastName,
        HOCHSCHULE: payload.institution,
        ROLLE: role,
        SOURCE: payload.source,
      },
      includeListIds: [Number(listId)],
      templateId: Number(templateId),
      redirectionUrl: `${siteUrl}/${payload.locale}/bestaetigt`,
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
