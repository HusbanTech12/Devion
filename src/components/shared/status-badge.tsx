import { cn } from "@/src/lib/utils"

export type Status = "active" | "completed" | "paused" | "cancelled" | "pending" | "in_progress" | "paid" | "overdue"

const statusConfig: Record<Status, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  completed: { label: "Completed", className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  paused: { label: "Paused", className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  cancelled: { label: "Cancelled", className: "bg-red-500/10 text-red-500 border-red-500/20" },
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  in_progress: { label: "In Progress", className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  paid: { label: "Paid", className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  overdue: { label: "Overdue", className: "bg-red-500/10 text-red-500 border-red-500/20" },
}

export function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status] ?? { label: status, className: "bg-muted text-muted-foreground border-muted" }
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  )
}
