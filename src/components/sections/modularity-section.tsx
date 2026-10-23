import { getTranslations } from "next-intl/server";
import { PuzzleIcon } from "lucide-react";

export async function ModularitySection() {
  const t = await getTranslations("Modularity");

  return (
    <section className="section-container section-spacing">
      <div className="mx-auto max-w-2xl text-center">
        <div className="flex items-center justify-center gap-3 text-muted-foreground" aria-hidden="true">
          <PuzzleIcon className="size-7 fill-foreground text-foreground" />
          <PuzzleIcon className="size-7 text-muted-foreground" />
          <PuzzleIcon className="size-7 fill-foreground text-foreground" />
        </div>
        <h2 className="mt-6 text-heading-2 text-foreground">{t("title")}</h2>
        <p className="mt-4 text-paragraph-large text-muted-foreground">{t("body")}</p>
      </div>
    </section>
  );
}
