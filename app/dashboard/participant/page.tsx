export default function ParticipantDashboardPage() {
  return (
    <section className="p-8">
      <h1 className="text-2xl font-semibold">Kursteilnehmer Dashboard</h1>
      <p className="text-sm text-slate-600">Persönliche Kurstermine, Unterlagen, Buchungen und der E-Mail-Verlauf auf einen Blick.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          { label: 'Kommende Kurse', value: '2' },
          { label: 'Offene Rückfragen', value: '1' },
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
