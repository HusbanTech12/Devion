import { redirect } from "next/navigation"
import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "@/src/lib/db"
import { ADMIN_EMAILS, TEAM_EMAILS } from "@/src/lib/constants"
import type { UserRole } from "@/src/types"

const ROUTE_ROLES: Record<string, UserRole[]> = {
  "/dashboard/settings": ["admin"],
  "/dashboard/settings/users": ["admin"],
  "/dashboard/team": ["admin"],
  "/dashboard/billing": ["admin"],
  "/dashboard/clients": ["admin"],
  "/dashboard/crm": ["admin"],
  "/dashboard/analytics": ["admin"],
  "/dashboard/projects": ["admin", "team"],
  "/dashboard/agents": ["admin", "team"],
  "/dashboard/activity": ["admin", "team"],
  "/dashboard/documents": ["team"],
  "/dashboard/my-projects": ["client"],
  "/dashboard/files": ["admin", "client"],
  "/dashboard/invoices": ["admin", "client"],
  "/dashboard/messages": ["admin", "client"],
}

export async function guardRoute(): Promise<{
  role: UserRole
  userName: string | null
  userEmail: string
}> {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  let dbUser = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", userId)
    .executeTakeFirst()

  if (!dbUser) {
    const user = await currentUser()
    if (!user) redirect("/sign-in")

    const email = user.emailAddresses[0]?.emailAddress || ""
    const role: UserRole = ADMIN_EMAILS.includes(email) ? "admin" : TEAM_EMAILS.includes(email) ? "team" : "client"
    await db
      .insertInto("users")
      .values({
        id: userId,
        email,
        name: user.fullName || null,
        role,
      })
      .execute()

    dbUser = await db
      .selectFrom("users")
      .selectAll()
      .where("id", "=", userId)
      .executeTakeFirst()!
  }

  const role = (dbUser?.role ?? "client") as UserRole
  const userName = dbUser?.name ?? null
  const userEmail = dbUser?.email ?? ""

  return { role, userName, userEmail }
}

export async function guardRouteForPage(pathname: string): Promise<UserRole> {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const dbUser = await db
    .selectFrom("users")
    .select("role")
    .where("id", "=", userId)
    .executeTakeFirst()

  const role = (dbUser?.role ?? "client") as UserRole

  const allowedRoles = Object.entries(ROUTE_ROLES).find(([prefix]) =>
    pathname === prefix || pathname.startsWith(prefix + "/")
  )?.[1]

  if (allowedRoles && !allowedRoles.includes(role)) {
    redirect("/")
  }

  return role
}
