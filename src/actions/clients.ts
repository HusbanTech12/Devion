"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { db } from "@/src/lib/db"
import { createClientSchema, updateClientSchema } from "@/src/lib/validation"

export async function createClient(data: FormData | unknown) {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  const parsed = createClientSchema.safeParse(
    data instanceof FormData ? Object.fromEntries(data) : data
  )
  if (!parsed.success) {
    return { success: false, error: parsed.error.message } as const
  }

  const client = await db
    .insertInto("clients")
    .values({ user_id: userId, ...parsed.data } as any)
    .returningAll()
    .executeTakeFirst()

  revalidatePath("/dashboard/clients")
  return { success: true, data: client }
}

export async function getClients() {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  const data = await db
    .selectFrom("clients")
    .selectAll()
    .where("user_id", "=", userId)
    .orderBy("created_at", "desc")
    .execute()

  return { success: true, data }
}

export async function updateClient(data: FormData | unknown) {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  const parsed = updateClientSchema.safeParse(
    data instanceof FormData ? Object.fromEntries(data) : data
  )
  if (!parsed.success) {
    return { success: false, error: parsed.error.message } as const
  }

  const { id, ...updates } = parsed.data

  const client = await db
    .updateTable("clients")
    .set(updates as any)
    .where("id", "=", id)
    .where("user_id", "=", userId)
    .returningAll()
    .executeTakeFirst()

  if (!client) return { success: false, error: "Client not found" } as const

  revalidatePath("/dashboard/clients")
  return { success: true, data: client }
}

export async function deleteClient(id: string) {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  await db
    .deleteFrom("clients")
    .where("id", "=", id)
    .where("user_id", "=", userId)
    .execute()

  revalidatePath("/dashboard/clients")
  return { success: true }
}
