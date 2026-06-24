import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing — Devion",
  description: "Fixed-price packages with no hidden fees. Pick the tier that fits your goals and budget.",
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
