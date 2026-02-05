import { ModuleShell } from '@/components/ModuleShell'

export default function LeadsPage() {
  return (
    <ModuleShell
      title="Leads"
      description="Potentielle Partner oder Kursteilnehmer strukturiert verfolgen."
      tabs={['Listenansicht', 'Anlegen', 'Historie']}
    >
      <div className="p-6 space-y-2 text-sm text-slate-700">
        <p>Leadpflege mit Statuswechseln (geprüft, in Kontakt, gewonnen, verloren) und Audit-Log.</p>
      </div>
    </ModuleShell>
  )
}
