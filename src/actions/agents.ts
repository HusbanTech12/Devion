"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { createClient } from "@/src/lib/supabase/server"
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

  const supabase = await createClient()
  const { data: agent, error } = await supabase
    .from("agents")
    .insert({ user_id: userId, ...parsed.data })
    .select()
    .single()

  if (error) return { success: false, error: error.message } as const

  revalidatePath("/dashboard/agents")
  return { success: true, data: agent }
}

export async function getAgents() {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("agents")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) return { success: false, error: error.message } as const
  return { success: true, data }
}
