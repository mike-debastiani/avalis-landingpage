import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { RoleAvatar } from "@/components/role-avatar";

export async function HeroSection() {
  const t = await getTranslations("Hero");
  const tRoles = await getTranslations("ImpactRoles");

  return (
    <section id="hero" className="section-container section-spacing">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <div>
          <p className="text-paragraph-small font-medium uppercase tracking-wide text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h1 className="mt-4 text-display text-foreground">
            {t("headlineLine1")}
            <br />
            {t("headlineLine2")}
            <br />
            {t("headlineLine3Before")}
            <span className="bg-linear-to-r from-beratung-500 via-bewilligt-500 to-in-decision-500 bg-clip-text text-transparent">
              {t("headlineAccent")}
            </span>
            {t("headlineLine3After")}
          </h1>
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

        <div className="flex flex-col items-center gap-6">
          <RoleAvatar role="advisory" size="2xl" label={tRoles("advisory")} />
          <div className="flex items-start justify-center gap-6 sm:gap-10 lg:gap-4">
            <RoleAvatar role="students" size="md" label={tRoles("students")} />
            <RoleAvatar role="decision" size="xl" label={tRoles("decision")} />
          </div>
        </div>
      </div>
    </section>
  );
}
