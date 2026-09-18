import { getTranslations } from "next-intl/server";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceholderBox } from "@/components/placeholder-box";

export async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section id="hero" className="section-container section-spacing">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-12">
        <div>
          <p className="text-paragraph-small font-medium uppercase tracking-wide text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-display text-foreground">{t("headline")}</h1>
          <p className="mt-6 text-paragraph-large text-muted-foreground">{t("lead")}</p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="rounded-full">
              <a href="#registrierung">{t("primaryCta")}</a>
            </Button>
            <a
              href="#loesung"
              className="text-paragraph-regular font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
            >
              {t("secondaryCta")}
            </a>
          </div>
        </div>

        <PlaceholderBox icon={ImageIcon} label={t("imageLabel")} className="aspect-4/3 w-full" />
      </div>
    </section>
  );
}
