"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Plus, Search, Pencil, Trash2, ExternalLink } from "lucide-react"
import { toast } from "sonner"
import { getProjects, createProject, updateProject, deleteProject } from "@/src/actions/projects"
import { getClients } from "@/src/actions/clients"
import { PageHeader } from "@/src/components/shared/page-header"
import { DataTable, type Column } from "@/src/components/shared/data-table"
import { StatusBadge } from "@/src/components/shared/status-badge"
import { KanbanBoard } from "@/src/components/shared/kanban-board"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog"
import { cn } from "@/src/lib/utils"

type ProjectStatus = "active" | "completed" | "paused" | "cancelled"

type ProjectRow = {
  id: string
  user_id: string
  client_id: string
  name: string
  description: string | null
  status: ProjectStatus
  created_at: string
  updated_at: string | null
  client_name?: string
}

type ClientRow = {
  id: string
  name: string
  email: string
}

const emptyForm = { name: "", description: "", clientId: "", status: "active" as ProjectStatus }

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([])
  const [clients, setClients] = useState<ClientRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const [editProject, setEditProject] = useState<ProjectRow | null>(null)
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    const [pRes, cRes] = await Promise.all([getProjects(), getClients()])
    if (cRes.success) setClients(cRes.data)
    if (pRes.success) {
      const clientMap = new Map((cRes.success ? cRes.data : []).map((c: ClientRow) => [c.id, c.name]))
      setProjects((pRes.data as ProjectRow[]).map((p) => ({ ...p, client_name: clientMap.get(p.client_id) ?? "Unknown" })))
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.client_name?.toLowerCase() ?? "").includes(search.toLowerCase())
  )

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const res = await createProject(form)
    if (res.success) {
      toast.success("Project Added", { description: `${form.name} has been created.` })
      setShowAdd(false)
      setForm(emptyForm)
      load()
    } else {
      toast.error("Error", { description: res.error })
    }
    setSaving(false)
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault()
    if (!editProject) return
    setSaving(true)
    const res = await updateProject({ id: editProject.id, ...form })
    if (res.success) {
      toast.success("Project Updated", { description: `${form.name} has been updated.` })
      setEditProject(null)
      setForm(emptyForm)
      load()
    } else {
      toast.error("Error", { description: res.error })
    }
    setSaving(false)
  }

  async function handleDelete() {
    if (!deleteProjectId) return
    const res = await deleteProject(deleteProjectId)
    if (res.success) {
      toast.success("Project Deleted", { description: "Project has been removed." })
      setDeleteProjectId(null)
      load()
    } else {
      toast.error("Error", { description: res.error })
    }
  }

  function openEdit(project: ProjectRow) {
    setEditProject(project)
    setForm({ name: project.name, description: project.description ?? "", clientId: project.client_id, status: project.status })
  }

  function openAdd() {
    setEditProject(null)
    setForm(emptyForm)
    setShowAdd(true)
  }

  const columns: Column<ProjectRow>[] = [
    { key: "name", header: "Project", cell: (p) => <span className="font-medium">{p.name}</span> },
    { key: "client", header: "Client", cell: (p) => <span className="text-muted-foreground">{p.client_name ?? "Unknown"}</span> },
    { key: "status", header: "Status", cell: (p) => <StatusBadge status={p.status} /> },
    {
      key: "actions", header: "", cell: (p) => (
        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteProjectId(p.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ]

  const kanbanData = [
    {
      id: "todo",
      title: "To Do",
      items: filtered.filter((p) => p.status === "paused").map((p) => ({ id: p.id, title: p.name, description: p.description ?? "", status: p.status })),
    },
    {
      id: "in-progress",
      title: "In Progress",
      items: filtered.filter((p) => p.status === "active").map((p) => ({ id: p.id, title: p.name, description: p.description ?? "", status: p.status, assignee: p.client_name })),
    },
    {
      id: "done",
      title: "Completed",
      items: filtered.filter((p) => p.status === "completed").map((p) => ({ id: p.id, title: p.name, description: p.description ?? "", status: p.status })),
    },
    {
      id: "cancelled",
      title: "Cancelled",
      items: filtered.filter((p) => p.status === "cancelled").map((p) => ({ id: p.id, title: p.name, description: p.description ?? "", status: p.status })),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Manage and track all your projects."
        actions={<Button onClick={openAdd}><Plus className="mr-2 h-4 w-4" />New Project</Button>}
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

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <ExternalLink className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No projects yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">Create your first project to get started.</p>
          <Button className="mt-4" onClick={openAdd}><Plus className="mr-2 h-4 w-4" />New Project</Button>
        </div>
      ) : (
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
      )}

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>Create a new project.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAdd}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Project name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Brief description" />
              </div>
              <div className="space-y-2">
                <Label>Client</Label>
                <Select value={form.clientId} onValueChange={(v) => setForm({ ...form, clientId: v })} required>
                  <SelectTrigger><SelectValue placeholder="Select a client" /></SelectTrigger>
                  <SelectContent>
                    {clients.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v: typeof form.status) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? "Creating..." : "Create Project"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editProject} onOpenChange={(open) => { if (!open) { setEditProject(null); setForm(emptyForm) } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update project details.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Project Name</Label>
                <Input id="edit-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input id="edit-description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Client</Label>
                <Select value={form.clientId} onValueChange={(v) => setForm({ ...form, clientId: v })} required>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {clients.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v: typeof form.status) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => { setEditProject(null); setForm(emptyForm) }}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteProjectId} onOpenChange={(open) => { if (!open) setDeleteProjectId(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>Are you sure you want to delete this project? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteProjectId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
