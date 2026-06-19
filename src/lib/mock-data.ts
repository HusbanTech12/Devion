export const mockProjects = [
  { id: "p1", name: "E-Commerce Platform", description: "Full-stack e-commerce with AI recommendations", status: "active" as const, clientId: "c1", clientName: "Acme Corp", budget: "$45,000", progress: 75, createdAt: "2026-01-15", dueDate: "2026-07-15" },
  { id: "p2", name: "SaaS Dashboard", description: "Analytics dashboard for startup", status: "active" as const, clientId: "c2", clientName: "StartupX", budget: "$28,000", progress: 45, createdAt: "2026-02-20", dueDate: "2026-08-20" },
  { id: "p3", name: "Mobile App", description: "Cross-platform fitness app", status: "completed" as const, clientId: "c3", clientName: "FitTech", budget: "$35,000", progress: 100, createdAt: "2025-11-01", dueDate: "2026-04-01" },
  { id: "p4", name: "AI Chatbot", description: "Customer support AI assistant", status: "active" as const, clientId: "c1", clientName: "Acme Corp", budget: "$18,000", progress: 30, createdAt: "2026-03-10", dueDate: "2026-09-10" },
  { id: "p5", name: "Marketing Site", description: "Brand redesign and marketing site", status: "paused" as const, clientId: "c4", clientName: "BrandCo", budget: "$12,000", progress: 60, createdAt: "2026-01-05", dueDate: "2026-05-05" },
  { id: "p6", name: "Admin Panel", description: "Internal admin system", status: "active" as const, clientId: "c5", clientName: "ManagePro", budget: "$22,000", progress: 85, createdAt: "2025-12-01", dueDate: "2026-06-01" },
  { id: "p7", name: "CRM Integration", description: "Salesforce integration", status: "cancelled" as const, clientId: "c2", clientName: "StartupX", budget: "$8,000", progress: 20, createdAt: "2026-02-01", dueDate: "2026-04-01" },
  { id: "p8", name: "Video Production", description: "Product launch video series", status: "active" as const, clientId: "c6", clientName: "MediaHouse", budget: "$6,000", progress: 50, createdAt: "2026-04-01", dueDate: "2026-06-30" },
]

export const mockClients = [
  { id: "c1", name: "Acme Corp", email: "contact@acme.com", company: "Acme Corporation", projects: 2, totalRevenue: "$63,000", status: "active" as const, createdAt: "2025-10-15" },
  { id: "c2", name: "StartupX", email: "founder@startupx.io", company: "StartupX Inc.", projects: 2, totalRevenue: "$36,000", status: "active" as const, createdAt: "2025-11-20" },
  { id: "c3", name: "FitTech", email: "hello@fittech.com", company: "FitTech Ltd.", projects: 1, totalRevenue: "$35,000", status: "completed" as const, createdAt: "2025-09-01" },
  { id: "c4", name: "BrandCo", email: "design@brandco.com", company: "BrandCo LLC", projects: 1, totalRevenue: "$12,000", status: "paused" as const, createdAt: "2026-01-05" },
  { id: "c5", name: "ManagePro", email: "info@managepro.io", company: "ManagePro Inc.", projects: 1, totalRevenue: "$22,000", status: "active" as const, createdAt: "2025-08-15" },
  { id: "c6", name: "MediaHouse", email: "studio@mediahouse.com", company: "MediaHouse Group", projects: 1, totalRevenue: "$6,000", status: "active" as const, createdAt: "2026-03-01" },
]

export const mockTeam = [
  { id: "t1", name: "Alex Rivera", email: "alex@devion.com", role: "admin" as const, avatar: "AR", projects: 8, status: "active" as const },
  { id: "t2", name: "Sarah Chen", email: "sarah@devion.com", role: "team" as const, avatar: "SC", projects: 4, status: "active" as const },
  { id: "t3", name: "Marcus Johnson", email: "marcus@devion.com", role: "team" as const, avatar: "MJ", projects: 3, status: "active" as const },
  { id: "t4", name: "Emily Park", email: "emily@devion.com", role: "team" as const, avatar: "EP", projects: 2, status: "active" as const },
  { id: "t5", name: "David Kim", email: "david@devion.com", role: "team" as const, avatar: "DK", projects: 1, status: "inactive" as const },
]

