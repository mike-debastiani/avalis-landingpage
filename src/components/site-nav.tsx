"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type NavItem = { id: string; href: string; label: string };

// Reihenfolge entspricht der Seite von oben nach unten. Jede Section gehört zu
// höchstens einem Navigationspunkt: Die Modularitäts-Section ergänzt die
// Lösung, Hero und Registrierung haben (bewusst) keinen eigenen Menüpunkt.
const SECTION_TO_NAV: ReadonlyArray<readonly [id: string, nav: string | null]> = [
  ["hero", null],
  ["team", "team"],
  ["loesung", "loesung"],
  ["modularitaet", "loesung"],
  ["einblick", "einblick"],
  ["registrierung", null],
  ["kontakt", "kontakt"],
];

// Nach einem Klick ignoriert das Scroll-Spy die Zwischenstationen der
// Scroll-Animation, sonst würde die Hervorhebung über alle dazwischen
// liegenden Menüpunkte flackern. Die Sperre endet, sobald der Browser
// SCROLL_IDLE_MS lang nicht mehr gescrollt hat (unabhängig von der Dauer der
// Animation und ohne Abhängigkeit von `scrollend`-Unterstützung).
const SCROLL_IDLE_MS = 200;

// Die Menüpunkte folgen immer der Reihenfolge der Sections auf der Seite, egal
// in welcher Reihenfolge sie übergeben werden.
function sortBySectionOrder(items: NavItem[]): NavItem[] {
  const position = (id: string) => SECTION_TO_NAV.findIndex(([, nav]) => nav === id);
  return [...items].sort((a, b) => position(a.id) - position(b.id));
}

export function SiteNav({ items, ariaLabel }: { items: NavItem[]; ariaLabel: string }) {
  const [active, setActive] = useState<string | null>(null);
  const lockRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      if (lockRef.current) return;

      // Nur auf der Startseite gibt es Sections, auf Unterseiten bleibt die
      // Navigation ohne Hervorhebung.
      if (!document.getElementById("hero")) {
        setActive(null);
        return;
      }

      const header = document.querySelector("header");
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const probe = headerHeight + window.innerHeight * 0.25;

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(SECTION_TO_NAV[SECTION_TO_NAV.length - 1][1]);
        return;
      }

      let current: string | null = null;
      for (const [id, nav] of SECTION_TO_NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = nav;
      }
      setActive(current);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    const startIdleTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        lockRef.current = false;
        schedule();
      }, SCROLL_IDLE_MS);
    };

    const onScroll = () => {
      if (lockRef.current) startIdleTimer();
      schedule();
    };

    schedule();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const handleClick = (id: string) => {
    setActive(id);
    lockRef.current = true;
    // Falls das Ziel schon sichtbar ist und gar nicht gescrollt wird.
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      lockRef.current = false;
    }, SCROLL_IDLE_MS * 2);
  };

  return (
    <nav aria-label={ariaLabel} className="hidden items-center gap-1 md:flex">
      {sortBySectionOrder(items).map((item) => {
        const isActive = active === item.id;
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={() => handleClick(item.id)}
            aria-current={isActive ? "location" : undefined}
            className={cn(
              "relative inline-flex h-11 items-center justify-center px-3 text-paragraph-small transition-colors lg:min-w-21",
              "after:absolute after:inset-x-3 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-foreground after:transition-transform",
              isActive
                ? "text-foreground after:scale-x-100"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
