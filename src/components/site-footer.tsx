import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/i18n/routing";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations("Footer");

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold text-foreground">avalis</p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <nav aria-label="Rechtliches" className="flex gap-4 text-sm">
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
