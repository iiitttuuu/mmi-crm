import { NextResponse } from 'next/server'
import { sendMail } from '@/lib/gmail'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const { to, subject, html, module, recordId, direction, partnerId, participantId } =
    await request.json()

  if (!to || !subject || !html || !module) {
    return NextResponse.json({ error: 'Ungültige Daten' }, { status: 400 })
  }

  await sendMail({ to, subject, html })

  await prisma.emailLog.create({
    data: {
      subject,
      body: html,
      direction,
      partnerId: partnerId ?? undefined,
      participantId: participantId ?? undefined,
      module,
      messageId: null,
      threadId: null,
    },
  })

  await prisma.history.create({
    data: {
      module: module,
      recordId: recordId ?? null,
      action: 'UPDATED',
      changes: { updatedEmail: true, to },
      authorId: null,
    },
  })

  return NextResponse.json({ success: true })
}
