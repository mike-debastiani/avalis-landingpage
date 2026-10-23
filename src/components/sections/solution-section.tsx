import { getTranslations } from "next-intl/server";
import { impactRoleKeys, impactRoles } from "@/lib/impact-roles";
import { RoleAvatar } from "@/components/role-avatar";
import { SectionIntro } from "@/components/section-intro";
import { cn } from "@/lib/utils";

export async function SolutionSection() {
  const t = await getTranslations("Solution");
  const tRoles = await getTranslations("ImpactRoles");

  return (
    <section id="loesung" className="border-t border-border bg-background-ghost">
      <div className="section-container pb-16 pt-14 sm:pb-20 sm:pt-16 lg:pb-30 lg:pt-28">
        <SectionIntro eyebrow={t("eyebrow")} title={t("headline")} lead={t("intro")} />

        <div className="mt-14 space-y-14 lg:mt-24 lg:space-y-14">
          {impactRoleKeys.map((key, index) => {
            const { pillBg, pillFg } = impactRoles[key];
            const reversed = index % 2 === 1;

            return (
              <div
                key={key}
                className={cn(
                  "flex flex-col items-center gap-8 lg:items-start lg:justify-center lg:gap-16",
                  reversed ? "lg:flex-row-reverse" : "lg:flex-row"
                )}
              >
                <RoleAvatar role={key} label={tRoles(key)} size="lg" />
                <div
                  className={cn(
                    "flex w-full flex-col items-center gap-4 text-center lg:max-w-154 lg:flex-1 lg:items-start lg:text-left",
                    // Figma: unsichtbarer Absatz (74px inkl. Abstand) am Ende der ersten beiden Textspalten
                    index < impactRoleKeys.length - 1 && "lg:pb-18.5"
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-[30px] items-center rounded-2xl px-3 text-paragraph-small font-medium uppercase",
                      pillBg,
                      pillFg
                    )}
                  >
                    {t(`roles.${key}.pillLabel`)}
                  </span>
                  <h3 className="text-title text-foreground">{t(`roles.${key}.title`)}</h3>
                  <p className="text-paragraph-large leading-[1.6] text-muted-foreground">
                    {t(`roles.${key}.body`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
