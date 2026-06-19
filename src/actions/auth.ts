"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"
import { createAdminClient } from "@/src/lib/supabase/admin"

export async function syncUser() {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  const client = await clerkClient()
  const clerkUser = await client.users.getUser(userId)
  const email = clerkUser.emailAddresses[0]?.emailAddress
  if (!email) return { success: false, error: "No email found" } as const

  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", userId)
    .single()

  if (existing) {
    return { success: true, data: existing }
  }

  const { data, error } = await supabase
    .from("users")
    .insert({
      clerk_id: userId,
      email,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() || null,
    })
    .select()
    .single()

  if (error) return { success: false, error: error.message } as const
  return { success: true, data }
}
