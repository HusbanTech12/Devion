"use client"

import { motion } from "framer-motion"
import { FileText, FolderOpen, Search } from "lucide-react"
import { PageHeader } from "@/src/components/shared/page-header"
import { Input } from "@/src/components/ui/input"
import { useState } from "react"

const documents = [
  { id: "d1", name: "Project Onboarding Guide", type: "PDF", pages: 12, updated: "2 days ago" },
  { id: "d2", name: "Design System Documentation", type: "Document", pages: 45, updated: "1 week ago" },
  { id: "d3", name: "API Integration Handbook", type: "PDF", pages: 28, updated: "2 weeks ago" },
  { id: "d4", name: "Brand Style Guide", type: "Document", pages: 18, updated: "3 weeks ago" },
  { id: "d5", name: "Development Workflow", type: "Document", pages: 8, updated: "1 month ago" },
]

export default function DocumentsPage() {
  const [search, setSearch] = useState("")
  const filtered = documents.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="space-y-6">
      <PageHeader title="Documents" description="Access internal documentation and guides." />

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <label htmlFor="search-documents" className="sr-only">Search documents</label>
        <Input id="search-documents" placeholder="Search documents..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group cursor-pointer rounded-2xl border bg-card p-6 transition-all hover:shadow-lg"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              {doc.type === "PDF" ? (
                <FileText className="h-5 w-5 text-primary" />
              ) : (
                <FolderOpen className="h-5 w-5 text-primary" />
              )}
            </div>
            <h3 className="mt-4 text-sm font-semibold">{doc.name}</h3>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{doc.type}</span>
              <span>{doc.pages} pages</span>
              <span className="ml-auto">{doc.updated}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
