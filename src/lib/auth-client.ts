"use client"

import { createAuthClient } from "better-auth/react"
import { useEffect, useState } from "react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
})

export const { signIn, signUp, signOut } = authClient

export function useSession() {
  const [state, setState] = useState<{
    data: { user: { id: string; email: string; name?: string; image?: string; role?: string }; session: unknown } | null
    isPending: boolean
  }>({ data: null, isPending: true })

  useEffect(() => {
    let cancelled = false
    async function fetchSession() {
      try {
        const res = await fetch("/api/auth/get-session", { credentials: "include" })
        if (cancelled) return
        const json = await res.json()
        if (!cancelled) {
          setState({
            data: json?.user ? { user: json.user, session: json.session } : null,
            isPending: false,
          })
        }
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