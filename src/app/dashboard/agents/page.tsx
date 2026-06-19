"use client"

import { motion } from "framer-motion"
import { Bot, Plus, Play, Settings, MoreHorizontal } from "lucide-react"
import { PageHeader } from "@/src/components/shared/page-header"
import { Button } from "@/src/components/ui/button"
import { Card } from "@/src/components/ui/card"

const agents = [
  { id: "ag1", name: "Code Assistant", description: "AI pair programmer for code review and generation", status: "active", model: "GPT-4o", tasks: 145 },
  { id: "ag2", name: "Content Writer", description: "Generates marketing copy and blog content", status: "active", model: "Claude 3.5", tasks: 89 },
  { id: "ag3", name: "Data Analyzer", description: "Processes and visualizes complex datasets", status: "idle", model: "GPT-4o", tasks: 56 },
  { id: "ag4", name: "Customer Support", description: "Handles client inquiries and support tickets", status: "active", model: "Claude 3.5", tasks: 234 },
  { id: "ag5", name: "SEO Optimizer", description: "Analyzes and optimizes content for search engines", status: "idle", model: "GPT-4o", tasks: 32 },
  { id: "ag6", name: "Project Scheduler", description: "Manages timelines and resource allocation", status: "active", model: "Custom", tasks: 78 },
]

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Agents"
        description="Manage your AI workforce."
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Agent
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="group relative overflow-hidden p-6 transition-all hover:shadow-lg hover:shadow-primary/5">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-semibold">{agent.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{agent.description}</p>
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-md border px-2 py-0.5">{agent.model}</span>
                <span>{agent.tasks} tasks</span>
                <span className={`ml-auto flex items-center gap-1 ${agent.status === "active" ? "text-emerald-500" : "text-amber-500"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${agent.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`} />
                  {agent.status}
                </span>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1">
                  <Play className="mr-1.5 h-3.5 w-3.5" /> Run
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Settings className="mr-1.5 h-3.5 w-3.5" /> Configure
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
