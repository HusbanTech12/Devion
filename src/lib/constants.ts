export const ADMIN_EMAILS = ["husbantech08@gmail.com"]

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
    description: "Everything you need to establish a polished online presence.",
    features: [
      "Responsive Business Website",
      "Contact Forms + WhatsApp Integration",
      "Basic SEO Setup",
      "Hosting & Deployment",
      "Premium UI/UX Design",
    ],
  },
  {
    name: "Growth",
    price: "$1,499",
    description: "A fullstack solution with AI, analytics, and room to scale.",
    popular: true,
    features: [
      "Fullstack Web Application",
      "Admin Dashboard + Analytics",
      "AI Systems Integration",
      "Advanced SEO Services",
      "Scalable Architecture",
      "Ongoing Support",
    ],
  },
  {
    name: "Premium",
    price: "$2,999",
    description: "The complete package — AI, apps, video, and priority support.",
    features: [
      "Everything in Growth Plan",
      "Advanced AI Assistants & Chatbots",
      "Custom Dashboards & Reporting",
      "Mobile App Development",
      "Professional Video Editing & Motion Graphics",
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
  {
    title: "SEO Services",
    description: "On-page SEO, technical SEO audits, keyword research, content optimization, ranking analytics.",
    features: ["On-page SEO", "Technical SEO audits", "Keyword research & strategy", "Content optimization", "Ranking analytics"],
  },
  {
    title: "AI Systems Integration",
    description: "AI assistants, RAG chatbot systems, intelligent web experiences, AI support systems.",
    features: ["AI assistants", "RAG chatbot systems", "Intelligent web experiences", "AI support systems"],
  },
  {
    title: "Dashboard Systems",
    description: "Admin dashboards, analytics systems, lead management, reporting interfaces.",
    features: ["Admin dashboards", "Analytics systems", "Lead management", "Reporting interfaces"],
  },
  {
    title: "Video Editing",
    description: "Marketing videos, motion graphics, post-production, brand storytelling, social media content.",
    features: ["Marketing videos", "Motion graphics", "Post-production editing", "Brand storytelling", "Social media content"],
  },
] as const
