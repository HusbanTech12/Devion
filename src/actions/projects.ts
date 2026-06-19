"use server"

import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { auth } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { createProjectSchema } from "@/src/lib/validation"

export async function createProject(data: FormData | unknown) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { success: false, error: "Unauthorized" } as const

  const parsed = createProjectSchema.safeParse(
    data instanceof FormData ? Object.fromEntries(data) : data
  )
  if (!parsed.success) {
    return { success: false, error: parsed.error.message } as const
  }

  const project = await db
    .insertInto("projects")
    .values({ user_id: session.user.id, ...parsed.data } as any)
    .returningAll()
    .executeTakeFirst()

  revalidatePath("/dashboard/projects")
  return { success: true, data: project }
}

export async function getProjects() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { success: false, error: "Unauthorized" } as const

  const data = await db
    .selectFrom("projects")
    .selectAll()
    .where("user_id", "=", session.user.id)
    .orderBy("created_at", "desc")
    .execute()

  return { success: true, data }
}
