import { ModuleShell } from '@/components/ModuleShell'

export default function ParticipantPage() {
  return (
    <ModuleShell
      title="Kursteilnehmer"
      description="Teilnehmerdaten mit Zahlungsstatus, Archivierung und E-Mail-Verlauf."
      tabs={['Übersicht', 'Anlegen/Bearbeiten', 'E-Mail', 'Historie']}
    >
      <div className="p-6 space-y-2 text-sm text-slate-700">
        <p>
          Automatisierte Nummern, Status (aktiv, inaktiv, archiviert), gefilterte Bundesländer und synchronisierter
          E-Mail-Tab über <strong>office@musicmission.at</strong>.
        </p>
      </div>
    </ModuleShell>
  )
}
