"use server";

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

  // TODO: Brevo-Anbindung einsetzen (siehe docs/04_registration-flow.md
  // Abschnitt 3-4 und docs/03_tech-architecture.md Abschnitt 2-3):
  // POST https://api.brevo.com/v3/contacts/doubleOptinConfirmation mit
  // result.data (email, attributes für Institution/Rolle/Name),
  // BREVO_API_KEY, BREVO_LIST_ID, sprachspezifischer BREVO_DOI_TEMPLATE_ID_*
  // und redirectionUrl auf `${NEXT_PUBLIC_SITE_URL}/{locale}/bestaetigt`.
  // Aktuell wird nichts an Brevo gesendet.

  return { status: "success" };
}
