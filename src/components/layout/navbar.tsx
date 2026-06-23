"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  Menu, X, Search, Bell, LayoutDashboard,
  User, Settings, CreditCard, LifeBuoy, LogOut, Sparkles, CalendarIcon,
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
import { useSession } from "@/src/lib/auth-client"
import { useAuth } from "@clerk/nextjs"

const baseLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/process", label: "Process" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()
  const { signOut } = useAuth()
  const user = session?.user
  const role = user?.role
  const isAdmin = role === "admin"
  const isDashboard = pathname.startsWith("/dashboard")
  const isAuth = pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")

  if (isDashboard || isAuth) return null

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.charAt(0).toUpperCase() ?? "U"

  return (
    <header className="fixed top-0 z-50 w-full">
      {/* Background layer with glass effect */}
      <div className="absolute inset-0 border-b border-primary/10 bg-background/60 backdrop-blur-3xl supports-[backdrop-filter]:bg-background/30" />

      {/* Subtle gradient glow at the bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative grid grid-cols-[auto_1fr_auto] items-center w-full px-6 py-3">
        {/* Column 1: Logo */}
        <div className="shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Devion Logo.svg"
              alt="Devion"
              width={200}
              height={60}
              className="h-14 md:h-[60px] w-auto"
              priority
              unoptimized
            />
          </Link>
        </div>

        {/* Column 2: Desktop Navigation */}
        <div className="hidden md:flex justify-center items-center">
          <nav className="flex items-center gap-0.5 rounded-full bg-muted/60 px-1.5 py-1.5 ring-1 ring-primary/5 shadow-sm">
            {baseLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-primary/20 shadow-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Column 3: Actions + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          {user ? (
            <>
              <Button variant="ghost" size="icon" className="shrink-0 rounded-full text-muted-foreground hover:text-foreground">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="shrink-0 rounded-full text-muted-foreground hover:text-foreground relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
              </Button>

              <Button asChild size="sm" className="rounded-full h-9">
                <Link href="/contact">
                  <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                  Book a Call
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 ring-2 ring-primary/10 hover:ring-primary/30 transition-all">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? ""} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xs font-medium">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-1.5 rounded-2xl border-primary/10 bg-background/80 backdrop-blur-3xl shadow-2xl" align="end" sideOffset={10}>
                  <DropdownMenuLabel className="p-0">
                    <div className="flex items-center gap-3 px-3 py-3.5">
                      <Avatar className="h-11 w-11 ring-2 ring-primary/20">
                        <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? ""} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-sm font-medium">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <p className="text-sm font-semibold truncate">{user?.name ?? "User"}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                        {isAdmin && (
                          <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary uppercase tracking-wider">
                            <Sparkles className="h-2.5 w-2.5" />
                            Admin
                          </span>
                        )}
                      </div>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-primary/5" />

                  <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/5 cursor-pointer">
                    <Link href="/dashboard" className="flex items-center gap-2.5 py-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                        <LayoutDashboard className="h-3.5 w-3.5 text-primary" />
                      </div>
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-primary/5" />

                  <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/5 cursor-pointer">
                    <Link href="/dashboard/settings" className="flex items-center gap-2.5 py-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                        <User className="h-3.5 w-3.5" />
                      </div>
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/5 cursor-pointer">
                    <Link href="/dashboard/settings?tab=account" className="flex items-center gap-2.5 py-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                        <Settings className="h-3.5 w-3.5" />
                      </div>
                      Account Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/5 cursor-pointer">
                    <Link href="/dashboard/billing" className="flex items-center gap-2.5 py-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                        <CreditCard className="h-3.5 w-3.5" />
                      </div>
                      Billing
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/5 cursor-pointer">
                    <Link href="/dashboard/settings?tab=notifications" className="flex items-center gap-2.5 py-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                        <Bell className="h-3.5 w-3.5" />
                      </div>
                      Notifications
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-primary/5" />

                  <DropdownMenuItem asChild className="rounded-xl focus:bg-primary/5 cursor-pointer">
                    <Link href="/contact" className="flex items-center gap-2.5 py-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted">
                        <LifeBuoy className="h-3.5 w-3.5" />
                      </div>
                      Help & Support
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-primary/5" />

                  <DropdownMenuItem
                    className="rounded-xl text-destructive focus:text-destructive focus:bg-destructive/5 flex items-center gap-2.5 py-2 cursor-pointer"
                    onClick={async () => {
                      await signOut()
                      window.location.href = "/"
                    }}
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/10">
                      <LogOut className="h-3.5 w-3.5" />
                    </div>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-foreground">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="rounded-full h-9">
                <Link href="/contact">
                  <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
                  Book a Call
                </Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full bg-muted/60 ring-1 ring-primary/5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="relative overflow-hidden border-t border-primary/10 md:hidden"
          >
            {/* Glass background for mobile menu */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl" />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative container py-6 space-y-1"
            >
              {baseLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-2xl transition-colors",
                      pathname === link.href
                        ? "text-primary bg-primary/10 ring-1 ring-primary/20"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {pathname === link.href && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    )}
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="pt-4 border-t border-primary/5">
                {user ? (
                  <>
                    <div className="flex flex-col gap-2 pb-4 border-b border-primary/5">
                      <Button size="sm" className="w-full rounded-xl" asChild>
                        <Link href="/contact" onClick={() => setOpen(false)}>
                          <CalendarIcon className="h-4 w-4 mr-1.5" />
                          Book a Call
                        </Link>
                      </Button>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-muted/30">
                      <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                        <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? ""} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-xs font-medium">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium truncate">{user?.name ?? "User"}</span>
                        <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
                      </div>
                    </div>
                    <div className="space-y-1 mt-3">
                      <Link
                        href="/dashboard"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      >
                        <User className="h-4 w-4" />
                        Profile Settings
                      </Link>
                      <Link
                        href="/dashboard/billing"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      >
                        <CreditCard className="h-4 w-4" />
                        Billing
                      </Link>
                      <Link
                        href="/contact"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      >
                        <LifeBuoy className="h-4 w-4" />
                        Help & Support
                      </Link>
                    </div>
                    <Button
                      variant="ghost"
                      className="w-full rounded-xl mt-3 text-destructive hover:text-destructive hover:bg-destructive/5"
                      onClick={async () => { setOpen(false); await signOut(); window.location.href = "/" }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full rounded-xl" asChild>
                      <Link href="/sign-in" onClick={() => setOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button
                      className="w-full rounded-xl"
                      asChild
                    >
                      <Link href="/contact" onClick={() => setOpen(false)}>
                        <CalendarIcon className="h-4 w-4 mr-1.5" />
                        Book a Call
                      </Link>
                    </Button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
