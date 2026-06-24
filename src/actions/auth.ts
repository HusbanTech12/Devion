"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/src/lib/db"

import { revalidatePath } from "next/cache"
import type { UserRole } from "@/src/types"

export async function getAllUsers() {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  const currentUser = await db
    .selectFrom("users")
    .select("role")
    .where("id", "=", userId)
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

export async function updateUserRole(targetUserId: string, newRole: UserRole) {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  const currentUser = await db
    .selectFrom("users")
    .select("role")
    .where("id", "=", userId)
    .executeTakeFirst()

  if (!currentUser || currentUser.role !== "admin") {
    return { success: false, error: "Forbidden" } as const
  }

  await db
    .updateTable("users")
    .set({ role: newRole })
    .where("id", "=", targetUserId)
    .execute()

  revalidatePath("/dashboard/settings/users")
  return { success: true, data: { id: targetUserId, role: newRole } }
}

export async function deleteUser(targetUserId: string) {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  const currentUser = await db
    .selectFrom("users")
    .select("role")
    .where("id", "=", userId)
    .executeTakeFirst()

  if (!currentUser || currentUser.role !== "admin") {
    return { success: false, error: "Forbidden" } as const
  }

  await db
    .deleteFrom("users")
    .where("id", "=", targetUserId)
    .execute()

  revalidatePath("/dashboard/settings/users")
  return { success: true }
}
