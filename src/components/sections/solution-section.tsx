import { getTranslations } from "next-intl/server";
import { VideoPlaceholder } from "@/components/video-placeholder";

export async function SolutionSection() {
  const t = await getTranslations("Solution");

  return (
    <section id="loesung" className="section-container section-spacing">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-paragraph-small font-medium uppercase tracking-wide text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h2 className="mt-4 text-heading-2 text-foreground">{t("headline")}</h2>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12">
        <div>
          <h3 className="text-heading-4 text-foreground">{t("problemTitle")}</h3>
          <p className="mt-3 text-paragraph-regular text-muted-foreground">{t("problemBody")}</p>
        </div>
        <div>
          <h3 className="text-heading-4 text-foreground">{t("solutionTitle")}</h3>
          <p className="mt-3 text-paragraph-regular text-muted-foreground">{t("solutionBody")}</p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <p className="text-paragraph-regular text-muted-foreground">{t("videoContext")}</p>
        <div className="mt-4">
          <VideoPlaceholder label={t("videoLabel")} />
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-3xl rounded-xl border border-border bg-muted px-5 py-4 text-paragraph-small text-muted-foreground">
        {t("statusNote")}
      </p>
    </section>
  );
}
