"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Menu, Search, Bell, Sun, Moon, Command } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@clerk/nextjs"
import { Button } from "@/src/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command"
import { cn } from "@/src/lib/utils"
import { gravatarUrl } from "@/src/lib/auth-client"
import type { UserRole } from "@/src/types"

type Props = {
  onMenuClick: () => void
  userName: string | null
  userEmail: string
  userRole: UserRole
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
]

const searchItems: Record<string, { href: string; label: string }[]> = {
  admin: [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/projects", label: "Projects" },
    { href: "/dashboard/clients", label: "Clients" },
    { href: "/dashboard/crm", label: "CRM" },
    { href: "/dashboard/analytics", label: "Analytics" },
    { href: "/dashboard/agents", label: "Agents" },
    { href: "/dashboard/activity", label: "Activity" },
    { href: "/dashboard/team", label: "Team" },
    { href: "/dashboard/billing", label: "Billing" },
    { href: "/dashboard/settings", label: "Settings" },
  ],
  team: [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/projects", label: "Projects" },
    { href: "/dashboard/activity", label: "Activity" },
    { href: "/dashboard/agents", label: "Agents" },
    { href: "/dashboard/documents", label: "Documents" },
  ],
  client: [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/my-projects", label: "My Projects" },
    { href: "/dashboard/files", label: "Files" },
    { href: "/dashboard/invoices", label: "Invoices" },
    { href: "/dashboard/messages", label: "Messages" },
  ],
}

export function DashboardHeader({ onMenuClick, userName, userEmail, userRole }: Props) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { signOut } = useAuth()
  const [commandOpen, setCommandOpen] = useState(false)

  const initials = userName
    ? userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : userEmail[0].toUpperCase()

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b bg-background/95 px-4 lg:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Button variant="ghost" size="icon" className="md:hidden shrink-0" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>

        <Link href="/" className="flex items-center shrink-0 mr-2">
          <Image src="/images/logo-dark.svg" alt="Devion" width={140} height={42} className="h-[42px] w-auto" priority unoptimized />
        </Link>

        <nav className="hidden md:flex items-center gap-0.5 mr-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={() => setCommandOpen(true)}
            className="hidden items-center gap-2 rounded-lg border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted lg:inline-flex"
          >
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <kbd className="ml-auto flex items-center gap-1 rounded border bg-background px-1.5 py-0.5 text-xs">
              <Command className="h-3 w-3" />K
            </kbd>
          </button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="shrink-0"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button variant="ghost" size="icon" className="shrink-0">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={gravatarUrl(userEmail)} alt={userName ?? ""} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{userName ?? "User"}</p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                  <span className="mt-1 inline-flex w-fit rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary capitalize">
                    {userRole}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/">Back to Website</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive"
                  onClick={async () => {
                    await signOut()
                    window.location.href = "/sign-in"
                  }}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Search pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {Object.entries(searchItems).map(([role, items]) => {
            if (role !== userRole && role !== "all") return null
            const filtered = role === userRole ? items : []
            if (filtered.length === 0) return null
            return (
              <CommandGroup key={role} heading={role.charAt(0).toUpperCase() + role.slice(1)}>
                {filtered.map((item) => (
                  <CommandItem key={item.href} onSelect={() => {
                    setCommandOpen(false)
                    window.location.href = item.href
                  }}>
                    <Link href={item.href} className="flex w-full items-center gap-2">
                      {item.label}
                    </Link>
                  </CommandItem>
                ))}
              </CommandGroup>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
