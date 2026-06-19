"use client"

import { motion } from "framer-motion"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
} from "recharts"
import { PageHeader } from "@/src/components/shared/page-header"
import { MetricCard } from "@/src/components/shared/metric-card"
import { Eye, MousePointerClick, TrendingUp, Users } from "lucide-react"
import { revenueData, projectStatusData } from "@/src/lib/mock-data"
import { cn } from "@/src/lib/utils"

const trafficData = [
  { month: "Jan", visitors: 2400, pageviews: 7200 },
  { month: "Feb", visitors: 3200, pageviews: 9600 },
  { month: "Mar", visitors: 2800, pageviews: 8400 },
  { month: "Apr", visitors: 4500, pageviews: 13500 },
  { month: "May", visitors: 3800, pageviews: 11400 },
  { month: "Jun", visitors: 5200, pageviews: 15600 },
]

const engagementData = [
  { name: "Organic", value: 45, color: "#10b981" },
  { name: "Direct", value: 25, color: "#3b82f6" },
  { name: "Social", value: 18, color: "#8b5cf6" },
  { name: "Referral", value: 12, color: "#f59e0b" },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(value)
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Track your business performance and growth." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Visitors" value="21,900" description="Last 6 months" icon={<Eye className="h-4 w-4" />} trend={{ value: 18, positive: true }} />
        <MetricCard title="Page Views" value="65,700" description="Last 6 months" icon={<MousePointerClick className="h-4 w-4" />} trend={{ value: 24, positive: true }} />
        <MetricCard title="Conversion" value="3.2%" description="Average rate" icon={<TrendingUp className="h-4 w-4" />} trend={{ value: 0.8, positive: true }} />
        <MetricCard title="Active Users" value="1,240" description="This month" icon={<Users className="h-4 w-4" />} trend={{ value: 12, positive: true }} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border bg-card p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Revenue Trend</h3>
            <span className="text-xs text-muted-foreground">Monthly</span>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#revenueGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-2xl border bg-card p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Traffic Overview</h3>
            <span className="text-xs text-muted-foreground">Visitors & Pageviews</span>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                />
                <Line type="monotone" dataKey="visitors" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="pageviews" stroke="#8b5cf6" strokeWidth={2} dot={false} opacity={0.6} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border bg-card p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Traffic Sources</h3>
            <span className="text-xs text-muted-foreground">Distribution</span>
          </div>
          <div className="flex h-[280px] items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={engagementData} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={4} dataKey="value">
                  {engagementData.map((entry, i) => (
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
            {engagementData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-xs text-muted-foreground">{entry.name} ({entry.value}%)</span>
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
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Revenue vs Expenses</h3>
            <span className="text-xs text-muted-foreground">Comparison</span>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--popover))", border: "1px solid hsl(var(--border))", borderRadius: "12px" }}
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
