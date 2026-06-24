import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "@/src/lib/db"
import { ADMIN_EMAILS, TEAM_EMAILS } from "@/src/lib/constants"
import type { UserRole } from "@/src/types"

export type AuthUser = {
  id: string
  email: string
  name: string | null
  role: UserRole
}

async function syncUserToDb(clerkUser: Awaited<ReturnType<typeof currentUser>>): Promise<AuthUser | null> {
  if (!clerkUser) return null

  const email = clerkUser.emailAddresses[0]?.emailAddress || ""
  const role: UserRole = ADMIN_EMAILS.includes(email) ? "admin" : TEAM_EMAILS.includes(email) ? "team" : "client"

  const existing = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", clerkUser.id)
    .executeTakeFirst()

  if (existing) {
    return {
      id: existing.id!,
      email: existing.email,
      name: existing.name,
      role: existing.role as UserRole,
    }
  }

  await db
    .insertInto("users")
    .values({
      id: clerkUser.id,
      email,
      name: clerkUser.fullName || null,
      role,
    })
    .execute()

  return { id: clerkUser.id, email, name: clerkUser.fullName || null, role }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const { userId } = await auth()
  if (!userId) return null

  const user = await currentUser()
  if (!user) return null

  return syncUserToDb(user)
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
  const { userId } = await auth()
  if (!userId) return false

  const user = await getCurrentUser()
  if (!user) return false
  return roles.includes(user.role)
}
