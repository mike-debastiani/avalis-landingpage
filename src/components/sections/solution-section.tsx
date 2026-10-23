import { getTranslations } from "next-intl/server";
import { impactRoleKeys, impactRoles } from "@/lib/impact-roles";
import { RoleAvatar } from "@/components/role-avatar";

export async function SolutionSection() {
  const t = await getTranslations("Solution");
  const tRoles = await getTranslations("ImpactRoles");

  return (
    <section id="loesung" className="section-container section-spacing">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
        <div>
          <p className="text-paragraph-small font-medium uppercase tracking-wide text-muted-foreground">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-heading-2 text-foreground">{t("headline")}</h2>
        </div>
        <p className="text-paragraph-large text-muted-foreground">{t("intro")}</p>
      </div>

      <div className="mt-14 space-y-14 sm:mt-16 sm:space-y-16">
        {impactRoleKeys.map((key, index) => {
          const { pillBg, pillFg } = impactRoles[key];
          const reversed = index % 2 === 1;

          return (
            <div
              key={key}
              className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-16 ${
                reversed ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <RoleAvatar role={key} label={tRoles(key)} size="lg" className="mx-auto lg:mx-0" />
              <div className="text-center lg:text-left">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-paragraph-mini font-medium uppercase tracking-wide ${pillBg} ${pillFg}`}
                >
                  {t(`roles.${key}.pillLabel`)}
                </span>
                <h3 className="mt-4 text-heading-3 text-foreground">{t(`roles.${key}.title`)}</h3>
                <p className="mt-3 text-paragraph-regular text-muted-foreground">{t(`roles.${key}.body`)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
