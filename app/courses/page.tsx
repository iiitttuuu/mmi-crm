import { ModuleShell } from '@/components/ModuleShell'

export default function CoursesPage() {
  return (
    <ModuleShell
      title="Kurse"
      description="Verwalte den gesamten Kurskatalog mit Preisen, Steueranteilen und Kategorien."
      tabs={['Übersicht', 'Anlegen/Bearbeiten', 'Historie']}
    >
      <div className="p-6 space-y-2 text-sm text-slate-700">
        <p>
          Automatisierte Kennzahlen: Kursnummer, Bruttopreis, Steuer (0%/20%), Nettopreis-Rechner und Status (aktiv,
          inaktiv, archiviert). Kategorien definieren Intensiv-, Extrem-, Online- oder Workshopkurse.
        </p>
      </div>
    </ModuleShell>
  )
}
