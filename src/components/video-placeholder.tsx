import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

// Wiederkehrendes Figma-Muster (Team- und Einblick-Section): Format-Label
// oben links, Status oben rechts, Icon+Titel+Hinweis mittig, inaktive
// Player-Leiste unten (Play, Zeitleiste, CC). Rein dekorativ, kein
// funktionierender Player.
export function VideoPlaceholder({
  formatLabel,
  statusLabel,
  title,
  subtitle,
  ccLabel,
  className,
}: {
  formatLabel: string;
  statusLabel: string;
  title: string;
  subtitle: string;
  ccLabel: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${title}. ${subtitle}`}
      className={cn(
        "flex aspect-video w-full flex-col justify-between rounded-2xl border border-dashed border-border bg-muted p-4 sm:p-6",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2 text-paragraph-mini text-muted-foreground sm:text-paragraph-small">
        <span>{formatLabel}</span>
        <span>{statusLabel}</span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
        <span className="flex size-10 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border sm:size-12">
          <Play className="size-4 fill-current sm:size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-paragraph-regular font-medium text-foreground sm:text-paragraph-large">{title}</p>
          <p className="mt-1 text-paragraph-small text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-muted-foreground" aria-hidden="true">
        <Play className="size-4 shrink-0 fill-current" />
        <span className="h-px flex-1 bg-border" />
        <span className="flex h-6 shrink-0 items-center justify-center rounded border border-border px-1.5 text-[10px] font-medium">
          {ccLabel}
        </span>
      </div>
    </div>
  );
}
