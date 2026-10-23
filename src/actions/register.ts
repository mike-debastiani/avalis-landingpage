"use server";

import { BrevoError, subscribeDoubleOptin } from "@/lib/brevo";
import {
  HONEYPOT_FIELD_NAME,
  validateRegistration,
  type RegisterState,
} from "@/lib/validation/registration";
import type { Locale } from "@/i18n/routing";

// `locale` kommt über registerAction.bind(null, locale) aus der Route, nicht
// aus formData – reine Redirect-Information für die (zweisprachige)
// Bestätigungsseite, siehe src/lib/brevo.ts.
export async function registerAction(
  locale: Locale,
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

  try {
    await subscribeDoubleOptin({ ...result.data, locale });
  } catch (error) {
    // Nie personenbezogene Daten oder rohe Brevo-Fehlertexte loggen/ausgeben
    // (siehe docs/03_tech-architecture.md Abschnitt 4). BrevoError enthält
    // nur Status-Code und Brevos Fehlercode, keine Nutzerdaten.
    console.error(
      "Brevo-Registrierung fehlgeschlagen:",
      error instanceof BrevoError ? error.message : "unbekannter Fehler"
    );
    return { status: "error" };
  }

  // Jede 2xx-Antwort von Brevo gilt als Erfolg, auch bei bereits
  // existierendem Kontakt – erfüllt die Vorgabe "neutrale Erfolgsmeldung,
  // keine Auskunft ob eine E-Mail bereits registriert ist" ohne weitere
  // Sonderlogik (siehe docs/04_registration-flow.md Abschnitt 4).
  return { status: "success" };
}
