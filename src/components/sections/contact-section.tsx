import { getTranslations } from "next-intl/server";

export async function ContactSection() {
  const t = await getTranslations("Contact");

  return (
    <section id="kontakt" className="section-container py-12 sm:py-16">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-heading-3 text-foreground">{t("title")}</h2>
        <p className="mt-3 text-paragraph-regular text-muted-foreground">{t("body")}</p>
        <a
          href={`mailto:${t("email")}`}
          className="mt-3 inline-block text-paragraph-regular font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
        >
          {t("email")}
        </a>
      </div>
    </section>
  );
}
