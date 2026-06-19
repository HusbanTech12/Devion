"use client"

import { motion } from "framer-motion"
import { FolderKanban, FileText, CreditCard, MessageSquare } from "lucide-react"
import { MetricCard } from "@/src/components/shared/metric-card"
import { StatusBadge } from "@/src/components/shared/status-badge"
import { PageHeader } from "@/src/components/shared/page-header"
import { Progress } from "@/src/components/ui/progress"
import { mockProjects, mockInvoices, mockMessages } from "@/src/lib/mock-data"

export function ClientOverview({ userName }: { userName: string | null }) {
  const myProjects = mockProjects.slice(0, 3)
  const latestInvoice = mockInvoices[0]
  const unreadMessages = mockMessages.filter((m) => m.unread).length

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back${userName ? `, ${userName}` : ""}`}
        description="Track your project progress and updates."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Active Projects"
          value={myProjects.filter((p) => p.status === "active").length}
          description="In progress"
          icon={<FolderKanban className="h-4 w-4" />}
        />
        <MetricCard
          title="Shared Files"
          value={12}
          description="Available for download"
          icon={<FileText className="h-4 w-4" />}
        />
        <MetricCard
          title="Pending Invoices"
          value={mockInvoices.filter((i) => i.status === "pending").length}
          description="Awaiting payment"
          icon={<CreditCard className="h-4 w-4" />}
        />
        <MetricCard
          title="Unread Messages"
          value={unreadMessages}
          description="From your team"
          icon={<MessageSquare className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border bg-card p-6"
        >
          <h3 className="mb-4 text-sm font-semibold">My Projects</h3>
          <div className="space-y-4">
            {myProjects.map((project) => (
              <div key={project.id} className="rounded-xl border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-medium">{project.name}</p>
                  <StatusBadge status={project.status} />
                </div>
                <p className="mb-3 text-xs text-muted-foreground">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="mt-1" />
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border bg-card p-6"
          >
            <h3 className="mb-4 text-sm font-semibold">Latest Invoice</h3>
            <div className="flex items-center justify-between rounded-xl border p-4">
              <div>
                <p className="text-sm font-medium">{latestInvoice.client}</p>
                <p className="text-xs text-muted-foreground">Due {latestInvoice.dueDate}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">{latestInvoice.amount}</p>
                <StatusBadge status={latestInvoice.status} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border bg-card p-6"
          >
            <h3 className="mb-4 text-sm font-semibold">
              Recent Messages
              {unreadMessages > 0 && (
                <span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                  {unreadMessages}
                </span>
              )}
            </h3>
            <div className="space-y-3">
              {mockMessages.slice(0, 3).map((msg) => (
                <div key={msg.id} className="flex items-start gap-3 rounded-xl border p-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{msg.from}</p>
                      {msg.unread && <span className="h-2 w-2 rounded-full bg-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{msg.preview}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{msg.date}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
