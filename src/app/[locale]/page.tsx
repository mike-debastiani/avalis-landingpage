import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Placeholder");

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-24 text-center">
      <p className="text-muted-foreground">{t("body")}</p>
    </div>
  );
}
