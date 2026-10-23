import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { RoleAvatar } from "@/components/role-avatar";

export async function HeroSection() {
  const t = await getTranslations("Hero");
  const tRoles = await getTranslations("ImpactRoles");

  return (
    <section id="hero" className="bg-background">
      <div className="section-container py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,648fr)_minmax(0,480fr)] lg:gap-12 xl:gap-18">
          <div>
            <p className="text-paragraph-small font-medium uppercase text-muted-foreground">
              {t("eyebrow")}
            </p>
            <h1 className="mt-7 text-display text-foreground">
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
            <p className="mt-7 max-w-151 text-lead text-muted-foreground">{t("lead")}</p>

            <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
              <Button asChild size="lg" className="h-12 rounded-full px-6 text-base">
                <a href="#registrierung">{t("primaryCta")}</a>
              </Button>
              <a
                href="#loesung"
                className="inline-flex h-12 items-center text-paragraph-regular font-medium text-foreground hover:text-muted-foreground"
              >
                {t("secondaryCta")}
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 lg:gap-2 xl:gap-0">
            <RoleAvatar role="advisory" size="2xl" label={tRoles("advisory")} />
            <div className="flex items-start justify-center gap-6 sm:gap-7 lg:gap-4 xl:gap-7">
              <RoleAvatar role="students" size="md" label={tRoles("students")} />
              <RoleAvatar role="decision" size="xl" label={tRoles("decision")} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
