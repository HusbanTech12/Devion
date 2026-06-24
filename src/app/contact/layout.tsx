import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact — Devion",
  description: "Get in touch with our team. Whether you have a question about our services, pricing, or anything else.",
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
