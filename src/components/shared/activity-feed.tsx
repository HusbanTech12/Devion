import { motion } from "framer-motion"
import { cn } from "@/src/lib/utils"

type Activity = {
  id: string
  title: string
  description?: string
  timestamp: string
  icon?: React.ReactNode
}

type Props = {
  activities: Activity[]
  className?: string
}

export function ActivityFeed({ activities, className }: Props) {
  return (
    <div className={cn("space-y-0", className)}>
      {activities.map((activity, i) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="relative flex gap-4 pb-8 last:pb-0"
        >
          {i < activities.length - 1 && (
            <div className="absolute left-[19px] top-10 h-full w-px bg-border" />
          )}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-background">
            {activity.icon}
          </div>
          <div className="flex-1 space-y-1 pt-1">
            <p className="text-sm font-medium">{activity.title}</p>
            {activity.description && (
              <p className="text-sm text-muted-foreground">{activity.description}</p>
            )}
            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
