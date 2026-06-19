import { Webhook } from "svix"
import { headers } from "next/headers"
import { createAdminClient } from "@/src/lib/supabase/admin"

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) {
    return Response.json({ error: "No webhook secret" }, { status: 500 })
  }

  const headerPayload = await headers()
  const svixId = headerPayload.get("svix-id")
  const svixTimestamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")

  if (!svixId || !svixTimestamp || !svixSignature) {
    return Response.json({ error: "Missing svix headers" }, { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: { type: string; data: Record<string, unknown> }

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as typeof evt
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = createAdminClient()

  if (evt.type === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data as {
      id: string
      email_addresses: { email_address: string }[]
      first_name?: string
      last_name?: string
    }

    await supabase.from("users").insert({
      clerk_id: id,
      email: email_addresses[0]?.email_address ?? "",
      name: `${first_name ?? ""} ${last_name ?? ""}`.trim() || null,
    })
  }

  if (evt.type === "user.deleted") {
    const { id } = evt.data as { id: string }
    await supabase.from("users").delete().eq("clerk_id", id)
  }

  return Response.json({ received: true })
}
