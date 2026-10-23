import Image from "next/image";
import { impactRoles, type ImpactRoleKey } from "@/lib/impact-roles";
import { cn } from "@/lib/utils";

// Handgezeichnete Rollen-Illustrationen aus Figma (public/avatars/*.svg) auf
// einem grossen Halo in der Rollenfarbe. Die Grössen folgen Figma V5 (Hero:
// 294 / 238 / 182px, Solution: 218px) und skalieren responsiv in drei Stufen
// herunter (Mobile / sm / lg / xl = Figma-Wert).
//
// Das Bild wird per inset relativ zum Kreis positioniert: Padding-Prozente
// würden sich auf die Breite des Elternelements (und damit auf das Label)
// beziehen und die Bilder ungleich gross machen. Das Verhältnis Bild:Halo ist
// in Figma durchgehend ~68 % (nur der Hero-Avatar der Fachstellen ~73 %).
const sizes = {
  md: { box: "size-24 sm:size-32 lg:size-36 xl:size-[182px]", px: 182 },
  lg: { box: "size-36 sm:size-44 xl:size-[218px]", px: 218 },
  xl: { box: "size-30 sm:size-40 lg:size-48 xl:size-[238px]", px: 238 },
  "2xl": { box: "size-37 sm:size-50 lg:size-59 xl:size-[294px]", px: 294 },
} as const;

export function RoleAvatar({
  role,
  label,
  size = "md",
  className,
}: {
  role: ImpactRoleKey;
  label?: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const { avatarSrc, halo, labelFg } = impactRoles[role];
  const { box, px } = sizes[size];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <span className={cn("relative block shrink-0 overflow-hidden rounded-full", halo, box)}>
        <Image
          src={avatarSrc}
          alt=""
          width={px}
          height={px}
          className={cn(
            "absolute rounded-full object-cover",
            size === "2xl" ? "inset-[13.6%] size-[72.8%]" : "inset-[16%] size-[68%]"
          )}
        />
      </span>
      {label && (
        <span className={cn("text-center text-paragraph-small font-medium", labelFg)}>{label}</span>
      )}
    </div>
  );
}
