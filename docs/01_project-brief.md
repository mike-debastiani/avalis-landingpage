# 01 – Project Brief: Landingpage avalis

> **Stand:** 15.09.2026 · **Deadline Live-Schaltung:** spätestens 21.10.2026 · **Event:** 23.10.2026

---

## 1. Anlass

Das Bachelorprojekt «avalis» (Digital Ideation, Fokus Design, Hochschule Luzern, Juli 2026) wurde weitergezogen. Das Team darf es am **Netzwerktreffen für Chancengleichheit von swissuniversities am 23.10.2026** vorstellen. Die Landingpage ist das zentrale Kommunikationsmedium dazu.

## 2. Ziele

1. **Verstehen:** Besuchende verstehen in unter einer Minute, welches Problem avalis adressiert und wie die Lösung aussieht.
2. **Glaubwürdigkeit:** Die Seite vermittelt die im Research erarbeitete **Expertise** (17 Institutionen, drei Prozessmodelle). Wir verkaufen kein Produkt, sondern zeigen Erkenntnisse und eine fundierte Lösungsidee.
3. **Registrieren:** Möglichst viele interessierte Fachpersonen registrieren sich, um den Research Report und künftige Updates zu erhalten.
4. **Lernen:** Wir erfahren, welche Hochschulen und Rollen sich für die Arbeit interessieren.

## 3. Zielgruppe

**Primär:** Fachpersonen aus dem Umfeld Chancengleichheit und Nachteilsausgleich an Schweizer Hochschulen, z.B. Fachstellen Studium und Behinderung, Gleichstellungs- und Diversity-Beauftragte, Studiengangsleitungen, Prüfungsadministration.

**Sekundär:** Hochschulleitungen, Mentor:innen, weitere Interessierte aus Lehre und Forschung.

**Nutzungskontext:**
- Am Event: Aufruf per **QR-Code auf dem Smartphone**, oft zwischen zwei Programmpunkten. Die Seite muss mobil schnell laden und die Registrierung in unter einer Minute möglich sein.
- Per Mail: Aufruf am Desktop, mehr Zeit zum Lesen.
- Mehrsprachiges Publikum: DE und EN zum Start, FR und IT später möglich.

## 4. Scope

**Im Scope (Launch):**
- Onepager mit den Sektionen gemäss `06_content-draft.md`
- Registrierung mit Double-Opt-in über Brevo
- Bestätigungsseite nach Double-Opt-in mit Zugang zum Research Report
- Sprachversionen DE und EN
- Impressum und Datenschutzerklärung
- Tracking der Herkunft (`?src=netzwerktreffen`, `?src=mail`)
- Datenschutzfreundliche Analytics ohne Cookies
- Social-Preview (OpenGraph)

**Nicht im Scope (Launch):**
- Eigene Datenbank (Brevo ist die Kontaktdatenbank)
- Login, Nutzerkonten, CMS
- Live-Demo des Prototyps auf der Seite
- FR und IT (Struktur muss es aber ermöglichen)

## 5. Erfolgskriterien

- Seite ist spätestens am 21.10.2026 unter der eigenen Domain live.
- Registrierung funktioniert Ende-zu-Ende in beiden Sprachen: Formular, Bestätigungsmail, Bestätigung, Zugang zum Report.
- Lighthouse Accessibility mindestens 95, Performance mobil mindestens 90.
- Keine Secrets im Repo.

## 6. Meilensteine

| Bis | Meilenstein |
|---|---|
| So 20.09. | Projekt-Setup, `CLAUDE.md`, i18n-Gerüst, erster Deploy auf Vercel |
| So 27.09. | Design Tokens und Basiskomponenten aus Figma umgesetzt |
| So 04.10. | Alle Sektionen in DE mit abgestimmten Texten; **Domain gekauft** |
| So 11.10. | Registrierung mit Brevo und Double-Opt-in funktioniert; EN-Version komplett |
| So 18.10. | Impressum, Datenschutz, Mail-Templates, QA (Mobile, Barrierefreiheit), Domain und Absender verifiziert |
| Mi 21.10. | **Feature Freeze und Live**, QR-Code und Mail-Link final |
| Fr 23.10. | Netzwerktreffen |

Die Domain muss früh gekauft werden, weil die Verifizierung des Mail-Absenders (SPF, DKIM, DMARC) etwas Vorlauf braucht.
