import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About — Devion",
  description: "We're on a mission to make AI accessible to every business. Learn about our story, values, and team.",
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
