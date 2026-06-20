import { redirect } from "next/navigation"
import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "@/src/lib/db"
import { ADMIN_EMAILS, TEAM_EMAILS } from "@/src/lib/constants"
import { DashboardShell } from "@/src/components/layout/dashboard-shell"
import type { UserRole } from "@/src/types"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

  return (
    <DashboardShell role={role} userName={userName} userEmail={userEmail}>
      {children}
    </DashboardShell>
  )
}
