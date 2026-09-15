# 04 – Registrierung und Double-Opt-in

> **Stand:** 15.09.2026 · Brevo-Werte (Liste, Templates, Attribute) sind noch nicht angelegt.
> Die Brevo-API-Details vor der Umsetzung in der offiziellen Dokumentation prüfen (developers.brevo.com).

---

## 1. Ziel

Interessierte registrieren sich mit wenigen Angaben. Nach Bestätigung per Mail erhalten sie Zugang zum Research Report und künftige Updates. Wir sehen später, welche Hochschulen und Rollen interessiert sind und über welchen Kanal sie kamen.

## 2. Formularfelder

| Feld | Pflicht | Typ | Brevo-Attribut | Hinweise |
|---|---|---|---|---|
| E-Mail | ja | E-Mail | `email` (Standard) | Trimmen, klein schreiben |
| Vorname | nein | Text | *Name in Brevo prüfen* (`FIRSTNAME` oder `VORNAME`) | max. 100 Zeichen |
| Nachname | nein | Text | *Name in Brevo prüfen* (`LASTNAME` oder `NACHNAME`) | max. 100 Zeichen |
| Institution | ja | Auswahl | `HOCHSCHULE` | Feste Liste (folgt) + «Andere» |
| Andere Institution | bedingt | Text | `HOCHSCHULE` | Nur sichtbar und Pflicht, wenn «Andere» gewählt |
| Rolle | ja | Auswahl | `ROLLE` | Werte siehe unten |
| Einwilligung | ja | Checkbox | – | Nicht vorausgewählt, Link zur Datenschutzerklärung |
| `source` | – | versteckt | `SOURCE` | Aus `?src=` gelesen, nur erlaubte Werte |
| `language` | – | versteckt | `SPRACHE` | Aus der aktuellen Route (`de`, `en`) |
| Honeypot | – | versteckt | – | Für Menschen unsichtbar, auch für Screenreader (`aria-hidden`, `tabindex="-1"`) |

**Rollen (Werte intern stabil, Labels übersetzt):**
`fachstelle` (Fachstelle / Beratung), `gleichstellung` (Gleichstellung / Diversity), `studiengangsleitung`, `dozierende`, `pruefungsadministration`, `hochschulleitung`, `studierende`, `andere`
*(Liste mit dem Team abstimmen.)*

**Erlaubte `source`-Werte:** `netzwerktreffen`, `mail`, `direkt` (Fallback, wenn kein oder ein unbekannter Wert vorhanden ist).

**Institutionsliste:** Folgt. Wird in `src/lib/institutions.ts` als Array mit stabilem Schlüssel und Namen gepflegt. Nicht von Claude generieren lassen.

## 3. Ablauf

1. Person füllt das Formular aus und sendet ab.
2. Server Action prüft den Honeypot. Ist er ausgefüllt: Erfolgsmeldung anzeigen, aber nichts an Brevo senden.
3. Validierung mit Zod. Fehler werden feldweise zurückgegeben.
4. Aufruf der Brevo-API für Double-Opt-in-Kontakte:
   - Endpoint (in Doku verifizieren): `POST https://api.brevo.com/v3/contacts/doubleOptinConfirmation`
   - Header: `api-key: <BREVO_API_KEY>`, `content-type: application/json`
   - Body sinngemäss: `email`, `attributes` (Institution, Rolle, Source, Sprache, Name), `includeListIds: [BREVO_LIST_ID]`, `templateId` (je nach Sprache), `redirectionUrl` (`{SITE_URL}/{locale}/bestaetigt`)
5. Erfolgsmeldung im Formular: «Fast geschafft. Bitte bestätigen Sie Ihre Anmeldung über den Link in der Mail.» Hinweis auf den Spam-Ordner.
6. Brevo verschickt die Bestätigungsmail.
7. Person klickt den Link, Brevo fügt den Kontakt der Liste hinzu und leitet auf `/[locale]/bestaetigt` weiter.
8. Bestätigungsseite zeigt Dank und Download-Button zum Research Report (`REPORT_DOWNLOAD_URL`).

## 4. Fehlerfälle und Zustände

| Fall | Verhalten |
|---|---|
| Validierungsfehler | Fehlermeldung direkt am Feld, Fokus auf das erste fehlerhafte Feld, Meldungen per `aria-live` angekündigt |
| E-Mail bereits registriert | Neutrale Erfolgsmeldung wie bei neuer Registrierung (keine Auskunft, ob eine Adresse existiert). Verhalten der API bei bestehenden Kontakten in der Doku prüfen |
| Brevo nicht erreichbar oder Fehler | Klare Meldung «Die Anmeldung hat nicht geklappt. Bitte versuchen Sie es in ein paar Minuten erneut.» Fehler serverseitig ohne personenbezogene Daten loggen. **Nie eine falsche Erfolgsmeldung** |
| Doppelklick auf Absenden | Button während des Sendens deaktivieren, Ladezustand anzeigen |
| JavaScript deaktiviert | Formular funktioniert dank Server Action trotzdem |
| Direkter Aufruf `/bestaetigt` | Seite ist erreichbar. Entscheidung offen, ob der Report-Link dort öffentlich sichtbar sein darf (siehe `08_open-points.md`) |

## 5. Tonalität der Formulartexte

Die Anrede (Du oder Sie) ist noch offen, siehe `08_open-points.md`. Für ein Fachpublikum an Hochschulen ist «Sie» naheliegend und wird provisorisch verwendet. Englisch neutral mit «you».

## 6. Mails in Brevo

| Mail | Zeitpunkt | Inhalt |
|---|---|---|
| Double-Opt-in DE / EN | Nach Absenden | Kurzer Dank, Bestätigungsbutton mit Platzhalter `{{ doubleoptin }}`, Hinweis, dass ohne Klick keine Registrierung erfolgt |
| Willkommen DE / EN (optional) | Nach Bestätigung (Brevo-Automation) | Link zum Research Report, kurzer Ausblick auf Updates, Abmeldelink |
| Newsletter | Manuell | Über den Brevo-Editor, Segmentierung nach `SPRACHE` |

Alle Mails enthalten einen Abmeldelink. Ob Automationen im Free-Plan im benötigten Umfang verfügbar sind, in Brevo prüfen.

## 7. Testcheckliste

- [ ] Registrierung DE und EN mit echter Adresse (Gmail, Outlook, Hochschuladresse)
- [ ] Bestätigungsmail kommt an, nicht im Spam
- [ ] Link bestätigt, Kontakt erscheint in der richtigen Liste mit allen Attributen
- [ ] Redirect auf die richtige Sprachversion
- [ ] `?src=netzwerktreffen` und `?src=mail` werden korrekt gespeichert
- [ ] Fehlerfall getestet (z.B. mit ungültigem API-Key in Preview)
- [ ] Honeypot getestet
- [ ] Abmeldung funktioniert
- [ ] Formular vollständig per Tastatur und mit Screenreader bedienbar
