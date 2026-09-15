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
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        {t("skipLink")}
      </a>
      <header className="px-6 py-4">
        <span className="font-semibold">{t("logo")}</span>
      </header>
      <main id="main" className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-semibold">{t("heading")}</h1>
        <p className="mt-4 text-base">{t("body")}</p>
      </main>
      <footer className="px-6 py-4 text-center text-sm">{t("footer")}</footer>
    </>
  );
}
