import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

// Signierter Abmeldelink für die Report-Mail. Der Link enthält die E-Mail-
// Adresse (base64url) und eine HMAC-Signatur darüber. Ohne UNSUBSCRIBE_SECRET
// kann niemand gültige Links für fremde Adressen erzeugen, die Abmeldeseite
// akzeptiert also nur Links, die dieser Server selbst ausgestellt hat.

function secret(): string {
  const value = process.env.UNSUBSCRIBE_SECRET;
  if (!value) {
    throw new Error("Umgebungsvariable UNSUBSCRIBE_SECRET fehlt – Abmeldelink nicht konfiguriert.");
  }
  return value;
}

function sign(email: string): string {
  return createHmac("sha256", secret()).update(email).digest("base64url");
}

export function buildUnsubscribeUrl(siteUrl: string, locale: string, email: string): string {
  const normalized = email.trim().toLowerCase();
  const e = Buffer.from(normalized, "utf8").toString("base64url");
  const t = sign(normalized);
  return `${siteUrl.replace(/\/$/, "")}/${locale}/abmelden?e=${e}&t=${t}`;
}

// Liefert die E-Mail-Adresse nur zurück, wenn die Signatur stimmt.
export function verifyUnsubscribeParams(e: unknown, t: unknown): string | null {
  if (typeof e !== "string" || typeof t !== "string" || !e || !t) return null;

  let email: string;
  try {
    email = Buffer.from(e, "base64url").toString("utf8");
  } catch {
    return null;
  }
  if (!email || email.length > 254 || email !== email.trim().toLowerCase()) return null;

  const expected = Buffer.from(sign(email));
  const given = Buffer.from(t);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;

  return email;
}
