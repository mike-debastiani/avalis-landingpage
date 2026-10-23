import Image from "next/image";
import { getTranslations } from "next-intl/server";

// Drei Puzzle-Teile aus Figma (Material-Icon "extension", Node 10099:3575),
// leicht gedreht bzw. gespiegelt als Hinweis auf Modularität.
const pieces = [
  { src: "/icons/extension-1.svg", rotate: "rotate-[12.48deg]" },
  { src: "/icons/extension-2.svg", rotate: "rotate-180" },
  { src: "/icons/extension-3.svg", rotate: "rotate-[14.75deg]" },
];

export async function ModularitySection() {
  const t = await getTranslations("Modularity");

  return (
    <section id="modularitaet" className="border-y border-border bg-background-ghost">
      <div className="section-container section-spacing">
        <div className="mx-auto flex flex-col items-center text-center">
          <div className="flex items-start gap-2" aria-hidden="true">
            {pieces.map((piece) => (
              <span key={piece.src} className="flex size-14 items-center justify-center">
                <Image src={piece.src} alt="" width={48} height={48} className={piece.rotate} />
              </span>
            ))}
          </div>
          <h2 className="mt-4 max-w-154 text-title text-foreground">{t("title")}</h2>
          <p className="mt-4 max-w-198 text-lead text-muted-foreground">{t("body")}</p>
        </div>
      </div>
    </section>
  );
}
