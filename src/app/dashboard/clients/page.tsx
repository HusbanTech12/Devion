"use client"

import { motion } from "framer-motion"
import { Plus, Mail, ExternalLink } from "lucide-react"
import { PageHeader } from "@/src/components/shared/page-header"
import { StatusBadge } from "@/src/components/shared/status-badge"
import { Button } from "@/src/components/ui/button"
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { mockClients } from "@/src/lib/mock-data"

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        description="Manage your client relationships."
        actions={<Button><Plus className="mr-2 h-4 w-4" />Add Client</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockClients.map((client, i) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:shadow-primary/5"
          >
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
              <StatusBadge status={client.status} />
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{client.projects} projects</span>
                <span className="font-medium">{client.totalRevenue}</span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Mail className="mr-2 h-3.5 w-3.5" /> Email
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <ExternalLink className="mr-2 h-3.5 w-3.5" /> View
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
