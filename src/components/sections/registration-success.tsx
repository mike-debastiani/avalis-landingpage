"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useTranslations } from "next-intl";
import { Check, Mail } from "lucide-react";
import { LogoMark } from "@/components/logo-mark";
import { Separator } from "@/components/ui/separator";

// Ringe um das Logo in den drei Rollenfarben. Rein dekorativ (aria-hidden),
// sie blenden nacheinander ein und bleiben als ruhiger Endzustand stehen.
const rings = [
  { className: "size-36 border-bewilligt-300", delay: 100 },
  { className: "size-48 border-beratung-200", delay: 200 },
  { className: "size-60 border-in-decision-200", delay: 300 },
] as const;

// Konfetti-Punkte: x/y ist der Abstand vom Logo-Mittelpunkt in px. Beim
// Einblenden fliegen sie von dort an ihre Position (motion-safe, einmalig).
const confetti = [
  { x: -108, y: -34, className: "size-2.5 bg-bewilligt-400", delay: 180 },
  { x: -80, y: -84, className: "size-2 bg-beratung-400", delay: 240 },
  { x: -52, y: 62, className: "size-1.5 bg-in-decision-400", delay: 300 },
  { x: 58, y: 70, className: "size-2 bg-beratung-300", delay: 220 },
  { x: 86, y: -76, className: "size-2.5 bg-in-decision-300", delay: 280 },
  { x: 110, y: 22, className: "size-2 bg-bewilligt-300", delay: 340 },
] as const;

const steps = [
  { key: "successStep1", className: "bg-bewilligt-100 text-bewilligt-800" },
  { key: "successStep2", className: "bg-beratung-100 text-beratung-700" },
  { key: "successStep3", className: "bg-in-decision-100 text-in-decision-700" },
] as const;

const enterFrom = "motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-backwards";

export function RegistrationSuccess({ email }: { email: string }) {
  const t = useTranslations("Registration");
  const contactEmail = useTranslations("Contact")("email");
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Fokus auf die Erfolgsmeldung, damit Screenreader sie vorlesen und
  // Tastaturnutzer:innen nicht im verschwundenen Formular "verloren" gehen.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div role="status">
      {/* Celebration-Bereich: läuft bündig bis an den Rand der Formularkarte
          (negative Margins gleichen das Kartenpadding aus). */}
      <div className="-mx-6 -mt-6 overflow-hidden rounded-t-xl bg-linear-to-b from-bewilligt-50 to-background-ghost px-6 pt-8 pb-2 sm:-mx-10 sm:-mt-10 sm:px-10 sm:pt-10">
        <div className="relative mx-auto flex h-60 w-full max-w-72 items-center justify-center">
          {rings.map((ring) => (
            <span
              key={ring.className}
              aria-hidden="true"
              style={{ animationDelay: `${ring.delay}ms` }}
              className={`absolute rounded-full border ${enterFrom} motion-safe:zoom-in-50 motion-safe:duration-700 ${ring.className}`}
            />
          ))}

          {confetti.map((dot) => (
            <span
              key={dot.className}
              aria-hidden="true"
              style={
                {
                  left: `calc(50% + ${dot.x}px)`,
                  top: `calc(50% + ${dot.y}px)`,
                  animationDelay: `${dot.delay}ms`,
                  "--tw-enter-translate-x": `${-dot.x}px`,
                  "--tw-enter-translate-y": `${-dot.y}px`,
                } as CSSProperties
              }
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${enterFrom} motion-safe:zoom-in-0 motion-safe:duration-700 ${dot.className}`}
            />
          ))}

          <span
            aria-hidden="true"
            className={`relative flex size-24 items-center justify-center rounded-full bg-background-ghost shadow-lg ${enterFrom} motion-safe:zoom-in-50 motion-safe:duration-500`}
          >
            <LogoMark className="size-11" />
            <span
              style={{ animationDelay: "350ms" }}
              className={`absolute -right-0.5 -bottom-0.5 flex size-8 items-center justify-center rounded-full bg-bewilligt-800 text-white ring-4 ring-background-ghost ${enterFrom} motion-safe:zoom-in-0 motion-safe:duration-300`}
            >
              <Check className="size-4" strokeWidth={3} />
            </span>
          </span>
        </div>
      </div>

      <div className="text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-bewilligt-100 px-3 py-1 text-paragraph-small font-medium text-bewilligt-800">
          <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
          {t("successBadge")}
        </p>
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 text-subtitle text-balance text-foreground outline-none"
        >
          {t("successTitle")}
        </h3>
        <p className="mt-3 text-paragraph-regular text-muted-foreground">{t("successBody")}</p>
      </div>

      <div className="mt-6 flex items-center gap-3 rounded-lg border border-border bg-background px-4 py-3">
        <Mail className="size-5 shrink-0 text-bewilligt-800" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-paragraph-mini font-medium uppercase text-muted-foreground">
            {t("successSentTo")}
          </p>
          <p className="break-all text-paragraph-regular font-semibold text-foreground">{email}</p>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="text-paragraph-regular font-semibold text-foreground">{t("successStepsTitle")}</h4>
        <ol className="mt-4 space-y-4">
          {steps.map((step, index) => (
            <li key={step.key} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={`flex size-8 shrink-0 items-center justify-center rounded-full text-paragraph-small font-semibold ${step.className}`}
              >
                {index + 1}
              </span>
              <p className="pt-1 text-paragraph-regular text-foreground">{t(step.key)}</p>
            </li>
          ))}
        </ol>
      </div>

      <Separator className="my-6" />

      <div className="space-y-1 text-paragraph-small text-muted-foreground">
        <p>{t("successHint")}</p>
        <p>
          {t("successContact")}{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="font-medium text-foreground underline underline-offset-4 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {contactEmail}
          </a>
        </p>
      </div>
    </div>
  );
}
