"use server"

import { headers } from "next/headers"
import { revalidatePath } from "next/cache"
import { auth } from "@/src/lib/auth"
import { db } from "@/src/lib/db"
import { createProjectSchema, updateProjectSchema } from "@/src/lib/validation"

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

export async function updateProject(data: FormData | unknown) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { success: false, error: "Unauthorized" } as const

  const parsed = updateProjectSchema.safeParse(
    data instanceof FormData ? Object.fromEntries(data) : data
  )
  if (!parsed.success) {
    return { success: false, error: parsed.error.message } as const
  }

  const { id, ...updates } = parsed.data

  const project = await db
    .updateTable("projects")
    .set(updates as any)
    .where("id", "=", id)
    .where("user_id", "=", session.user.id)
    .returningAll()
    .executeTakeFirst()

  if (!project) return { success: false, error: "Project not found" } as const

  revalidatePath("/dashboard/projects")
  return { success: true, data: project }
}

export async function deleteProject(id: string) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return { success: false, error: "Unauthorized" } as const

  await db
    .deleteFrom("projects")
    .where("id", "=", id)
    .where("user_id", "=", session.user.id)
    .execute()

  revalidatePath("/dashboard/projects")
  return { success: true }
}
