import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PlaceholderBox({
  icon: Icon,
  label,
  className,
}: {
  icon: LucideIcon;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex items-center justify-center rounded-2xl border border-dashed border-border bg-muted",
        className
      )}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border">
        <Icon className="size-5" aria-hidden="true" />
      </span>
    </div>
  );
}
