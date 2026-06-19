"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/src/components/shared/page-header"
import { StatusBadge } from "@/src/components/shared/status-badge"
import { Progress } from "@/src/components/ui/progress"
import { mockProjects } from "@/src/lib/mock-data"

export default function MyProjectsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="My Projects" description="Track the progress of your projects." />

      <div className="grid gap-4">
        {mockProjects.slice(0, 3).map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border bg-card p-6 transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{project.description}</p>
              </div>
              <StatusBadge status={project.status} />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-muted-foreground">Budget</p>
                <p className="text-sm font-medium">{project.budget}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Due Date</p>
                <p className="text-sm font-medium">{project.dueDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Progress</p>
                <div className="mt-1 flex items-center gap-2">
                  <Progress value={project.progress} className="flex-1" />
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
