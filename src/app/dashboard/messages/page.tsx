"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Send } from "lucide-react"
import { PageHeader } from "@/src/components/shared/page-header"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Textarea } from "@/src/components/ui/textarea"
import { mockMessages } from "@/src/lib/mock-data"
import { cn } from "@/src/lib/utils"

export default function MessagesPage() {
  const [selectedId, setSelectedId] = useState(mockMessages[0]?.id)
  const selected = mockMessages.find((m) => m.id === selectedId)

  return (
    <div className="space-y-6">
      <PageHeader title="Messages" description="Communicate with your team." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-2 lg:col-span-1">
          {mockMessages.map((msg, i) => (
            <motion.button
              key={msg.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedId(msg.id)}
              className={cn(
                "w-full rounded-xl border p-4 text-left transition-all",
                selectedId === msg.id
                  ? "border-primary bg-primary/5"
                  : "hover:bg-muted"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{msg.from}</span>
                <span className="text-xs text-muted-foreground">{msg.date}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{msg.preview}</p>
            </motion.button>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <div className="flex h-full flex-col rounded-2xl border bg-card">
              <div className="border-b p-4">
                <h3 className="text-sm font-semibold">{selected.from}</h3>
                <p className="text-xs text-muted-foreground">{selected.subject}</p>
              </div>
              <div className="flex-1 p-4">
                <p className="text-sm text-muted-foreground">{selected.preview}</p>
              </div>
              <div className="border-t p-4">
                <div className="flex gap-3">
                  <Textarea placeholder="Type your reply..." className="min-h-[80px] flex-1" />
                  <Button className="self-end">
                    <Send className="mr-2 h-4 w-4" /> Send
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl border bg-card">
              <p className="text-sm text-muted-foreground">Select a message to view.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
