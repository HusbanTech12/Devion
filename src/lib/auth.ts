import { betterAuth } from "better-auth"
import { kyselyAdapter } from "@better-auth/kysely-adapter"
import { nextCookies } from "better-auth/next-js"
import { db } from "@/src/lib/db"
import { headers } from "next/headers"
import { ADMIN_EMAILS, TEAM_EMAILS } from "@/src/lib/constants"
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
  const betterUser = session.user as { id: string; email: string; name?: string }

  const dbUser = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", betterUser.id)
    .executeTakeFirst()

  if (dbUser) {
    return {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.name,
      role: dbUser.role as UserRole,
    }
  }

  const email = betterUser.email
  const role: UserRole = ADMIN_EMAILS.includes(email) ? "admin" : TEAM_EMAILS.includes(email) ? "team" : "client"

  await db
    .insertInto("users")
    .values({
      id: betterUser.id,
      email,
      name: betterUser.name || null,
      role,
    })
    .execute()

  return { id: betterUser.id, email, name: betterUser.name || null, role }
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
