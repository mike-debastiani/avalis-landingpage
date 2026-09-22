import { LanguageSwitcher } from "@/components/language-switcher";
import type { Locale } from "@/i18n/routing";

export function SiteHeader({ locale }: { locale: Locale }) {
  return (
    <header id="top" className="border-b border-border">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6">
        <a href="#top" className="font-semibold tracking-tight text-foreground">
          avalis
        </a>
        <LanguageSwitcher locale={locale} />
      </div>
    </header>
  );
}
