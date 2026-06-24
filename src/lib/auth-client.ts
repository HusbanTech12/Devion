"use client"

import { useUser } from "@clerk/nextjs"

export function useSession() {
  const { isLoaded, user } = useUser()

  if (!isLoaded) {
    return { data: null, isPending: true }
  }

  if (!user) {
    return { data: null, isPending: false }
  }

  return {
    data: {
      user: {
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        name: user.fullName,
        image: user.imageUrl,
        role: (user.publicMetadata?.role as string) || "client",
      },
      session: {},
    },
    isPending: false,
  }
}

export function gravatarUrl(email: string): string {
  const seed = encodeURIComponent(email.trim().toLowerCase())
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}`
}
