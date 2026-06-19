"use client"

import { motion } from "framer-motion"
import { FileText, Download, MoreHorizontal } from "lucide-react"
import { PageHeader } from "@/src/components/shared/page-header"
import { Button } from "@/src/components/ui/button"
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { mockFiles } from "@/src/lib/mock-data"

export default function FilesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Files" description="Access shared files and documents." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockFiles.map((file, i) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group rounded-2xl border bg-card p-6 transition-all hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold">{file.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{file.project}</p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>{file.size}</span>
              <span>{file.date}</span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-muted text-[10px]">{file.uploadedBy.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{file.uploadedBy}</span>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="w-full">
                <Download className="mr-2 h-3.5 w-3.5" /> Download
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
