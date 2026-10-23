"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { LogoMark } from "@/components/logo-mark";

// Logo im Header: führt zur Startseite. Liegt man bereits auf der Startseite,
// scrollt der Klick explizit nach oben, statt sich auf das Anker-Verhalten des
// Browsers zu verlassen (der sticky Header bietet keinen verlässlichen Anker).
// Das Scroll-Verhalten (smooth, nur ohne prefers-reduced-motion) steuert das CSS.
export function SiteLogoLink() {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      onClick={(event) => {
        if (pathname !== "/") return;
        event.preventDefault();
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        window.scrollTo({ top: 0 });
      }}
      className="flex items-center gap-2 text-foreground lg:gap-3"
    >
      <LogoMark className="size-7 sm:size-8 lg:size-9" />
      <span className="text-lg font-semibold sm:text-xl lg:text-heading-2">avalis</span>
    </Link>
  );
}
