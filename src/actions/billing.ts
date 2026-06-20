"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/src/lib/db"

export async function getSubscription() {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  const data = await db
    .selectFrom("subscriptions")
    .selectAll()
    .where("user_id", "=", userId)
    .executeTakeFirst()

  return { success: true, data: data ?? null }
}
