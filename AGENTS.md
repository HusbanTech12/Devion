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
│   ├── (dashboard)/              # Dashboard route group (protected)
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
│   ├── layout.tsx                # Root layout (ClerkProvider, ThemeProvider)
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
│   ├── clerk/
│   │   └── helpers.ts            # Clerk utility functions
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
- Always verify auth within every Server Function
- Use `'use server'` at module level (file-level directive)
- Return typed responses: `{ success: true, data: T } | { success: false, error: string }`

```ts
// src/actions/agents.ts
"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
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

  // ... insert to Supabase
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
// src/app/api/webhooks/clerk/route.ts
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

- Wrap root layout with `<ClerkProvider>`
- Protect dashboard routes via `layout.tsx` with `auth()` check
- Use `<SignedIn>` / `<SignedOut>` for conditional rendering
- Webhook in `src/app/api/webhooks/clerk/route.ts` for user lifecycle events

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
2. Clicks "Get Started" → Clerk-hosted or custom sign-up form
3. Clerk webhook creates user record in Supabase
4. After sign-in → redirected to dashboard
5. Dashboard layout checks `auth()` → redirects to `/sign-in` if unauthenticated
6. Server Actions verify `userId` on every call

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

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

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
| **📱 App Development** | iOS & Android apps, cross-platform development, backend integration, offline & real-time sync |
| **🔍 SEO Services** | On-page SEO, technical SEO audits, keyword research, content optimization, ranking analytics |
| **🤖 AI Systems Integration** | AI assistants, RAG chatbot systems, intelligent web experiences, AI support systems |
| **📊 Dashboard Systems** | Admin dashboards, analytics systems, lead management, reporting interfaces |
| **🎬 Video Editing** | Marketing videos, motion graphics, post-production, brand storytelling, social media content |

### Pricing (6 tiers)

| Package | Price | Includes | Best For |
|---|---|---|---|
| **🟢 Starter** | $499 – $999 | Responsive business website, premium UI/UX, contact forms, deployment, WhatsApp integration | Small businesses |
| **📱 App Development** | $1,000 – $3,000 | iOS & Android apps, cross-platform dev, backend integration, offline sync, app store deployment | Mobile-first businesses |
| **🔍 SEO Services** | $300 – $800 | On-page SEO, technical SEO audits, keyword research, content optimization, ranking analytics | Businesses improving visibility |
| **🟡 Growth** | $1,500 – $3,000 | Fullstack web app, admin dashboard, AI integration, analytics dashboard | Growing businesses |
| **🔴 Premium** | $3,000 – $8,000+ | Advanced AI systems, custom dashboards, scalable architecture, premium UI systems, analytics platform, premium support | Serious businesses & startups |
| **🎬 Video Editing** | $200 – $500 | Marketing videos, motion graphics, post-production, brand storytelling, social media content | Content creators & brands |

# Dashboard System Requirements (CRITICAL)

## Dashboard Philosophy

The dashboard must NOT feel like a traditional admin panel.

The dashboard should feel like a premium SaaS operating system inspired by:

* Linear
* Stripe
* Vercel
* Notion
* Raycast
* Arc Browser

Every dashboard page should communicate:

* Speed
* Trust
* Intelligence
* Simplicity
* Premium quality

---

## Dashboard Layout

Required layout:

* Collapsible Sidebar
* Sticky Header
* Global Search
* Command Palette (Ctrl/Cmd + K)
* Notification Center
* User Menu
* Theme Switcher
* Responsive Mobile Navigation

The dashboard shell must be reusable across all dashboard routes.

---

## Dashboard Navigation

Required modules:

* Overview
* Projects
* Clients
* CRM
* Analytics
* AI Assistant
* Documents
* Activity
* Team
* Settings

Future-ready modules:

* Billing
* Automations
* Infrastructure
* Integrations

---

## Dashboard Overview

The dashboard home page should contain:

* Welcome section
* Revenue metrics
* Active projects
* Client statistics
* Team productivity
* AI insights
* Recent activity feed
* Upcoming deadlines
* Quick actions

The overview page should provide a complete business snapshot.

---

## Projects Module

Required features:

* Kanban View
* List View
* Status Tracking
* Priority System
* Milestones
* Deadlines
* Team Assignment
* Progress Indicators

---

## Clients Module

Required features:

* Client Directory
* Client Profiles
* Contact Information
* Active Projects
* Notes
* Activity History

---

## CRM Module

Required features:

* Lead Management
* Sales Pipeline
* Opportunity Tracking
* Meeting Tracking
* Activity Logging

---

## Analytics Module

Required features:

* Revenue Analytics
* Project Analytics
* Client Growth Analytics
* Team Performance Analytics

Charts must use Recharts.

---

## AI Assistant Module

Required features:

* Chat Interface
* Proposal Generator
* Content Generator
* Business Insights
* AI Recommendations

The AI assistant should feel like an integrated workspace rather than a chatbot page.

---

## Design Standards

All dashboard pages must:

* Use shadcn/ui
* Use Framer Motion
* Follow consistent spacing
* Use responsive layouts
* Support dark mode
* Support loading states
* Support empty states
* Support error states

Avoid:

* Generic templates
* Bootstrap-style dashboards
* Crowded layouts
* Excessive colors

---

## UI Components

Required reusable components:

* Metric Cards
* Data Tables
* Empty States
* Loading Skeletons
* Charts
* Activity Timeline
* Status Badges
* Search Inputs
* Filters
* Dialogs
* Drawers
* Toast Notifications

---

## Quality Standard

The dashboard should look like a premium SaaS product built by a funded startup.

Every screen should be production-ready, scalable, reusable, and visually polished.
