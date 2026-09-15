import { getTranslations } from "next-intl/server";
import { Check, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/**
 * Formular ist bewusst noch nicht an Brevo angebunden (offene Punkte #2-#5 in
 * docs/08_open-points.md) und zeigt nur E-Mail + Einwilligung. Institution und
 * Rolle folgen, sobald die Hochschul-/Rollenliste feststeht (Punkte #10/#11).
 * Kein Fake-Social-Proof (Join-Count/Avatare), da es 0 Registrierungen gibt.
 */
export async function RegistrationSection({ locale }: { locale: Locale }) {
  const t = await getTranslations("Registration");

  const benefits = [t("benefit1"), t("benefit2"), t("benefit3")];

  return (
    <section id="registrierung" className="section-container section-spacing">
      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-stone-50 p-8 text-center sm:p-12">
        <Badge variant="secondary" className="rounded-full">
          <Mail className="size-3.5" aria-hidden="true" />
          {t("badge")}
        </Badge>

        <h2 className="mt-4 text-heading-2 text-foreground">{t("title")}</h2>
        <p className="mt-4 text-paragraph-large text-muted-foreground">{t("body")}</p>

        <form className="mt-8 space-y-6 text-left" aria-describedby="registration-pending">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Label htmlFor="email" className="sr-only">
              {t("emailLabel")}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder={t("emailPlaceholder")}
              autoComplete="email"
              className="h-12 rounded-full px-5"
            />
            <Button type="submit" size="lg" className="h-12 shrink-0 rounded-full" disabled>
              {t("submit")}
            </Button>
          </div>

          <div className="flex items-start justify-center gap-3 sm:justify-start">
            <Checkbox id="consent" name="consent" required className="mt-0.5" />
            <Label htmlFor="consent" className="text-paragraph-small font-normal text-muted-foreground">
              {t("consentPrefix")}{" "}
              <Link href="/datenschutz" locale={locale} className="underline underline-offset-4">
                {t("consentLinkLabel")}
              </Link>
              .
            </Label>
          </div>

          <p id="registration-pending" className="text-paragraph-mini text-muted-foreground">
            {t("pending")}
          </p>
        </form>

        <ul className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2 text-paragraph-small text-foreground">
              <Check className="size-4 text-bewilligt-600" aria-hidden="true" />
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
