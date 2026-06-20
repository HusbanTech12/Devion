"use server"

import { headers } from "next/headers"
import { auth } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { ADMIN_EMAILS, TEAM_EMAILS } from "@/src/lib/constants"
import { revalidatePath } from "next/cache"
import type { UserRole } from "@/src/types"

export async function syncUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { success: false, error: "Unauthorized" } as const

  const { user } = session
  const email = user.email
  const role: UserRole = ADMIN_EMAILS.includes(email) ? "admin" : TEAM_EMAILS.includes(email) ? "team" : "client"

  const existing = await db
    .selectFrom("users")
    .select(["id", "role"])
    .where("id", "=", user.id)
    .executeTakeFirst()

  if (existing) {
    if (existing.role !== role) {
      await db
        .updateTable("users")
        .set({ role })
        .where("id", "=", user.id)
        .execute()
    }
    return { success: true, data: { id: user.id, email, role } }
  }

  await db
    .insertInto("users")
    .values({
      id: user.id,
      email,
      name: (user as any).name || null,
      role,
    })
    .execute()

  return { success: true, data: { id: user.id, email, role } }
}

export async function getAllUsers() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { success: false, error: "Unauthorized" } as const

  const currentUser = await db
    .selectFrom("users")
    .select("role")
    .where("id", "=", session.user.id)
    .executeTakeFirst()

  if (!currentUser || currentUser.role !== "admin") {
    return { success: false, error: "Forbidden" } as const
  }

  const users = await db
    .selectFrom("users")
    .selectAll()
    .orderBy("created_at", "desc")
    .execute()

  return { success: true, data: users }
}

export async function updateUserRole(userId: string, newRole: UserRole) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { success: false, error: "Unauthorized" } as const

  const currentUser = await db
    .selectFrom("users")
    .select("role")
    .where("id", "=", session.user.id)
    .executeTakeFirst()

  if (!currentUser || currentUser.role !== "admin") {
    return { success: false, error: "Forbidden" } as const
  }

  await db
    .updateTable("users")
    .set({ role: newRole })
    .where("id", "=", userId)
    .execute()

  revalidatePath("/dashboard/settings/users")
  return { success: true, data: { id: userId, role: newRole } }
}

export async function deleteUser(userId: string) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { success: false, error: "Unauthorized" } as const

  const currentUser = await db
    .selectFrom("users")
    .select("role")
    .where("id", "=", session.user.id)
    .executeTakeFirst()

  if (!currentUser || currentUser.role !== "admin") {
    return { success: false, error: "Forbidden" } as const
  }

  await db
    .deleteFrom("users")
    .where("id", "=", userId)
    .execute()

  revalidatePath("/dashboard/settings/users")
  return { success: true }
}
