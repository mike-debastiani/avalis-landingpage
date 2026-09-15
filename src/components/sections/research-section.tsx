import { getTranslations } from "next-intl/server";
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

  const models = [
    { title: t("modelATitle"), description: t("modelADescription"), ratio: t("modelARatio") },
    { title: t("modelBTitle"), description: t("modelBDescription"), ratio: t("modelBRatio") },
    { title: t("modelCTitle"), description: t("modelCDescription"), ratio: t("modelCRatio") },
  ];

  return (
    <section id="research" className="section-container section-spacing bg-stone-50">
      <h2 className="max-w-3xl text-heading-2 text-foreground">{t("title")}</h2>

      <dl className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-background p-6">
            <dt className="text-paragraph-small text-muted-foreground">{stat.label}</dt>
            <dd className="mt-2 text-heading-2 text-foreground">{stat.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-10 max-w-3xl text-paragraph-large text-muted-foreground">{t("body")}</p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {models.map((model) => (
          <Card key={model.title}>
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
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
