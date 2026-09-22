import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16">
      <h1 className="text-2xl font-semibold text-foreground">{t("privacyTitle")}</h1>
      <p className="mt-4 text-muted-foreground">{t("pending")}</p>
    </div>
  );
}
