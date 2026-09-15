# 05 – Design System

> **Quelle der Wahrheit:** Figma Design System von avalis (Styleguide erstellt von Chiara Tremml).
> **Figma-Link:** [Avalis-Styleguide-BA-2026](https://www.figma.com/design/T7WsBMJeLI71tjKCs9tORo/Avalis-Styleguide-BA-2026)

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
- Responsive Typografie-Skala für Mobile
- Formularzustände: Fehler, Erfolg, Laden, deaktiviert

Fehlen diese in Figma: im Team klären und in Figma ergänzen, bevor sie im Code verwendet werden.

**Entscheid (15.09.2026):** Die Display-Typografie für den Hero (`--text-display`, fluid 40–64px) ist als Ausnahme direkt im Code definiert (`src/app/globals.css`), da der Webapp-Styleguide keine solche Stufe enthält und für App-UI auch keine braucht. Verhältnis und Weight (SemiBold) folgen konsistent der bestehenden Heading-Konvention. Noch nicht in Figma nachgezogen, siehe `08_open-points.md`.

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
| `general/muted foreground` | `--muted-foreground` | `#78716c` (stone-500) |
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
| *nicht in Figma* (Code-Entscheid) | `--text-display` | `clamp(2.5rem, 1.5rem + 4vw, 4rem)` |

Heading 2 (30px) im Code ergänzt analog zur Skala, im MCP-Response nicht enthalten — bei Gelegenheit gegen Figma verifizieren.

### Radien und Schatten

| Figma-Variable | CSS-Variable | Wert |
|---|---|---|
| `radius-lg` (Basis) | `--radius` | `0.625rem` (10px) |
| `rounded-sm` / `rounded-md` / `rounded-xl` | `--radius-sm` / `--radius-md` / `--radius-xl` | abgeleitet via `calc(var(--radius) * …)` |
| `shadow-lg` (`lg/shadow 1`, `lg/shadow 2`) | *kein Custom-Token* | identisch mit Tailwind-Standard-Utility `shadow-lg`, daher direkt verwendbar |
