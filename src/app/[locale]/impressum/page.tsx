import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");

  return (
    <div className="section-container section-spacing">
      <h1 className="text-heading-2 text-foreground">{t("imprintTitle")}</h1>
      <p className="mt-4 text-paragraph-regular text-muted-foreground">{t("pending")}</p>
    </div>
  );
}
