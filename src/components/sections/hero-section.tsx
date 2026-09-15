import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section className="section-container section-spacing grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
      <div>
        <p className="text-paragraph-small font-medium uppercase tracking-wide text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h1 className="mt-4 text-display text-foreground">{t("headline")}</h1>
        <p className="mt-6 text-paragraph-large text-muted-foreground">{t("lead")}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <a href="#registrierung">{t("primaryCta")}</a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href="#ausgangslage">{t("secondaryCta")}</a>
          </Button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="grid aspect-square w-full grid-cols-2 gap-4 sm:aspect-video lg:aspect-square"
      >
        <div className="col-span-2 rounded-xl bg-beratung-100" />
        <div className="rounded-xl bg-bewilligt-100" />
        <div className="rounded-xl bg-in-decision-100" />
      </div>
    </section>
  );
}
