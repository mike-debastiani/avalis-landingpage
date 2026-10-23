import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LogoMark } from "@/components/logo-mark";
import type { Locale } from "@/i18n/routing";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations("Footer");
  const tHeader = await getTranslations("Header");

  return (
    <footer className="border-t border-border bg-background">
      <div className="section-container flex flex-col gap-8 pb-12 pt-14 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-foreground">
            <LogoMark className="size-9" />
            <span className="text-heading-2 font-semibold">avalis</span>
          </div>
          <p className="text-paragraph-small text-muted-foreground">{t("tagline")}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-7 gap-y-1">
          <nav aria-label={t("legalLabel")} className="flex items-center gap-7 text-paragraph-small">
            <Link href="/impressum" locale={locale} className="inline-flex h-11 items-center text-foreground hover:text-muted-foreground">
              {t("imprint")}
            </Link>
            <Link href="/datenschutz" locale={locale} className="inline-flex h-11 items-center text-foreground hover:text-muted-foreground">
              {t("privacy")}
            </Link>
          </nav>
          <LanguageSwitcher locale={locale} ariaLabel={tHeader("languageLabel")} />
        </div>
      </div>
    </footer>
  );
}
