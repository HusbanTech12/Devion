import { headers } from "next/headers"
import { auth } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { ADMIN_EMAILS, TEAM_EMAILS } from "@/src/lib/constants"
import type { UserRole } from "@/src/types"

export async function getCurrentUserRole(): Promise<UserRole> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error("Unauthorized")

  const dbUser = await db
    .selectFrom("users")
    .select("role")
    .where("id", "=", session.user.id)
    .executeTakeFirst()

  if (dbUser?.role) return dbUser.role as UserRole

  const email = session.user.email
  const role: UserRole = ADMIN_EMAILS.includes(email) ? "admin" : TEAM_EMAILS.includes(email) ? "team" : "client"

  await db
    .insertInto("users")
    .values({
      id: session.user.id,
      email,
      name: (session.user as any).name || null,
      role,
    })
    .onConflict((oc) => oc.column("id").doUpdateSet({ role }))
    .execute()

  return role
}

export async function isAdmin(): Promise<boolean> {
  try {
    const role = await getCurrentUserRole()
    return role === "admin"
  } catch {
    return false
  }
}

export async function isTeam(): Promise<boolean> {
  try {
    const role = await getCurrentUserRole()
    return role === "team"
  } catch {
    return false
  }
}

export async function isClient(): Promise<boolean> {
  try {
    const role = await getCurrentUserRole()
    return role === "client"
  } catch {
    return false
  }
}

export async function requireRole(...roles: UserRole[]): Promise<UserRole> {
  const role = await getCurrentUserRole()
  if (!roles.includes(role)) throw new Error("Forbidden")
  return role
}
