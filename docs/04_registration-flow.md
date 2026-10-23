# 04 – Registrierung

> **Stand:** 23.10.2026 · Code-seitig implementiert (`src/lib/brevo.ts`, `src/actions/register.ts`). In Brevo bereits angelegt: Liste „Avalis Registrierungen" (ID 3) und die Attribute `HOCHSCHULE`/`ROLLE`/`SOURCE`. Noch offen: API-Key, siehe Abschnitt 8 und `docs/08_open-points.md`.
> **Single Opt-in** (Entscheidung vom 23.10.2026): Die Einwilligungs-Checkbox im Formular gilt als Zustimmung. Kein Double-Opt-in, keine Bestätigungsmail – der Kontakt landet sofort in Brevo, der Research Report erscheint direkt nach dem Absenden auf der Seite. Grund: Ziel ist nur ein grober Überblick, woher Registrierungen/Downloads kommen, keine verifizierten E-Mail-Adressen.
> Institution ist ein freies Textfeld (keine feste Liste), Rolle bleibt eine Auswahl mit Freitext bei «Andere».
> Formular-UI-Stand gemäss Figma-File [Avalis-Landingpage](https://www.figma.com/design/WRJ76gBGDPxE8gJXf7VUY9/Avalis-Landingpage), Node `10067:2283` («Registrierungsformular · Normalzustand») – nicht final, zeigt aber die aktuelle Richtung für Feldbeschriftungen und Button-Text.

---

## 1. Ziel

Interessierte registrieren sich mit wenigen Angaben und erhalten sofort Zugang zum Research Report. Wir sehen später, welche Hochschulen und Rollen interessiert sind und über welchen Kanal sie kamen.

## 2. Formularfelder

| Feld | Pflicht | Typ | Brevo-Attribut | Hinweise |
|---|---|---|---|---|
| E-Mail | ja | E-Mail | `email` (Standard) | Trimmen, klein schreiben |
| Vorname | nein | Text | `VORNAME` (Brevo-Standardattribut) | max. 100 Zeichen |
| Nachname | nein | Text | `NACHNAME` (Brevo-Standardattribut) | max. 100 Zeichen |
| Institution | ja | Text | `HOCHSCHULE` | Freies Textfeld («Bildungsinstitution»), keine feste Liste |
| Rolle | ja | Auswahl | `ROLLE` | Werte siehe unten |
| Andere Rolle | bedingt | Text | `ROLLE` | Nur sichtbar und Pflicht, wenn bei Rolle «Andere» gewählt wurde – ersetzt dann den Wert `andere` im Attribut |
| Einwilligung | ja | Checkbox | – | Nicht vorausgewählt, **eine** kombinierte Checkbox für Report-Versand, gelegentliche Updates und Datenschutz-Zustimmung (siehe Figma-Text unten), Link zur Datenschutzerklärung |
| `source` | – | versteckt | `SOURCE` | Aus `?src=` gelesen, nur erlaubte Werte |
| Honeypot | – | versteckt | – | Für Menschen unsichtbar, auch für Screenreader (`aria-hidden`, `tabindex="-1"`) |

**Rollen (Werte intern stabil, Labels übersetzt):**
`fachstelle` (Fachstelle / Beratung), `gleichstellung` (Gleichstellung / Diversity), `studiengangsleitung`, `dozierende`, `pruefungsadministration`, `hochschulleitung`, `studierende`, `andere`
*(Liste mit dem Team abstimmen.)*

**Erlaubte `source`-Werte:** `netzwerktreffen`, `mail`, `direkt` (Fallback, wenn kein oder ein unbekannter Wert vorhanden ist).

**Formulartexte aus Figma (Stand, nicht final):**
- Titel: «Research Report erhalten»
- Begleittext: «Registrieren Sie sich für den Report und gelegentliche Updates zur Weiterentwicklung von avalis.»
- Pflichtfeldhinweis: «\* Pflichtfeld · alle weiteren Angaben sind optional» – nur E-Mail, Bildungsinstitution und Rolle sind mit `*` markiert, Vorname/Nachname sind explizit als «(optional)» beschriftet.
- Einwilligungstext (eine Checkbox, kombiniert): «Ich möchte den Research Report und gelegentliche Updates per E-Mail erhalten und stimme der Datenschutzerklärung zu.»
- Button: **«Jetzt registrieren»** (nicht «Research Report erhalten» – das ist der Header-/Hero-CTA, der zum Formular scrollt)
- Hinweis unter dem Button: «Jederzeit abmeldbar. Keine Weitergabe Ihrer Daten an Dritte.»

## 3. Ablauf

1. Person füllt das Formular aus und sendet ab.
2. Server Action prüft den Honeypot. Ist er ausgefüllt: Erfolgsmeldung anzeigen, aber nichts an Brevo senden.
3. Validierung mit Zod. Fehler werden feldweise zurückgegeben.
4. Kontakt in Brevo anlegen oder aktualisieren (implementiert in `src/lib/brevo.ts`):
   - Endpoint: `POST https://api.brevo.com/v3/contacts`
   - Header: `api-key: <BREVO_API_KEY>`, `content-type: application/json`
   - Body: `email`, `attributes` (`VORNAME`, `NACHNAME`, `HOCHSCHULE`, `ROLLE`, `SOURCE`), `listIds: [BREVO_LIST_ID]`, `updateEnabled: true` (erneute Registrierung mit derselben Adresse aktualisiert den Kontakt statt eines Fehlers)
   - Fehlt eine der benötigten Umgebungsvariablen, wirft der Code sofort einen klaren Fehler statt still zu scheitern (siehe `docs/03_tech-architecture.md` Abschnitt 3)
   - **Wichtig:** Dieser Aufruf löst in Brevo **keinen** automatischen Mailversand aus – der Kontakt wird nur angelegt. Eine optionale Willkommens-Mail (z.B. mit nochmaligem Report-Link) müsste separat als Brevo-Automation eingerichtet werden, siehe Abschnitt 6.
5. Erfolgsmeldung direkt im Formular, inkl. Download-Button zum Research Report (`REPORT_DOWNLOAD_URL`) – kein Mailversand, kein Klick nötig, kein Seitenwechsel.

## 4. Fehlerfälle und Zustände

| Fall | Verhalten |
|---|---|
| Validierungsfehler | Fehlermeldung direkt am Feld, Fokus auf das erste fehlerhafte Feld, Meldungen per `aria-live` angekündigt |
| E-Mail bereits registriert | Neutrale Erfolgsmeldung wie bei neuer Registrierung (keine Auskunft, ob eine Adresse existiert). Umgesetzt über `updateEnabled: true` – der bestehende Kontakt wird aktualisiert statt einen Fehler zu werfen |
| Brevo nicht erreichbar oder Fehler | Klare Meldung «Die Anmeldung hat nicht geklappt. Bitte versuchen Sie es in ein paar Minuten erneut.» Fehler serverseitig ohne personenbezogene Daten loggen. **Nie eine falsche Erfolgsmeldung** |
| Doppelklick auf Absenden | Button während des Sendens deaktivieren, Ladezustand anzeigen |
| JavaScript deaktiviert | Formular funktioniert dank Server Action trotzdem |
| `REPORT_DOWNLOAD_URL` noch nicht gesetzt | Erfolgsmeldung zeigt statt des Download-Buttons den Hinweis «Der Download-Link folgt in Kürze.» |

## 5. Tonalität der Formulartexte

Die Anrede (Du oder Sie) ist noch offen, siehe `08_open-points.md`. Für ein Fachpublikum an Hochschulen ist «Sie» naheliegend und wird provisorisch verwendet. Englisch neutral mit «you».

## 6. Mails in Brevo

Aktuell wird **keine** Mail automatisch verschickt – der Report erscheint direkt auf der Seite. Optional, kein Blocker fürs Launch:

| Mail | Zeitpunkt | Inhalt |
|---|---|---|
| Willkommen (optional) | Nach Registrierung (Brevo-Automation, z.B. "Kontakt zu Liste hinzugefügt") | Link zum Research Report als Backup, kurzer Ausblick auf Updates, Abmeldelink |
| Newsletter | Manuell | Über den Brevo-Editor |

Mails enthalten einen Abmeldelink. Ob Automationen im Free-Plan im benötigten Umfang verfügbar sind, in Brevo prüfen.

## 7. Testcheckliste

- [ ] Registrierung DE und EN, Report-Download erscheint sofort nach Absenden
- [ ] Kontakt erscheint in der Liste „Avalis Registrierungen" mit allen Attributen (`HOCHSCHULE`, `ROLLE`, `SOURCE`, `VORNAME`, `NACHNAME`)
- [ ] Erneute Registrierung mit derselben Adresse aktualisiert den Kontakt statt eines Fehlers
- [ ] `?src=netzwerktreffen` und `?src=mail` werden korrekt gespeichert
- [ ] Fehlerfall getestet (z.B. mit ungültigem API-Key in Preview)
- [ ] Honeypot getestet
- [ ] Formular vollständig per Tastatur und mit Screenreader bedienbar

## 8. Noch offen: Einrichtung in Brevo

Der Code (`src/lib/brevo.ts`, `src/actions/register.ts`) ist fertig. Entspricht offenem Punkt #5 in `docs/08_open-points.md`:

1. ~~Liste „Avalis Registrierungen" anlegen~~ → erledigt, `BREVO_LIST_ID=3`.
2. ~~Kontaktattribute `HOCHSCHULE`, `ROLLE`, `SOURCE` anlegen~~ → erledigt.
3. Neuer API-Key (Settings → SMTP & API), nur serverseitig verwendet → `BREVO_API_KEY`. IP-Sperre für unbekannte Adressen deaktivieren (Vercel nutzt wechselnde IPs).
4. Werte in Vercel (*Settings → Environment Variables*, Production/Preview/Development) und lokal in `.env.local` eintragen: `BREVO_API_KEY`, `BREVO_LIST_ID`.
5. Sobald vorhanden: Testcheckliste oben durchgehen.
