"use client"

import { motion } from "framer-motion"
import { Plus, Mail, MoreHorizontal } from "lucide-react"
import { PageHeader } from "@/src/components/shared/page-header"
import { StatusBadge } from "@/src/components/shared/status-badge"
import { Button } from "@/src/components/ui/button"
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { mockTeam } from "@/src/lib/mock-data"
export default function TeamPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Team"
        description="Manage your team members and their access."
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Invite Member
          </Button>
        }
      />

      <div className="rounded-2xl border">
        <div className="grid grid-cols-6 gap-4 border-b bg-muted/30 px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span className="col-span-2">Name</span>
          <span>Role</span>
          <span>Projects</span>
          <span>Status</span>
          <span></span>
        </div>
        {mockTeam.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className="grid grid-cols-6 items-center gap-4 border-b px-6 py-4 last:border-0"
          >
            <div className="col-span-2 flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {member.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
            </div>
            <span className="text-sm capitalize">{member.role}</span>
            <span className="text-sm">{member.projects} projects</span>
            <div>
              <StatusBadge status={member.status === "active" ? "active" : "paused"} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Send email">
                <Mail className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More options">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