export const mockActivity = [
  { id: "a1", title: "Project milestone completed", description: "E-Commerce Platform - Payment integration phase completed ahead of schedule", timestamp: "2 hours ago", type: "milestone" as const },
  { id: "a2", title: "New client onboarded", description: "MediaHouse Group signed for video production services", timestamp: "4 hours ago", type: "client" as const },
  { id: "a3", title: "Task status updated", description: "AI Chatbot - Data training module moved to In Review", timestamp: "6 hours ago", type: "task" as const },
  { id: "a4", title: "Meeting completed", description: "Sprint planning for SaaS Dashboard - Q3 roadmap finalized", timestamp: "1 day ago", type: "meeting" as const },
  { id: "a5", title: "Invoice paid", description: "FitTech - Final invoice #INV-2026-0042 marked as paid", timestamp: "1 day ago", type: "payment" as const },
  { id: "a6", title: "File uploaded", description: "BrandCo - Brand guidelines PDF uploaded to shared drive", timestamp: "2 days ago", type: "file" as const },
  { id: "a7", title: "New team member added", description: "Emily Park joined as Frontend Developer", timestamp: "3 days ago", type: "team" as const },
  { id: "a8", title: "Project launched", description: "Admin Panel for ManagePro went live", timestamp: "5 days ago", type: "launch" as const },
]

export const mockInvoices = [
  { id: "inv1", client: "Acme Corp", amount: "$15,000", status: "paid" as const, dueDate: "2026-05-15", issuedDate: "2026-04-15" },
  { id: "inv2", client: "StartupX", amount: "$8,000", status: "pending" as const, dueDate: "2026-06-20", issuedDate: "2026-05-20" },
  { id: "inv3", client: "FitTech", amount: "$35,000", status: "paid" as const, dueDate: "2026-04-01", issuedDate: "2026-03-01" },
  { id: "inv4", client: "BrandCo", amount: "$6,000", status: "overdue" as const, dueDate: "2026-05-05", issuedDate: "2026-04-05" },
  { id: "inv5", client: "ManagePro", amount: "$11,000", status: "pending" as const, dueDate: "2026-07-01", issuedDate: "2026-06-01" },
  { id: "inv6", client: "MediaHouse", amount: "$3,000", status: "paid" as const, dueDate: "2026-06-15", issuedDate: "2026-05-15" },
]

export const mockMessages = [
  { id: "m1", from: "Acme Corp", subject: "Q3 planning session", preview: "Hi team, let's schedule a planning session for the next quarter...", date: "2 hours ago", unread: true },
  { id: "m2", from: "StartupX", subject: "Dashboard feedback", preview: "The new analytics view looks great! A few suggestions...", date: "5 hours ago", unread: true },
  { id: "m3", from: "BrandCo", subject: "Design assets", preview: "Attached are the latest brand assets for the marketing site...", date: "1 day ago", unread: false },
  { id: "m4", from: "ManagePro", subject: "Deployment confirmation", preview: "The admin panel deployment was successful. All systems...", date: "2 days ago", unread: false },
]

export const mockFiles = [
  { id: "f1", name: "Brand_Guidelines.pdf", project: "Marketing Site", size: "4.2 MB", type: "PDF", uploadedBy: "Sarah Chen", date: "2 days ago" },
  { id: "f2", name: "API_Specs_v2.docx", project: "E-Commerce Platform", size: "1.8 MB", type: "Document", uploadedBy: "Marcus Johnson", date: "3 days ago" },
  { id: "f3", name: "Design_System.fig", project: "SaaS Dashboard", size: "12.5 MB", type: "Figma", uploadedBy: "Emily Park", date: "5 days ago" },
  { id: "f4", name: "Sprint_Report_Q2.pdf", project: "AI Chatbot", size: "890 KB", type: "PDF", uploadedBy: "Alex Rivera", date: "1 week ago" },
  { id: "f5", name: "User_Research_Data.csv", project: "Mobile App", size: "6.3 MB", type: "CSV", uploadedBy: "David Kim", date: "1 week ago" },
]

export const revenueData = [
  { month: "Jan", revenue: 24000, expenses: 12000 },
  { month: "Feb", revenue: 32000, expenses: 15000 },
  { month: "Mar", revenue: 28000, expenses: 13000 },
  { month: "Apr", revenue: 45000, expenses: 18000 },
  { month: "May", revenue: 38000, expenses: 16000 },
  { month: "Jun", revenue: 52000, expenses: 20000 },
]

export const projectStatusData = [
  { name: "Active", value: 5, color: "#10b981" },
  { name: "Completed", value: 1, color: "#3b82f6" },
  { name: "Paused", value: 1, color: "#f59e0b" },
  { name: "Cancelled", value: 1, color: "#ef4444" },
]
