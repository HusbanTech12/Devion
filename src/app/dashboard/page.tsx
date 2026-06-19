import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { AdminOverview } from "./_components/admin-overview"
import { TeamOverview } from "./_components/team-overview"
import { ClientOverview } from "./_components/client-overview"

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) redirect("/sign-in")

  const betterUser = session.user as { id: string; email: string; name?: string; role?: string }

  const user = await db
    .selectFrom("users")
    .select(["role", "name"])
    .where("id", "=", betterUser.id)
    .executeTakeFirst()

  const role = user?.role ?? betterUser.role ?? "client"
  const userName = user?.name ?? betterUser.name ?? null

  switch (role) {
    case "admin":
      return <AdminOverview userName={userName} />
    case "team":
      return <TeamOverview userName={userName} />
    case "client":
      return <ClientOverview userName={userName} />
    default:
      redirect("/sign-in")
  }
}
