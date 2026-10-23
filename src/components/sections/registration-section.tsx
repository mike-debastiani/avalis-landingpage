import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RegistrationForm } from "@/components/sections/registration-form";
import type { Locale } from "@/i18n/routing";

export async function RegistrationSection({ locale }: { locale: Locale }) {
  const t = await getTranslations("Registration");
  const reportDownloadUrl = process.env.REPORT_DOWNLOAD_URL;

  return (
    <section id="registrierung" className="bg-primary text-primary-foreground">
      <div className="section-container section-spacing">
        <div className="grid grid-cols-1 gap-10 min-[850px]:grid-cols-2 min-[850px]:gap-16">
          <div className="min-w-0">
            <p className="text-paragraph-small font-medium uppercase tracking-wide text-primary-foreground/70">
              {t("eyebrow")}
            </p>
            <h2 className="mt-4 text-heading-2">{t("title")}</h2>
            <p className="mt-4 text-paragraph-regular text-primary-foreground/80">{t("lead1")}</p>
            <p className="mt-4 text-paragraph-regular text-primary-foreground/80">{t("lead2")}</p>

            <div className="mt-8">
              <Image
                src="/registration/switzerland-map.svg"
                alt={t("mapLabel")}
                width={496}
                height={321}
                className="h-auto w-full"
              />
              <div className="mt-4 max-w-xs">
                <p className="text-paragraph-small text-primary-foreground/80">{t("mapCaption")}</p>
                <div className="mt-2 h-2 rounded-full bg-linear-to-r from-bewilligt-100 to-bewilligt-800" />
                <div
                  className="mt-1 flex justify-between text-paragraph-mini text-primary-foreground/80"
                  aria-hidden="true"
                >
                  <span>0</span>
                  <span>8</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-card p-6 text-card-foreground sm:p-8">
            <h3 className="text-paragraph-large font-semibold">{t("formTitle")}</h3>
            <p className="mt-2 text-paragraph-regular text-muted-foreground">{t("formLead")}</p>
            <p className="mt-4 text-paragraph-mini text-muted-foreground">{t("requiredHint")}</p>

            <div className="mt-6">
              <RegistrationForm locale={locale} reportDownloadUrl={reportDownloadUrl} />
            </div>

            <p className="mt-6 text-paragraph-small text-muted-foreground">{t("belowButtonNote")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
