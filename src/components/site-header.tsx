import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LogoMark } from "@/components/logo-mark";
import { SiteNav } from "@/components/site-nav";
import type { Locale } from "@/i18n/routing";

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations("Header");

  const navItems = [
    { href: "#team", label: t("navTeam") },
    { href: "#loesung", label: t("navSolution") },
    { href: "#einblick", label: t("navPrototype") },
    { href: "#kontakt", label: t("navContact") },
  ];

  return (
    <header
      id="top"
      className="sticky top-0 z-40 border-b border-border bg-background-ghost"
    >
      <div className="section-container flex h-[calc(var(--header-height)-1px)] items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 text-foreground lg:gap-3">
          <LogoMark className="size-7 sm:size-8 lg:size-9" />
          <span className="text-lg font-semibold sm:text-xl lg:text-heading-2">avalis</span>
        </a>

        <SiteNav items={navItems} ariaLabel={t("navLabel")} />

        <div className="flex items-center gap-1 sm:gap-2 lg:gap-7">
          <LanguageSwitcher locale={locale} ariaLabel={t("languageLabel")} />
          <Button asChild className="h-9 rounded-full px-3.5 text-sm sm:h-10 sm:px-4 lg:h-12 lg:px-6 lg:text-base">
            <a href="#registrierung">{t("cta")}</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
