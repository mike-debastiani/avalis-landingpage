import { getTranslations } from "next-intl/server";

export async function ContactSection() {
  const t = await getTranslations("Contact");

  return (
    <section id="kontakt" className="section-container py-12 sm:py-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-paragraph-small font-medium uppercase tracking-wide text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-heading-3 text-foreground">{t("title")}</h2>
        <p className="mt-3 text-paragraph-regular text-muted-foreground">{t("body")}</p>
        <p className="mt-3 text-paragraph-regular text-muted-foreground">{t("addressPending")}</p>
      </div>
    </section>
  );
}
