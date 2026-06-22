import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "@/src/lib/db"
import { ADMIN_EMAILS, TEAM_EMAILS } from "@/src/lib/constants"
import type { UserRole } from "@/src/types"

async function getDbRole(userId: string): Promise<UserRole | null> {
  const dbUser = await db
    .selectFrom("users")
    .select("role")
    .where("id", "=", userId)
    .executeTakeFirst()

  return (dbUser?.role as UserRole) ?? null
}

export async function getCurrentUserRole(): Promise<UserRole> {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  const dbRole = await getDbRole(userId)
  if (dbRole) return dbRole

  const user = await currentUser()
  if (!user) throw new Error("Unauthorized")

  const email = user.emailAddresses[0]?.emailAddress || ""
  const role: UserRole = ADMIN_EMAILS.includes(email) ? "admin" : TEAM_EMAILS.includes(email) ? "team" : "client"

  await db
    .insertInto("users")
    .values({ id: userId, email, name: user.fullName || null, role })
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
