"use server"

import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { auth } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { createClientSchema } from "@/src/lib/validation"

export async function createClient(data: FormData | unknown) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { success: false, error: "Unauthorized" } as const

  const parsed = createClientSchema.safeParse(
    data instanceof FormData ? Object.fromEntries(data) : data
  )
  if (!parsed.success) {
    return { success: false, error: parsed.error.message } as const
  }

  const client = await db
    .insertInto("clients")
    .values({ user_id: session.user.id, ...parsed.data } as any)
    .returningAll()
    .executeTakeFirst()

  revalidatePath("/dashboard/clients")
  return { success: true, data: client }
}

export async function getClients() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { success: false, error: "Unauthorized" } as const

  const data = await db
    .selectFrom("clients")
    .selectAll()
    .where("user_id", "=", session.user.id)
    .orderBy("created_at", "desc")
    .execute()

  return { success: true, data }
}
