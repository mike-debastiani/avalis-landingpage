import { getTranslations } from "next-intl/server";
import { SectionIntro } from "@/components/section-intro";
import { YoutubeEmbed } from "@/components/youtube-embed";

export async function PrototypeSection() {
  const t = await getTranslations("Prototype");

  return (
    <section id="einblick" className="border-t border-border bg-background-ghost">
      <div className="section-container pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-30 lg:pt-28">
        <SectionIntro eyebrow={t("eyebrow")} title={t("title")} lead={t("context")} />

        <div className="mt-8 lg:mt-14">
          <YoutubeEmbed videoId="k2H6iYlSwaQ" title={t("videoTitle")} />
          <p className="mt-6 text-paragraph-small text-muted-foreground">{t("statusNote")}</p>
        </div>
      </div>
    </section>
  );
}
