import Image from "next/image";
import { impactRoles, type ImpactRoleKey } from "@/lib/impact-roles";
import { cn } from "@/lib/utils";

// Handgezeichnete Rollen-Illustrationen aus Figma (public/avatars/*.svg),
// auf einem grossen, weichen Pastell-Halo in der Rollenfarbe (gleiche Farben
// wie die Pills in der Solution-Section). Das Padding-Verhältnis Halo:Bild
// (~16 %) ist in Figma bei allen Instanzen gleich. Das Bild wird deshalb per
// inset relativ zum Kreis positioniert: Padding-Prozente würden sich auf die
// Breite des Elternelements (und damit auf das Label) beziehen.
const sizes = {
  md: { box: "size-16 sm:size-20 lg:size-24", px: 96 },
  lg: { box: "size-24 sm:size-28 lg:size-32", px: 128 },
  xl: { box: "size-28 sm:size-32 lg:size-40", px: 160 },
  "2xl": { box: "size-32 sm:size-40 lg:size-48", px: 192 },
} as const;

export function RoleAvatar({
  role,
  label,
  size = "md",
  className,
}: {
  role: ImpactRoleKey;
  label: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const { avatarSrc, halo, pillFg } = impactRoles[role];
  const { box, px } = sizes[size];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <span className={cn("relative block overflow-hidden rounded-full", halo, box)}>
        <Image
          src={avatarSrc}
          alt=""
          width={px}
          height={px}
          className="absolute inset-[16%] size-[68%] rounded-full object-cover"
        />
      </span>
      <span className={cn("text-paragraph-small font-medium", pillFg)}>{label}</span>
    </div>
  );
}
