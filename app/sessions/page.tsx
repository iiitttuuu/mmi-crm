import { ModuleShell } from '@/components/ModuleShell'

export default function SessionsPage() {
  return (
    <ModuleShell
      title="Kurstermine"
      description="Termine verknüpft mit Partnern und Kursen, inkl. Buchungs-Tab."
      tabs={['Übersicht', 'Anlegen/Bearbeiten', 'Buchungen', 'Historie']}
    >
      <div className="p-6 space-y-2 text-sm text-slate-700">
        <p>
          Jeder Termin speichert Start/Ende, Status (offen, beendet, verschoben, storniert, archiviert) und die Buchungen,
          inklusive Button zum Anlegen neuer Buchung.
        </p>
      </div>
    </ModuleShell>
  )
}
