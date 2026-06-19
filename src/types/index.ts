export type ActionResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string }

export type UserRole = "admin" | "member" | "viewer"

export type ProjectStatus = "active" | "completed" | "paused" | "cancelled"

export interface Agent {
  id: string
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Client {
  id: string
  name: string
  email: string
  company?: string
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  name: string
  description?: string
  status: ProjectStatus
  clientId: string
  createdAt: string
  updatedAt: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  price: number
  interval: "month" | "year"
  features: string[]
}

export interface UserProfile {
  id: string
  clerkId: string
  email: string
  name?: string
  role: UserRole
  createdAt: string
}
