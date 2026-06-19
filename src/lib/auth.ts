import { betterAuth } from "better-auth"
import { kyselyAdapter } from "@better-auth/kysely-adapter"
import { nextCookies } from "better-auth/next-js"
import { db } from "@/src/lib/db"
import { headers } from "next/headers"
import type { UserRole } from "@/src/types"

export const auth = betterAuth({
  database: kyselyAdapter(db, {
    type: "postgres",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "client",
        input: false,
      },

    },
  },
  plugins: [nextCookies()],
})

export type Session = typeof auth.$Infer.Session

export type AuthUser = {
  id: string
  email: string
  name: string | null
  role: UserRole
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return null
  const user = session.user as unknown as AuthUser
  return user
}

export async function requireUser(): Promise<AuthUser> {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")
  return user
}

export async function requireRole(...roles: UserRole[]): Promise<AuthUser> {
  const user = await requireUser()
  if (!roles.includes(user.role)) throw new Error("Forbidden")
  return user
}

export async function checkRole(...roles: UserRole[]): Promise<boolean> {
  const user = await getCurrentUser()
  if (!user) return false
  return roles.includes(user.role)
}
