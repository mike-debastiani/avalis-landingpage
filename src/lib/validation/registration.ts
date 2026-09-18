import { z } from "zod";
import { institutionValues } from "@/lib/institutions";
import { roleValues } from "@/lib/roles";

export const HONEYPOT_FIELD_NAME = "website";

export const registrationSchema = z
  .object({
    email: z.email(),
    firstName: z.string().max(100),
    lastName: z.string().max(100),
    institution: z.enum(institutionValues),
    otherInstitution: z.string().max(150),
    role: z.enum(roleValues),
    consent: z.literal("on"),
  })
  .superRefine(
    (data, ctx) => {
      if (data.institution === "andere" && data.otherInstitution.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          path: ["otherInstitution"],
          params: { uiCode: "required" },
          message: "otherInstitution is required when institution is 'andere'",
        });
      }
    },
    // Ohne `when` würde Zod diesen Check überspringen, sobald ein anderes
    // Feld bereits einen Fehler hat (z.B. Consent) – dann bliebe die
    // Pflichtangabe bei "Andere" unsichtbar, bis alle übrigen Fehler behoben
    // sind. `when: () => true` erzwingt, dass er immer läuft.
    { when: () => true }
  );

export type RegistrationData = z.infer<typeof registrationSchema>;

export type RegistrationFieldName =
  | "email"
  | "firstName"
  | "lastName"
  | "institution"
  | "otherInstitution"
  | "role"
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
    institution: String(formData.get("institution") ?? ""),
    otherInstitution: String(formData.get("otherInstitution") ?? "").trim(),
    role: String(formData.get("role") ?? ""),
    consent: String(formData.get("consent") ?? ""),
  };

  const result = registrationSchema.safeParse(raw);
  if (result.success) {
    return { success: true, data: result.data };
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
