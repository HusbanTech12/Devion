import { auth, clerkClient } from "@clerk/nextjs/server"

export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth()
  return userId
}

export async function requireUserId(): Promise<string> {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")
  return userId
}

export async function getUserEmail(userId: string): Promise<string | null> {
  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  return user.emailAddresses[0]?.emailAddress ?? null
}

export async function getUserFullName(userId: string): Promise<string | null> {
  const client = await clerkClient()
  const user = await client.users.getUser(userId)
  return `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || null
}
