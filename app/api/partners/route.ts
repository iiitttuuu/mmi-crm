import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { recordHistory } from '@/lib/history'

export async function GET() {
  const partners = await prisma.partner.findMany({
    orderBy: { createdAt: 'desc' },
    take: 40,
    include: {
      notes: {
        orderBy: { createdAt: 'desc' },
        take: 5,
      },
    },
  })
  return NextResponse.json({ data: partners })
}

export async function POST(request: Request) {
  const payload = await request.json()
  const partner = await prisma.partner.create({
    data: {
      name: payload.name,
      address: payload.address,
      country: payload.country ?? 'AUSTRIA',
      region: payload.region,
      email: payload.email,
      phone: payload.phone,
      ceo: payload.ceo,
      uid: payload.uid,
      companyRegister: payload.companyRegister,
      status: payload.status ?? 'OPEN',
      bankName: payload.bankName,
      iban: payload.iban,
      bic: payload.bic,
      rating: payload.rating,
    },
  })

  await recordHistory({
    module: 'Partner',
    recordId: partner.id,
    action: 'CREATED',
    changes: partner,
  })

  return NextResponse.json({ data: partner })
}
