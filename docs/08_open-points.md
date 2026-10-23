# 08 – Offene Punkte und Entscheidungen

> Laufend nachführen. Erledigte Punkte in «Entschieden» verschieben, mit Datum.

---

## Offen

| # | Thema | Was fehlt | Wer | Bis |
|---|---|---|---|---|
| 2 | Brevo | Liste anlegen, Listen-ID | Mike | 04.10. |
| 3 | Brevo | Attribute `HOCHSCHULE`, `ROLLE`, `SOURCE` anlegen | Mike | 04.10. |
| 4 | Brevo | Ein Double-Opt-in-Template (Deutsch), Template-ID | Team | 11.10. |
| 5 | Brevo | Neuer API-Key, nur in Vercel und `.env.local` hinterlegt; IP-Sperre deaktiviert | Mike | 20.09. |
| 6 | Vercel | Projekt-URL für `NEXT_PUBLIC_SITE_URL` | Mike | 20.09. |
| 7 | Domain | Domain kaufen, bei Vercel verbinden, Absender-Domain in Brevo verifizieren (SPF, DKIM, DMARC) | Team | 04.10. |
| 8 | Research Report | Google-Drive-Link, Freigabe «Jeder mit dem Link» prüfen | Team | 11.10. |
| 9 | Research Report | Darf der Download-Link auf `/bestaetigt` öffentlich erreichbar sein, oder nur per Mail? | Team | 04.10. |
| 11 | Rollenliste | Rollen im Formular bestätigen | Team | 04.10. |
| 12 | Texte | Figma-Entwurf (Stand 20.10., `06_page-structure.md`) mit dem Team final abstimmen – als Richtung gesetzt, aber ausdrücklich nicht final | Team | – |
| 15 | Team-Sektion | Figma zeigt nur Namen + Video, keine Fotos/Kurzbios/LinkedIn. Bestätigen, dass das so bleibt, oder Mentor:innen-Nennung ergänzen | Team | – |
| 16 | Kontakt | Öffentliche Kontakt-E-Mail. Bis dahin **nicht** mit einer Platzhalter-Adresse arbeiten, sondern mit dem Figma-Text «Kontaktadresse folgt» | Team | – |
| 29 | Registrierung | Figma zeigt eine **einzelne kombinierte** Einwilligungs-Checkbox (Report + Updates + Datenschutz) statt getrennter Zustimmungen – mit Brevo-Anbindung (#2–#5) abgleichen, ob das rechtlich/technisch so umsetzbar ist | Mike | – |
| 30 | Visuals | Schweizer-Kantonskarte in der Registrierungs-Section («Interaktive Karte aller teilnehmenden Hochschulen») braucht echte Geodaten und eine Zuordnung Kanton → teilnehmende Hochschule(n). Ohne diese Daten keine Karte bauen | Team | – |
| 31 | Rechtliches/Visuals | Logo-Reihe in der Registrierungs-Section zeigt im Figma-Entwurf teils generische Platzhalter-Logos (Notion, Airtable, Evernote – vermutlich Figma-Komponenten-Dummies, kein Bezug zu avalis) neben echten (swissuniversities, HSLU). Klären, welche Logos real gezeigt werden sollen | Team | – |
| 32 | Rechtliches | **Spannung:** Das Figma-File zeigt bereits ein HSLU-Logo in der Registrierungs-Section, obwohl Punkt #18 (HSLU-Name/Logo-Nutzung) noch offen ist. Vor der Umsetzung klären, sonst wird im Design etwas vorweggenommen, das rechtlich noch nicht abgesegnet ist | Team / Mentor:innen | – |
| 17 | Rechtliches | Verantwortliche Personen und Adresse für Impressum und Datenschutz | Team | 11.10. |
| 18 | Rechtliches | Verwendung HSLU-Name und Logo | Team / Mentor:innen | 04.10. |
| 19 | Rechtliches | Teilnehmende Institutionen namentlich nennen? (Anonymisierung im Report) | Team / Mentor:innen | 04.10. |
| 21 | Visuals | Screenshots des Prototyps (nur Mock-Daten), OpenGraph-Bild, Schweizer-Kantonskarte (siehe #30) | Team | – |
| 22 | Englisch | Übersetzung der finalen Texte prüfen | Team | – |
| 23 | Event | QR-Code mit `?src=netzwerktreffen` für Präsentation | Team | 21.10. |
| 26 | Sicherheit | CSP `script-src` nutzt aktuell `'unsafe-inline'` statt Nonce: Next.js 16 appliziert einen per-Request-Nonce (korrekt via `Content-Security-Policy`-Header gesetzt) nicht auf seine eigenen Hydration-`<script>`-Tags, geprüft in Produktion. Bei neuerer Next.js-Version erneut mit Nonce statt `unsafe-inline` versuchen. Nach dem Projekt-Neuaufbau erneut prüfen, ob/wie CSP-Header wieder gesetzt werden | Mike | – |
| 27 | Code-Stand | Das komplette Webprojekt wurde am 20.10.2026 gelöscht und wird neu aufgesetzt (reines Next.js/Tailwind-Default-Setup, i18n-Gerüst bleibt). Design-System-Tokens (#24/#25 alt) und alle Sections müssen neu gebaut werden, siehe `05_design-system.md` Abschnitt 7 und `06_page-structure.md` | Mike | – |
| 28 | Inhalte | Team-Kurzbeschreibungen, Fotos, Kontakt-E-Mail sowie Impressum/Datenschutz-Inhalt sind Platzhalter ("folgt") | Team | – |

## Entschieden

| Datum | Entscheidung |
|---|---|
| 15.09.2026 | Tech-Stack: Next.js, Vercel, GitHub |
| 15.09.2026 | Brevo für Kontakte, Double-Opt-in und Newsletter; keine eigene Datenbank (Supabase nicht verwendet) |
| 15.09.2026 | Sprachen DE und EN zum Launch, Struktur erweiterbar für FR und IT |
| 15.09.2026 | Design Tokens werden über den Figma MCP ausgelesen |
| 15.09.2026 | Live spätestens 21.10.2026, Event am 23.10.2026 |
| 15.09.2026 | Branch- und Pull-Request-Workflow, Merge nur manuell |
| 15.09.2026 | Figma-Link und Zugriff für Figma MCP vorhanden: [Avalis-Styleguide-BA-2026](https://www.figma.com/design/T7WsBMJeLI71tjKCs9tORo/Avalis-Styleguide-BA-2026) |
| 15.09.2026 | Design-System-Basis (Stone-Palette, Rollenfarben Beratung/In-Decision/Bewilligt, Typografie, Radien) aus Figma ausgelesen und gegen `nta-tool-prototype` verifiziert, in `src/app/globals.css` umgesetzt; shadcn/ui mit Preset `radix-vega` (identisch zum Prototyp) eingerichtet |
| 20.10.2026 | Figma-Landingpage-File als konkrete Vorlage vorhanden und gesichtet: [Avalis-Landingpage](https://www.figma.com/design/WRJ76gBGDPxE8gJXf7VUY9/Avalis-Landingpage). Ersetzt frühere Annahmen zu Seitenstruktur und -texten, siehe `06_page-structure.md` |
| 20.10.2026 | Anrede: **Sie** (durch Figma-Formulartexte bestätigt, z.B. «Registrieren Sie sich») |
| 20.10.2026 | Schreibweise: **«avalis» durchgehend klein**, auch im Logo-Wortzeichen (durch Figma bestätigt) |
| 21.10.2026 | Spam-Schutz: vorerst nur Honeypot, kein Cloudflare Turnstile |
| 23.10.2026 | Institution im Formular ist ein freies Textfeld («Bildungsinstitution») statt einer Auswahl – keine kuratierte Hochschulliste mehr nötig, löst Punkt #10 ab |
| 23.10.2026 | Keine Sprachunterscheidung in Brevo (kein `SPRACHE`-Attribut, ein Double-Opt-in-Template statt DE/EN): der Research Report existiert nur auf Deutsch |
| 20.10.2026 | Komplettes Webprojekt zurückgesetzt, Neuaufbau mit reinem Next.js/Tailwind-Default-Setup auf Basis des neuen Figma-Plans (i18n-Gerüst bleibt bestehen) |
