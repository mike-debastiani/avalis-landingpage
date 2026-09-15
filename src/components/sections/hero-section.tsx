import { getTranslations } from "next-intl/server";
import { Gavel, GraduationCap, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoDialog } from "@/components/video-dialog";

export async function HeroSection() {
  const t = await getTranslations("Hero");

  const roleIcons = [
    { icon: GraduationCap, bg: "bg-bewilligt-100", color: "text-bewilligt-700" },
    { icon: MessageCircle, bg: "bg-beratung-100", color: "text-beratung-700" },
    { icon: Gavel, bg: "bg-in-decision-100", color: "text-in-decision-700" },
  ];

  return (
    <section className="section-container section-spacing grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="text-paragraph-small font-medium uppercase tracking-wide text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h1 className="mt-4 text-display text-foreground">{t("headline")}</h1>
        <p className="mt-6 text-paragraph-large text-muted-foreground">{t("lead")}</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg" className="rounded-full">
            <a href="#registrierung">{t("primaryCta")}</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <a href="#ausgangslage">{t("secondaryCta")}</a>
          </Button>
        </div>

        <div className="mt-8 flex items-center gap-4 rounded-full border border-border bg-stone-50 py-2 pr-5 pl-2 w-fit">
          <div className="flex -space-x-2">
            {roleIcons.map(({ icon: Icon, bg, color }, index) => (
              <span
                key={index}
                aria-hidden="true"
                className={`flex size-9 items-center justify-center rounded-full border-2 border-background ${bg} ${color}`}
              >
                <Icon className="size-4" />
              </span>
            ))}
          </div>
          <span className="text-paragraph-small text-muted-foreground">{t("bandText")}</span>
          <VideoDialog
            label={t("videoLabel")}
            title={t("videoTitle")}
            pendingText={t("videoPending")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 rounded-2xl border border-border bg-beratung-50 p-6">
          <p className="text-heading-1 text-foreground">17</p>
          <p className="mt-1 text-paragraph-small text-muted-foreground">
            {t("statInstitutionsLabel")}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-bewilligt-50 p-5" aria-hidden="true">
          <div className="space-y-2">
            <div className="skeleton-bar w-full" />
            <div className="skeleton-bar w-4/5" />
            <div className="skeleton-bar w-3/5" />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-in-decision-50 p-5" aria-hidden="true">
          <div className="space-y-2">
            <div className="skeleton-bar w-full" />
            <div className="skeleton-bar w-2/3" />
            <div className="skeleton-bar w-4/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
