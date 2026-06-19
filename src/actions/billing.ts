"use server"

import { headers } from "next/headers"
import { auth } from "@/src/lib/auth"
import { db } from "@/src/lib/db"

export async function getSubscription() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { success: false, error: "Unauthorized" } as const

  const data = await db
    .selectFrom("subscriptions")
    .selectAll()
    .where("user_id", "=", session.user.id)
    .executeTakeFirst()

  return { success: true, data: data ?? null }
}
