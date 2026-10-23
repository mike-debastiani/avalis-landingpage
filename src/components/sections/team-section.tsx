import { getTranslations } from "next-intl/server";
import { SectionIntro } from "@/components/section-intro";
import { YoutubeEmbed } from "@/components/youtube-embed";

export async function TeamSection() {
  const t = await getTranslations("Team");

  return (
    <section id="team" className="bg-background-ghost">
      <div className="section-container section-spacing flex flex-col gap-12 lg:gap-20">
        <SectionIntro eyebrow={t("eyebrow")} title={t("headline")} lead={t("lead")} />
        <YoutubeEmbed videoId="o09aJQUZevs" title={t("videoTitle")} />
      </div>
    </section>
  );
}
