"use client"

import { motion } from "framer-motion"
import { DollarSign, FolderKanban, Users, TrendingUp, Activity, ArrowUpRight } from "lucide-react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts"
import { MetricCard } from "@/src/components/shared/metric-card"
import { ActivityFeed } from "@/src/components/shared/activity-feed"
import { DataTable, type Column } from "@/src/components/shared/data-table"
import { StatusBadge } from "@/src/components/shared/status-badge"
import { PageHeader } from "@/src/components/shared/page-header"
import { mockProjects, mockActivity, mockClients, revenueData, projectStatusData } from "@/src/lib/mock-data"
import { cn } from "@/src/lib/utils"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value)
}

export function AdminOverview({ userName }: { userName: string | null }) {
  const totalRevenue = revenueData.reduce((s, m) => s + m.revenue, 0)
  const activeProjects = mockProjects.filter((p) => p.status === "active").length
  const totalClients = mockClients.length
  const revenueGrowth = 23.5

  const projectColumns: Column<(typeof mockProjects)[0]>[] = [
    { key: "name", header: "Project", cell: (p) => <span className="font-medium">{p.name}</span> },
    { key: "client", header: "Client", cell: (p) => p.clientName },
    { key: "status", header: "Status", cell: (p) => <StatusBadge status={p.status} /> },
    { key: "budget", header: "Budget", cell: (p) => p.budget },
    { key: "progress", header: "Progress", cell: (p) => (
      <div className="flex items-center gap-2">
        <div className="h-2 w-24 rounded-full bg-muted">
          <div className={cn("h-full rounded-full bg-primary transition-all", p.progress === 100 && "bg-emerald-500")} style={{ width: `${p.progress}%` }} />
        </div>
        <span className="text-xs text-muted-foreground">{p.progress}%</span>
      </div>
    )},
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back${userName ? `, ${userName}` : ""}`}
        description="Here's what's happening with your business today."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          description="Last 6 months"
          trend={{ value: revenueGrowth, positive: true }}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="Active Projects"
          value={activeProjects}
          description="Across all clients"
          trend={{ value: 12, positive: true }}
          icon={<FolderKanban className="h-4 w-4" />}
        />
        <MetricCard
          title="Total Clients"
          value={totalClients}
          description="Active accounts"
          trend={{ value: 8, positive: true }}
          icon={<Users className="h-4 w-4" />}
        />
        <MetricCard
          title="Monthly Growth"
          value="23.5%"
          description="Month over month"
          trend={{ value: 5.2, positive: true }}
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border bg-card p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Revenue Overview</h3>
            <span className="text-xs text-muted-foreground">Last 6 months</span>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                  formatter={(value) => formatCurrency(value as number)}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" fill="hsl(var(--muted-foreground))" radius={[6, 6, 0, 0]} opacity={0.3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border bg-card p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Project Status</h3>
            <span className="text-xs text-muted-foreground">Distribution</span>
          </div>
          <div className="flex h-[280px] items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {projectStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6">
            {projectStatusData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-xs text-muted-foreground">{entry.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Recent Projects</h3>
          <span className="flex items-center gap-1 text-xs text-primary">
            View all <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
        <DataTable
          data={mockProjects.slice(0, 5)}
          columns={projectColumns}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="rounded-2xl border bg-card p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Recent Activity</h3>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </div>
        <ActivityFeed
          activities={mockActivity.slice(0, 5).map((a) => ({
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
