# 04 – Registrierung

> **Stand:** 23.10.2026 · Code-seitig implementiert (`src/lib/brevo.ts`, `src/actions/register.ts`, `src/actions/unsubscribe.ts`). In Brevo bereits angelegt: Liste „Avalis Registrierungen“ (ID 3) und die Attribute `HOCHSCHULE`/`ROLLE`/`SOURCE`. Noch offen: API-Key, Absender-Verifizierung und Template, siehe Abschnitt 8 und `docs/08_open-points.md`.
> **Single Opt-in + Report per Mail** (Entscheidung vom 23.10.2026, ersetzt «Report direkt auf der Seite»): Die Einwilligungs-Checkbox gilt als Zustimmung, kein Double-Opt-in. Der Kontakt landet sofort in der Brevo-Liste, der Download-Link wird **ausschliesslich per Brevo-Transaktionsmail** zugestellt. Die Seite zeigt danach nur eine Erfolgsmeldung («Der Link ist per E-Mail unterwegs»). Nebeneffekt: Nur wer eine funktionierende Adresse angibt, erhält den Report. In der Mail gibt es einen Link zum Abmelden vom Verteiler.
> Institution ist ein freies Textfeld (keine feste Liste), Rolle bleibt eine Auswahl mit Freitext bei «Andere».
> Formular-UI-Stand gemäss Figma-File [Avalis-Landingpage](https://www.figma.com/design/WRJ76gBGDPxE8gJXf7VUY9/Avalis-Landingpage), Node `10067:2283` («Registrierungsformular · Normalzustand») – nicht final, zeigt aber die aktuelle Richtung für Feldbeschriftungen und Button-Text.

---

## 1. Ziel

Interessierte registrieren sich mit wenigen Angaben und erhalten den Link zum Research Report per E-Mail. Wir sehen später, welche Hochschulen und Rollen interessiert sind und über welchen Kanal sie kamen.

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
5. Report-Mail als Transaktionsmail verschicken (`sendReportMail` in `src/lib/brevo.ts`):
   - Endpoint: `POST https://api.brevo.com/v3/smtp/email`
   - Body: `to` (Adresse der Person), `templateId` (`BREVO_REPORT_TEMPLATE_ID`), `params` (`VORNAME`, `REPORT_URL` = `REPORT_DOWNLOAD_URL`, `UNSUBSCRIBE_URL`), `tags: ["research-report"]`
   - Absender, Betreff und Layout liegen im Brevo-Template (Vorlage: `docs/templates/report-mail.html`)
   - `UNSUBSCRIBE_URL` ist ein signierter Link auf `/{locale}/abmelden` (`src/lib/unsubscribe-token.ts`, HMAC mit `UNSUBSCRIBE_SECRET`)
6. Erfolgsmeldung im Formular («Vielen Dank für Ihre Registrierung!», Adresse, Hinweis auf den Spam-Ordner). **Kein Download-Button**, der Link wird nie an den Browser ausgeliefert.

### Abmeldung vom Verteiler

1. Link «Vom Verteiler abmelden» in der Mail öffnet `/{locale}/abmelden?e=…&t=…`.
2. Die Seite prüft die Signatur und zeigt eine Bestätigung. **Erst der Klick auf «Jetzt abmelden»** meldet ab (verhindert, dass Mail-Scanner oder Link-Vorschauen versehentlich abmelden). Ungültige oder manipulierte Links zeigen «Ungültiger Link».
3. Die Server Action (`src/actions/unsubscribe.ts`) prüft die Signatur erneut und ruft `POST /v3/contacts/lists/{BREVO_LIST_ID}/contacts/remove` auf. Der Kontakt bleibt in Brevo, ist aber nicht mehr in der Liste.
4. Newsletter, die später über Brevo-Kampagnen verschickt werden, enthalten zusätzlich Brevos eigenen Abmeldelink (Pflicht in Brevo-Kampagnen).

## 4. Fehlerfälle und Zustände

| Fall | Verhalten |
|---|---|
| Validierungsfehler | Fehlermeldung direkt am Feld, Fokus auf das erste fehlerhafte Feld, Meldungen per `aria-live` angekündigt |
| E-Mail bereits registriert | Neutrale Erfolgsmeldung wie bei neuer Registrierung (keine Auskunft, ob eine Adresse existiert). Umgesetzt über `updateEnabled: true` – der bestehende Kontakt wird aktualisiert statt einen Fehler zu werfen |
| Brevo nicht erreichbar oder Fehler (Kontakt **oder** Mailversand) | Klare Meldung «Die Anmeldung hat nicht geklappt. Bitte versuchen Sie es in ein paar Minuten erneut.» Fehler serverseitig ohne personenbezogene Daten loggen. **Nie eine falsche Erfolgsmeldung** |
| Doppelklick auf Absenden | Button während des Sendens deaktivieren, Ladezustand anzeigen |
| JavaScript deaktiviert | Formular funktioniert dank Server Action trotzdem |
| `REPORT_DOWNLOAD_URL`, `BREVO_REPORT_TEMPLATE_ID`, `UNSUBSCRIBE_SECRET` oder `NEXT_PUBLIC_SITE_URL` fehlt | Der Mailversand wirft einen klaren Konfigurationsfehler (Log), die Person sieht die generische Fehlermeldung. Nie eine falsche Erfolgsmeldung |
| Mailversand schlägt fehl, Kontakt wurde schon angelegt | Fehlermeldung wie oben. Erneutes Absenden aktualisiert den Kontakt (`updateEnabled`) und versucht die Mail noch einmal |
| Person gibt eine falsche/fremde Adresse an | Die Mail geht an diese Adresse. Mögliches Missbrauchsrisiko (Mailversand an Dritte, Brevo-Kontingent 300/Tag): bisher nur Honeypot als Schutz, bei Bedarf Cloudflare Turnstile ergänzen |

## 5. Tonalität der Formulartexte

Die Anrede (Du oder Sie) ist noch offen, siehe `08_open-points.md`. Für ein Fachpublikum an Hochschulen ist «Sie» naheliegend und wird provisorisch verwendet. Englisch neutral mit «you».

## 6. Mails in Brevo

| Mail | Auslöser | Inhalt |
|---|---|---|
| Research Report (Transaktionsmail) | Jede Registrierung (Server Action) | Begrüssung, Button und Link zum Report, Hinweis auf den Verteiler, Link «Vom Verteiler abmelden» |
| Newsletter (später) | Manuell über den Brevo-Editor | Enthält Brevos eigenen Abmeldelink |

Brevo trennt Transaktions- und Marketing-Abmeldungen strikt. Ein Brevo-Abmeldelink in einem Transaktions-Template sperrt laut Brevo-Community nur Transaktionsmails und entfernt den Kontakt nicht aus der Liste. Deshalb nutzt die Report-Mail den eigenen Abmeldelink der Website (siehe Abschnitt 3).

## 7. Testcheckliste

- [ ] Registrierung DE und EN: Erfolgsmeldung nennt die Adresse, **kein** Download-Button
- [ ] Mail kommt an (Posteingang **und** Spam prüfen), Absender/Betreff korrekt, Button und Link öffnen den Report
- [ ] Kontakt erscheint in der Liste „Avalis Registrierungen“ mit allen Attributen (`HOCHSCHULE`, `ROLLE`, `SOURCE`, `VORNAME`, `NACHNAME`)
- [ ] Erneute Registrierung mit derselben Adresse: Mail kommt erneut, Kontakt wird aktualisiert statt eines Fehlers
- [ ] Link «Vom Verteiler abmelden» in der Mail: Bestätigungsseite, nach Klick ist der Kontakt nicht mehr in der Liste
- [ ] Veränderter Abmeldelink zeigt «Ungültiger Link»
- [ ] `?src=netzwerktreffen` und `?src=mail` werden korrekt gespeichert
- [ ] Fehlerfall getestet (z.B. mit ungültiger Template-ID in Preview): Fehlermeldung statt Erfolg
- [ ] Honeypot getestet
- [ ] Formular vollständig per Tastatur und mit Screenreader bedienbar
- [ ] Mail in Gmail, Outlook und auf dem Handy gerendert prüfen

## 8. Noch offen: Einrichtung in Brevo

Der Code ist fertig. Diese Schritte müssen in Brevo und Vercel gemacht werden (Entspricht offenen Punkten #5/#7 in `docs/08_open-points.md`):

1. ~~Liste „Avalis Registrierungen“ anlegen~~ → erledigt, `BREVO_LIST_ID=3`.
2. ~~Kontaktattribute `HOCHSCHULE`, `ROLLE`, `SOURCE` anlegen~~ → erledigt.
3. **Absender verifizieren** (*Settings → Senders, Domains & Dedicated IPs*). Ohne verifizierten Absender versendet Brevo nicht.
   - **Beste Variante: eigene Domain** (offener Punkt #7) mit SPF, DKIM und DMARC. Brevo zeigt die DNS-Einträge an.
   - **Übergangslösung:** Einzelne Absenderadresse verifizieren (Bestätigungsmail). Gmail-Adressen (`…@gmail.com`) haben strenge DMARC-Regeln, Mails landen deshalb häufig im Spam. Nur für Tests oder als Notlösung.
4. **Template anlegen** (*Transactional → Email → Templates → Create a new template*): Absender wählen, Betreff «Ihr Research Report von avalis», HTML aus `docs/templates/report-mail.html` einfügen, speichern und **aktivieren**. Die ID des Templates (steht in der Template-Liste) ist `BREVO_REPORT_TEMPLATE_ID`. Mit «Send a test» eine Probemail an die eigene Adresse schicken. Hinweis: In der Test-Mail sind die `{{ params… }}`-Platzhalter leer, erst der echte Versand über die Website füllt sie.
5. Neuer API-Key (*Settings → SMTP & API*), nur serverseitig verwendet → `BREVO_API_KEY`. IP-Sperre für unbekannte Adressen deaktivieren (Vercel nutzt wechselnde IPs).
6. `UNSUBSCRIBE_SECRET` erzeugen (`openssl rand -base64 32`).
7. Werte in Vercel (*Settings → Environment Variables*, Production/Preview/Development) und lokal in `.env.local` eintragen: `BREVO_API_KEY`, `BREVO_LIST_ID`, `BREVO_REPORT_TEMPLATE_ID`, `UNSUBSCRIBE_SECRET`, `REPORT_DOWNLOAD_URL`, `NEXT_PUBLIC_SITE_URL` (genaue URL der Seite, wird für den Abmeldelink gebraucht).
8. Testcheckliste oben durchgehen. Bei einer Zustellrate unter dem Erwartbaren zuerst den Absender (Schritt 3) prüfen.
