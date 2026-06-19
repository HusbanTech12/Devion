"use client"

import { motion } from "framer-motion"
import { Filter } from "lucide-react"
import { PageHeader } from "@/src/components/shared/page-header"
import { ActivityFeed } from "@/src/components/shared/activity-feed"
import { Button } from "@/src/components/ui/button"
import { mockActivity } from "@/src/lib/mock-data"

export default function ActivityPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity"
        description="Track all platform activity and updates."
        actions={
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border bg-card p-6"
      >
        <ActivityFeed
          activities={mockActivity.map((a) => ({
            id: a.id,
            title: a.title,
            description: a.description,
            timestamp: a.timestamp,
          }))}
        />
      </motion.div>
    </div>
  )
}
