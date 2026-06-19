"use server"

import { auth } from "@clerk/nextjs/server"
import { createClient } from "@/src/lib/supabase/server"

export async function getSubscription() {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (error && error.code !== "PGRST116") {
    return { success: false, error: error.message } as const
  }

  return { success: true, data: data ?? null }
}
