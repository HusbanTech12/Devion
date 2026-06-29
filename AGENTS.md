# AI-Powered Development Platform — SaaS Guide

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | **Next.js 16.2.9** (App Router) | Docs in `node_modules/next/dist/docs/` |
| Language | **TypeScript** (strict mode) | |
| Styling | **Tailwind CSS v4** | `@import "tailwindcss"` (NOT `@tailwind` directives) |
| UI Library | **shadcn/ui** | Install with `npx shadcn@latest add ...` |
| Animations | **Framer Motion** | `framer-motion` |
| Auth | **Clerk** | `@clerk/nextjs` |
| Database | **Supabase PostgreSQL** | `@supabase/supabase-js` + `@supabase/ssr` |
| Email | **Resend** + **React Email** | `resend`, `@react-email/components` |
| Validation | **Zod** | |
| Forms | **React Hook Form** | `react-hook-form` + `@hookform/resolvers` |
| Deployment | **Vercel** | |

> **Note:** `package.json` has Next.js 16.2.9 installed, not v15. This file documents the actual installed version.

## Next.js 16 Breaking Changes (CRITICAL)

Read `node_modules/next/dist/docs/` before writing any code. Key differences from common Next.js knowledge:

1. **`params` and `searchParams` are Promises** — always `await` them:
   ```ts
   export default async function Page({ params }: { params: Promise<{ id: string }> }) {
     const { id } = await params
   }
   ```
2. **`middleware.ts` → `proxy.ts`** — rename file + export function to `proxy`
3. **"Server Functions"** is the official term; "Server Actions" are server functions used in mutation context (`'use server'`)
4. **`revalidateTag(tag, cacheLife)`** — now requires a second `cacheLife` profile argument
5. **Turbopack default** — no custom `webpack` config (use `--webpack` flag to opt out)
6. **Route Handlers not cached by default** — use `export const dynamic = 'force-static'` to opt in
7. **Async Request APIs** — `cookies()`, `headers()`, `draftMode()` must be `await`ed
8. **`refresh()`** — new function to refresh client router from Server Actions
9. **`next lint` removed** — use `npx eslint` directly
10. **Node.js 20.9+ required**

## Project Structure

```
src/
├── app/
│   ├── (auth)/                   # Auth route group (public)
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   └── sign-up/
│   │       └── page.tsx
│   │
│   ├── dashboard/               # Dashboard routes (protected)
│   │   ├── layout.tsx            # Dashboard shell (sidebar, header)
│   │   ├── page.tsx              # Dashboard home
│   │   ├── agents/
│   │   │   └── page.tsx
│   │   ├── clients/
│   │   │   └── page.tsx
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── activity/
│   │       └── page.tsx
│   │
│   ├── (marketing)/              # Marketing pages (public)
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Landing page
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   └── about/
│   │       └── page.tsx
│   │
│   ├── api/                      # Route Handlers (webhooks, external APIs)
│   │   ├── webhooks/
│   │   │   ├── stripe/
│   │   │   │   └── route.ts
│   │   │   └── clerk/
│   │   │       └── route.ts
│   │   └── ...
│   │
│   ├── layout.tsx                # Root layout (ThemeProvider)
│   ├── page.tsx                  # Redirect to marketing or dashboard
│   └── globals.css               # Tailwind import + CSS variables
│
├── components/
│   ├── ui/                       # shadcn/ui primitives (auto-generated)
│   ├── layout/
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   ├── dashboard-layout.tsx
│   │   └── footer.tsx
│   ├── forms/
│   │   ├── sign-in-form.tsx
│   │   ├── sign-up-form.tsx
│   │   └── agent-form.tsx
│   └── shared/
│       ├── logo.tsx
│       ├── loading-skeleton.tsx
│       └── empty-state.tsx
│
├── actions/                      # Server Actions
│   ├── auth.ts                   # Auth-related actions
│   ├── agents.ts                 # Agent CRUD
│   ├── clients.ts                # Client CRUD
│   ├── projects.ts               # Project CRUD
│   └── billing.ts                # Subscription management
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client (Server Components, Actions)
│   │   └── admin.ts              # Service role client (admin-only)
│   ├── auth.ts                   # Clerk server auth + RBAC helpers
│   ├── auth-client.ts            # Client-side auth (Clerk hooks wrapper)
│   ├── db.ts                     # Kysely database instance for app queries
│   ├── resend/
│   │   └── send.ts               # Email sending helper
│   └── utils.ts                  # cn(), formatDate(), etc.
│
├── hooks/
│   ├── use-media-query.ts
│   └── use-debounce.ts
│
├── providers/
│   ├── theme-provider.tsx
│   └── query-provider.tsx
│
├── types/
│   ├── index.ts                  # Shared types
│   └── database.ts               # Supabase DB row types
│
└── emails/                       # React Email templates
    ├── welcome.tsx
    ├── invitation.tsx
    └── receipt.tsx
```

