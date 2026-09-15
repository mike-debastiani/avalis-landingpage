# CLAUDE.md

## Projekt

Landingpage (Onepager) für das Bachelorprojekt **avalis**, eine digitale Lösung für Nachteilsausgleichsprozesse (NTA) an Schweizer Hochschulen. Die Seite erklärt Problem, Research und Lösung von avalis und bewegt Fachpersonen zur Registrierung per E-Mail (Research Report, Updates). Launch spätestens 21.10.2026, Vorstellung am Netzwerktreffen für Chancengleichheit am 23.10.2026.

Vollständiger Kontext: [`docs/README.md`](docs/README.md), Einstiegspunkt [`docs/00_setup-guide.md`](docs/00_setup-guide.md).

## Tech-Stack

Next.js (App Router, TypeScript strict) · Tailwind CSS mit Figma-Tokens · next-intl (`/de`, `/en`) · Zod · Brevo (Double-Opt-in, kein eigenes SDK) · Vercel · Vercel Web Analytics (cookielos). Details: [`docs/03_tech-architecture.md`](docs/03_tech-architecture.md).

**Befehle** (sobald das Next.js-Projekt existiert): `npm run dev`, `npm run build`, `npm run lint`, `npm run typecheck`.

## Harte Regeln

- Nur Farben, Schriften, Abstände und Radien aus dem Figma Design System verwenden. Keine erfundenen Werte. Fehlt ein Token oder eine Komponente: stoppen und nachfragen. Siehe [`docs/05_design-system.md`](docs/05_design-system.md).
- Keine Secrets im Code, in Commits oder in Docs. Nur `process.env`, serverseitig.
- Alle sichtbaren Texte über die Übersetzungsdateien (`messages/de.json`, `messages/en.json`), keine hartcodierten Strings in Komponenten.
- Deutsch in Schweizer Rechtschreibung («ss» statt «ß»).
- Barrierefreiheit nach WCAG 2.2 AA ist Pflicht, nicht optional.
- Mobile first.
- Keine Fakten, Zahlen oder Zitate zu avalis erfinden. Quelle ist [`docs/02_avalis-context.md`](docs/02_avalis-context.md) und [`docs/06_content-draft.md`](docs/06_content-draft.md).
- Die Seite muss **100% responsive** sein: auf allen gängigen Breakpoints (Mobile ~360px, Tablet ~768px, Desktop ~1280px+) ohne horizontales Scrollen, Layout-Brüche oder abgeschnittene Inhalte. Gängige Web-Best-Practices sind Pflicht: semantisches HTML, `next/image` für Bilder, keine Layout-Shifts, wiederverwendete Section-Container/-Spacing-Utilities statt Wertwiederholung.

## Git-Workflow (verbindlich)

`main` ist geschützt und immer deploybar.

- Niemals direkt auf `main` committen oder pushen.
- Jede Aufgabe auf einem eigenen Branch, erstellt vom aktuellen `main`.
- Branch-Namen: `feat/…`, `fix/…`, `chore/…`, `docs/…`, kurz und sprechend (z.B. `feat/hero-section`).
- Kleine, thematisch saubere Commits mit Conventional-Commit-Messages (`feat:`, `fix:`, `chore:`, `docs:`).
- Vor dem Pull Request: Lint, Typecheck und Build ohne Fehler (sobald das Projekt existiert).
- Branch mit `git push -u origin <branch>` pushen, Pull Request mit `gh pr create` gegen `main` erstellen.
- Pull-Request-Beschreibung auf Deutsch mit: Was wurde geändert, Warum, Wie testen (inkl. Hinweis auf die Vercel Preview), betroffene Docs, offene Punkte.
- Niemals mergen, rebasen, force-pushen oder Branches löschen. Der Merge erfolgt manuell auf GitHub.
- Nach dem Erstellen des Pull Requests: Link ausgeben und stoppen.
- Bei gewünschten Änderungen an einem offenen Pull Request: auf demselben Branch weiterarbeiten und pushen, keinen neuen Pull Request erstellen.

Details: [`docs/00_setup-guide.md`](docs/00_setup-guide.md) Abschnitt 6.

## Sicherheit

- Niemals `.env`- oder `.env.local`-Dateien lesen, erstellen oder committen. Nur `.env.example` ohne Werte.
- Keine Secrets in Code, Commits, Pull-Request-Texten oder Docs.
- `.claude/settings.json` nicht verändern.

## Arbeitsweise

- Eine Aufgabe pro Session.
- Zuerst Plan Mode, erst nach Freigabe umsetzen.
- Kleine Commits.
- Jede Änderung in der Vercel Preview prüfen.

## Definition of Done (pro Aufgabe)

- Typecheck und Lint ohne Fehler.
- Auf Mobile und Desktop geprüft.
- Tastaturbedienung geprüft.
- Beide Sprachen (DE, EN) vorhanden.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
