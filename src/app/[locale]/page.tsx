import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Placeholder");

  return (
    <div className="section-container section-spacing text-center">
      <p className="text-paragraph-large text-muted-foreground">{t("body")}</p>
    </div>
  );
}
