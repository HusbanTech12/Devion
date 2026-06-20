import { syncUser } from "@/src/actions/auth"

export async function POST() {
  try {
    const result = await syncUser()
    return Response.json(result)
  } catch (error) {
    console.error("sync-user error:", error)
    return Response.json(
      { success: false, error: "Failed to sync user" },
      { status: 500 }
    )
  }
}
