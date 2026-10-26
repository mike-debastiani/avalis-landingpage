import { Info } from "lucide-react";
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
          {/* Das Video zeigt ein Fallbeispiel an der UZH: der Hinweis steht vor
              dem Video, damit er nicht übersehen wird. */}
          <div
            role="note"
            className="mb-6 flex items-start gap-3 rounded-lg border border-border bg-secondary px-4 py-3"
          >
            <Info className="mt-0.5 size-5 shrink-0 text-foreground" aria-hidden="true" />
            <div>
              <p className="text-paragraph-regular font-semibold text-foreground">{t("disclaimerTitle")}</p>
              <p className="mt-1 text-paragraph-regular text-foreground">{t("disclaimerBody")}</p>
            </div>
          </div>

          <YoutubeEmbed videoId="k2H6iYlSwaQ" title={t("videoTitle")} />
          <p className="mt-6 text-paragraph-small text-muted-foreground">{t("statusNote")}</p>
        </div>
      </div>
    </section>
  );
}
