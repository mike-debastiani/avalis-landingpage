"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { MailCheck } from "lucide-react";

// Konfetti-Punkte in den drei Rollenfarben. Rein dekorativ (aria-hidden), die
// Animation läuft nur ohne "reduced motion" (motion-safe).
const confetti = [
  { className: "left-[6%] top-[18%] size-2.5 bg-bewilligt-400", delay: 120 },
  { className: "left-[22%] top-[2%] size-2 bg-beratung-400", delay: 200 },
  { className: "left-[34%] top-[40%] size-1.5 bg-in-decision-400", delay: 280 },
  { className: "right-[34%] top-[36%] size-2 bg-beratung-300", delay: 160 },
  { className: "right-[20%] top-[4%] size-2.5 bg-in-decision-300", delay: 240 },
  { className: "right-[6%] top-[22%] size-2 bg-bewilligt-300", delay: 320 },
] as const;

export function RegistrationSuccess({ email }: { email: string }) {
  const t = useTranslations("Registration");
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Fokus auf die Erfolgsmeldung, damit Screenreader sie vorlesen und
  // Tastaturnutzer:innen nicht im verschwundenen Formular "verloren" gehen.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div role="status" className="text-center">
      <div className="relative mx-auto flex h-24 max-w-64 items-center justify-center">
        {confetti.map((dot) => (
          <span
            key={dot.className}
            aria-hidden="true"
            style={{ animationDelay: `${dot.delay}ms` }}
            className={`absolute rounded-full motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-0 motion-safe:fill-mode-backwards motion-safe:duration-500 ${dot.className}`}
          />
        ))}
        <span className="flex size-20 items-center justify-center rounded-full bg-bewilligt-200 text-bewilligt-800 motion-safe:animate-in motion-safe:zoom-in-50 motion-safe:fade-in motion-safe:duration-500">
          <MailCheck className="size-9" aria-hidden="true" />
        </span>
      </div>

      <h3
        ref={headingRef}
        tabIndex={-1}
        className="mt-6 text-heading-3 font-semibold text-foreground outline-none"
      >
        {t("successTitle")}
      </h3>
      <p className="mt-3 text-paragraph-regular text-foreground">{t("successBody")}</p>
      <p className="mt-4 break-all rounded-lg bg-background px-4 py-3 text-paragraph-regular font-medium text-foreground">
        {email}
      </p>
      <p className="mt-6 text-paragraph-small text-muted-foreground">{t("successHint")}</p>
    </div>
  );
}
