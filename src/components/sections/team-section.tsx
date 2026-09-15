import { getTranslations } from "next-intl/server";
import { Card, CardContent } from "@/components/ui/card";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export async function TeamSection() {
  const t = await getTranslations("Team");

  const members = [t("member1Name"), t("member2Name"), t("member3Name")];

  return (
    <section id="team" className="section-container section-spacing">
      <h2 className="max-w-3xl text-heading-2 text-foreground">{t("title")}</h2>
      <p className="mt-6 max-w-3xl text-paragraph-large text-muted-foreground">{t("body")}</p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {members.map((name) => (
          <Card key={name}>
            <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
              <span
                aria-hidden="true"
                className="flex size-16 items-center justify-center rounded-full bg-stone-100 text-heading-4 text-stone-500"
              >
                {initials(name)}
              </span>
              <p className="font-medium text-foreground">{name}</p>
              <p className="text-paragraph-small text-muted-foreground">{t("bioPending")}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
