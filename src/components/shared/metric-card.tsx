"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/src/lib/utils"

type Props = {
  title: string
  value: string | number
  description?: string
  trend?: { value: number; positive: boolean }
  icon?: React.ReactNode
  className?: string
}

export function MetricCard({ title, value, description, trend, icon, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "group rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && (
          <div className="rounded-xl bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary/15">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <p className="text-3xl font-bold tracking-tight">{value}</p>
        {trend && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-sm font-medium",
              trend.positive ? "text-emerald-500" : "text-red-500"
            )}
          >
            {trend.positive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            {trend.value}%
          </span>
        )}
      </div>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </motion.div>
  )
}
