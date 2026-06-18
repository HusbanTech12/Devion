import Link from "next/link"
import { Sparkles, Globe, AtSign, UsersRound, Rss, ChevronRight } from "lucide-react"

const footerLinks = {
  Company: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  Resources: [
    { href: "/docs", label: "Documentation" },
    { href: "/api", label: "API Reference" },
    { href: "/changelog", label: "Changelog" },
    { href: "/status", label: "System Status" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
}

const socials = [
  { href: "#", label: "LinkedIn", icon: UsersRound },
  { href: "#", label: "Twitter", icon: AtSign },
  { href: "#", label: "GitHub", icon: Globe },
  { href: "#", label: "Blog", icon: Rss },
]

export function Footer() {
  return (
    <footer className="relative border-t border-primary/10 bg-gradient-to-b from-background to-muted/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/3 via-transparent to-transparent pointer-events-none" />

      <div className="container relative pt-16 pb-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="group inline-flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/25">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Devi<span className="text-primary">on</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm mb-6 leading-relaxed">
              Premium AI-powered development platform. Build intelligent systems
              that automate, predict, and transform — at scale.
            </p>

            <div className="flex items-center gap-2">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <Link
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/60 text-muted-foreground ring-1 ring-primary/5 transition-all duration-200 hover:bg-primary hover:text-white hover:ring-primary/30 hover:shadow-lg hover:shadow-primary/20"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                )
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-sm mb-4 tracking-wide text-foreground/80">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground inline-flex items-center gap-1"
                    >
                      {link.label}
                      <ChevronRight className="h-3 w-3 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-primary/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Devion. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
