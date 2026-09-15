import { getTranslations } from "next-intl/server";
import { Gavel, GraduationCap, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export async function ResearchSection() {
  const t = await getTranslations("Research");

  const stats = [
    { value: t("statInstitutions"), label: t("statInstitutionsLabel") },
    { value: t("statInterviews"), label: t("statInterviewsLabel") },
    { value: t("statSurveys"), label: t("statSurveysLabel") },
    { value: t("statDocuments"), label: t("statDocumentsLabel") },
  ];

  const roleIcons = [GraduationCap, MessageCircle, Gavel];

  const models = [
    { title: t("modelATitle"), description: t("modelADescription"), ratio: t("modelARatio") },
    { title: t("modelBTitle"), description: t("modelBDescription"), ratio: t("modelBRatio") },
    { title: t("modelCTitle"), description: t("modelCDescription"), ratio: t("modelCRatio") },
  ];

  return (
    <section id="research" className="section-container section-spacing bg-stone-50">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-12">
        <div className="lg:col-span-1">
          <p className="text-paragraph-small font-medium uppercase tracking-wide text-muted-foreground">
            {t("label")}
          </p>
        </div>
        <div className="lg:col-span-2">
          <h2 className="text-heading-2 text-foreground">{t("title")}</h2>
          <p className="mt-4 text-paragraph-regular text-muted-foreground">{t("body")}</p>
        </div>
        <div className="flex items-center gap-2 lg:col-span-1 lg:justify-end">
          {roleIcons.map((Icon, index) => (
            <span
              key={index}
              aria-hidden="true"
              className="flex size-10 items-center justify-center rounded-full border-2 border-stone-50 bg-background text-muted-foreground shadow-sm -ml-3 first:ml-0"
            >
              <Icon className="size-4" />
            </span>
          ))}
        </div>
      </div>

      <dl className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-background p-6">
            <dd className="text-heading-1 text-foreground">{stat.value}</dd>
            <dt className="mt-1 text-paragraph-small text-muted-foreground">{stat.label}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {models.map((model) => (
          <Card key={model.title} className="rounded-2xl">
            <CardHeader>
              <Badge variant="secondary" className="w-fit rounded-full">
                {model.ratio}
              </Badge>
              <CardTitle className="mt-3 text-heading-4">{model.title}</CardTitle>
              <CardDescription>{model.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <p className="mt-10 text-paragraph-regular text-muted-foreground">
        {t("hint")}{" "}
        <a href="#registrierung" className="font-medium text-foreground underline underline-offset-4">
          {t("hintCta")}
        </a>
      </p>
    </section>
  );
}
