"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  Menu, X, ChevronRight, Search, Bell, LayoutDashboard,
  User, Settings, CreditCard, LifeBuoy, LogOut,
} from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/src/components/ui/dropdown-menu"
import { cn } from "@/src/lib/utils"
import { useSession, signOut } from "@/src/lib/auth-client"

const baseLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const user = session?.user
  const role = (user as { role?: string } | undefined)?.role
  const isAdmin = role === "admin"
  const isDashboard = pathname.startsWith("/dashboard")

  const links = useMemo(
    () =>
      isAdmin
        ? [...baseLinks, { href: "/dashboard", label: "Dashboard" }]
        : baseLinks,
    [isAdmin]
  )

  if (isDashboard) return null

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.charAt(0).toUpperCase() ?? "U"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/40">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/images/logo-dark.svg" alt="Devion" width={200} height={60} className="h-[60px] w-auto" priority unoptimized />
        </Link>

        <nav className="hidden md:flex items-center gap-1 rounded-2xl bg-muted/50 px-2 py-1 ring-1 ring-primary/5">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-xl bg-primary/10 ring-1 ring-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {link.href === "/dashboard" && <LayoutDashboard className="h-3.5 w-3.5" />}
                  {link.label}
                </span>
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2 ml-auto">
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="shrink-0 rounded-xl">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="shrink-0 rounded-xl">
                <Bell className="h-4 w-4" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 ring-1 ring-primary/10 hover:ring-primary/30 transition-all">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? ""} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" sideOffset={12}>
                  <DropdownMenuLabel className="p-0">
                    <div className="flex items-center gap-3 px-2 py-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? ""} />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">{user?.name ?? "User"}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                        {isAdmin && (
                          <span className="mt-0.5 inline-flex w-fit rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary capitalize">
                            admin
                          </span>
                        )}
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}

                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings?tab=account" className="flex items-center gap-2 cursor-pointer">
                      <Settings className="h-4 w-4" />
                      Account Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/billing" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="h-4 w-4" />
                      Billing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings?tab=notifications" className="flex items-center gap-2 cursor-pointer">
                      <Bell className="h-4 w-4" />
                      Notifications
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/contact" className="flex items-center gap-2 cursor-pointer">
                      <LifeBuoy className="h-4 w-4" />
                      Help & Support
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive flex items-center gap-2 cursor-pointer"
                    onClick={async () => {
                      await signOut()
                      window.location.href = "/"
                    }}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="rounded-xl">
                <Link href="/sign-in">
                  Sign in
                </Link>
              </Button>
              <Button asChild size="sm" className="rounded-xl gap-1.5">
                <Link href="/contact">
                  Get Started
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-xl bg-muted/50 ring-1 ring-primary/5"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-primary/10 md:hidden"
          >
            <div className="container py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors",
                    pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {pathname === link.href && (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  )}
                  {link.href === "/dashboard" && <LayoutDashboard className="h-3.5 w-3.5" />}
                  {link.label}
                </Link>
              ))}

              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 border-t border-primary/10 mt-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? ""} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user?.name ?? "User"}</span>
                      <span className="text-xs text-muted-foreground">{user?.email}</span>
                    </div>
                  </div>
                  <div className="space-y-1 pl-4">
                    {isAdmin && (
                      <Link
                        href="/dashboard"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    )}
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      <User className="h-4 w-4" />
                      Profile Settings
                    </Link>
                    <Link
                      href="/dashboard/billing"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      <CreditCard className="h-4 w-4" />
                      Billing
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      <LifeBuoy className="h-4 w-4" />
                      Help & Support
                    </Link>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full rounded-xl mt-2 text-destructive"
                    onClick={async () => { setOpen(false); await signOut(); window.location.href = "/" }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="w-full rounded-xl" asChild>
                    <Link href="/sign-in" onClick={() => setOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                  <Button className="w-full mt-2 rounded-xl" asChild>
                    <Link href="/contact" onClick={() => setOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
