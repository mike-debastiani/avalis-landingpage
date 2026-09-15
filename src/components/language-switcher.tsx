import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const localeLabels: Record<Locale, string> = {
  de: "DE",
  en: "EN",
};

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  return (
    <nav aria-label="Sprachauswahl" className="flex items-center gap-1 text-paragraph-small">
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center gap-1">
          {index > 0 && <span aria-hidden="true" className="text-stone-300">/</span>}
          {loc === locale ? (
            <span aria-current="page" className="font-medium text-foreground">
              {localeLabels[loc]}
            </span>
          ) : (
            <Link href="/" locale={loc} className="text-muted-foreground hover:text-foreground">
              {localeLabels[loc]}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
