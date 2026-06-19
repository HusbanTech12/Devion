"use client"

import { motion } from "framer-motion"
import { cn } from "@/src/lib/utils"
import { StatusBadge } from "@/src/components/shared/status-badge"

type KanbanItem = {
  id: string
  title: string
  description?: string
  status: string
  assignee?: string
}

type KanbanColumn = {
  id: string
  title: string
  items: KanbanItem[]
}

type Props = {
  columns: KanbanColumn[]
  className?: string
}

export function KanbanBoard({ columns, className }: Props) {
  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-4", className)}>
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex min-w-[280px] flex-1 flex-col rounded-2xl border bg-muted/30 p-4"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold">{column.title}</h3>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
              {column.items.length}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {column.items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <StatusBadge status={item.status as any} />
                  {item.assignee && (
                    <span className="text-xs text-muted-foreground">{item.assignee}</span>
                  )}
                </div>
                <p className="text-sm font-medium">{item.title}</p>
                {item.description && (
                  <p className="mt-1 text-xs text-muted-foreground">{item.description}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
