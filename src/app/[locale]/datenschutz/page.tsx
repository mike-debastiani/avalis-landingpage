import type { ReactNode } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Block = { p: string } | { h: string } | { ul: string[] };
type Section = { id: string; title: string; blocks: Block[] };

const linkClassName = "font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground";

// Externe Verweise der Datenschutzerklärung. Die Linktexte stehen in den
// Übersetzungsdateien (Tags wie <brevo>…</brevo>), nur die Ziele hier.
const EXTERNAL_LINKS = {
  brevo: "https://www.brevo.com/legal/privacypolicy/",
  vercel: "https://vercel.com/legal/privacy-policy",
  google: "https://policies.google.com/privacy",
  edoeb: "https://www.edoeb.admin.ch",
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });
  return { title: t("privacyTitle") };
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Legal");
  const email = (await getTranslations("Contact"))("email");

  const sections = t.raw("privacy.sections") as Section[];

  const richTags = {
    email,
    mail: (chunks: ReactNode) => (
      <a href={`mailto:${email}`} className={linkClassName}>
        {chunks}
      </a>
    ),
    ...Object.fromEntries(
      Object.entries(EXTERNAL_LINKS).map(([tag, href]) => [
        tag,
        (chunks: ReactNode) => (
          <a href={href} rel="noopener noreferrer" className={linkClassName}>
            {chunks}
          </a>
        ),
      ])
    ),
  };

  const rich = (path: string) => t.rich(path, richTags);

  return (
    <div className="section-container section-spacing">
      <div className="max-w-3xl">
        <h1 className="text-heading-2 text-foreground">{t("privacyTitle")}</h1>
        <p className="mt-2 text-paragraph-small text-muted-foreground">{t("privacy.updated")}</p>
        <p className="mt-6 text-paragraph-large text-foreground">{t("privacy.intro")}</p>

        <div className="mt-12 flex flex-col gap-10">
          {sections.map((section, sectionIndex) => (
            <section key={section.id} aria-labelledby={`privacy-${section.id}`} className="flex flex-col gap-4">
              <h2 id={`privacy-${section.id}`} className="text-heading-4 text-foreground">
                {sectionIndex + 1}. {section.title}
              </h2>
              {section.blocks.map((block, blockIndex) => {
                const path = `privacy.sections.${sectionIndex}.blocks.${blockIndex}`;
                if ("h" in block) {
                  return (
                    <h3 key={blockIndex} className="mt-2 text-paragraph-regular font-semibold text-foreground">
                      {block.h}
                    </h3>
                  );
                }
                if ("ul" in block) {
                  return (
                    <ul
                      key={blockIndex}
                      className="flex list-disc flex-col gap-2 pl-6 text-paragraph-regular text-muted-foreground marker:text-foreground"
                    >
                      {block.ul.map((_, itemIndex) => (
                        <li key={itemIndex}>{rich(`${path}.ul.${itemIndex}`)}</li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={blockIndex} className="text-paragraph-regular text-muted-foreground">
                    {rich(`${path}.p`)}
                  </p>
                );
              })}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
