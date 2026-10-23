import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const localeLabels: Record<Locale, string> = {
  de: "DE",
  en: "EN",
};

// Klickflächen 44px (Figma, WCAG 2.2 Target Size); auf Mobile etwas kleiner,
// damit Logo, Umschalter und Button in den Header passen.
export function LanguageSwitcher({
  locale,
  ariaLabel,
  className,
}: {
  locale: Locale;
  ariaLabel: string;
  className?: string;
}) {
  const target = "inline-flex size-8 items-center justify-center text-paragraph-small sm:size-9 lg:size-11";

  return (
    <nav aria-label={ariaLabel} className={cn("flex items-center gap-0.5 lg:gap-1", className)}>
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center gap-0.5 lg:gap-1">
          {index > 0 && (
            <span aria-hidden="true" className="text-xs text-muted-foreground">
              /
            </span>
          )}
          {loc === locale ? (
            <span aria-current="page" className={cn(target, "font-semibold text-foreground")}>
              {localeLabels[loc]}
            </span>
          ) : (
            <Link
              href="/"
              locale={loc}
              className={cn(target, "text-muted-foreground hover:text-foreground")}
            >
              {localeLabels[loc]}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
