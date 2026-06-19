import type { NextRequest } from "next/server"

export async function proxy(_request: NextRequest) {
  // Session validation handled by dashboard layout via auth.api.getSession()
}

export const config = {
  matcher: [],
}
