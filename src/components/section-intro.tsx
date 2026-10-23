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
      <p className="text-lead text-muted-foreground">{lead}</p>
    </div>
  );
}
