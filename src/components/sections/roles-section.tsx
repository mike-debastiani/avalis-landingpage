import { getTranslations } from "next-intl/server";
import { Gavel, GraduationCap, MessageCircle } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export async function RolesSection() {
  const t = await getTranslations("Roles");

  const roles = [
    {
      icon: GraduationCap,
      label: t("studentsLabel"),
      description: t("studentsDescription"),
      iconBg: "bg-bewilligt-100",
      iconColor: "text-bewilligt-700",
    },
    {
      icon: MessageCircle,
      label: t("officesLabel"),
      description: t("officesDescription"),
      iconBg: "bg-beratung-100",
      iconColor: "text-beratung-700",
    },
    {
      icon: Gavel,
      label: t("decisionMakersLabel"),
      description: t("decisionMakersDescription"),
      iconBg: "bg-in-decision-100",
      iconColor: "text-in-decision-700",
    },
  ];

  return (
    <section className="section-container section-spacing bg-stone-50">
      <h2 className="max-w-3xl text-heading-2 text-foreground">{t("title")}</h2>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.label}>
            <CardHeader>
              <span
                aria-hidden="true"
                className={`flex size-10 items-center justify-center rounded-full ${role.iconBg} ${role.iconColor}`}
              >
                <role.icon className="size-5" />
              </span>
              <CardTitle className="mt-3 text-heading-4">{role.label}</CardTitle>
              <CardDescription>{role.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
