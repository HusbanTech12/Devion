"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, Globe } from "lucide-react"
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
import { Button } from "@/src/components/ui/button"
import { Sheet, SheetContent } from "@/src/components/ui/sheet"
import { Separator } from "@/src/components/ui/separator"
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

export function MobileSidebar({
  open,
  onClose,
  role,
}: {
  open: boolean
  onClose: () => void
  role: UserRole
}) {
  const pathname = usePathname()
  const items = allNavItems.filter((item) => item.roles.includes(role))

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-16 items-center justify-between border-b px-6">
          <Link href="/dashboard" className="text-lg font-bold tracking-tight">
            Devi<span className="text-primary">on</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="space-y-1 p-4">
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Globe className="h-3 w-3" />
            Website
          </div>
          <Link
            href="/"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              pathname === "/"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              pathname === "/about"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            About
          </Link>
          <Link
            href="/services"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              pathname === "/services"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Services
          </Link>
          <Link
            href="/pricing"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              pathname === "/pricing"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              pathname === "/contact"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            Contact
          </Link>
          <Separator className="my-3" />
          <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <LayoutDashboard className="h-3 w-3" />
            Dashboard
          </div>
          {items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
