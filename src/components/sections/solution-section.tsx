import { getTranslations } from "next-intl/server";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export async function SolutionSection() {
  const t = await getTranslations("Solution");

  const areas = [
    { title: t("portalTitle"), description: t("portalDescription") },
    { title: t("workspaceTitle"), description: t("workspaceDescription") },
  ];

  const principles = [t("principle1"), t("principle2"), t("principle3")];

  return (
    <section id="loesung" className="section-container section-spacing">
      <h2 className="max-w-3xl text-heading-2 text-foreground">{t("title")}</h2>
      <p className="mt-6 max-w-3xl text-paragraph-large text-muted-foreground">{t("body")}</p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {areas.map((area) => (
          <Card key={area.title}>
            <CardHeader>
              <CardTitle className="text-heading-4">{area.title}</CardTitle>
              <CardDescription>{area.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {principles.map((principle) => (
          <li
            key={principle}
            className="rounded-lg border border-border bg-stone-50 p-4 text-paragraph-small text-foreground"
          >
            {principle}
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-2xl text-paragraph-mini text-muted-foreground">{t("status")}</p>
    </section>
  );
}
