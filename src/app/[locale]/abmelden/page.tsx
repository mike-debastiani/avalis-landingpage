import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { UnsubscribeForm } from "@/components/unsubscribe-form";
import { Link } from "@/i18n/navigation";
import { verifyUnsubscribeParams } from "@/lib/unsubscribe-token";
import type { Locale } from "@/i18n/routing";

// Persönlicher Link aus der Report-Mail: nie indexieren.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ e?: string; t?: string }>;
}) {
  const { locale } = await params;
  const { e, t: token } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("Unsubscribe");

  let email: string | null = null;
  try {
    email = verifyUnsubscribeParams(e, token);
  } catch {
    // UNSUBSCRIBE_SECRET fehlt: wie ein ungültiger Link behandeln.
    email = null;
  }

  return (
    <div className="section-container section-spacing">
      <div className="mx-auto max-w-xl">
        {email ? (
          <UnsubscribeForm email={email} token={token ?? ""} encodedEmail={e ?? ""} />
        ) : (
          <>
            <h1 className="text-title text-foreground">{t("invalidTitle")}</h1>
            <p className="mt-4 text-paragraph-large text-muted-foreground">{t("invalidBody")}</p>
            <Link
              href="/"
              locale={locale}
              className="mt-6 inline-block text-paragraph-regular font-medium text-foreground underline underline-offset-4"
            >
              {t("backToHome")}
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
