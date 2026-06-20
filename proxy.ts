import type { NextRequest } from "next/server"

export async function proxy(_request: NextRequest) {
  // Session validation handled by dashboard layout
}

export const config = {
  matcher: [],
}
