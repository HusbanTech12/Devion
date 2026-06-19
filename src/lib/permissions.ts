import type { UserRole } from "@/src/types"
import { checkRole } from "@/src/lib/auth"

export type RouteAccess = {
  path: string
  roles: UserRole[]
}

export const routePermissions: RouteAccess[] = [
  { path: "/dashboard", roles: ["admin", "team", "client"] },

  // Admin + Team
  { path: "/dashboard/projects", roles: ["admin", "team"] },
  { path: "/dashboard/activity", roles: ["admin", "team"] },
  { path: "/dashboard/agents", roles: ["admin", "team"] },

  // Admin + Client
  { path: "/dashboard/files", roles: ["admin", "client"] },
  { path: "/dashboard/invoices", roles: ["admin", "client"] },
  { path: "/dashboard/messages", roles: ["admin", "client"] },

  // Admin only
  { path: "/dashboard/clients", roles: ["admin"] },
  { path: "/dashboard/settings", roles: ["admin"] },
  { path: "/dashboard/team", roles: ["admin"] },
  { path: "/dashboard/billing", roles: ["admin"] },
  { path: "/dashboard/crm", roles: ["admin"] },
  { path: "/dashboard/analytics", roles: ["admin"] },

  // Team only
  { path: "/dashboard/documents", roles: ["team"] },

  // Client only
  { path: "/dashboard/my-projects", roles: ["client"] },
]

export function getRouteRoles(path: string): UserRole[] | null {
  const entry = routePermissions.find((r) => r.path === path)
  return entry?.roles ?? null
}

export async function canAccessRoute(path: string): Promise<boolean> {
  const roles = getRouteRoles(path)
  if (!roles) return false
  return checkRole(...roles)
}

export async function can(permission: string): Promise<boolean> {
  const permMap: Record<string, UserRole[]> = {
    "projects:create": ["admin", "team"],
    "projects:edit": ["admin", "team"],
    "projects:delete": ["admin"],
    "projects:view_all": ["admin"],
    "clients:manage": ["admin"],
    "team:invite": ["admin"],
    "team:remove": ["admin"],
    "billing:view": ["admin"],
    "analytics:view": ["admin"],
    "settings:view": ["admin"],
    "agents:use": ["admin", "team"],
    "invoices:view": ["admin", "client"],
    "messages:send": ["admin", "client"],
    "documents:view": ["team"],
  }

  const roles = permMap[permission]
  if (!roles) return false
  return checkRole(...roles)
}
