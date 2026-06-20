import { updateUserRole } from "@/src/actions/auth"

export async function PATCH(req: Request) {
  const { userId, role } = await req.json()
  const result = await updateUserRole(userId, role)
  return Response.json(result)
}
