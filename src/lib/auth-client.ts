"use client"

import { createAuthClient } from "better-auth/react"
import { useEffect, useState } from "react"

const baseURL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (typeof window !== "undefined"
    ? window.location.origin
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")

export const authClient = createAuthClient({ baseURL })

export const { signIn, signUp, signOut } = authClient

export function useSession() {
  const [state, setState] = useState<{
    data: {
      user: { id: string; email: string; name?: string; image?: string; role?: string }
      session: unknown
    } | null
    isPending: boolean
  }>({ data: null, isPending: true })

  useEffect(() => {
    let cancelled = false
    async function fetchSession() {
      try {
        const { data, error } = await authClient.getSession()
        if (cancelled) return
        if (error || !data?.user) {
          setState({ data: null, isPending: false })
          return
        }
        const user = data.user as any
        setState({
          data: {
            user: {
              ...user,
              image: user.image ?? gravatarUrl(user.email),
            },
            session: data.session,
          },
          isPending: false,
        })
      } catch {
        if (!cancelled) {
          setState({ data: null, isPending: false })
        }
      }
    }
    fetchSession()
    return () => { cancelled = true }
  }, [])

  return state
}

export function gravatarUrl(email: string, size = 200): string {
  const seed = encodeURIComponent(email.trim().toLowerCase())
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&scale=80&backgroundColor=6366f1&radius=50`
}

