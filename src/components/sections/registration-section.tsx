import { getTranslations } from "next-intl/server";
import { FileText } from "lucide-react";
import { PlaceholderBox } from "@/components/placeholder-box";
import { RegistrationForm } from "@/components/sections/registration-form";
import type { Locale } from "@/i18n/routing";

export async function RegistrationSection({ locale }: { locale: Locale }) {
  const t = await getTranslations("Registration");

  return (
    <section id="registrierung" className="section-container section-spacing">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-muted p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr] lg:gap-12">
          <div>
            <p className="text-paragraph-small font-medium uppercase tracking-wide text-muted-foreground">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 text-heading-2 text-foreground">{t("title")}</h2>
            <p className="mt-4 text-paragraph-regular text-muted-foreground">{t("lead")}</p>

            <div className="mt-8 rounded-2xl border border-border bg-background p-6 sm:p-8">
              <RegistrationForm locale={locale} />
            </div>
          </div>

          <div className="hidden lg:block">
            <PlaceholderBox icon={FileText} label={t("coverLabel")} className="aspect-3/4 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
