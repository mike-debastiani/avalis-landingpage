import { impactRoles, type ImpactRoleKey } from "@/lib/impact-roles";
import { cn } from "@/lib/utils";

// Vereinfachter Ersatz für die handgezeichneten Rollen-Illustrationen aus
// Figma (farbiger Kreis + Icon statt Linien-Avatar) – bewusste Vereinfachung
// für diese Version, siehe docs/05_design-system.md Abschnitt 7.
export function RoleAvatar({
  role,
  label,
  size = "md",
  className,
}: {
  role: ImpactRoleKey;
  label: string;
  size?: "md" | "lg";
  className?: string;
}) {
  const { icon: Icon, circle } = impactRoles[role];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <span
        role="img"
        aria-label={label}
        className={cn(
          "flex items-center justify-center rounded-full",
          circle,
          size === "lg" ? "size-24 sm:size-28" : "size-16 sm:size-20"
        )}
      >
        <Icon className={size === "lg" ? "size-9 sm:size-10" : "size-6 sm:size-7"} aria-hidden="true" />
      </span>
      <span className="text-paragraph-small font-medium text-foreground">{label}</span>
    </div>
  );
}
