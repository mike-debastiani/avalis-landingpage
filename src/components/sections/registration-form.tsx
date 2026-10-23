"use client";

import { useActionState, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, CircleAlert } from "lucide-react";
import { registerAction } from "@/actions/register";
import { HONEYPOT_FIELD_NAME, initialRegisterState } from "@/lib/validation/registration";
import { roleValues } from "@/lib/roles";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const FIELD_ORDER = [
  "email",
  "firstName",
  "lastName",
  "institution",
  "role",
  "otherRole",
  "consent",
] as const;

type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  institution: string;
  role: string;
  otherRole: string;
};

const emptyValues: FormValues = {
  email: "",
  firstName: "",
  lastName: "",
  institution: "",
  role: "",
  otherRole: "",
};

// Muss mit den erlaubten Werten in src/lib/validation/registration.ts
// übereinstimmen; alles andere fällt dort ohnehin auf "direkt" zurück.
const ALLOWED_SOURCES = ["netzwerktreffen", "mail"];

// ?src= ist eine reine Browser-Grösse (kein Prop, kein State), die beim
// ersten Render auf dem Server nicht existiert. useSyncExternalStore liest
// sie ohne setState-in-Effect und ohne Hydration-Mismatch: Server-Snapshot
// liefert immer "direkt", der Client-Snapshot den echten Wert nach Hydration.
function subscribeToNothing() {
  return () => {};
}
function getSourceSnapshot() {
  const raw = new URLSearchParams(window.location.search).get("src");
  return raw && ALLOWED_SOURCES.includes(raw) ? raw : "direkt";
}
function getServerSourceSnapshot() {
  return "direkt";
}

