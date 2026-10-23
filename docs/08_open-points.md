# 08 – Offene Punkte und Entscheidungen

> Laufend nachführen. Erledigte Punkte in «Entschieden» verschieben, mit Datum.

---

## Offen

| # | Thema | Was fehlt | Wer | Bis |
|---|---|---|---|---|
| 5 | Brevo | Neuer API-Key, nur in Vercel und `.env.local` hinterlegt; IP-Sperre deaktiviert. Zusätzlich für die Report-Mail: Absender verifizieren, Template «Research Report» anlegen (Vorlage `docs/templates/report-mail.html`), `BREVO_REPORT_TEMPLATE_ID` und `UNSUBSCRIBE_SECRET` setzen, siehe `04_registration-flow.md` Abschnitt 8 | Mike | – |
| 6 | Vercel | Projekt-URL für `NEXT_PUBLIC_SITE_URL` | Mike | 20.09. |
| 7 | Domain | Domain kaufen, bei Vercel verbinden, Absender-Domain in Brevo verifizieren (SPF, DKIM, DMARC). **Wichtiger denn je:** Der Report-Link kommt nur noch per Mail, ohne verifizierte Absender-Domain landen die Mails häufig im Spam | Team | 04.10. |
| 8 | Research Report | Google-Drive-Link, Freigabe «Jeder mit dem Link» prüfen | Team | 11.10. |
| 11 | Rollenliste | Rollen im Formular bestätigen | Team | 04.10. |
| 12 | Texte | Figma-Entwurf (Stand 20.10., `06_page-structure.md`) mit dem Team final abstimmen – als Richtung gesetzt, aber ausdrücklich nicht final | Team | – |
| 15 | Team-Sektion | Figma zeigt nur Namen + Video, keine Fotos/Kurzbios/LinkedIn. Bestätigen, dass das so bleibt, oder Mentor:innen-Nennung ergänzen | Team | – |
| 29 | Registrierung | Figma zeigt eine **einzelne kombinierte** Einwilligungs-Checkbox (Report + Updates + Datenschutz) statt getrennter Zustimmungen – mit Brevo-Anbindung (#2–#5) abgleichen, ob das rechtlich/technisch so umsetzbar ist | Mike | – |
| 31 | Rechtliches/Visuals | Logo-Reihe in der Registrierungs-Section zeigt im Figma-Entwurf teils generische Platzhalter-Logos (Notion, Airtable, Evernote – vermutlich Figma-Komponenten-Dummies, kein Bezug zu avalis) neben echten (swissuniversities, HSLU). Klären, welche Logos real gezeigt werden sollen | Team | – |
| 32 | Rechtliches | **Spannung:** Das Figma-File zeigt bereits ein HSLU-Logo in der Registrierungs-Section, obwohl Punkt #18 (HSLU-Name/Logo-Nutzung) noch offen ist. Vor der Umsetzung klären, sonst wird im Design etwas vorweggenommen, das rechtlich noch nicht abgesegnet ist | Team / Mentor:innen | – |
| 17 | Rechtliches | Verantwortliche Personen und Adresse für Impressum und Datenschutz (Datenschutzerklärung nennt bisher nur «Projektteam avalis» und die E-Mail-Adresse) | Team | 11.10. |
| 33 | Datenschutz | Datenschutzerklärung ist umgesetzt (Entwurf). Vor dem Launch die Punkte a–j in `07_legal-privacy.md` Abschnitt 6 klären: Verantwortlicher, Speicherdauer, Brevo-Tracking aus, AVV/DPA, Löschung bei Abmeldung, Analytics-Aussage, juristische Prüfung | Team / Mike | 23.10. |
| 18 | Rechtliches | Verwendung HSLU-Name und Logo | Team / Mentor:innen | 04.10. |
| 19 | Rechtliches | Teilnehmende Institutionen namentlich nennen? (Anonymisierung im Report) | Team / Mentor:innen | 04.10. |
| 21 | Visuals | Screenshots des Prototyps (nur Mock-Daten), OpenGraph-Bild | Team | – |
| 22 | Englisch | Übersetzung der finalen Texte prüfen | Team | – |
| 23 | Event | QR-Code mit `?src=netzwerktreffen` für Präsentation | Team | 21.10. |
| 26 | Sicherheit | CSP `script-src` nutzt aktuell `'unsafe-inline'` statt Nonce: Next.js 16 appliziert einen per-Request-Nonce (korrekt via `Content-Security-Policy`-Header gesetzt) nicht auf seine eigenen Hydration-`<script>`-Tags, geprüft in Produktion. Bei neuerer Next.js-Version erneut mit Nonce statt `unsafe-inline` versuchen. Nach dem Projekt-Neuaufbau erneut prüfen, ob/wie CSP-Header wieder gesetzt werden | Mike | – |
| 27 | Code-Stand | Das komplette Webprojekt wurde am 20.10.2026 gelöscht und wird neu aufgesetzt (reines Next.js/Tailwind-Default-Setup, i18n-Gerüst bleibt). Design-System-Tokens (#24/#25 alt) und alle Sections müssen neu gebaut werden, siehe `05_design-system.md` Abschnitt 7 und `06_page-structure.md` | Mike | – |
| 28 | Inhalte | Team-Kurzbeschreibungen, Fotos sowie Impressum/Datenschutz-Inhalt sind Platzhalter ("folgt") | Team | – |

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
| 23.10.2026 | Keine Sprachunterscheidung in Brevo (kein `SPRACHE`-Attribut): der Research Report existiert nur auf Deutsch |
| 23.10.2026 | Brevo-Liste „Avalis Registrierungen" (ID 3) und Attribute `HOCHSCHULE`/`ROLLE`/`SOURCE` angelegt (löst Punkte #2/#3 ab) |
| 23.10.2026 | Umstellung auf **Single Opt-in**: Einwilligungs-Checkbox gilt als Zustimmung, kein Double-Opt-in-Template/-Mailversand mehr nötig (löst Punkt #4 ab). Grund: Ziel ist nur ein grober Überblick über Herkunft/Rolle der Registrierungen, keine verifizierten Adressen. Report erscheint direkt im Formular nach dem Absenden, die separate Seite `/bestaetigt` entfällt damit (löst Punkt #9 ab) |
| 20.10.2026 | Komplettes Webprojekt zurückgesetzt, Neuaufbau mit reinem Next.js/Tailwind-Default-Setup auf Basis des neuen Figma-Plans (i18n-Gerüst bleibt bestehen) |
| 23.10.2026 | Kontakt-E-Mail ist `nta.avalis@gmail.com` (löst Punkt #16 ab). Wert aus dem aktuellen Figma-Stand V5, in der Kontakt-Section als `mailto:`-Link umgesetzt |
| 23.10.2026 | Schweizer-Kantonskarte in der Registrierungs-Section ist ein statisches, vom Team geliefertes SVG (`public/registration/switzerland-map.svg`) inkl. Legende «Anzahl teilnehmende Institutionen pro Kanton» (Skala 0–8), wie in Figma V5. Löst Punkt #30 ab; Karte und Zahlen werden unverändert übernommen, keine eigene Datenzuordnung |
| 23.10.2026 | Report-Link wird **nur noch per Brevo-Transaktionsmail** zugestellt (statt Download-Button auf der Seite). Erfolgsmeldung weist auf die Mail hin. Die Mail enthält einen eigenen, signierten Abmeldelink der Website (`/abmelden`), der den Kontakt aus der Brevo-Liste entfernt. Löst «Report direkt auf der Seite» vom selben Tag ab |
| 23.10.2026 | Datenschutzerklärung (DE/EN) auf Basis des tatsächlichen Codes verfasst und umgesetzt: DSG mit DSGVO-Ergänzung, keine Tracking-Cookies, YouTube erst nach Klick, Brevo/Vercel/Google als Empfänger. Offene Prüfpunkte siehe #33 |
