import type { Prisma } from '@prisma/client'
import { prisma } from './prisma'

type HistoryActionType = Prisma.HistoryCreateInput['action']

export async function recordHistory({
  module,
  recordId,
  action,
  changes,
  authorId,
}: {
  module: string
  recordId: number | null
  action: HistoryActionType
  changes: Prisma.InputJsonValue
  authorId?: number | null
}) {
  await prisma.history.create({
    data: {
      module,
      recordId: recordId ?? 0,
      action,
      changes,
      authorId,
    },
  })
}
