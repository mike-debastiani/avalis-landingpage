import Image from "next/image";
import { impactRoles, type ImpactRoleKey } from "@/lib/impact-roles";
import { cn } from "@/lib/utils";

// Handgezeichnete Rollen-Illustrationen aus Figma (public/avatars/*.svg),
// mit farbigem Ring zur Rollen-Kennzeichnung (gleiche Farben wie die Pills
// in der Solution-Section).
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
  const { avatarSrc, ring } = impactRoles[role];
  const dimension = size === "lg" ? 112 : 80;

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <span
        className={cn(
          "flex items-center justify-center overflow-hidden rounded-full ring-4",
          ring,
          size === "lg" ? "size-24 sm:size-28" : "size-16 sm:size-20"
        )}
      >
        <Image
          src={avatarSrc}
          alt=""
          width={dimension}
          height={dimension}
          className="size-full rounded-full object-cover"
        />
      </span>
      <span className="text-paragraph-small font-medium text-foreground">{label}</span>
    </div>
  );
}
