import { ModuleShell } from '@/components/ModuleShell'

const partnerFields = [
  'Name, Adresse, Land/Bundesland',
  'UID, Firmenbuchnummer, Geschäftsführer',
  'Bankverbindung (IBAN/BIC), Status',
  'Rezensionen (Standort, Dozent, Engagement, Verlässlichkeit)',
  'Notizfeld mit Zeitstempel',
]

export default function PartnersPage() {
  return (
    <ModuleShell
      title="Partner"
      description="Partnerdaten erfassen, bewerten und den E-Mail-Verlauf einsehen."
      tabs={['Übersicht', 'Anlagen/Bearbeiten', 'E-Mail', 'Historie']}
    >
      <div className="p-6">
        <p className="text-sm text-slate-600">
          Jedes Partnerprofil enthält einen E-Mail-Tab zur Kommunikation über <strong>office@musicmission.at</strong>.
        </p>
        <ul className="mt-4 list-disc space-y-2">
          {partnerFields.map((field) => (
            <li key={field} className="text-sm text-slate-700">
              {field}
            </li>
          ))}
        </ul>
      </div>
    </ModuleShell>
  )
}
