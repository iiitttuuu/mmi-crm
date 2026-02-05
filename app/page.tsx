export default function HomePage() {
  return (
    <section className="p-8">
      <header className="mb-4">
        <p className="text-sm uppercase tracking-wide text-slate-500">Secure CRM Blueprint</p>
        <h1 className="text-3xl font-semibold text-slate-900">Music Mission Controll</h1>
        <p className="mt-2 text-slate-600">
          Maßgeschneiderte Plattform für Partner, Kurse, Teilnehmer, Buchungen, Leads und Dokumentation. Alles
          auditierbar, DSGVO-konform und komplett unter deiner Domain.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {[{
          title: 'Sicherer Zugriff',
          description: 'Token-basierte Authentifizierung mit MFA, Rollenzuweisung über das Members-Panel und Audit-Logs.',
        }, {
          title: 'Module & Historie',
          description: 'Partner, Kurse, Kurstermine, Kursteilnehmer, Kursunterlagen, Buchungen & Leads mit Revisionen.',
        }, {
          title: 'E-Mail-Integration',
          description: 'Office@musicmission.at über Gmail-API in Partner- und Teilnehmer-Datensätzen (Verlauf + Versand).',
        }, {
          title: 'Compliance & Hosting',
          description: 'EU-Hosting, Archiv statt Löschen, DSGVO- und österreichischer Steuerkonformität, tägliche Backups.',
        }].map((card) => (
          <article key={card.title} className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
