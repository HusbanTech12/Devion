"use client"

import { motion } from "framer-motion"
import { Search, Plus, ArrowUpRight } from "lucide-react"
import { PageHeader } from "@/src/components/shared/page-header"
import { DataTable, type Column } from "@/src/components/shared/data-table"
import { StatusBadge } from "@/src/components/shared/status-badge"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { MetricCard } from "@/src/components/shared/metric-card"
import { Users, TrendingUp, DollarSign, MessageSquare } from "lucide-react"
import { mockClients } from "@/src/lib/mock-data"
import { useState } from "react"

const leadColumns: Column<(typeof mockClients)[0]>[] = [
  { key: "name", header: "Name", cell: (c) => <span className="font-medium">{c.name}</span> },
  { key: "company", header: "Company", cell: (c) => c.company },
  { key: "email", header: "Email", cell: (c) => <span className="text-muted-foreground">{c.email}</span> },
  { key: "projects", header: "Projects", cell: (c) => c.projects },
  { key: "revenue", header: "Revenue", cell: (c) => <span className="font-medium">{c.totalRevenue}</span> },
  { key: "status", header: "Status", cell: (c) => <StatusBadge status={c.status} /> },
]

export default function CRMPage() {
  const [search, setSearch] = useState("")
  const filtered = mockClients.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <PageHeader
        title="CRM"
        description="Manage leads and customer relationships."
        actions={<Button><Plus className="mr-2 h-4 w-4" />Add Lead</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Leads" value={24} description="Active pipeline" icon={<Users className="h-4 w-4" />} trend={{ value: 15, positive: true }} />
        <MetricCard title="Conversion Rate" value="42%" description="Last 30 days" icon={<TrendingUp className="h-4 w-4" />} trend={{ value: 8, positive: true }} />
        <MetricCard title="Pipeline Value" value="$186,000" description="Qualified leads" icon={<DollarSign className="h-4 w-4" />} trend={{ value: 22, positive: true }} />
        <MetricCard title="Active Deals" value={8} description="In negotiation" icon={<MessageSquare className="h-4 w-4" />} />
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <DataTable data={filtered} columns={leadColumns} />
    </div>
  )
}
