import { getTranslations } from "next-intl/server";

export async function ContactSection() {
  const t = await getTranslations("Contact");

  return (
    <section id="kontakt" className="border-t border-border bg-background-ghost">
      <div className="section-container py-14 sm:py-16 lg:py-26">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[26rem_1fr] lg:items-center lg:gap-20">
          <div>
            <p className="text-paragraph-small font-medium uppercase text-muted-foreground">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 text-title text-foreground">{t("title")}</h2>
          </div>
          <div className="flex flex-col gap-6 text-muted-foreground">
            <p className="text-paragraph-large leading-[1.6]">{t("body")}</p>
            <a
              href={`mailto:${t("email")}`}
              className="w-fit text-paragraph-regular font-medium underline-offset-4 hover:text-foreground hover:underline"
            >
              {t("email")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
