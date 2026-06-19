import { Kysely, PostgresDialect } from "kysely"
import pg from "pg"

interface Database {
  user: any
  session: any
  account: any
  verification: any
  users: {
    id: string
    email: string
    name: string | null
    role: "admin" | "team" | "client"
    created_at?: string
    updated_at?: string
  }
  agents: {
    id: string
    user_id: string
    name: string
    description: string | null
    created_at?: string
    updated_at?: string
  }
  clients: {
    id: string
    user_id: string
    name: string
    email: string
    company: string | null
    created_at?: string
    updated_at?: string
  }
  projects: {
    id: string
    user_id: string
    client_id: string
    name: string
    description: string | null
    status: string
    created_at?: string
    updated_at?: string
  }
  subscriptions: {
    id: string
    user_id: string
    stripe_customer_id: string | null
    stripe_subscription_id: string | null
    plan: string
    status: string
    current_period_start: string
    current_period_end: string
    created_at?: string
  }
}

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    connectionString: process.env.DATABASE_URL!,
    max: 10,
  }),
})

export const db = new Kysely<Database>({ dialect })
