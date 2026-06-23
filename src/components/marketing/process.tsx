"use client"

import { motion } from "framer-motion"
import { Search, Route, Palette, Code2, TestTube, Rocket, HeartHandshake } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { Section } from "./section"

const steps = [
  { icon: Search, title: "Discovery", desc: "We audit your business goals, audience, and technical landscape to define the optimal strategy." },
  { icon: Route, title: "Strategy", desc: "A detailed roadmap with timelines, milestones, architecture decisions, and UX planning." },
  { icon: Palette, title: "Design", desc: "Pixel-perfect UI/UX design with interactive prototypes, design systems, and user testing." },
  { icon: Code2, title: "Development", desc: "Agile sprints with continuous integration, code reviews, and transparent progress tracking." },
  { icon: TestTube, title: "Testing", desc: "Comprehensive QA: unit tests, integration tests, security audits, and performance optimization." },
  { icon: Rocket, title: "Launch", desc: "Production deployment with CI/CD, monitoring, and a controlled roll-out strategy." },
  { icon: HeartHandshake, title: "Ongoing Support", desc: "Post-launch maintenance, feature updates, performance monitoring, and priority support." },
]

export function Process() {
  return (
    <Section className="py-20 md:py-28 bg-muted/20" id="process">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">Our Process</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            From idea to{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">launch</span>
            {" "}in 7 proven steps
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A transparent, collaborative process that delivers results you can see at every stage.
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-primary/30 hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-10 pb-16 md:pb-20 ${
                  i === steps.length - 1 ? "pb-0 md:pb-0" : ""
                } ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Step number + icon */}
                <div className="relative z-10 flex md:w-16 md:flex-col items-center gap-4 md:gap-2 shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
                    <step.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <span className="text-sm font-bold text-primary md:text-center">0{i + 1}</span>
                </div>

                {/* Content card */}
                <div className={`flex-1 rounded-2xl border border-primary/5 bg-muted/20 p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 ${
                  i % 2 === 0 ? "md:mr-20" : "md:ml-20"
                }`}>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
