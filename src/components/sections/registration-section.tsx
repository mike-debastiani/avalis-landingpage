import { getTranslations } from "next-intl/server";
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
 */
export async function RegistrationSection({ locale }: { locale: Locale }) {
  const t = await getTranslations("Registration");

  return (
    <section id="registrierung" className="section-container section-spacing">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-heading-2 text-foreground">{t("title")}</h2>
        <p className="mt-4 text-paragraph-large text-muted-foreground">{t("body")}</p>
      </div>

      <form className="mx-auto mt-10 max-w-xl space-y-6" aria-describedby="registration-pending">
        <div className="space-y-2">
          <Label htmlFor="email">{t("emailLabel")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder={t("emailPlaceholder")}
            autoComplete="email"
          />
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="consent" name="consent" required className="mt-0.5" />
          <Label htmlFor="consent" className="text-paragraph-small font-normal text-muted-foreground">
            {t("consentPrefix")}{" "}
            <Link href="/datenschutz" locale={locale} className="underline underline-offset-4">
              {t("consentLinkLabel")}
            </Link>
            .
          </Label>
        </div>

        <div>
          <Button type="submit" size="lg" className="w-full sm:w-auto" disabled>
            {t("submit")}
          </Button>
          <p id="registration-pending" className="mt-3 text-paragraph-mini text-muted-foreground">
            {t("pending")}
          </p>
        </div>
      </form>
    </section>
  );
}
