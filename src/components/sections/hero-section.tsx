import { getTranslations } from "next-intl/server";

export async function HeroSection() {
  const t = await getTranslations("Sections");

  return (
    <section id="hero" className="section-container section-spacing">
      <h1 className="text-heading-1 text-foreground">{t("heroHeading")}</h1>
      <p className="mt-4 text-paragraph-large text-muted-foreground">{t("pending")}</p>
    </section>
  );
}
