import bcrypt from 'bcryptjs'
import { prisma } from '../lib/prisma'

const roles = [
  {
    name: 'Admin',
    modules: [
      'Dashboard Admin',
      'Dashboard Partner',
      'Dashboard Kursteilnehmer',
      'Partner',
      'Kurse',
      'Kurstermine',
      'Kursteilnehmer',
      'Kursunterlagen',
      'Buchungen',
      'Leads',
      'Members',
    ],
    features: ['audit', 'email-integration', 'members'],
  },
  {
    name: 'Mitarbeiter',
    modules: [
      'Dashboard Partner',
      'Dashboard Kursteilnehmer',
      'Partner',
      'Kurse',
      'Kurstermine',
      'Kursteilnehmer',
      'Kursunterlagen',
      'Buchungen',
      'Leads',
    ],
    features: ['audit', 'email-integration'],
  },
  {
    name: 'Partner',
    modules: ['Dashboard Partner', 'Partner'],
    features: [],
  },
  {
    name: 'Kursteilnehmer',
    modules: ['Dashboard Kursteilnehmer'],
    features: [],
  },
]

async function main() {
  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {
        modules: role.modules,
        features: role.features,
      },
      create: {
        name: role.name,
        description: `${role.name} Rolle`,
        modules: role.modules,
        features: role.features,
      },
    })
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@musicmissioncontroll.com'
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'ChangeMe123!'
  const adminRole = await prisma.role.findUnique({ where: { name: 'Admin' } })

  if (!adminRole) {
    throw new Error('Admin-Rolle wurde nicht erstellt.')
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 12)
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: 'Admin',
      hashedPassword,
      roleId: adminRole.id,
    },
    create: {
      email: adminEmail,
      name: 'Admin',
      hashedPassword,
      roleId: adminRole.id,
    },
  })

  console.log('Seed abgeschlossen; Admin:', adminEmail)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
