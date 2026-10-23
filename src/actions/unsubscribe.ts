"use server";

import { BrevoError, removeContactFromList } from "@/lib/brevo";
import { verifyUnsubscribeParams } from "@/lib/unsubscribe-token";
import type { UnsubscribeState } from "@/lib/unsubscribe-state";

export async function unsubscribeAction(
  _prevState: UnsubscribeState,
  formData: FormData
): Promise<UnsubscribeState> {
  // Die Signatur wird hier erneut geprüft, nicht nur beim Rendern der Seite:
  // Server Actions sind direkt aufrufbar.
  const email = verifyUnsubscribeParams(formData.get("e"), formData.get("t"));
  if (!email) return { status: "error" };

  try {
    await removeContactFromList(email);
  } catch (error) {
    console.error(
      "Abmeldung fehlgeschlagen (Brevo):",
      error instanceof BrevoError ? error.message : "unbekannter Fehler"
    );
    return { status: "error" };
  }

  return { status: "success" };
}
