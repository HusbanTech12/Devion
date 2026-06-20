import { getAllUsers } from "@/src/actions/auth"

export async function GET() {
  const result = await getAllUsers()
  return Response.json(result)
}
