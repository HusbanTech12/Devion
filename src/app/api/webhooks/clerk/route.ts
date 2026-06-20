import { Webhook } from "svix"
import { headers } from "next/headers"
import { db } from "@/src/lib/db"
import { ADMIN_EMAILS, TEAM_EMAILS } from "@/src/lib/constants"
import type { UserRole } from "@/src/types"

type WebhookEvent = {
  type: "user.created" | "user.updated" | "user.deleted"
  data: {
    id: string
    email_addresses: { email_address: string }[]
    first_name: string | null
    last_name: string | null
    public_metadata: Record<string, unknown>
  }
}

export async function POST(req: Request) {
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "")

  const headerPayload = await headers()
  const svixId = headerPayload.get("svix-id")
  const svixTimestamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")

  if (!svixId || !svixTimestamp || !svixSignature) {
    return Response.json({ error: "Missing svix headers" }, { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent
  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 })
  }

  const { type, data } = evt

  if (type === "user.created" || type === "user.updated") {
    const email = data.email_addresses[0]?.email_address || ""
    const role: UserRole = ADMIN_EMAILS.includes(email) ? "admin" : TEAM_EMAILS.includes(email) ? "team" : "client"
    const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || null

    const existing = await db
      .selectFrom("users")
      .select("id")
      .where("id", "=", data.id)
      .executeTakeFirst()

    if (existing) {
      await db
        .updateTable("users")
        .set({ email, name, role })
        .where("id", "=", data.id)
        .execute()
    } else {
      await db
        .insertInto("users")
        .values({ id: data.id, email, name, role })
        .execute()
    }
  }

  if (type === "user.deleted") {
    await db
      .deleteFrom("users")
      .where("id", "=", data.id)
      .execute()
  }

  return Response.json({ success: true })
}
