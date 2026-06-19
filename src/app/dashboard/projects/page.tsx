"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search } from "lucide-react"
import { PageHeader } from "@/src/components/shared/page-header"
import { DataTable, type Column } from "@/src/components/shared/data-table"
import { StatusBadge } from "@/src/components/shared/status-badge"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { KanbanBoard } from "@/src/components/shared/kanban-board"
import { mockProjects } from "@/src/lib/mock-data"
import { cn } from "@/src/lib/utils"

type Project = (typeof mockProjects)[0]

const columns: Column<Project>[] = [
  { key: "name", header: "Project", cell: (p) => <span className="font-medium">{p.name}</span> },
  { key: "client", header: "Client", cell: (p) => <span className="text-muted-foreground">{p.clientName}</span> },
  { key: "status", header: "Status", cell: (p) => <StatusBadge status={p.status} /> },
  { key: "budget", header: "Budget", cell: (p) => <span className="font-medium">{p.budget}</span> },
  { key: "progress", header: "Progress", cell: (p) => (
    <div className="flex items-center gap-2">
      <div className="h-2 w-24 rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full bg-primary transition-all", p.progress === 100 && "bg-emerald-500")}
          style={{ width: `${p.progress}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground">{p.progress}%</span>
    </div>
  )},
  { key: "due", header: "Due Date", cell: (p) => <span className="text-sm text-muted-foreground">{p.dueDate}</span> },
]

const kanbanData = [
  {
    id: "todo",
    title: "To Do",
    items: mockProjects.filter((p) => p.status === "paused").map((p) => ({ id: p.id, title: p.name, description: p.description, status: p.status })),
  },
  {
    id: "in-progress",
    title: "In Progress",
    items: mockProjects.filter((p) => p.status === "active" && p.progress < 50).map((p) => ({ id: p.id, title: p.name, description: p.description, status: p.status, assignee: p.clientName })),
  },
  {
    id: "review",
    title: "Review",
    items: mockProjects.filter((p) => p.status === "active" && p.progress >= 50).map((p) => ({ id: p.id, title: p.name, description: p.description, status: p.status, assignee: p.clientName })),
  },
  {
    id: "done",
    title: "Completed",
    items: mockProjects.filter((p) => p.status === "completed").map((p) => ({ id: p.id, title: p.name, description: p.description, status: p.status })),
  },
]

export default function ProjectsPage() {
  const [search, setSearch] = useState("")
  const filtered = mockProjects.filter(
    (p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.clientName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Manage and track all your projects."
        actions={<Button><Plus className="mr-2 h-4 w-4" />New Project</Button>}
      />

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Tabs defaultValue="table">
        <TabsList>
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="board">Board</TabsTrigger>
        </TabsList>
        <TabsContent value="table" className="mt-4">
          <DataTable data={filtered} columns={columns} />
        </TabsContent>
        <TabsContent value="board" className="mt-4">
          <KanbanBoard columns={kanbanData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
