import { getTranslations } from "next-intl/server";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-heading-2 text-foreground">{t("title")}</h2>
        <p className="mt-4 text-paragraph-large text-muted-foreground">{t("body")}</p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {members.map((name) => (
          <Card key={name} className="rounded-2xl">
            <CardContent className="flex flex-col items-center gap-3 pt-6 text-center">
              <Avatar className="size-16">
                <AvatarFallback className="text-heading-4 bg-stone-100 text-stone-500">
                  {initials(name)}
                </AvatarFallback>
              </Avatar>
              <p className="font-medium text-foreground">{name}</p>
              <p className="text-paragraph-small text-muted-foreground">{t("bioPending")}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