// Felder werden vollständig kontrolliert geführt: React setzt nach jeder
// Server-Action-Übermittlung unkontrollierte Formularfelder automatisch
// zurück (auch bei einer Fehlerantwort), wodurch z.B. die Rollen-Auswahl
// wieder auf den Platzhalter springen würde. Kontrollierte Felder sind davon
// nicht betroffen, weil ihr Wert immer aus dem React-State kommt.
export function RegistrationForm({ locale }: { locale: Locale }) {
  const t = useTranslations("Registration");
  const [state, formAction, pending] = useActionState(
    registerAction.bind(null, locale),
    initialRegisterState
  );
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [consent, setConsent] = useState(false);
  // Kein next/navigation useSearchParams: das würde die sonst statisch
  // generierbare Seite in dynamisches Rendering zwingen, nur für dieses
  // einzelne Analytics-Attribut.
  const source = useSyncExternalStore(subscribeToNothing, getSourceSnapshot, getServerSourceSnapshot);
  const fieldRefs = useRef<Partial<Record<string, HTMLElement | null>>>({});

  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    const firstErroredField = FIELD_ORDER.find((field) => state.fieldErrors?.[field]);
    if (firstErroredField) {
      fieldRefs.current[firstErroredField]?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-xl border border-border bg-background p-5"
      >
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-foreground" aria-hidden="true" />
        <div>
          <p className="text-paragraph-regular font-medium text-foreground">{t("successTitle")}</p>
          <p className="mt-1 text-paragraph-small text-muted-foreground">{t("successBody")}</p>
        </div>
      </div>
    );
  }

  const errorMessage = (field: (typeof FIELD_ORDER)[number]) => {
    const code = state.fieldErrors?.[field];
    return code ? t(`errors.${code}`) : undefined;
  };

  const setField = (field: keyof FormValues) => (value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  // Radix' Select ruft onValueChange("") auf, wenn das umgebende Formular ein
  // natives "reset"-Event feuert (das React nach jeder Server-Action-
  // Übermittlung auslöst) – unabhängig davon, ob die Select-Instanz einen
  // `name` gesetzt hat. Da unsere Optionslisten nie einen leeren Wert
  // enthalten, ist ein leerer Aufruf immer dieses Reset-Artefakt und keine
  // echte Nutzerauswahl, deshalb wird er hier ignoriert.
  const setSelectField = (field: keyof FormValues) => (value: string) => {
    if (value) setField(field)(value);
  };

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.status === "error" && !state.fieldErrors && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4"
        >
          <CircleAlert className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
          <div>
            <p className="text-paragraph-regular font-medium text-foreground">{t("errorTitle")}</p>
            <p className="mt-1 text-paragraph-small text-muted-foreground">{t("errorBody")}</p>
          </div>
        </div>
      )}

      {/* Honeypot: für Menschen und Screenreader unsichtbar, siehe docs/04_registration-flow.md */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={HONEYPOT_FIELD_NAME}>Website</label>
        <input
          id={HONEYPOT_FIELD_NAME}
          name={HONEYPOT_FIELD_NAME}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Kontext-Attribut für Brevo, nicht nutzersichtbar: Herkunft (?src=),
          siehe docs/04_registration-flow.md. */}
      <input type="hidden" name="source" value={source} />

      <div>
        <Label htmlFor="email">{t("fields.emailLabel")}</Label>
        <Input
          ref={(el) => {
            fieldRefs.current.email = el;
          }}
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t("fields.emailPlaceholder")}
          className="mt-1.5"
          value={values.email}
          onChange={(e) => setField("email")(e.target.value)}
          aria-invalid={Boolean(errorMessage("email"))}
          aria-describedby={errorMessage("email") ? "email-error" : undefined}
        />
        {errorMessage("email") && (
          <p id="email-error" role="alert" className="mt-1.5 text-paragraph-small text-destructive">
            {errorMessage("email")}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="firstName">{t("fields.firstNameLabel")}</Label>
          <Input
            ref={(el) => {
              fieldRefs.current.firstName = el;
            }}
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            maxLength={100}
            className="mt-1.5"
            value={values.firstName}
            onChange={(e) => setField("firstName")(e.target.value)}
            aria-invalid={Boolean(errorMessage("firstName"))}
            aria-describedby={errorMessage("firstName") ? "firstName-error" : undefined}
          />
          {errorMessage("firstName") && (
            <p id="firstName-error" role="alert" className="mt-1.5 text-paragraph-small text-destructive">
              {errorMessage("firstName")}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">{t("fields.lastNameLabel")}</Label>
          <Input
            ref={(el) => {
              fieldRefs.current.lastName = el;
            }}
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            maxLength={100}
            className="mt-1.5"
            value={values.lastName}
            onChange={(e) => setField("lastName")(e.target.value)}
            aria-invalid={Boolean(errorMessage("lastName"))}
            aria-describedby={errorMessage("lastName") ? "lastName-error" : undefined}
          />
          {errorMessage("lastName") && (
            <p id="lastName-error" role="alert" className="mt-1.5 text-paragraph-small text-destructive">
              {errorMessage("lastName")}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="institution">{t("fields.institutionLabel")}</Label>
        <Input
          ref={(el) => {
            fieldRefs.current.institution = el;
          }}
          id="institution"
          name="institution"
          type="text"
          required
          maxLength={150}
          placeholder={t("fields.institutionPlaceholder")}
          className="mt-1.5"
          value={values.institution}
          onChange={(e) => setField("institution")(e.target.value)}
          aria-invalid={Boolean(errorMessage("institution"))}
          aria-describedby={errorMessage("institution") ? "institution-error" : undefined}
        />
        {errorMessage("institution") && (
          <p id="institution-error" role="alert" className="mt-1.5 text-paragraph-small text-destructive">
            {errorMessage("institution")}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="role-trigger">{t("fields.roleLabel")}</Label>
        {/*
          Kein `name`/`required` am Select-Root: Radix hängt dafür einen
          Listener auf das native "reset"-Event des Formulars, das React nach
          jeder Server-Action-Übermittlung auslöst, und würde damit unseren
          kontrollierten Wert aktiv wieder auf "" zurücksetzen. Der Wert geht
          stattdessen über das eigene Hidden-Input unten ins FormData.
        */}
        <input type="hidden" name="role" value={values.role} />
        <Select value={values.role} onValueChange={setSelectField("role")}>
          <SelectTrigger
            ref={(el) => {
              fieldRefs.current.role = el;
            }}
            id="role-trigger"
            className="mt-1.5 w-full"
            aria-invalid={Boolean(errorMessage("role"))}
            aria-describedby={errorMessage("role") ? "role-error" : undefined}
          >
            <SelectValue placeholder={t("fields.rolePlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            {roleValues.map((value) => (
              <SelectItem key={value} value={value}>
                {t(`roles.${value}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errorMessage("role") && (
          <p id="role-error" role="alert" className="mt-1.5 text-paragraph-small text-destructive">
            {errorMessage("role")}
          </p>
        )}
      </div>

      {values.role === "andere" && (
        <div>
          <Label htmlFor="otherRole">{t("fields.otherRoleLabel")}</Label>
          <Input
            ref={(el) => {
              fieldRefs.current.otherRole = el;
            }}
            id="otherRole"
            name="otherRole"
            type="text"
            required
            maxLength={150}
            className="mt-1.5"
            value={values.otherRole}
            onChange={(e) => setField("otherRole")(e.target.value)}
            aria-invalid={Boolean(errorMessage("otherRole"))}
            aria-describedby={errorMessage("otherRole") ? "otherRole-error" : undefined}
          />
          {errorMessage("otherRole") && (
            <p id="otherRole-error" role="alert" className="mt-1.5 text-paragraph-small text-destructive">
              {errorMessage("otherRole")}
            </p>
          )}
        </div>
      )}

      <div>
        <div className="flex items-start gap-3">
          {/* Kein `name` an der Checkbox, siehe Kommentar bei Institution oben. */}
          <input type="hidden" name="consent" value={consent ? "on" : ""} />
          <Checkbox
            ref={(el) => {
              fieldRefs.current.consent = el;
            }}
            id="consent"
            className="mt-0.5"
            checked={consent}
            onCheckedChange={(checked) => setConsent(checked === true)}
            aria-invalid={Boolean(errorMessage("consent"))}
            aria-describedby={errorMessage("consent") ? "consent-error" : undefined}
          />
          <Label htmlFor="consent" className="text-paragraph-small font-normal text-muted-foreground">
            {t("fields.consentLabel")}{" "}
            <Link href="/datenschutz" locale={locale} className="underline underline-offset-4">
              {t("fields.consentLinkLabel")}
            </Link>
            .
          </Label>
        </div>
        {errorMessage("consent") && (
          <p id="consent-error" role="alert" className="mt-1.5 text-paragraph-small text-destructive">
            {errorMessage("consent")}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full rounded-full sm:w-auto" disabled={pending}>
        {pending ? t("submitPending") : t("submit")}
      </Button>
    </form>
  );
}
