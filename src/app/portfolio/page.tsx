"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, FileText, ArrowUpRight, ArrowRight, Check } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/src/components/layout/footer"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"

const categories = ["All", "Web App", "Mobile", "AI/ML", "Dashboard", "SaaS"]

const projects = [
  {
    title: "QuickStore",
    category: "SaaS",
    industry: "E-commerce",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "PostgreSQL", "Stripe API"],
    impact: "50% faster reporting, $2.3M saved in Q3",
    description: "A full-featured e-commerce platform with real-time inventory management.",
    image: "/images/Shop.pk.png",
    gradient: "from-emerald-500/20 to-teal-500/10",
    demo: "https://quick-store-sooty.vercel.app",
    caseStudy: "https://github.com/HusbanTech12/quick_store",
    results: ["50% reduction in report generation time", "$2.3M cost savings in Q3", "99.9% prediction accuracy", "10k+ daily active users"],
  },
  {
    title: "Nexvora",
    category: "Web App",
    industry: "Startup",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS",],
    impact: "Modern web presence with 40% faster load times",
    description: "A modern startup website with sleek animations, optimized performance, and conversion-focused design.",
    image: "/images/Startup-web-pic.jpeg",
    gradient: "from-rose-500/20 to-pink-500/10",
    demo: "https://nexvora-umber.vercel.app",
    caseStudy: "https://github.com/HusbanTech12/Nexvora",
    results: ["40% faster page load times", "Modern responsive design", "SEO-optimized architecture", "Conversion-focused UI/UX"],
  },
  {
    title: "Business Solutions",
    category: "Web App",
    industry: "Business",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    impact: "AI-powered resume generation",
    description: "AI-powered resume builder using Claude API — generates tailored CVs from job descriptions.",
    image: "/images/Company-web.png",
    gradient: "from-purple-500/20 to-violet-500/10",
    demo: "https://next-resume-wizard.vercel.app/",
    caseStudy: "https://github.com/HusbanTech12/next-resume-wizard",
    results: ["AI-powered resume generation", "60% faster application process", "Claude API integration", "ATS-optimized output"],
  },
  {
    title: "Elite Motors",
    category: "Web App",
    industry: "CarHub",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    impact: "Modern booking experience",
    description: "A sleek car detailing service website with modern animations and booking UI.",
    image: "/images/Elite motors.png",
    gradient: "from-amber-500/20 to-orange-500/10",
    demo: "https://motor-gleam-site.lovable.app",
    caseStudy: "https://github.com/HusbanTech12/motor-gleam-site",
    results: ["Modern booking experience", "Animated UI interactions", "Responsive design", "Streamlined service selection"],
  },
  {
    title: "Ship Smart Solution",
    category: "Web App",
    industry: "Logistics",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "PostgreSQL"],
    impact: "Real-time shipping management",
    description: "A shipping management system with real-time tracking, route optimization.",
    image: "/images/Ship Smart Sol.jpeg",
    gradient: "from-blue-500/20 to-indigo-500/10",
    demo: "https://ship-smart-solution.vercel.app/",
    caseStudy: "https://github.com/HusbanTech12/ship_smart_solution",
    results: ["Real-time shipment tracking", "Route optimization", "Digital proof of delivery", "Customer notification system"],
  },
]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background py-24 md:py-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl text-center"
            >
              <Badge className="mb-4 px-3 py-1">Our Portfolio</Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Projects we&apos;re{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  proud of
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Every project is a partnership. Here&apos;s a selection of solutions we&apos;ve built for clients across industries.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b border-primary/5">
          <div className="container">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 md:py-24">
          <div className="container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid gap-8 md:grid-cols-2"
              >
                {filtered.map((project, i) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-40" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                          <Badge variant="secondary" className="mb-3">{project.industry}</Badge>
                          <h3 className="text-xl font-bold text-white">{project.title}</h3>
                        </div>
                      </div>
                      <CardContent className="p-6 space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t) => (
                            <span key={t} className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="space-y-2">
                          {project.results.map((r) => (
                            <div key={r} className="flex items-center gap-2 text-sm">
                              <Check className="h-4 w-4 shrink-0 text-primary" />
                              <span className="text-muted-foreground">{r}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                          <Button size="sm" variant="default" className="gap-1.5" asChild>
                            <Link href={project.demo}>
                              <ExternalLink className="h-3.5 w-3.5" />
                              Live Demo
                            </Link>
                          </Button>
                          <Button size="sm" variant="ghost" className="gap-1.5" asChild>
                            <Link href={project.caseStudy}>
                              <FileText className="h-3.5 w-3.5" />
                              Case Study
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No projects in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/30 py-20 md:py-28">
          <div className="container max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Want to be our next{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  success story?
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Tell us about your project and we&apos;ll show you how we can deliver results.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild className="rounded-xl gap-1.5">
                  <Link href="/contact">
                    Start Your Project <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-xl">
                  <Link href="/services">View Services</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
