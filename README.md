# Music Mission Controll – Maßgeschneidertes CRM

Dies ist das secure CRM under [`https://www.musicmissioncontroll.com`](https://www.musicmissioncontroll.com):  
– Module: Partner, Kurse, Kurstermine, Kursteilnehmer, Kursunterlagen, Buchungen, Leads mit Dashboards für Admin/Partner/Kursteilnehmer.  
– Members-Modul zur Rollen-/Modulverwaltung mit Historie, Archiv statt Löschen, DSGVO-konforme Audit-Logs.  
– Token-basierte Auth (NextAuth + Credentials + Prisma-Adapter) plus Gmail-Integration (`office@musicmission.at`) für Threadverläufe.

## Technologie-Stack
- **Frontend:** Next.js 16 (App Router) + Tailwind CSS  
- **Backend:** API-Routen + Prisma Client (aktuelles Prisma 7) auf SQLite (konfigurierbar auf PostgreSQL).  
- **Auth:** NextAuth mit CredentialsProvider, rollenbasierte Claims, MFA-ready-Setup (Token rotation & Audit).  
- **Database:** `Prisma`-Schema mit Partnern, Kursen, Sessions, Teilnehmern, Buchungen, Leads, Email-Logs und History-Log.  
- **Email:** Gmail API via `googleapis`, `office@musicmission.at` (OAuth2 + Refresh Token).  
- **Security:** Audit-Historie (`History`), Archivstatus, Members-Modul + role-based features, environment-secrets, `.env`-steuerung.

## Erste Schritte (lokal)
1. `.env` anlegen (Typischer Inhalt siehe `.env.example` unten).
2. `npm install`
3. `npx prisma migrate dev --name init` *(optional)* – die Datenbank (SQLite/postgres) wird eingerichtet.  
4. `npm run seed` – Rollen und Admin-Konto mit `admin@musicmissioncontroll.com` (Passwort über `ADMIN_PASSWORD` in `.env`).  
5. `npm run dev` – Next.js startet auf `http://localhost:3000`.

### Wichtige Scripts
- `npm run dev` – Entwicklungsmodus (Hot Reload).  
- `npm run build` – Produktion bauen.  
- `npm run start` – Gebautes starten.  
- `npm run seed` – Seed-Skript (erzeugt Rollen + Admin).  
- `npx prisma generate` – Prisma Client aktualisieren.

## Datenmodell & Historie
- `Partner`, `Course`, `CourseSession`, `Participant`, `Booking`, `Document`, `Lead`, `EmailLog` mit automatischen Zeitstempeln + Archiv-Flag.  
- `History`-Tabelle protokolliert `module`, `recordId`, `action`, `changes`, `author`.  
- `PartnerNote` speichert Gesprächsnotizen mit Zeitstempel.  
- E-Mail-Tabs in Partner & Kursteilnehmer zeigen den Gmail-Verlauf (blendet `EmailLog`-Einträge).  
- `Members` verwaltet Rollen (Admin, Mitarbeiter, Partner, Kursteilnehmer) plus zugewiesene Module/Features im JSON-Format.

## Authentifizierung & Rollen
- NextAuth `credentials` mit PrismaAdapter; `Members`-Modul steuert Rollenclaims.  
- JWT-Session enthält `role` claim, der in `callbacks` geschrieben wird.  
- MFA-ready (passwortbasierter Login + optional OTP via externe MFA-Provider).  
- Admin: alle Module + Members; Mitarbeiter: alles außer Members/Dashboard Admin; Partner: Dashboard Partner + Partner; Kursteilnehmer: Dashboard Kursteilnehmer.

## Gmail-Integration (`office@musicmission.at`)
1. Google Cloud Projekt anlegen, Gmail API aktivieren.  
2. OAuth-Client (Web Application) erstellen, Redirect-URI: `http://localhost:3000/api/auth/callback/google` *(nur für Token-Flow)*.  
3. `GMAIL_CLIENT_ID`, `GMAIL_CLIENT_SECRET`, `GMAIL_REDIRECT_URI`, `GMAIL_REFRESH_TOKEN` in `.env` speichern.  
4. `app/api/emails/route.ts` setzt `subject`, `html`, `partnerId` oder `participantId` und loggt die Aktion.  
5. Empfangen: `lib/gmail.ts` bietet `listThreads()` (kann im CRM erweitert werden) und speichert `EmailLog`.

## Deployment & Domain
- Stelle die App auf einer Plattform bereit (Vercel, Render, Fly.io, etc.).  
- Setze `NEXTAUTH_URL=https://www.musicmissioncontroll.com`, `NEXTAUTH_SECRET` + `DATABASE_URL` (Postgres in EU).  
- Domain: `musicmissioncontroll.com` an Hosting verbinden (DNS A/ALIAS).  
- TLS/HTTPS automatisch durch Plattform; bei eigener Infrastruktur: ACME/Let's Encrypt einrichten.  
- Backups: Postgres Snapshots + `prisma migrate deploy` im Release-Prozess.  
- Logging / Monitoring: `next-auth` audit logs, Prisma query logs, Gmail Activity.  
- DSGVO/Finanzkompliance: Archiv (kein Löschen), revisionssichere Historie, consent logs (via `History` + `EmailLog`).

## DSGVO & steuerliche Eckpunkte
- Hosting in der EU (z.B. Vercel EU, Supabase EU).  
- `History` + `EmailLog` garantieren nachvollziehbare Änderungen (GoBD-konform).  
- Archiv statt Löschen (status `ARCHIVED`/`isArchived`).  
- `PartnerNote`, `EmailLog`, `History` speichern Zeitstempel + User-ID.  
- Consent & DSGVO-Dokumente: Verarbeitungsverzeichnis, AVV mit Hosting/Auth, DSFA bei besonderen Daten (UID, Steuer-ID).

## Weitere Hinweise
- Alle Datenbankfelder definieren Pflichtfelder (z.B. `participantNumber`, `courseNumber`).  
- `app/page.tsx` + Modulseiten (Partner, Kurse, Kurstermine, Buchungen, Leads, Dashboard) sind statisch, können mit API-Daten befüllt.  
- Gmail-Threads können per `listThreads()` ausgelesen, `EmailLog` im CRM gespeichert werden.  
- Weitere Module (z. B. `Documents`, `Members`) folgen dem gleichen API/History-Prinzip.

## Umgebungsvariablen (`.env`)
```env
DATABASE_URL=file:./dev.db
NEXTAUTH_SECRET=secure-value
NEXTAUTH_URL=http://localhost:3000
GMAIL_CLIENT_ID=...
GMAIL_CLIENT_SECRET=...
GMAIL_REDIRECT_URI=...
GMAIL_REFRESH_TOKEN=...
GMAIL_USER=office@musicmission.at
ADMIN_EMAIL=admin@musicmissioncontroll.com
ADMIN_PASSWORD=ChangeMe123!
```

## Ausblick
- Module werden durch eine zentrale API + Prisma modelliert; zusätzliche Module, Reports oder Audit-Views können per `lib/history.ts` ergänzt werden.  
- Gmail-Integration kann um Webhooks ergänzt werden, um eingehende E-Mails automatisch zu synchronisieren.  
- Die gesamte Anwendung ist bereit für CI/CD, Monitoring und Hosting unter deiner Domain – ich übernehme den kompletten Deployment-Workflow.  
