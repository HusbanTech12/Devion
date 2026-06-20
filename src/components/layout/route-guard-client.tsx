"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import type { UserRole } from "@/src/types"

const ROUTE_RULES: Record<string, UserRole[]> = {
  "/dashboard/settings": ["admin"],
  "/dashboard/team": ["admin"],
  "/dashboard/billing": ["admin"],
  "/dashboard/clients": ["admin"],
  "/dashboard/crm": ["admin"],
  "/dashboard/analytics": ["admin"],
  "/dashboard/projects": ["admin", "team"],
  "/dashboard/agents": ["admin", "team"],
  "/dashboard/activity": ["admin", "team"],
  "/dashboard/documents": ["team"],
  "/dashboard/my-projects": ["client"],
  "/dashboard/files": ["admin", "client"],
  "/dashboard/invoices": ["admin", "client"],
  "/dashboard/messages": ["admin", "client"],
}

export function RouteGuard({
  children,
  role,
}: {
  children: React.ReactNode
  role: UserRole
}) {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const match = Object.entries(ROUTE_RULES).find(([prefix]) =>
      pathname === prefix || pathname.startsWith(prefix + "/")
    )

    if (match) {
      const [, allowedRoles] = match
      if (!allowedRoles.includes(role)) {
        router.replace("/dashboard")
      }
    }
  }, [pathname, role, router])

  return <>{children}</>
}
