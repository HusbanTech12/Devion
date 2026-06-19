"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { createClient as createSupabaseClient } from "@/src/lib/supabase/server"
import { createClientSchema } from "@/src/lib/validation"

export async function createClient(data: FormData | unknown) {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  const parsed = createClientSchema.safeParse(
    data instanceof FormData ? Object.fromEntries(data) : data
  )
  if (!parsed.success) {
    return { success: false, error: parsed.error.message } as const
  }

  const supabase = await createSupabaseClient()
  const { data: client, error } = await supabase
    .from("clients")
    .insert({ user_id: userId, ...parsed.data })
    .select()
    .single()

  if (error) return { success: false, error: error.message } as const

  revalidatePath("/dashboard/clients")
  return { success: true, data: client }
}

export async function getClients() {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  const supabase = await createSupabaseClient()
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) return { success: false, error: error.message } as const
  return { success: true, data }
}
