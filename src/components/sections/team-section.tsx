import { getTranslations } from "next-intl/server";
import { VideoPlaceholder } from "@/components/video-placeholder";

export async function TeamSection() {
  const t = await getTranslations("Team");
  const members = [t("member1"), t("member2"), t("member3")];

  return (
    <section id="team" className="section-container section-spacing">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-paragraph-small font-medium uppercase tracking-wide text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h2 className="mt-4 text-heading-2 text-foreground">{t("headline")}</h2>
        <p className="mt-4 text-paragraph-large text-muted-foreground">{t("lead")}</p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {members.map((member) => (
            <li key={member} className="text-paragraph-regular font-medium text-foreground">
              {member}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <VideoPlaceholder label={t("videoLabel")} />
      </div>
    </section>
  );
}
