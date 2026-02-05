export default function AdminDashboardPage() {
  return (
    <section className="p-8">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <p className="text-sm text-slate-600">Alle Module, Historien, Rollen, Buchungen und Compliance im Blick.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          { label: 'Offene Partner', value: '8' },
          { label: 'Aktive Kurse', value: '12' },
          { label: 'Buchungen (Unerledigt)', value: '29' },
        ].map((metric) => (
          <article key={metric.label} className="rounded-xl border border-slate-200 bg-white px-4 py-6">
            <p className="text-sm uppercase tracking-wide text-slate-500">{metric.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{metric.value}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
