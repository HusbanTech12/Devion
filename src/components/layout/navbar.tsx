"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X, ChevronRight, LayoutDashboard } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { cn } from "@/src/lib/utils"
import { useSession } from "@/src/lib/auth-client"

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
  const role = (session?.user as { role?: string } | undefined)?.role
  const isAdmin = role === "admin"

  const links = useMemo(
    () =>
      isAdmin
        ? [...baseLinks, { href: "/dashboard", label: "Dashboard" }]
        : baseLinks,
    [isAdmin]
  )

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

        <div className="hidden md:flex items-center gap-3">
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
