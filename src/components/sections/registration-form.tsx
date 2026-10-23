"use client";

import { useActionState, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { CircleAlert } from "lucide-react";
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
import { RegistrationSuccess } from "@/components/sections/registration-success";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

// Feldgrössen aus Figma: 48px hoch, Radius lg, Hintergrund wie die Seite,
// kein Schatten bei Textfeldern (Selects haben in Figma shadow-xs).
const inputClass = "mt-2 h-12 rounded-lg bg-background px-3 shadow-none";
const selectClass =
  "mt-2 h-12 w-full rounded-lg bg-background py-2.5 pl-4 pr-2 text-base data-[size=default]:h-12 md:text-sm";

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
  const [state, formAction, pending] = useActionState(registerAction, initialRegisterState);
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

  // Der Report-Link kommt ausschliesslich per E-Mail (Brevo), siehe
  // docs/04_registration-flow.md. Die Adresse wird nur zur Bestätigung gezeigt.
  if (state.status === "success") {
    return <RegistrationSuccess email={values.email} />;
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
    <>
    <div className="flex flex-col gap-3">
      {/* text-box-trim wie in Figma (Kappenhöhe bis Grundlinie), wo der Browser es unterstützt */}
      <h3 className="text-heading-3 font-semibold [text-box:trim-both_cap_alphabetic]">{t("formTitle")}</h3>
      <p className="text-paragraph-regular text-muted-foreground">{t("formLead")}</p>
      <p className="text-paragraph-small text-muted-foreground">{t("requiredHint")}</p>
    </div>

    <form action={formAction} noValidate className="@container mt-6 space-y-6">
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
      {/* Sprache für den Abmeldelink in der Report-Mail */}
      <input type="hidden" name="locale" value={locale} />

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
          className={inputClass}
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

      {/* Container-Query statt Viewport-Breakpoint: Die Felder stehen nebeneinander,
          sobald die Formularkarte selbst breit genug ist, egal bei welcher
          Bildschirmbreite. */}
      <div className="grid grid-cols-1 gap-6 @min-[22rem]:grid-cols-2 @min-[22rem]:gap-5">
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
            className={inputClass}
            placeholder={t("fields.firstNamePlaceholder")}
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
            className={inputClass}
            placeholder={t("fields.lastNamePlaceholder")}
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
          className={inputClass}
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
            className={selectClass}
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
            className={inputClass}
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
          {/* Klickfläche 44px wie in Figma (WCAG 2.2 Target Size) */}
          <span className="flex size-11 shrink-0 items-center justify-center">
            <Checkbox
              ref={(el) => {
                fieldRefs.current.consent = el;
              }}
              id="consent"
              className="bg-background shadow-none"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked === true)}
              aria-invalid={Boolean(errorMessage("consent"))}
              aria-describedby={errorMessage("consent") ? "consent-error" : undefined}
            />
          </span>
          <Label htmlFor="consent" className="block pt-0.5 text-paragraph-small font-normal leading-5 text-foreground">
            {t("fields.consentLabel")}{" "}
            <Link href="/datenschutz" locale={locale} className="underline underline-offset-4">
              {t("fields.consentLinkLabel")}
            </Link>{" "}
            {t("fields.consentSuffix")}
          </Label>
        </div>
        {errorMessage("consent") && (
          <p id="consent-error" role="alert" className="mt-1.5 text-paragraph-small text-destructive">
            {errorMessage("consent")}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="h-12 w-full rounded-full text-base" disabled={pending}>
        {pending ? t("submitPending") : t("submit")}
      </Button>
    </form>

    <p className="mt-6 text-paragraph-small text-muted-foreground">{t("belowButtonNote")}</p>
    </>
  );
}
