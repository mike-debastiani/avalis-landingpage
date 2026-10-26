import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { SiteLogoLink } from "@/components/site-logo-link";
import { SiteNav } from "@/components/site-nav";
import type { Locale } from "@/i18n/routing";

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations("Header");

  // Absolute Pfade mit Anker, damit die Links auch auf Unterseiten (Abmelden,
  // Datenschutz) zur Startseite führen. Auf der Startseite selbst
  // ist es ein reiner Anker-Sprung (Smooth-Scroll, kein Neuladen).
  const home = `/${locale}`;
  const navItems = [
    { id: "team", href: `${home}#team`, label: t("navTeam") },
    { id: "loesung", href: `${home}#loesung`, label: t("navSolution") },
    { id: "einblick", href: `${home}#einblick`, label: t("navPrototype") },
    { id: "kontakt", href: `${home}#kontakt`, label: t("navContact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background-ghost">
      <div className="section-container flex h-[calc(var(--header-height)-1px)] items-center justify-between gap-4">
        <SiteLogoLink />

        <SiteNav items={navItems} ariaLabel={t("navLabel")} />

        <div className="flex items-center gap-1 sm:gap-2 lg:gap-7">
          <LanguageSwitcher locale={locale} ariaLabel={t("languageLabel")} />
          <Button asChild className="h-9 rounded-full px-3.5 text-sm sm:h-10 sm:px-4 lg:h-12 lg:px-6 lg:text-base">
            <a href={`${home}#registrierung`}>{t("cta")}</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
