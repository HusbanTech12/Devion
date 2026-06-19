import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { ADMIN_EMAILS } from "@/src/lib/constants"
import { DashboardShell } from "@/src/components/layout/dashboard-shell"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/sign-in")

  const betterUser = session.user as { id: string; email: string; name?: string; role?: string }

  const existing = await db
    .selectFrom("users")
    .select("id")
    .where("id", "=", betterUser.id)
    .executeTakeFirst()

  if (!existing) {
    const email = betterUser.email
    const role = ADMIN_EMAILS.includes(email) ? "admin" : "client"
    await db
      .insertInto("users")
      .values({
        id: betterUser.id,
        email,
        name: betterUser.name || null,
        role,
      })
      .execute()
  }

  const dbUser = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", betterUser.id)
    .executeTakeFirst()

  const role = dbUser?.role ?? betterUser.role ?? "client"
  const userName = dbUser?.name ?? betterUser.name ?? null
  const userEmail = dbUser?.email ?? betterUser.email ?? ""

  return (
    <DashboardShell role={role as any} userName={userName} userEmail={userEmail}>
      {children}
    </DashboardShell>
  )
}
