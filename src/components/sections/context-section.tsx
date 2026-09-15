import { getTranslations } from "next-intl/server";

export async function ContextSection() {
  const t = await getTranslations("Context");

  return (
    <section id="ausgangslage" className="section-container section-spacing grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
      <div>
        <h2 className="text-heading-2 text-foreground">{t("title")}</h2>
        <p className="mt-6 text-paragraph-large text-muted-foreground">{t("body")}</p>
        <p className="mt-8 text-paragraph-mini text-muted-foreground">{t("legalReference")}</p>
      </div>

      <blockquote className="rounded-2xl border border-border bg-stone-50 p-8 lg:p-10">
        <p className="text-heading-4 text-foreground">&laquo;{t("quote")}&raquo;</p>
        <footer className="mt-6 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex size-10 items-center justify-center rounded-full bg-beratung-100 text-paragraph-small font-medium text-beratung-700"
          >
            UZH
          </span>
          <cite className="text-paragraph-small text-muted-foreground not-italic">
            {t("quoteSource")}
          </cite>
        </footer>
      </blockquote>
    </section>
  );
}
