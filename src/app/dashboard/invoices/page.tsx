"use client"

import { Download, Eye } from "lucide-react"
import { PageHeader } from "@/src/components/shared/page-header"
import { DataTable, type Column } from "@/src/components/shared/data-table"
import { StatusBadge } from "@/src/components/shared/status-badge"
import { Button } from "@/src/components/ui/button"
import { mockInvoices } from "@/src/lib/mock-data"

type Invoice = (typeof mockInvoices)[0]

const columns: Column<Invoice>[] = [
  { key: "client", header: "Client", cell: (row) => <span className="font-medium">{row.client}</span> },
  { key: "amount", header: "Amount", cell: (row) => <span className="font-medium">{row.amount}</span> },
  { key: "issued", header: "Issued", cell: (row) => <span className="text-muted-foreground">{row.issuedDate}</span> },
  { key: "due", header: "Due Date", cell: (row) => <span className="text-muted-foreground">{row.dueDate}</span> },
  { key: "status", header: "Status", cell: (row) => <StatusBadge status={row.status} /> },
  { key: "actions", header: "", cell: () => (
    <div className="flex gap-2">
      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="View invoice">
        <Eye className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="Download invoice">
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
