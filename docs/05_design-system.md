# 05 – Design System

> **Quelle der Wahrheit:** Figma Design System von avalis (Styleguide erstellt von Chiara Tremml).
> **Figma-Link (Styleguide/Komponenten/Raw-Tokens):** [Avalis-Styleguide-BA-2026](https://www.figma.com/design/T7WsBMJeLI71tjKCs9tORo/Avalis-Styleguide-BA-2026)
> **Figma-Link (konkrete Landingpage, Stand 20.10.2026, nicht final):** [Avalis-Landingpage](https://www.figma.com/design/WRJ76gBGDPxE8gJXf7VUY9/Avalis-Landingpage)
>
> **Zwei Files, zwei Rollen:** Das Styleguide-File liefert die rohen Tokens (Farben, Typografie, Radien, Basiskomponenten) und bleibt verbindlich für deren Werte. Das Landingpage-File zeigt, **wie** diese Tokens auf der konkreten Seite eingesetzt werden (Layout, Hierarchie, welche Rollenfarbe wo, welche Komponente an welcher Stelle) – siehe Abschnitt 7. Bei Widerspruch zwischen den Files: Werte aus dem Styleguide-File, Anwendung/Layout aus dem Landingpage-File.
>
> **Aktueller Code-Stand:** `src/app/globals.css` wurde im Rahmen des kompletten Projekt-Neuaufbaus auf die reinen shadcn-Neutral-Defaults zurückgesetzt (keine Figma-Tokens mehr im Code). Das Token-Mapping in Abschnitt 6 bleibt die Grundlage für den nächsten Anlauf, muss aber neu in den Code übertragen werden.

---

## 1. Grundregel

Die Landingpage verwendet **ausschliesslich** Tokens und Komponenten aus dem Figma Design System. Claude Code liest diese über den **Figma MCP** aus.

- Keine erfundenen Farben, Schriftgrössen, Abstände, Radien oder Schatten.
- Fehlt ein Token oder eine Komponente, die für die Landingpage nötig ist: **stoppen und nachfragen**, keinen Ersatz erfinden.
- Werte aus diesem File sind nur Orientierung. Verbindlich ist Figma.

## 2. Bekannt aus der Präsentation (zur Orientierung)

- **Schrift:** DM Sans
- **Charakter:** klar, gut lesbar, funktional, ruhig, modern, unaufgeregt
- **Farbskalen (Raw Colors):** u.a. Stone, Blue, Sky, Yellow, Purple, jeweils in Abstufungen (50, 100, 200 …)
- **Rollenfarben im Prozess:** Grün für Studierende, Blau für Fachstelle, Lila für Entscheidungsinstanz
- **Komponenten:** u.a. Button (Primary, Secondary, Outline …), Switch Group, Charts, Data Table
- **Logo:** avalis-Logo in Schwarz und Weiss, mit und ohne Schriftzug
- **Illustrationen:** Rollen-Avatare (Studierende Person, Fachstelle, Entscheidungsinstanz) im Schwarz-Weiss-Linienstil

## 3. Vorgehen mit dem Figma MCP

1. **Tokens auslesen:** Farben, Typografie, Spacing, Radien, Schatten als Figma-Variablen abfragen.
2. **Übersetzen:** In `src/styles/globals.css` als CSS-Variablen anlegen (semantische Namen, z.B. `--color-text-primary`, darunter Referenz auf Raw Colors) und im Tailwind-Theme verfügbar machen.
3. **Mapping dokumentieren:** Tabelle Figma-Variable → CSS-Variable am Ende dieses Files ergänzen.
4. **Basiskomponenten bauen:** Button, Link, Input, Select, Checkbox, Card, Section, Container, Badge. Jede einzeln gegen Figma prüfen (Screenshot-Vergleich über den MCP).
5. **Sektionen zusammensetzen:** Erst wenn die Basiskomponenten stehen.

## 4. Landingpage-spezifische Anforderungen

Das Design System wurde für eine Web-Applikation erstellt. Für eine Landingpage braucht es möglicherweise zusätzlich:

- Grössere Überschriften (Display-Grössen) für den Hero
- Sektionsabstände auf Seitenebene
- Responsive Typografie-Skala für Mobile — **100% responsive**, geprüft auf Mobile (~360px), Tablet (~768px) und Desktop (~1280px+), kein horizontales Scrollen, keine Layout-Brüche
- Formularzustände: Fehler, Erfolg, Laden, deaktiviert

Fehlen diese in Figma: im Team klären und in Figma ergänzen, bevor sie im Code verwendet werden.

**Entscheid (15.09.2026):** Die Display-Typografie für den Hero (`--text-display`, fluid 28–68px, auf Mobile steiler, damit der Hero-Titel nicht umbricht; ebenso `--text-title-xl` 48px, `--text-title` 44px, `--text-lead` 22px mit Desktop-Werten exakt wie in Figma V5) ist als Ausnahme direkt im Code definiert (`src/app/globals.css`), da der Webapp-Styleguide keine solche Stufe enthält und für App-UI auch keine braucht. Verhältnis und Weight (SemiBold) folgen konsistent der bestehenden Heading-Konvention. Noch nicht in Figma nachgezogen, siehe `08_open-points.md`.

## 5. Barrierefreiheit (verbindlich)

Die Seite richtet sich an ein Netzwerk für Chancengleichheit. Barrierefreiheit ist deshalb Kernanforderung.

- WCAG 2.2 AA: Farbkontrast Text mindestens 4.5:1, grosse Schrift und UI-Elemente mindestens 3:1. **Kontraste der Figma-Farben prüfen**, besonders helle Töne wie Sky und Yellow auf Weiss.
- Information nie nur über Farbe vermitteln (z.B. Rollenfarben immer mit Text).
- Sichtbarer Fokuszustand für alle interaktiven Elemente.
- Semantisches HTML: eine `h1`, logische Überschriftenhierarchie, Landmarks (`header`, `main`, `footer`, `nav`).
- «Zum Inhalt springen»-Link.
- Alle Formularfelder mit sichtbaren Labels, Fehlermeldungen mit Feld verknüpft.
- Alt-Texte für inhaltliche Bilder, dekorative Bilder mit leerem `alt`.
- `prefers-reduced-motion` respektieren, keine automatisch abspielenden Animationen.
- Touch-Ziele mindestens 44 × 44 px.
- Text bis 200 % zoombar ohne Layoutbruch.

## 6. Token-Mapping

Ausgelesen via Figma MCP (`get_variable_defs`, Node `8122:54610`) und gegen den bestehenden Webapp-Prototyp (`nta-tool-prototype`, `app/design-tokens/high-fidelity-*.css`) verifiziert — beide Quellen stimmten exakt überein. Umgesetzt in `src/app/globals.css`.

### Graustufen (Stone) — neutrale UI-Basis

| Figma-Variable | CSS-Variable | Wert |
|---|---|---|
| `Graustufen (Stone)/50` | `--stone-50` / `--color-stone-50` | `#fafaf9` |
| — | `--stone-100` / `--color-stone-100` | `#f5f5f4` |
| — | `--stone-150` / `--color-stone-150` | `#eeeceb` |
| — | `--stone-200` / `--color-stone-200` | `#e7e5e4` |
| `general/border` | `--stone-250` / `--color-stone-250` | `#dedbd9` |
| — | `--stone-300` … `--stone-950` | siehe `src/app/globals.css` |

### Semantische Basis-Tokens (Light)

| Figma-Variable | CSS-Variable | Wert |
|---|---|---|
| `general/foreground` | `--foreground` / `--color-foreground` | `#1c1917` (stone-900) |
| `general/muted foreground` | `--muted-foreground` | `#57534e` (stone-600), entspricht in der Landingpage `general/border-strong` (Sekundärtext, Placeholder). Bis 23.10.2026 stand hier `#78716c` (stone-500), das in Figma V5 nicht vorkommt |
| `general/background-ghost` | `--background-ghost` | `#ffffff`, Header und helle Sections (Team, Lösung, Einblick, Kontakt) |
| `general/border` | `--border` | `#dedbd9` (stone-250) |
| `unofficial/body background` | `--background` | `#ffffff` |
| — | `--primary` | `#1c1917` (stone-900) |
| — | `--primary-foreground` | `#fafaf9` (stone-50) |
| `badge/neutral/background` | `--secondary` / `--muted` | `#f5f5f4` (stone-100) |
| `general/background ghost` | `--accent` | `#f5f5f5` |
| `badge/attention/foreground` (abgelehnt-500 im Prototyp) | `--destructive` | `#ef4444` |

### Rollenfarben (für "Wirkung pro Rolle")

| Figma-Variable | CSS-Variable | Basiswert (500) |
|---|---|---|
| `badge/review/foreground` + `/background` | `--beratung-*` / `--color-beratung-*` (Fachstelle, Blau) | `#227bd5` |
| `badge/decision/foreground` + `/background` | `--in-decision-*` / `--color-in-decision-*` (Entscheidungsinstanz, Lila) | `#985cf6` |
| — (Prototyp: `bewilligt-*`) | `--bewilligt-*` / `--color-bewilligt-*` (Studierende, Grün) | `#22c563` |

Nicht übernommen: die vier reinen App-Workflow-Paletten `Entwurf`, `In-Review`, `Anpassung`, `Abgelehnt` — kein Bezug zur Landingpage.

### Typografie

| Figma-Variable | CSS-Variable | Wert |
|---|---|---|
| `heading 1/font-size` + `/line-height` | `--heading-1-size` / `--heading-1-line-height` | `3rem` / `3rem` |
| `heading 3/font-size` + `/line-height` | `--heading-3-size` / `--heading-3-line-height` | `1.5rem` / `1.8rem` |
| `paragraph/large/font-size` + `/line-height` | `--paragraph-large-size` / `-line-height` | `1.125rem` / `1.6875rem` |
| `paragraph/regular/font-size` + `/line-height` | `--paragraph-regular-size` / `-line-height` | `1rem` / `1.5rem` |
| `paragraph/small/font-size` + `/line-height` | `--paragraph-small-size` / `-line-height` | `0.875rem` / `1.25rem` |
| `paragraph/mini/font-size` + `/line-height` | `--paragraph-mini-size` / `-line-height` | `0.75rem` / `1rem` |
| `font definitions/font-family-body` | `--font-dm-sans` (via `next/font/google` in `layout.tsx`) | DM Sans |
| *nicht in Figma* (Code-Entscheid) | `--text-display` | `clamp(1.75rem, min(1.5rem + 4vw, 10.3vw - 0.3rem), 4.25rem)` (68px), Zeilenhöhe 1.08. Weitere Landingpage-Stufen: `--text-title-xl` (48px, 1.12), `--text-title` (44px, 1.15), `--text-lead` (22px, 1.55) |

Heading 2 (30px) im Code ergänzt analog zur Skala, im MCP-Response nicht enthalten — bei Gelegenheit gegen Figma verifizieren.

### Radien und Schatten

| Figma-Variable | CSS-Variable | Wert |
|---|---|---|
| `radius-lg` (Basis) | `--radius` | `0.625rem` (10px) |
| `rounded-sm` / `rounded-md` / `rounded-xl` | `--radius-sm` / `--radius-md` / `--radius-xl` | abgeleitet via `calc(var(--radius) * …)` |
| `shadow-lg` (`lg/shadow 1`, `lg/shadow 2`) | *kein Custom-Token* | identisch mit Tailwind-Standard-Utility `shadow-lg`, daher direkt verwendbar |

## 7. Landingpage-spezifische visuelle Muster (aus dem Avalis-Landingpage-File)

Beobachtet im Figma-File «Avalis-Landingpage» (Node `10067:2049`), noch nicht im Code umgesetzt. Exakte Tokens (Farbwerte, Gradient-Stops, Abstände) vor der Umsetzung live über den Figma MCP auslesen, nicht aus den Screenshots abschätzen.

- **Markenakzent als Farbverlauf:** Logo-Icon und ein einzelnes hervorgehobenes Wort im Hero-H1 («alle») nutzen einen Blau-Grün-Lila-Farbverlauf (dieselbe Farbfamilie wie die drei Rollenfarben). Bewusst sparsam eingesetzt, nicht grossflächig.
- **Rollenfarben live bestätigt:** Die Rollen-Pills in der «Was avalis ist und löst»-Section und die Rollenkreise im Hero nutzen exakt die bestehenden Tokens `bewilligt` (Studierende, Grün), `beratung` (Fachstellen, Blau), `in-decision` (Entscheidungsinstanzen, Lila). Kein neues Mapping nötig.
- **Registrierungs-Section invertiert:** Einzige Section mit dunklem/invertiertem Hintergrund (helle Schrift, weisse Formular-Karte darauf). Alle anderen Sections bleiben hell/neutral. Macht die Section bewusst zur visuell stärksten der Seite, ohne zusätzliche Farbe einzuführen.
- **Rollenillustrationen:** Schwarz-Weiss-Linienstil-Avatare (siehe Abschnitt 2), in der Landingpage in farbigen Kreisen (Rollenfarbe als Hintergrund) freigestellt.
- **Modularitäts-Icon-Set:** Drei organische «Puzzleteil»-Formen als Icon-Trio für die Anpassbarkeits-Aussage (S5 in `06_page-structure.md`). Noch nicht im Styleguide-File als eigenständige Komponente identifiziert – beim nächsten Figma-Durchgang klären, ob es eine Icon-Komponente dafür gibt oder ob es Illustration ist.
- **Video-Platzhalter-Muster (wiederkehrend, zwei Mal verwendet):** Box im Format 16:9, oben links Format-Label («VIDEO · 16:9»), oben rechts Status («Platzhalter · nicht abspielbar»), mittig Icon + Titel + Hinweistext, unten eine (inaktive) Player-Leiste mit Play-Button, Zeitleiste und CC-Untertitel-Control. Als wiederverwendbare Komponente bauen, nicht pro Section neu.
- **Schweizer-Kantonskarte:** Neues, spezifisches Visual in der Registrierungs-Section («Interaktive Karte aller teilnehmenden Hochschulen»), Kantone grün eingefärbt je nach Teilnahme. Braucht echte Geodaten/Institutionszuordnung, siehe `08_open-points.md`. Keine erfundene Kartendarstellung bauen, bevor die Datengrundlage steht.

## Ergänzungen vom 23.10.2026 (Abgleich mit Figma V5)

- **Container:** Content-Breite 1200px (`.section-container` = `max-w-324`, inkl. 2 × 48px Padding), Section-Abstände 120px (`.section-spacing`), Hero/Registrierung 112px, Kontakt 104px.
- **Schrift:** DM Sans mit `opsz`-Achse (`next/font`, `axes: ["opsz"]`). Figma setzt grosse Überschriften mit automatischer optischer Grösse; ohne die Achse waren sie ~9 % zu breit.
- **Klassen-Merger:** `cn` (`src/lib/utils.ts`) kennt die eigenen Typo-Tokens als Schriftgrössen. Ohne das verwirft er z. B. `text-title`, sobald `text-foreground` folgt.
- **Bewusste Kontrast-Abweichungen von Figma (WCAG AA, kleiner Text):** Studierenden-Label im Hero `bewilligt-800` statt `green/500` (~2:1); Fachstellen-Pill `beratung-600` statt `beratung-500` (~3.6:1, neu ~4.8:1).
- **Header-Navigation:** Scroll-Spy mit Unterstreichung des aktiven Punkts (`aria-current="location"`), Smooth-Scroll nur bei `prefers-reduced-motion: no-preference`, `scroll-padding-top` = Header-Höhe (`--header-height`).
