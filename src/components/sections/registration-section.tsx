import { getTranslations } from "next-intl/server";
import { MapIcon } from "lucide-react";
import { PlaceholderBox } from "@/components/placeholder-box";
import { RegistrationForm } from "@/components/sections/registration-form";
import type { Locale } from "@/i18n/routing";

export async function RegistrationSection({ locale }: { locale: Locale }) {
  const t = await getTranslations("Registration");

  return (
    <section id="registrierung" className="bg-primary text-primary-foreground">
      <div className="section-container section-spacing">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-paragraph-small font-medium uppercase tracking-wide text-primary-foreground/70">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 text-heading-2">{t("title")}</h2>
            <p className="mt-4 text-paragraph-regular text-primary-foreground/80">{t("lead1")}</p>
            <p className="mt-4 text-paragraph-regular text-primary-foreground/80">{t("lead2")}</p>

            <div className="mt-8">
              <PlaceholderBox icon={MapIcon} label={t("mapLabel")} className="aspect-4/3 w-full" />
              <p className="mt-2 text-paragraph-mini text-primary-foreground/60">{t("mapCaption")}</p>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6 text-card-foreground sm:p-8">
            <h3 className="text-paragraph-large font-semibold">{t("formTitle")}</h3>
            <p className="mt-2 text-paragraph-regular text-muted-foreground">{t("formLead")}</p>
            <p className="mt-4 text-paragraph-mini text-muted-foreground">{t("requiredHint")}</p>

            <div className="mt-6">
              <RegistrationForm locale={locale} />
            </div>

            <p className="mt-6 text-paragraph-small text-muted-foreground">{t("belowButtonNote")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
