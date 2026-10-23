import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RegistrationForm } from "@/components/sections/registration-form";
import type { Locale } from "@/i18n/routing";

export async function RegistrationSection({ locale }: { locale: Locale }) {
  const t = await getTranslations("Registration");

  return (
    <section id="registrierung" className="bg-primary text-primary-foreground">
      <div className="section-container py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-12 min-[850px]:grid-cols-[minmax(0,496fr)_minmax(0,600fr)] min-[850px]:gap-10 xl:gap-26">
          <div className="min-w-0">
            <div className="flex flex-col gap-7">
              <p className="text-paragraph-small font-medium uppercase">{t("eyebrow")}</p>
              <h2 className="text-title-xl">{t("title")}</h2>
              <p className="text-paragraph-regular leading-[1.6]">{t("lead1")}</p>
              <p className="text-paragraph-regular leading-[1.6]">{t("lead2")}</p>
            </div>

            <div className="mt-12 flex flex-col gap-10 lg:mt-20">
              <Image
                src="/registration/switzerland-map.svg"
                alt={t("mapLabel")}
                width={496}
                height={321}
                className="h-auto w-full"
              />
              <div className="max-w-74.25">
                <p className="max-w-68.5 pl-4.5 text-paragraph-regular font-medium leading-[normal]">
                  {t("mapCaption")}
                </p>
                <div
                  className="mt-1.25 flex items-center gap-2 text-paragraph-regular font-medium"
                  aria-hidden="true"
                >
                  <span>0</span>
                  <span className="h-5.25 flex-1 rounded-sm bg-linear-to-r from-bewilligt-300 to-bewilligt-800" />
                  <span>8</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-fit rounded-xl bg-background-ghost p-6 text-card-foreground sm:p-10">
            <RegistrationForm locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
