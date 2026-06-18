"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Bot,
  Brain,
  Sparkles,
  TrendingUp,
  Users,
  Shield,
  Code,
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/src/components/layout/navbar"
import { Footer } from "@/src/components/layout/footer"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

const services = [
  {
    icon: Bot,
    title: "AI Automation",
    desc: "Automate repetitive tasks, workflows, and processes with intelligent agents that learn and adapt to your business logic.",
    features: [
      "Workflow automation",
      "Document processing",
      "Data extraction & entry",
      "Process optimization",
    ],
  },
  {
    icon: Brain,
    title: "Machine Learning",
    desc: "Custom ML models engineered for your specific use case — from classification to regression to recommendation systems.",
    features: [
      "Predictive modeling",
      "Classification systems",
      "Recommendation engines",
      "Anomaly detection",
    ],
  },
  {
    icon: Sparkles,
    title: "Generative AI",
    desc: "Harness the power of LLMs to generate content, code, insights, and conversations that feel human.",
    features: [
      "Chatbots & assistants",
      "Content generation",
      "Code generation",
      "Summarization",
    ],
  },
  {
    icon: TrendingUp,
    title: "Predictive Analytics",
    desc: "Turn your data into foresight. Forecast trends, customer behavior, and market movements with precision.",
    features: [
      "Sales forecasting",
      "Customer churn prediction",
      "Risk assessment",
      "Demand planning",
    ],
  },
  {
    icon: Shield,
    title: "AI Security & Compliance",
    desc: "Enterprise-grade security, privacy, and compliance built into every solution from day one.",
    features: [
      "Model auditing",
      "Bias detection",
      "Data privacy",
      "Regulatory compliance",
    ],
  },
  {
    icon: Code,
    title: "Custom Development",
    desc: "End-to-end development of AI-powered applications, from proof-of-concept to production deployment.",
    features: [
      "POC development",
      "API integration",
      "Deployment & scaling",
      "Monitoring & maintenance",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background py-24 md:py-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl text-center"
            >
              <Badge className="mb-4 px-3 py-1">Our Services</Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Full-stack AI development, delivered
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                From strategy to deployment — we provide end-to-end AI services
                that solve real business problems.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="group h-full transition-all hover:shadow-lg hover:border-primary/50">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <service.icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        {service.desc}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((f) => (
                          <li
                            key={f}
                            className="text-sm flex items-center gap-2"
                          >
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="border-y bg-muted/30 py-20 md:py-28">
          <div className="container">
            <motion.div
              {...fadeIn}
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                How we work
              </h2>
              <p className="mt-4 text-muted-foreground">
                A proven process that delivers results.
              </p>
            </motion.div>
            <div className="mt-12 grid gap-6 md:grid-cols-4">
              {[
                { step: "01", title: "Discovery", desc: "We learn your business, goals, and data landscape." },
                { step: "02", title: "Design", desc: "We architect a solution tailored to your needs." },
                { step: "03", title: "Build", desc: "We develop, train, and iterate rapidly." },
                { step: "04", title: "Deploy", desc: "We ship to production and monitor performance." },
              ].map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                    {step.step}
                  </div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28">
          <div className="container">
            <motion.div
              {...fadeIn}
              className="mx-auto max-w-3xl text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Need a custom solution?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We&apos;ll build exactly what you need.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Let&apos;s Talk <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
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
