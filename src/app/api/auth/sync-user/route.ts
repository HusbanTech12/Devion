import { syncUser } from "@/src/actions/auth"

export async function POST() {
  const result = await syncUser()
  return Response.json(result)
}
