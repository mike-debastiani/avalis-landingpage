import { getTranslations } from "next-intl/server";

export async function RegistrationSection() {
  const t = await getTranslations("Sections");

  return (
    <section id="registrierung" className="section-container section-spacing">
      <h2 className="text-heading-2 text-foreground">{t("registrationHeading")}</h2>
      <p className="mt-4 text-paragraph-regular text-muted-foreground">{t("pending")}</p>
    </section>
  );
}