## Architecture & Conventions

### 1. Server Functions (Server Actions)

- Place mutation logic in `src/actions/` — one file per domain
- Always verify auth within every Server Function using Clerk's `auth()`
- Use `'use server'` at module level (file-level directive)
- Return typed responses: `{ success: true, data: T } | { success: false, error: string }`

```ts
// src/actions/agents.ts
"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { db } from "@/src/lib/db"
import { z } from "zod"

const createAgentSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
})

export async function createAgent(data: FormData | z.infer<typeof createAgentSchema>) {
  const { userId } = await auth()
  if (!userId) return { success: false, error: "Unauthorized" } as const

  const parsed = createAgentSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: parsed.error.message } as const

  // ... insert to DB
  revalidatePath("/dashboard/agents")
  return { success: true, data: agent }
}
```

### 2. Route Handlers

- Only for webhooks and external API endpoints
- Keep in `src/app/api/`
- Always type `params` as `Promise<T>` and `await` it
- No caching by default

```ts
// src/app/api/webhooks/stripe/route.ts
export async function POST(req: Request) {
  const payload = await req.json()
  return Response.json({ received: true })
}
```

### 3. Supabase Queries

- **Server context**: Use `src/lib/supabase/server.ts` (creates one client per request using cookies)
- **Client context**: Use `src/lib/supabase/client.ts` (singleton browser client)
- **Admin context**: Use `src/lib/supabase/admin.ts` (service role key, server-only)
- Never expose the service role key to the client

### 4. Auth (Clerk)

- **Server components/actions**: Use `auth()` from `@clerk/nextjs/server` to get `userId`
- **Server user details**: Use `currentUser()` from `@clerk/nextjs/server` for full user object
- **Client components**: Use `useUser()`, `useAuth()`, `useSignIn()`, `useSignUp()` from `@clerk/nextjs`
- **Custom sign-in flows**: Use `useSignIn()` hook with `signIn.create({ identifier, password })` + `signIn.finalize()`
- **Custom sign-up flows**: Use `useSignUp()` hook with `signUp.create({ emailAddress, password, ... })` + `signUp.finalize()`
- **Middleware**: `proxy.ts` uses `clerkMiddleware()` from `@clerk/nextjs/server`
- **Root layout**: Wrapped with `<ClerkProvider>` from `@clerk/nextjs`
- **Role**: Stored in custom `users` table; syncs on dashboard access or via Clerk webhook
- **Admin emails**: Configured in `src/lib/constants.ts` `ADMIN_EMAILS`
- **Webhook**: Clerk webhook at `src/app/api/webhooks/clerk/route.ts` syncs users to DB
- The `useSession()` custom hook from `@/src/lib/auth-client` wraps Clerk's `useUser()` for backward compatibility

### 5. Forms

- Use React Hook Form + `@hookform/resolvers/zod`
- Define Zod schemas in a `schemas/` file next to the form
- Server Functions receive parsed `FormData` or typed objects

### 6. Email (Resend + React Email)

- Email templates live in `src/emails/`
- Send via `src/lib/resend/send.ts`
- Trigger from Server Actions after mutations (welcome, invite, receipt)

### 7. Styling

