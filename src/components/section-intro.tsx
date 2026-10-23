import { cn } from "@/lib/utils";

// Wiederkehrende Section-Einleitung aus Figma: links Abschnittslabel + Titel
// (416px), rechts der Lead-Text. Auf Mobile untereinander.
export function SectionIntro({
  eyebrow,
  title,
  lead,
  className,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 lg:grid-cols-[26rem_1fr] lg:gap-20", className)}>
      <div>
        <p className="text-paragraph-small font-medium uppercase text-muted-foreground">{eyebrow}</p>
        <h2 className="mt-5 text-title text-foreground">{title}</h2>
      </div>
      {/* lg:mt-10 = Höhe von Eyebrow (20px) + Abstand (20px): Lead beginnt auf Höhe des Titels */}
      <p className="text-lead text-muted-foreground lg:mt-10">{lead}</p>
    </div>
  );
}
