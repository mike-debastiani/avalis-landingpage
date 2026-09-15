import { getTranslations } from "next-intl/server";

export async function ContextSection() {
  const t = await getTranslations("Context");

  return (
    <section id="ausgangslage" className="section-container section-spacing">
      <h2 className="max-w-3xl text-heading-2 text-foreground">{t("title")}</h2>
      <p className="mt-6 max-w-3xl text-paragraph-large text-muted-foreground">{t("body")}</p>

      <blockquote className="mt-10 max-w-2xl border-l-2 border-beratung-500 pl-6">
        <p className="text-paragraph-large text-foreground">&laquo;{t("quote")}&raquo;</p>
        <cite className="mt-2 block text-paragraph-small text-muted-foreground not-italic">
          {t("quoteSource")}
        </cite>
      </blockquote>

      <p className="mt-8 text-paragraph-mini text-muted-foreground">{t("legalReference")}</p>
    </section>
  );
}
