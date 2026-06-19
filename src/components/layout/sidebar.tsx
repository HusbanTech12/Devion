"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Bot,
  Activity,
  Settings,
  BarChart3,
  DollarSign,
  UserPlus,
  MessageSquare,
  FileText,
  FileIcon,
  CreditCard,
} from "lucide-react"
import { cn } from "@/src/lib/utils"
import type { UserRole } from "@/src/types"

type NavItem = {
  href: string
  label: string
  icon: typeof LayoutDashboard
  roles: UserRole[]
}

const allNavItems: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, roles: ["admin", "team", "client"] },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban, roles: ["admin", "team"] },
  { href: "/dashboard/my-projects", label: "My Projects", icon: FolderKanban, roles: ["client"] },
  { href: "/dashboard/clients", label: "Clients", icon: Users, roles: ["admin"] },
  { href: "/dashboard/crm", label: "CRM", icon: MessageSquare, roles: ["admin"] },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3, roles: ["admin"] },
  { href: "/dashboard/agents", label: "Agents", icon: Bot, roles: ["admin", "team"] },
  { href: "/dashboard/activity", label: "Activity", icon: Activity, roles: ["admin", "team"] },
  { href: "/dashboard/team", label: "Team", icon: UserPlus, roles: ["admin"] },
  { href: "/dashboard/billing", label: "Billing", icon: DollarSign, roles: ["admin"] },
  { href: "/dashboard/files", label: "Files", icon: FileIcon, roles: ["admin", "client"] },
  { href: "/dashboard/invoices", label: "Invoices", icon: CreditCard, roles: ["admin", "client"] },
  { href: "/dashboard/messages", label: "Messages", icon: MessageSquare, roles: ["admin", "client"] },
  { href: "/dashboard/documents", label: "Documents", icon: FileText, roles: ["team"] },
  { href: "/dashboard/settings", label: "Settings", icon: Settings, roles: ["admin"] },
]

function getNavSections(role: UserRole) {
  const items = allNavItems.filter((item) => item.roles.includes(role))

  const sections: { title?: string; items: typeof items }[] = []

  const mainItems = items.filter((i) => !["/dashboard/settings", "/dashboard/billing", "/dashboard/team", "/dashboard/documents"].includes(i.href))
  if (mainItems.length > 0) sections.push({ items: mainItems })

  const extraItems = items.filter((i) => ["/dashboard/team", "/dashboard/documents", "/dashboard/billing", "/dashboard/settings"].includes(i.href))
  if (extraItems.length > 0) sections.push({ title: "Administration", items: extraItems })

  return sections
}

export function Sidebar({ role }: { role: UserRole }) {
  const pathname = usePathname()
  const sections = getNavSections(role)

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background md:flex md:flex-col">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Link href="/dashboard" className="text-lg font-bold tracking-tight">
          Devi<span className="text-primary">on</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-4 overflow-y-auto p-4">
        {sections.map((section, i) => (
          <div key={i}>
            {section.title && (
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
