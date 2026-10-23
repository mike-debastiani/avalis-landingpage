"use server";

import { sendReportMail, upsertContact } from "@/lib/brevo";
import { routing } from "@/i18n/routing";
import {
  HONEYPOT_FIELD_NAME,
  validateRegistration,
  type RegisterState,
} from "@/lib/validation/registration";

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  // Honeypot: für Menschen und Screenreader unsichtbar. Ist das Feld
  // ausgefüllt, täuschen wir eine erfolgreiche Anmeldung vor, ohne etwas zu
  // verarbeiten (siehe docs/04_registration-flow.md Abschnitt 3).
  if (String(formData.get(HONEYPOT_FIELD_NAME) ?? "").length > 0) {
    return { status: "success" };
  }

  const result = validateRegistration(formData);
  if (!result.success) {
    return { status: "error", fieldErrors: result.fieldErrors };
  }

  const locale = String(formData.get("locale") ?? "");
  const mailLocale = (routing.locales as readonly string[]).includes(locale)
    ? locale
    : routing.defaultLocale;

  try {
    await upsertContact(result.data);
    // Der Report-Link wird ausschliesslich per Mail zugestellt. Schlägt der
    // Versand fehl, melden wir einen Fehler statt einer falschen Erfolgs-
    // meldung: ein erneutes Absenden aktualisiert den Kontakt (updateEnabled)
    // und versucht die Mail noch einmal.
    await sendReportMail({
      email: result.data.email,
      firstName: result.data.firstName,
      locale: mailLocale,
    });
  } catch (error) {
    // Nie personenbezogene Daten oder rohe Brevo-Fehlertexte loggen/ausgeben
    // (siehe docs/03_tech-architecture.md Abschnitt 4). BrevoError enthält
    // nur Status-Code und Brevos Fehlercode, keine Nutzerdaten. Auch andere
    // Fehler (z.B. fehlendes UNSUBSCRIBE_SECRET, Netzwerkfehler) loggen wir mit
    // ihrer Meldung, sonst bleibt die Ursache einer Fehlkonfiguration
    // unsichtbar. Diese Meldungen enthalten nur Variablennamen oder Systemtexte.
    console.error(
      "Registrierung fehlgeschlagen:",
      error instanceof Error ? `${error.name}: ${error.message}` : "unbekannter Fehler"
    );
    return { status: "error" };
  }

  // Jede 2xx-Antwort von Brevo gilt als Erfolg, auch bei bereits
  // existierendem Kontakt (updateEnabled) – erfüllt die Vorgabe "neutrale
  // Erfolgsmeldung, keine Auskunft ob eine E-Mail bereits registriert ist"
  // ohne weitere Sonderlogik (siehe docs/04_registration-flow.md Abschnitt 4).
  return { status: "success" };
}
