import { getTranslations } from "next-intl/server";
import { VideoPlaceholder } from "@/components/video-placeholder";

export async function PrototypeSection() {
  const t = await getTranslations("Prototype");

  return (
    <section id="einblick" className="section-container section-spacing">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-heading-2 text-foreground">{t("title")}</h2>
        <p className="mt-2 text-paragraph-large text-muted-foreground">{t("context")}</p>

        <div className="mt-8">
          <VideoPlaceholder
            formatLabel={t("videoFormat")}
            statusLabel={t("videoStatus")}
            title={t("videoTitle")}
            subtitle={t("videoSubtitle")}
            ccLabel={t("videoCc")}
          />
        </div>

        <p className="mt-6 text-paragraph-small text-muted-foreground">{t("statusNote")}</p>
      </div>
    </section>
  );
}
