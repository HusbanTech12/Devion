"use client"

import { motion } from "framer-motion"
import { Search, Route, Palette, Code2, TestTube, Rocket, HeartHandshake, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/src/components/layout/footer"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"

const steps = [
  {
    icon: Search,
    title: "Discovery",
    subtitle: "Understanding your vision",
    desc: "We start by learning everything about your business, goals, audience, and technical landscape. This phase includes stakeholder interviews, competitive analysis, and technology assessment.",
    details: [
      "Stakeholder interviews & goal alignment",
      "Market & competitor analysis",
      "Technical infrastructure audit",
      "User research & persona development",
      "Feasibility & risk assessment",
    ],
    duration: "3-5 days",
  },
  {
    icon: Route,
    title: "Strategy",
    subtitle: "Mapping the path forward",
    desc: "We create a comprehensive project roadmap with clear milestones, architecture decisions, UX strategy, and a detailed delivery timeline — so you know exactly what to expect.",
    details: [
      "Project roadmap & milestone planning",
      "Technology stack finalization",
      "Information architecture design",
      "UX strategy & wireframing",
      "Sprint planning & resource allocation",
    ],
    duration: "5-7 days",
  },
  {
    icon: Palette,
    title: "Design",
    subtitle: "Crafting the experience",
    desc: "Our designers create pixel-perfect UI mockups, interactive prototypes, and comprehensive design systems that align with your brand and delight your users.",
    details: [
      "Visual identity & brand alignment",
      "Interactive high-fidelity prototypes",
      "Design system & component library",
      "User testing & feedback iteration",
      "Accessibility compliance (WCAG)",
    ],
    duration: "7-10 days",
  },
  {
    icon: Code2,
    title: "Development",
    subtitle: "Building with precision",
    desc: "Our engineers build your solution in agile sprints with continuous integration, automated testing, and transparent progress tracking. You see working software every step of the way.",
    details: [
      "Agile sprint-based development",
      "Continuous integration & deployment",
      "Automated testing pipeline",
      "Regular progress demos",
      "Performance optimization",
    ],
    duration: "4-12 weeks",
  },
  {
    icon: TestTube,
    title: "Testing",
    subtitle: "Ensuring quality",
    desc: "Every solution undergoes rigorous quality assurance: functional testing, performance benchmarking, security audits, and real-world user acceptance testing before launch.",
    details: [
      "Unit & integration testing",
      "Performance & load testing",
      "Security audit & penetration testing",
      "Cross-browser & device testing",
      "User acceptance testing (UAT)",
    ],
    duration: "5-7 days",
  },
  {
    icon: Rocket,
    title: "Launch",
    subtitle: "Going live",
    desc: "We manage a controlled production deployment with CI/CD pipelines, monitoring setup, rollback procedures, and a phased roll-out strategy to ensure a smooth launch.",
    details: [
      "Production environment setup",
      "CI/CD pipeline configuration",
      "Monitoring & alerting setup",
      "Phased roll-out strategy",
      "Performance benchmarking",
    ],
    duration: "3-5 days",
  },
  {
    icon: HeartHandshake,
    title: "Ongoing Support",
    subtitle: "Long-term partnership",
    desc: "After launch, we provide ongoing maintenance, performance monitoring, feature updates, and priority support to ensure your solution continues to deliver value.",
    details: [
      "24/7 monitoring & incident response",
      "Regular performance reviews",
      "Feature enhancements & updates",
      "Security patches & compliance",
      "Dedicated account manager",
    ],
    duration: "Ongoing",
  },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

export default function ProcessPage() {
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
              <Badge className="mb-4 px-3 py-1">Our Process</Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                From idea to{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  launch
                </span>
                {" "}in 7 proven steps
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                A transparent, collaborative process that delivers results. Here&apos;s exactly how we take your project from concept to production.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 md:py-28">
          <div className="container max-w-4xl">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-primary/10 to-primary/30 hidden md:block" />

              <div className="space-y-16 md:space-y-0">
                {steps.map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-10 pb-8 md:pb-16 ${
                      i === steps.length - 1 ? "pb-0 md:pb-0" : ""
                    } ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                  >
                    {/* Step number + icon */}
                    <div className="relative z-10 flex md:w-20 md:flex-col items-center gap-4 md:gap-2 shrink-0">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20">
                        <step.icon className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <span className="text-sm font-bold text-primary md:text-center">0{i + 1}</span>
                    </div>

                    {/* Content */}
                    <div className={`flex-1 ${i % 2 === 0 ? "md:pr-20" : "md:pl-20"}`}>
                      <Card className="transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20">
                        <CardContent className="p-6 md:p-8">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold">{step.title}</h3>
                              <p className="text-sm text-primary font-medium">{step.subtitle}</p>
                            </div>
                            <Badge variant="secondary" className="shrink-0 ml-4">{step.duration}</Badge>
                          </div>
                          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                            {step.desc}
                          </p>
                          <ul className="mt-4 space-y-2">
                            {step.details.map((d) => (
                              <li key={d} className="flex items-center gap-2.5 text-sm">
                                <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                                <span className="text-muted-foreground">{d}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why This Process Works */}
        <section className="bg-muted/30 py-20 md:py-28">
          <div className="container">
            <motion.div {...fadeIn} className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">Why It Works</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Built for{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  delivery
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                Our process is designed to minimize risk, maximize transparency, and deliver results you can see at every stage.
              </p>
            </motion.div>
            <div className="mt-12 grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
              {[
                { title: "Transparent", desc: "Weekly progress reports, live demos, and a shared dashboard so you always know where things stand." },
                { title: "Iterative", desc: "We ship working software early and often, incorporating your feedback at every sprint." },
                { title: "Risk-Free", desc: "Rigorous testing, security audits, and rollback procedures ensure a smooth launch every time." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
                >
                  <Card className="h-full transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28">
          <div className="container max-w-3xl text-center">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Ready to start your{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  journey?
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Let&apos;s discuss your project and create a roadmap tailored to your goals.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild className="rounded-xl gap-1.5">
                  <Link href="/contact">
                    Start the Process <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-xl">
                  <Link href="/portfolio">View Our Work</Link>
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
