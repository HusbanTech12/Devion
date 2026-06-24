"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { db } from "@/src/lib/db"
import { createAgentSchema } from "@/src/lib/validation"

export async function createAgent(data: FormData | unknown) {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  const parsed = createAgentSchema.safeParse(
    data instanceof FormData ? Object.fromEntries(data) : data
  )
  if (!parsed.success) {
    return { success: false, error: parsed.error.message } as const
  }

  const agent = await db
    .insertInto("agents")
    .values({
      user_id: userId,
      name: parsed.data.name,
      description: parsed.data.description ?? null,
    })
    .returningAll()
    .executeTakeFirst()

  revalidatePath("/dashboard/agents")
  return { success: true, data: agent }
}

export async function getAgents() {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  const data = await db
    .selectFrom("agents")
    .selectAll()
    .where("user_id", "=", userId)
    .orderBy("created_at", "desc")
    .execute()

  return { success: true, data }
}
