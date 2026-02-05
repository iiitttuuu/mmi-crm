import type { ReactNode } from 'react'

interface ModuleShellProps {
  title: string
  description: string
  tabs?: string[]
  children?: ReactNode
}

export function ModuleShell({ title, description, tabs = [], children }: ModuleShellProps) {
  return (
    <section className="p-8">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500">Modul</p>
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
        <button
          type="button"
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Übersicht speichern
        </button>
      </header>
      {tabs.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <span
              key={tab}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-600"
            >
              {tab}
            </span>
          ))}
        </div>
      )}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <input
          type="search"
          placeholder="Suche..."
          className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm shadow-sm focus:border-slate-400 focus:outline-none"
        />
        <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-100">
          Filter
        </button>
        <button className="flex items-center justify-center gap-2 rounded-xl border border-transparent bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
          Neue Eintragung
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs uppercase tracking-wide text-slate-500">
          <span className="flex-1">Listenansicht</span>
          <span className="flex gap-3 text-slate-400">
            <span>Spalten</span>
            <span>Historie</span>
            <span>Status</span>
          </span>
        </div>
        {children ?? (
          <div className="p-6 text-sm text-slate-600">
            Beispiel-Tabellenansicht mit anpassbaren Spalten, Filter + Historie pro Datensatz.
          </div>
        )}
      </div>
    </section>
  )
}
