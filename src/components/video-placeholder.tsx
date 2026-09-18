import { Play } from "lucide-react";

export function VideoPlaceholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-border bg-muted"
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border">
        <Play className="size-5 fill-current" aria-hidden="true" />
      </span>
    </div>
  );
}
