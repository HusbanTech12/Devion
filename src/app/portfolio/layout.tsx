import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio — Devion",
  description: "Explore our portfolio of projects across industries — from SaaS platforms to AI systems.",
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children
}
