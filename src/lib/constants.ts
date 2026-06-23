export const ADMIN_EMAILS = ["husbantech08@gmail.com"]
export const TEAM_EMAILS = ["t07106217@gmail.com"]

export const APP_NAME = "Devion"
export const APP_DESCRIPTION = "AI-Powered Development Platform"
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export const BRAND = {
  name: APP_NAME,
  tagline: "Powering Digital Excellence",
  colors: {
    black: "#0A0A0A",
    white: "#FFFFFF",
    blue: "#4F7CFF",
  },
} as const

export const ROUTES = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/dashboard",
  agents: "/dashboard/agents",
  clients: "/dashboard/clients",
  projects: "/dashboard/projects",
  settings: "/dashboard/settings",
  activity: "/dashboard/activity",
  pricing: "/pricing",
  about: "/about",
  contact: "/contact",
  services: "/services",
} as const

export const NAV_LINKS = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.about, label: "About" },
  { href: ROUTES.services, label: "Services" },
  { href: ROUTES.pricing, label: "Pricing" },
  { href: ROUTES.contact, label: "Contact" },
] as const

export const PLANS = [
  {
    name: "Starter",
    price: "$499",
    description: "A professional fullstack website with modern UI/UX and essential business features.",
    popular: false,
    features: [
      "Responsive Business Website (5–7 Pages)",
      "Premium UI/UX Design",
      "Contact Forms + WhatsApp Integration",
      "Admin Dashboard",
      "Basic SEO Setup",
      "Hosting & Deployment",
    ],
  },
  {
    name: "App Development",
    price: "$1,299",
    description: "Native or cross-platform mobile app with backend integration and full deployment.",
    popular: false,
    features: [
      "iOS & Android App Development",
      "Cross-Platform or Native Build",
      "Backend API Integration",
      "Offline & Real-Time Sync",
      "User Authentication System",
      "App Store Deployment",
    ],
  },
  {
    name: "Growth",
    price: "$2,299",
    description: "Fullstack web + mobile app bundle with AI, analytics, and priority support.",
    popular: true,
    features: [
      "Everything in Starter Plan",
      "Everything in App Development Plan",
      "AI Systems Integration",
      "Advanced Analytics & Reporting",
      "Scalable Cloud Architecture",
      "Priority Support & Maintenance",
    ],
  },
] as const

export const SERVICES = [
  {
    title: "Fullstack Web Development",
    description: "Business websites, SaaS platforms, dashboards, admin systems, scalable architectures, responsive UI systems.",
    features: ["Business websites", "SaaS platforms", "Dashboards & admin systems", "Scalable architectures", "Responsive UI systems"],
  },
  {
    title: "App Development",
    description: "iOS & Android apps, cross-platform development, backend integration, offline & real-time sync.",
    features: ["iOS & Android apps", "Cross-platform development", "Backend integration", "Offline & real-time sync", "App store deployment"],
  },
] as const
