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
    name: "Web Applications",
    price: "$999",
    description: "Custom web applications with CRM, automation, and real-time collaboration features.",
    popular: false,
    features: [
      "Custom Web Application",
      "CRM & ERP Systems",
      "Business Process Automation",
      "Real-Time Collaboration Tools",
      "Third-Party API Integrations",
      "Cloud Deployment",
    ],
  },
  {
    name: "Growth",
    price: "$2,299",
    description: "Fullstack web + AI bundle with analytics, and priority support.",
    popular: true,
    features: [
      "Everything in Starter Plan",
      "Everything in Web Applications Plan",
      "AI Systems Integration",
      "Advanced Analytics & Reporting",
      "Scalable Cloud Architecture",
      "Priority Support & Maintenance",
    ],
  },
] as const

export const SERVICES = [
  {
    title: "SaaS Product Development",
    description: "Custom SaaS platforms, business applications, and scalable cloud solutions with modern UI/UX and powerful backend systems.",
    features: ["Custom SaaS platforms", "Business applications", "Admin dashboards & analytics", "Scalable cloud architectures", "Modern UI/UX systems"],
  },
  {
    title: "Web Application Development",
    description: "Custom web applications, CRM systems, inventory management, and business process automation tools.",
    features: ["Custom CRM & ERP systems", "Inventory management", "Business process automation", "Real-time collaboration tools", "Third-party API integrations"],
  },
] as const
