import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/hero-section";
import { ContextSection } from "@/components/sections/context-section";
import { ResearchSection } from "@/components/sections/research-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { RolesSection } from "@/components/sections/roles-section";
import { TeamSection } from "@/components/sections/team-section";
import { RegistrationSection } from "@/components/sections/registration-section";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <ContextSection />
      <ResearchSection />
      <SolutionSection />
      <RolesSection />
      <TeamSection />
      <RegistrationSection locale={locale as Locale} />
    </>
  );
}
