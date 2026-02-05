export default function PartnerDashboardPage() {
  return (
    <section className="p-8">
      <h1 className="text-2xl font-semibold">Partner Dashboard</h1>
      <p className="text-sm text-slate-600">Nur Partnerrelevante Daten, inkl. Kursstandorte, Bewertungen und Notizen.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          { label: 'Aktive Kurstermine', value: '4' },
          { label: 'Bewertungen (Sterne)', value: '4,7 / 5' },
        ].map((metric) => (
          <article key={metric.label} className="rounded-xl border border-slate-200 bg-white px-4 py-6">
            <p className="text-sm uppercase tracking-wide text-slate-500">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
