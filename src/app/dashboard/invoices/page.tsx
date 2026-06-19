"use client"

import { motion } from "framer-motion"
import { Download, Eye } from "lucide-react"
import { PageHeader } from "@/src/components/shared/page-header"
import { DataTable, type Column } from "@/src/components/shared/data-table"
import { StatusBadge } from "@/src/components/shared/status-badge"
import { Button } from "@/src/components/ui/button"
import { mockInvoices } from "@/src/lib/mock-data"

type Invoice = (typeof mockInvoices)[0]

const columns: Column<Invoice>[] = [
  { key: "client", header: "Client", cell: (inv) => <span className="font-medium">{inv.client}</span> },
  { key: "amount", header: "Amount", cell: (inv) => <span className="font-medium">{inv.amount}</span> },
  { key: "issued", header: "Issued", cell: (inv) => <span className="text-muted-foreground">{inv.issuedDate}</span> },
  { key: "due", header: "Due Date", cell: (inv) => <span className="text-muted-foreground">{inv.dueDate}</span> },
  { key: "status", header: "Status", cell: (inv) => <StatusBadge status={inv.status} /> },
  { key: "actions", header: "", cell: (inv) => (
    <div className="flex gap-2">
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  )},
]

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Invoices" description="View and manage your invoices." />
      <DataTable data={mockInvoices} columns={columns} />
    </div>
  )
}
