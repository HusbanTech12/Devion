"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Mail, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { getClients, createClient, updateClient, deleteClient } from "@/src/actions/clients"
import { PageHeader } from "@/src/components/shared/page-header"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/src/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"

type Client = {
  id: string
  user_id: string
  name: string
  email: string
  company: string | null
  created_at: string
  updated_at: string | null
}

const emptyForm = { name: "", email: "", company: "" }

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [editClient, setEditClient] = useState<Client | null>(null)
  const [deleteClientId, setDeleteClientId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getClients().then((res) => {
      if (res.success) setClients(res.data as Client[])
      setLoading(false)
    })
  }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const res = await createClient(form)
    if (res.success) {
      toast.success("Client Added", { description: `${form.name} has been added.` })
      setShowAdd(false)
      setForm(emptyForm)
      getClients().then((res) => {
        if (res.success) setClients(res.data as Client[])
      })
    } else {
      toast.error("Error", { description: res.error })
    }
    setSaving(false)
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault()
    if (!editClient) return
    setSaving(true)
    const res = await updateClient({ id: editClient.id, ...form })
    if (res.success) {
      toast.success("Client Updated", { description: `${form.name} has been updated.` })
      setEditClient(null)
      setForm(emptyForm)
      getClients().then((r) => {
        if (r.success) setClients(r.data as Client[])
      })
    } else {
      toast.error("Error", { description: res.error })
    }
    setSaving(false)
  }

  async function handleDelete() {
    if (!deleteClientId) return
    const res = await deleteClient(deleteClientId)
    if (res.success) {
      toast.success("Client Deleted", { description: "Client has been removed." })
      setDeleteClientId(null)
      getClients().then((r) => {
        if (r.success) setClients(r.data as Client[])
      })
    } else {
      toast.error("Error", { description: res.error })
    }
  }

  function openEdit(client: Client) {
    setEditClient(client)
    setForm({ name: client.name, email: client.email, company: client.company ?? "" })
  }

  function openAdd() {
    setEditClient(null)
    setForm(emptyForm)
    setShowAdd(true)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        description="Manage your client relationships."
        actions={<Button onClick={openAdd}><Plus className="mr-2 h-4 w-4" />Add Client</Button>}
      />

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div className="space-y-1.5">
                  <div className="h-4 w-24 rounded bg-muted" />
                  <div className="h-3 w-16 rounded bg-muted" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-40 rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      ) : clients.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Mail className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No clients yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">Add your first client to get started.</p>
          <Button className="mt-4" onClick={openAdd}><Plus className="mr-2 h-4 w-4" />Add Client</Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client, i) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="absolute right-3 top-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(client)} aria-label="Edit client">
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteClientId(client.id)} aria-label="Delete client">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {client.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{client.name}</p>
                    <p className="text-xs text-muted-foreground">{client.company}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{client.email}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Client</DialogTitle>
            <DialogDescription>Add a new client to your workspace.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAdd}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Client name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="client@company.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? "Adding..." : "Add Client"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editClient} onOpenChange={(open) => { if (!open) { setEditClient(null); setForm(emptyForm) } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Client</DialogTitle>
            <DialogDescription>Update client information.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-company">Company</Label>
                <Input id="edit-company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => { setEditClient(null); setForm(emptyForm) }}>Cancel</Button>
              <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteClientId} onOpenChange={(open) => { if (!open) setDeleteClientId(null) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Client</DialogTitle>
            <DialogDescription>Are you sure you want to delete this client? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setDeleteClientId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
