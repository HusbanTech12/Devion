import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/src/lib/db"
import { AdminOverview } from "./_components/admin-overview"
import { TeamOverview } from "./_components/team-overview"
import { ClientOverview } from "./_components/client-overview"

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const user = await db
    .selectFrom("users")
    .select(["role", "name"])
    .where("id", "=", userId)
    .executeTakeFirst()

  const clerkUser = await currentUser()
  const role = user?.role ?? "client"
  const userName = user?.name ?? clerkUser?.fullName ?? null

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
