"use client"

import { useState } from "react"
import { Sidebar } from "@/src/components/layout/sidebar"
import { DashboardHeader } from "@/src/components/layout/dashboard-header"
import { MobileSidebar } from "@/src/components/layout/mobile-sidebar"
import type { UserRole } from "@/src/types"

export function DashboardShell({
  children,
  role,
  userName,
  userEmail,
}: {
  children: React.ReactNode
  role: UserRole
  userName: string | null
  userEmail: string
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} />
      <MobileSidebar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        role={role}
      />
      <div className="flex flex-1 flex-col">
        <DashboardHeader
          onMenuClick={() => setMobileMenuOpen(true)}
          userName={userName}
          userEmail={userEmail}
          userRole={role}
        />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
