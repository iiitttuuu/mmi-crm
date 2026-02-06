import { PrismaClient } from '@prisma/client'
import prismaConfig from '@/prisma.config'

/* eslint-disable no-var */
declare global {
  var __mmiPrismaClient: PrismaClient | undefined
}
/* eslint-enable no-var */

const prismaClient =
  global.__mmiPrismaClient ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  global.__mmiPrismaClient = prismaClient
}

export const prisma = prismaClient
