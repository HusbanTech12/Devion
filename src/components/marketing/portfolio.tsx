"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { ExternalLink, FileText, ArrowUpRight } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Section } from "./section"

const projects = [
  {
    title: "QuickStore",
    industry: "E-commerce",
    tech: ["React", "Next.js", "TypeScript", "Python", "FastAPI"],
    impact: "50% faster reporting, $2.3M saved in Q3",
    image: "/images/Shop.pk.png",
    demo: "https://quick-store-sooty.vercel.app",
    caseStudy: "https://github.com/HusbanTech12/quick_store",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
  {
    title: "Nexvora",
    industry: "Startup",
    tech: ["React", "Next.js", "TypeScript", "Python", "FastAPI"],
    impact: "Modern web presence with 40% faster load times",
    image: "/images/Startup-web-pic.jpeg",
    demo: "https://nexvora-umber.vercel.app",
    caseStudy: "https://github.com/HusbanTech12/Nexvora",
    gradient: "from-rose-500/20 to-pink-500/10",
  },
  {
    title: "Resume Wizard",
    industry: "Business",
    tech: ["React", "Next.js", "TypeScript", "Python", "FastAPI"],
    impact: "AI-powered resume generation via Claude API",
    image: "/images/Company-web.png",
    demo: "https://next-resume-wizard.vercel.app/",
    caseStudy: "https://github.com/HusbanTech12/next-resume-wizard",
    gradient: "from-purple-500/20 to-violet-500/10",
  },
  {
    title: "Elite Motors",
    industry: "Automotive",
    tech: ["React", "Next.js", "TypeScript", "Python", "FastAPI"],
    impact: "Modern booking experience with animated UI",
    image: "/images/Elite motors.png",
    demo: "https://motor-gleam-site.lovable.app",
    caseStudy: "https://github.com/HusbanTech12/motor-gleam-site",
    gradient: "from-amber-500/20 to-orange-500/10",
  },
]

function ProjectCard({ project, i }: { project: typeof projects[number]; i: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.1, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-muted/20 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
        <div className="relative h-56 w-full overflow-hidden">
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

        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                {t}
              </span>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Impact:</span> {project.impact}
          </p>

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
        </div>
      </div>
    </motion.div>
  )
}

export function Portfolio() {
  return (
    <Section className="py-20 md:py-28" id="portfolio">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">Our Work</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">projects</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real solutions for real businesses. See how we&apos;ve helped companies transform their digital presence.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 mx-auto max-w-4xl">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} i={i} />
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.5 }} className="mt-12 text-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="h-12 px-8 text-base gap-2" asChild>
              <Link href="/contact">
                Start Your Project
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  )
}
