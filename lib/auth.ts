import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Email & Passwort',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Passwort', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
          include: { role: true },
        })

        if (!user || !user.hashedPassword) return null
        const passwordMatches = await bcrypt.compare(credentials.password, user.hashedPassword)
        if (!passwordMatches) return null

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name ?? 'Nutzer',
          role: user.role?.name ?? 'Mitarbeiter',
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 1 Stunde
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? 'Mitarbeiter'
      }
      return token
    },
    async session({ session, token }) {
      session.user = session.user ?? {}
      session.user.role = token.role as string
      return session
    },
  },
  debug: process.env.NODE_ENV !== 'production',
  secret: process.env.NEXTAUTH_SECRET,
}
