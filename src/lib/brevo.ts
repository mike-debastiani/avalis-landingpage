import "server-only";
import { buildUnsubscribeUrl } from "@/lib/unsubscribe-token";

// Direkter REST-Aufruf, kein Brevo-SDK (siehe docs/03_tech-architecture.md
// Abschnitt 1). `import "server-only"` sorgt dafür, dass ein versehentlicher
// Import aus Client-Code den Build fehlschlagen lässt, statt BREVO_API_KEY
// ins Bundle zu ziehen.

export class BrevoError extends Error {}

// Basis-URL ist überschreibbar, damit die Anbindung lokal gegen einen Mock-
// Server getestet werden kann. In Produktion bleibt der Standardwert.
const API_BASE = process.env.BREVO_API_BASE_URL ?? "https://api.brevo.com/v3";

type ContactPayload = {
  email: string;
  firstName: string;
  lastName: string;
  institution: string;
  role: string;
  otherRole: string;
  source: string;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new BrevoError(`Umgebungsvariable ${name} fehlt – Brevo-Anbindung nicht konfiguriert.`);
  }
  return value;
}

// Gemeinsamer POST-Aufruf. Loggt bei Fehlern nur Status und Brevos
// maschinenlesbaren Fehlercode, nie den vollen Response-Body – der könnte die
// eingegebene E-Mail enthalten (siehe docs/03_tech-architecture.md
// Abschnitt 4, keine personenbezogenen Daten in Logs).
async function brevoPost(path: string, label: string, body: unknown): Promise<void> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "api-key": requireEnv("BREVO_API_KEY"),
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const brevoCode = await response
      .json()
      .then((json: unknown) =>
        typeof json === "object" && json !== null && "code" in json ? String(json.code) : "unknown"
      )
      .catch(() => "unparsable");
    throw new BrevoError(`Brevo ${label} fehlgeschlagen: status=${response.status} code=${brevoCode}`);
  }
}

// Legt den Kontakt in der Verteilerliste an (oder aktualisiert ihn). Die
// Einwilligung (Checkbox) gilt als Zustimmung, kein Double-Opt-in. Löst bei
// fehlender Konfiguration oder einem API-Fehler eine BrevoError, die vom
// Aufrufer als generischer "Anmeldung hat nicht geklappt"-Zustand behandelt
// wird (nie eine Falscherfolgsmeldung, siehe docs/04_registration-flow.md
// Abschnitt 4).
export async function upsertContact(payload: ContactPayload): Promise<void> {
  const listId = requireEnv("BREVO_LIST_ID");
  const role = payload.role === "andere" ? payload.otherRole : payload.role;

  await brevoPost("/contacts", "contacts-Aufruf", {
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
    listIds: [Number(listId)],
    // Erneute Registrierung mit derselben Adresse aktualisiert den
    // bestehenden Kontakt statt eines 400er-Fehlers ("duplicate_parameter").
    updateEnabled: true,
  });
}

// Verschickt die Report-Mail als Transaktionsmail aus einem Brevo-Template
// (Absender, Betreff und Layout liegen im Template). Der Download-Link kommt
// ausschliesslich hierüber zu den Nutzer:innen und wird nie an den Client
// ausgeliefert. Parameter im Template: {{ params.VORNAME }},
// {{ params.REPORT_URL }}, {{ params.UNSUBSCRIBE_URL }}.
export async function sendReportMail(payload: {
  email: string;
  firstName: string;
  locale: string;
}): Promise<void> {
  const templateId = Number(requireEnv("BREVO_REPORT_TEMPLATE_ID"));
  const reportUrl = requireEnv("REPORT_DOWNLOAD_URL");
  const siteUrl = requireEnv("NEXT_PUBLIC_SITE_URL");

  await brevoPost("/smtp/email", "smtp/email-Aufruf", {
    to: [{ email: payload.email }],
    templateId,
    params: {
      VORNAME: payload.firstName,
      REPORT_URL: reportUrl,
      UNSUBSCRIBE_URL: buildUnsubscribeUrl(siteUrl, payload.locale, payload.email),
    },
    tags: ["research-report"],
  });
}

// Entfernt die Adresse aus der Verteilerliste (Abmeldung aus dem Verteiler).
// Der Kontakt selbst bleibt in Brevo erhalten, bekommt aber keine Updates mehr.
export async function removeContactFromList(email: string): Promise<void> {
  const listId = requireEnv("BREVO_LIST_ID");
  await brevoPost(`/contacts/lists/${Number(listId)}/contacts/remove`, "Listen-Abmeldung", {
    emails: [email],
  });
}
