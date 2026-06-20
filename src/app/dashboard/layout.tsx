import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { ADMIN_EMAILS, TEAM_EMAILS } from "@/src/lib/constants"
import { DashboardShell } from "@/src/components/layout/dashboard-shell"
import type { UserRole } from "@/src/types"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/sign-in")

  const betterUser = session.user as { id: string; email: string; name?: string; role?: string }

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

  return (
    <DashboardShell role={role} userName={userName} userEmail={userEmail}>
      {children}
    </DashboardShell>
  )
}
