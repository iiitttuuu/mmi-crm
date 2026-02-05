import './globals.css'

export const metadata = {
  title: 'Music Mission Controll CRM',
  description: 'Sicheres CRM für Partner, Kurse, Kursteilnehmer und Buchungen unter der Domain musicmissioncontroll.com',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="flex min-h-screen">
          <aside className="w-64 border-r border-slate-200 bg-white pb-10">
            <div className="px-6 py-4 text-lg font-semibold text-slate-700">Music Mission CRM</div>
            <nav className="px-4">
              {[
                { label: 'Dashboard Admin', href: '/dashboard/admin' },
                { label: 'Dashboard Partner', href: '/dashboard/partner' },
                { label: 'Dashboard Kursteilnehmer', href: '/dashboard/participant' },
                { label: 'Partner', href: '/partners' },
                { label: 'Kurse', href: '/courses' },
                { label: 'Kurstermine', href: '/sessions' },
                { label: 'Kursteilnehmer', href: '/participants' },
                { label: 'Kursunterlagen', href: '/documents' },
                { label: 'Buchungen', href: '/bookings' },
                { label: 'Leads', href: '/leads' },
                { label: 'Members', href: '/members' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
