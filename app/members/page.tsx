import { ModuleShell } from '@/components/ModuleShell'

export default function MembersPage() {
  const roles = [
    { name: 'Admin', modules: 'Alle' },
    { name: 'Mitarbeiter', modules: 'Alle außer Members & Dashboard Admin' },
    { name: 'Partner', modules: 'Dashboard Partner + Partner-Ansicht' },
    { name: 'Kursteilnehmer', modules: 'Dashboard Kursteilnehmer' },
  ]

  return (
    <ModuleShell
      title="Members"
      description="Zentrale Rollen-, Modul- und Featureverwaltung, inklusive Historie."
      tabs={['Rollen', 'Module', 'Audit']}
    >
      <div className="p-6">
        <p className="mb-4 text-sm text-slate-600">
          Änderungen an Rollen oder zugewiesenen Modulen werden sofort auditiert und schlagen auf Token/Claims
          durch.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {roles.map((role) => (
            <article key={role.name} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-lg font-semibold text-slate-900">{role.name}</h3>
              <p className="text-sm text-slate-600">{role.modules}</p>
            </article>
          ))}
        </div>
      </div>
    </ModuleShell>
  )
}
