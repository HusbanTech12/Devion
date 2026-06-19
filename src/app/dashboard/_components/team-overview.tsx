"use client"

import { motion } from "framer-motion"
import { FolderKanban, Bot, Activity as ActivityIcon, Clock } from "lucide-react"
import { MetricCard } from "@/src/components/shared/metric-card"
import { ActivityFeed } from "@/src/components/shared/activity-feed"
import { StatusBadge } from "@/src/components/shared/status-badge"
import { PageHeader } from "@/src/components/shared/page-header"
import { mockProjects, mockActivity } from "@/src/lib/mock-data"
import { cn } from "@/src/lib/utils"

export function TeamOverview({ userName }: { userName: string | null }) {
  const assignedProjects = mockProjects.filter((p) => p.status === "active")
  const myActivity = mockActivity.slice(0, 4)

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back${userName ? `, ${userName}` : ""}`}
        description="Here's your workspace overview."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Assigned Projects"
          value={assignedProjects.length}
          description="Currently active"
          icon={<FolderKanban className="h-4 w-4" />}
        />
        <MetricCard
          title="AI Agents"
          value={3}
          description="Available for use"
          icon={<Bot className="h-4 w-4" />}
        />
        <MetricCard
          title="Pending Tasks"
          value={8}
          description="Needs attention"
          icon={<Clock className="h-4 w-4" />}
        />
        <MetricCard
          title="Updates Today"
          value={5}
          description="New activities"
          icon={<ActivityIcon className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border bg-card p-6"
        >
          <h3 className="mb-4 text-sm font-semibold">My Active Projects</h3>
          <div className="space-y-4">
            {assignedProjects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <p className="text-sm font-medium">{project.name}</p>
                  <p className="text-xs text-muted-foreground">{project.clientName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-muted">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{project.progress}%</span>
                  </div>
                  <StatusBadge status={project.status} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border bg-card p-6"
        >
          <h3 className="mb-4 text-sm font-semibold">Recent Activity</h3>
          <ActivityFeed
            activities={myActivity.map((a) => ({
              id: a.id,
              title: a.title,
              description: a.description,
              timestamp: a.timestamp,
            }))}
          />
        </motion.div>
      </div>
    </div>
  )
}
