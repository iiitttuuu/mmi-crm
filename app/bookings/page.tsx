import { ModuleShell } from '@/components/ModuleShell'

export default function BookingsPage() {
  return (
    <ModuleShell
      title="Buchungen"
      description="Zahlungsein- und -ausgänge, Archivierung und Statusfilter."
      tabs={['Übersicht', 'Bearbeiten', 'Zahlungseingänge', 'Historie']}
    >
      <div className="p-6 space-y-2 text-sm text-slate-700">
        <p>
          Jede Buchung zeigt Status, Zahlungsjournal und Verlinkungen zu Kursteilnehmern bzw. Kursterminen. Zahlungen
          lassen sich verbuchen und historisieren.
        </p>
      </div>
    </ModuleShell>
  )
}
