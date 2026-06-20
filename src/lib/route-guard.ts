import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/src/lib/auth"
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
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/sign-in")

  const betterUser = session.user as { id: string; email: string; name?: string }

  let dbUser = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", betterUser.id)
    .executeTakeFirst()

  if (!dbUser) {
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

    dbUser = await db
      .selectFrom("users")
      .selectAll()
      .where("id", "=", betterUser.id)
      .executeTakeFirst()!
  }

  const role = (dbUser?.role ?? "client") as UserRole
  const userName = dbUser?.name ?? betterUser.name ?? null
  const userEmail = dbUser?.email ?? betterUser.email ?? ""

  return { role, userName, userEmail }
}

export async function guardRouteForPage(pathname: string): Promise<UserRole> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/sign-in")

  const betterUser = session.user as { id: string; email: string }

  const dbUser = await db
    .selectFrom("users")
    .select("role")
    .where("id", "=", betterUser.id)
    .executeTakeFirst()

  const role = (dbUser?.role ?? "client") as UserRole

  const allowedRoles = Object.entries(ROUTE_ROLES).find(([prefix]) =>
    pathname === prefix || pathname.startsWith(prefix + "/")
  )?.[1]

  if (allowedRoles && !allowedRoles.includes(role)) {
    redirect("/dashboard")
  }

  return role
}
