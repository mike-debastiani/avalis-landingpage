import { getTranslations, setRequestLocale } from "next-intl/server";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function BestaetigtPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Confirmed");

  return (
    <div className="section-container section-spacing">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-foreground">
          <CheckCircle2 className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-heading-2 text-foreground">{t("title")}</h1>
        <p className="mt-4 text-paragraph-regular text-muted-foreground">{t("body")}</p>

        {/*
          TODO: Sobald REPORT_DOWNLOAD_URL (Google-Drive-Link, siehe
          docs/03_tech-architecture.md Abschnitt 3) feststeht, hier durch
          einen echten Link ersetzen. Bis dahin bewusst deaktiviert.
        */}
        <Button size="lg" className="mt-8 rounded-full" disabled>
          {t("downloadCta")}
        </Button>
        <p className="mt-3 text-paragraph-mini text-muted-foreground">{t("downloadPending")}</p>
      </div>
    </div>
  );
}
