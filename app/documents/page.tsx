import { ModuleShell } from '@/components/ModuleShell'

export default function DocumentsPage() {
  return (
    <ModuleShell
      title="Kursunterlagen"
      description="PDF-Ansicht + Download, Versionierung und Zugriffsrechte."
      tabs={['Übersicht', 'Uploads', 'Historie']}
    >
      <div className="p-6 space-y-2 text-sm text-slate-700">
        <p>
          Alle Unterlagen werden signierte URLs zum Download erzeugt, Versionen dokumentiert und Zugriffe protokolliert.
          Archivierte Dokumente bleiben lesbar.
        </p>
      </div>
    </ModuleShell>
  )
}
