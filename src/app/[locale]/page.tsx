import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/hero-section";
import { TeamSection } from "@/components/sections/team-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { RegistrationSection } from "@/components/sections/registration-section";
import { ContactSection } from "@/components/sections/contact-section";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <TeamSection />
      <SolutionSection />
      <RegistrationSection locale={locale} />
      <ContactSection />
    </>
  );
}
