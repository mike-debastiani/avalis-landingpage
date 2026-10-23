import { z } from "zod";
import { roleValues } from "@/lib/roles";

export const HONEYPOT_FIELD_NAME = "website";

// Erlaubte source-Werte gemäss docs/04_registration-flow.md Abschnitt 2,
// alles andere (inkl. fehlender Wert) fällt auf "direkt" zurück.
const ALLOWED_SOURCES = ["netzwerktreffen", "mail"] as const;

function readSource(formData: FormData): string {
  const raw = String(formData.get("source") ?? "");
  return (ALLOWED_SOURCES as readonly string[]).includes(raw) ? raw : "direkt";
}

export const registrationSchema = z
  .object({
    email: z.email(),
    firstName: z.string().max(100),
    lastName: z.string().max(100),
    institution: z.string().min(1).max(150),
    role: z.enum(roleValues),
    otherRole: z.string().max(150),
    consent: z.literal("on"),
  })
  .superRefine(
    (data, ctx) => {
      if (data.role === "andere" && data.otherRole.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["otherRole"],
          params: { uiCode: "required" },
          message: "otherRole is required when role is 'andere'",
        });
      }
    },
    // Ohne `when` würde Zod diesen Check überspringen, sobald ein anderes
    // Feld bereits einen Fehler hat (z.B. Consent) – dann bliebe die
    // Pflichtangabe bei "Andere" unsichtbar, bis alle übrigen Fehler behoben
    // sind. `when: () => true` erzwingt, dass er immer läuft.
    { when: () => true }
  );

// source kommt nicht vom Zod-Schema: ein reines Kontext-Attribut (Herkunft)
// ohne nutzerseitige Fehleranzeige, wird unten direkt aus formData mit
// Fallback gelesen statt validiert.
export type RegistrationData = z.infer<typeof registrationSchema> & {
  source: string;
};

export type RegistrationFieldName =
  | "email"
  | "firstName"
  | "lastName"
  | "institution"
  | "role"
  | "otherRole"
  | "consent";

export type RegistrationErrorCode = "required" | "invalid_email" | "too_long";

type RegistrationFieldErrors = Partial<Record<RegistrationFieldName, RegistrationErrorCode>>;

// Liegt hier statt in src/actions/register.ts, weil eine "use server"-Datei
// ausschliesslich async Functions exportieren darf, keine Konstanten.
export type RegisterState = {
  status: "idle" | "success" | "error";
  fieldErrors?: RegistrationFieldErrors;
};

export const initialRegisterState: RegisterState = { status: "idle" };

function toFieldErrorCode(issue: z.ZodIssue): RegistrationErrorCode {
  switch (issue.code) {
    case "too_big":
      return "too_long";
    case "invalid_format":
      return "invalid_email";
    case "invalid_value":
      return "required";
    case "custom":
      return (issue.params?.uiCode as RegistrationErrorCode | undefined) ?? "required";
    default:
      return "required";
  }
}

export function validateRegistration(
  formData: FormData
):
  | { success: true; data: RegistrationData }
  | { success: false; fieldErrors: RegistrationFieldErrors } {
  const raw = {
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    firstName: String(formData.get("firstName") ?? "").trim(),
    lastName: String(formData.get("lastName") ?? "").trim(),
    institution: String(formData.get("institution") ?? "").trim(),
    role: String(formData.get("role") ?? ""),
    otherRole: String(formData.get("otherRole") ?? "").trim(),
    consent: String(formData.get("consent") ?? ""),
  };

  const result = registrationSchema.safeParse(raw);
  if (result.success) {
    return { success: true, data: { ...result.data, source: readSource(formData) } };
  }

  const fieldErrors: RegistrationFieldErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as RegistrationFieldName | undefined;
    if (!field || fieldErrors[field]) continue;

    if (field === "email" && raw.email.length === 0) {
      fieldErrors.email = "required";
      continue;
    }

    fieldErrors[field] = toFieldErrorCode(issue);
  }

  return { success: false, fieldErrors };
}
