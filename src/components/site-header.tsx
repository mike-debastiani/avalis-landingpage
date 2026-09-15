import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/i18n/routing";

export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations("Header");

  const navItems = [
    { href: "#ausgangslage", label: t("navContext") },
    { href: "#research", label: t("navResearch") },
    { href: "#loesung", label: t("navSolution") },
    { href: "#team", label: t("navTeam") },
  ];

  return (
    <header id="top" className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="section-container flex h-16 items-center justify-between gap-4">
        <a href="#top" className="text-paragraph-large font-semibold tracking-tight text-foreground">
          avalis
        </a>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-paragraph-small text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <LanguageSwitcher locale={locale} />
          </div>
          <Button asChild size="sm" className="rounded-full">
            <a href="#registrierung">{t("cta")}</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
