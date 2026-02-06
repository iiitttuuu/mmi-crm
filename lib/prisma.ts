import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

/* eslint-disable no-var */
declare global {
  var __mmiPrismaClient: PrismaClient | undefined
}
/* eslint-enable no-var */

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? 'file:./dev.db',
})

const prismaClient =
  global.__mmiPrismaClient ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  global.__mmiPrismaClient = prismaClient
}

export const prisma = prismaClient
