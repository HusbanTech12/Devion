"use server"

import { headers } from "next/headers"
import { auth } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { ADMIN_EMAILS } from "@/src/lib/constants"

export async function syncUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { success: false, error: "Unauthorized" } as const

  const { user } = session
  const email = user.email
  const role = ADMIN_EMAILS.includes(email) ? "admin" : "client"

  const existing = await db
    .selectFrom("users")
    .select("id")
    .where("id", "=", user.id)
    .executeTakeFirst()

  if (existing) {
    return { success: true, data: existing }
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
