import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LogoMark } from "@/components/logo-mark";
import type { Locale } from "@/i18n/routing";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-border">
      <div className="section-container flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <LogoMark className="size-6" />
            <span>avalis</span>
          </div>
          <p className="mt-2 max-w-sm text-paragraph-small text-muted-foreground">{t("tagline")}</p>
          <p className="mt-1 text-paragraph-mini text-muted-foreground">{t("legalPending")}</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <nav aria-label="Rechtliches" className="flex gap-4 text-paragraph-small">
            <Link href="/impressum" locale={locale} className="text-muted-foreground hover:text-foreground">
              {t("imprint")}
            </Link>
            <Link href="/datenschutz" locale={locale} className="text-muted-foreground hover:text-foreground">
              {t("privacy")}
            </Link>
          </nav>
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </footer>
  );
}
