import { getTranslations } from "next-intl/server";
import { CheckCircle2, Eye, Gavel, GraduationCap, Link2, Puzzle, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { VideoPlaceholder } from "@/components/video-placeholder";

const benefitKeys = ["shared", "status", "modular"] as const;
const benefitIcons = { shared: Link2, status: Eye, modular: Puzzle } as const;

const roleKeys = ["students", "advisory", "decision"] as const;
const roleIcons = { students: GraduationCap, advisory: Users, decision: Gavel } as const;

export async function SolutionSection() {
  const t = await getTranslations("Solution");

  return (
    <section id="loesung" className="section-container section-spacing">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="outline" className="h-auto rounded-full px-3 py-1 text-paragraph-small">
          {t("badge")}
        </Badge>
        <p className="mt-4 text-paragraph-small font-medium uppercase tracking-wide text-muted-foreground">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-heading-2 text-foreground">{t("headline")}</h2>
        <p className="mt-4 text-paragraph-large text-muted-foreground">{t("lead")}</p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
        {benefitKeys.map((key) => {
          const Icon = benefitIcons[key];
          return (
            <div key={key}>
              <span className="flex size-10 items-center justify-center rounded-lg border border-border text-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-paragraph-large font-medium text-foreground">
                {t(`benefits.${key}.title`)}
              </h3>
              <p className="mt-2 text-paragraph-regular text-muted-foreground">
                {t(`benefits.${key}.body`)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-16 max-w-5xl">
        <h3 className="text-center text-heading-4 text-foreground">{t("rolesTitle")}</h3>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {roleKeys.map((key) => {
            const Icon = roleIcons[key];
            const items = t.raw(`roles.${key}.items`) as string[];

            return (
              <div key={key} className="rounded-2xl border border-border bg-muted p-6">
                <span className="flex size-10 items-center justify-center rounded-full bg-background text-foreground ring-1 ring-border">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h4 className="mt-4 text-paragraph-large font-medium text-foreground">
                  {t(`roles.${key}.name`)}
                </h4>
                <ul className="mt-3 space-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-paragraph-small text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-foreground" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-3xl">
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