- Tailwind CSS v4: use `@import "tailwindcss"` in `globals.css`
- shadcn/ui components go in `src/components/ui/` (auto-generated)
- Custom CSS variables in `globals.css` for theming
- Framer Motion for page transitions, micro-interactions, loading states

### 8. Animations (Framer Motion)

- Page transitions: wrap page content in `<motion.div>` with `initial`/`animate`/`exit`
- Use `AnimatePresence` for mount/unmount animations
- Micro-interactions: hover/tap scales, skeleton pulse, toast entries
- Keep animation configs in a shared constants file if reused

### 9. TypeScript

- Strict mode enabled
- Prefer `type` over `interface`
- Export shared types from `src/types/index.ts`
- Database row types auto-generated or hand-written in `src/types/database.ts`

## File Conventions

| File | Location | Purpose |
|---|---|---|
| `layout.tsx` | `app/**/` | Shared layout for segment |
| `page.tsx` | `app/**/` | Route UI |
| `route.ts` | `app/**/api/` | API Route Handler |
| `proxy.ts` | Project root | Request proxy (replaces `middleware.ts`) |
| `loading.tsx` | `app/**/` | Suspense fallback |
| `error.tsx` | `app/**/` | Error boundary |
| `not-found.tsx` | `app/**/` | 404 UI |
| `default.tsx` | `app/@slot/` | Parallel route fallback (required) |

## Authentication Flow

