import { getTranslations } from "next-intl/server";
import { Gavel, GraduationCap, MessageCircle, ShieldCheck, SlidersHorizontal, SquareSplitVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export async function SolutionSection() {
  const t = await getTranslations("Solution");

  const areas = [
    { title: t("portalTitle"), description: t("portalDescription") },
    { title: t("workspaceTitle"), description: t("workspaceDescription") },
  ];

  const features = [
    {
      icon: SquareSplitVertical,
      title: t("principle1Title"),
      description: t("principle1"),
    },
    {
      icon: ShieldCheck,
      title: t("principle2Title"),
      description: t("principle2"),
    },
    {
      icon: SlidersHorizontal,
      title: t("principle3Title"),
      description: t("principle3"),
    },
    {
      icon: GraduationCap,
      title: t("roleStudentsLabel"),
      description: t("roleStudentsDescription"),
    },
    {
      icon: MessageCircle,
      title: t("roleOfficesLabel"),
      description: t("roleOfficesDescription"),
    },
    {
      icon: Gavel,
      title: t("roleDecisionMakersLabel"),
      description: t("roleDecisionMakersDescription"),
    },
  ];

  const left = features.slice(0, 3);
  const right = features.slice(3);

  return (
    <section id="loesung" className="section-container section-spacing">
      <div className="mx-auto max-w-2xl text-center">
        <Badge variant="secondary" className="rounded-full">
          {t("badge")}
        </Badge>
        <h2 className="mt-4 text-heading-2 text-foreground">{t("title")}</h2>
        <p className="mt-4 text-paragraph-large text-muted-foreground">{t("body")}</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
        {areas.map((area) => (
          <Card key={area.title} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-heading-4">{area.title}</CardTitle>
              <CardDescription>{area.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6">
          {left.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="hidden rounded-2xl border border-border bg-stone-50 lg:grid lg:grid-cols-2 lg:gap-3 lg:p-6"
        >
          <div className="rounded-xl bg-beratung-100" />
          <div className="rounded-xl bg-bewilligt-100" />
          <div className="rounded-xl bg-in-decision-100" />
          <div className="rounded-xl bg-stone-200" />
        </div>

        <div className="space-y-6">
          {right.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>

      <p className="mx-auto mt-12 max-w-2xl text-center text-paragraph-mini text-muted-foreground">
        {t("status")}
      </p>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-border p-5">
      <span className="flex size-9 items-center justify-center rounded-lg bg-stone-100 text-foreground">
        <Icon className="size-4" />
      </span>
      <p className="mt-3 font-medium text-foreground">{title}</p>
      <p className="mt-1 text-paragraph-small text-muted-foreground">{description}</p>
    </div>
  );
}