1. User visits → marketing landing page (public)
2. Clicks "Get Started" → custom sign-up form (uses Clerk's `useSignUp()`)
3. Clerk creates user in Clerk's infrastructure
4. After sign-up/sign-in → redirected to dashboard
5. Dashboard layout checks `auth()` from Clerk → redirects to `/sign-in` if unauthenticated
6. User is synced to custom `users` table with role from `ADMIN_EMAILS` / `TEAM_EMAILS`
7. Server Actions verify `userId` via Clerk's `auth()` on every call

## Data Flow

```
[Client] → (Server Action) → [Validate Zod] → [Auth Check] → [Supabase Query] → [Revalidate] → [Response]
[Client] → (Route Handler) → [Verify Webhook] → [Process Event] → [Supabase/Resend] → [Response]
```

## Environment Variables

```
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Database (PostgreSQL)
DATABASE_URL=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

## Getting Started

```bash
# Install dependencies
npm install

# Add shadcn/ui components
npx shadcn@latest add button card input label avatar badge separator skeleton

# Run dev server
npm run dev
```

## Quality Checks

- `npx eslint .` — lint
- `npx tsc --noEmit` — type check
- `npm run build` — production build (must pass before deploy)


## Content: Services & Pricing

### Services (6 categories)

| Service | What We Build |
|---|---|
| **🌐 Fullstack Web Development** | Business websites, SaaS platforms, dashboards, admin systems, scalable architectures, responsive UI systems |

| **🔍 SEO Services** | On-page SEO, technical SEO audits, keyword research, content optimization, ranking analytics |
| **🤖 AI Systems Integration** | AI assistants, RAG chatbot systems, intelligent web experiences, AI support systems |
| **📊 Dashboard Systems** | Admin dashboards, analytics systems, lead management, reporting interfaces |
| **🎬 Video Editing** | Marketing videos, motion graphics, post-production, brand storytelling, social media content |

### Pricing (6 tiers)

| Package | Price | Includes | Best For |
|---|---|---|---|
| **🟢 Starter** | $499 – $999 | Responsive business website, premium UI/UX, contact forms, deployment, WhatsApp integration | Small businesses |

| **🔍 SEO Services** | $300 – $800 | On-page SEO, technical SEO audits, keyword research, content optimization, ranking analytics | Businesses improving visibility |
| **🟡 Growth** | $1,500 – $3,000 | Fullstack web app, admin dashboard, AI integration, analytics dashboard | Growing businesses |
| **🔴 Premium** | $3,000 – $8,000+ | Advanced AI systems, custom dashboards, scalable architecture, premium UI systems, analytics platform, premium support | Serious businesses & startups |
| **🎬 Video Editing** | $200 – $500 | Marketing videos, motion graphics, post-production, brand storytelling, social media content | Content creators & brands |

# Role Based Access Control (RBAC)

## Overview

The platform must implement enterprise-grade Role-Based Access Control (RBAC).

Every user must belong to exactly one role.

Available roles:

* admin
* team
* client

Permissions must be enforced on:

* Dashboard routes
* Server Functions
* API Routes
* Database queries
* UI components

Never rely solely on frontend checks.

Always validate permissions on the server.

---

# User Model

```ts
type UserRole =
  | "admin"
  | "team"
  | "client"
```

```ts
type User = {
  id: string
  email: string
  fullName: string
  role: UserRole
}
```

---

# Admin Role

Admin has full platform access.

Capabilities:

* View all projects

* Create projects

* Edit projects

* Delete projects

* View all clients

* Create clients

* Edit clients

* Delete clients

* View all team members

* Invite team members

* Remove team members

* View analytics

* View revenue

* Manage billing

* Manage CRM

* Manage AI agents

* Manage settings

* Access every dashboard route

Admin can view all data across the platform.

---

# Team Role

Team members have operational access.

Capabilities:

* View assigned projects

* Update assigned projects

* Manage tasks

* Update project status

* View assigned clients

* Add notes

* Upload files

* Use AI workspace

* Access documents

Cannot:

* Delete projects
* Access billing
* Access revenue analytics
* Manage users
* Manage permissions
* Access system settings

Team users only see data assigned to them.

---

# Client Role

Clients have limited access.

Capabilities:

* View their own projects
* View project progress
* View milestones
* View shared files
* View invoices
* Send messages

Cannot:

* Access CRM
* Access team management
* Access analytics
* Access internal documents
* Access AI workspace
* Access settings

Clients should only see their own information.

---

# Dashboard Visibility

## Admin Navigation

* Overview
* Projects
* Clients
* CRM
* Analytics
* Agents
* Activity
* Team
* Billing
* Settings

---

## Team Navigation

* Overview
* Projects
* Activity
* Documents
* Agents

Hide:

* Billing
* Revenue
* Settings
* Team Management

---

## Client Navigation

* Overview
* My Projects
* Files
* Invoices
* Messages

Hide everything else.

---

# Route Protection

Admin Only:

* /dashboard/settings
* /dashboard/team
* /dashboard/billing

Admin + Team:

* /dashboard/projects
* /dashboard/activity
* /dashboard/agents

Admin + Client:

* /dashboard/files
* /dashboard/invoices

All authenticated users:

* /dashboard

---

# Server Function Protection

Every Server Function must:

1. Verify authentication
2. Verify role
3. Verify ownership if required

Example:

```ts
import { auth } from "@clerk/nextjs/server"

const { userId } = await auth()
if (!userId) throw new Error("Unauthorized")

const user = await db
  .selectFrom("users")
  .select("role")
  .where("id", "=", userId)
  .executeTakeFirst()

if (user?.role !== "admin") {
  throw new Error("Forbidden")
}
```

---

# Data Ownership Rules

Admins:

* Access all records

Team:

* Access assigned records only

Clients:

* Access owned records only

Never expose data that does not belong to the current user.

---

# Clerk Integration

Role is stored in the custom `users` table (PostgreSQL via Kysely).

Clerk manages authentication; the `users` table stores profile + role data.

On user creation:

1. User signs up via Clerk (`useSignUp()`)
2. Role is synced to `users` table on first dashboard visit
3. `role` defaults to `"client"`
4. If email is in `ADMIN_EMAILS` list (see `src/lib/constants.ts`), role is set to `"admin"`
5. If email is in `TEAM_EMAILS` list, role is set to `"team"`
6. A Clerk webhook (`/api/webhooks/clerk`) can also sync on `user.created`/`user.updated`
7. Admin can update role later via the Users Management page in settings

---

# Security Rules

Never trust client-side role checks.

Always validate:

* Authentication
* Authorization
* Ownership

on the server.

Security must take priority over convenience.

---

# Final Goal

The platform must behave like an enterprise SaaS application where every user only sees data and functionality permitted by their assigned role.

Admin = Full Control

Team = Operational Access

Client = Limited Access


