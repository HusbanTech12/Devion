"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Globe,
  Check,
} from "lucide-react"
import Link from "next/link"
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
    icon: Globe,
    title: "SaaS Product Development",
    desc: "Custom SaaS platforms, business applications, and scalable cloud solutions with modern UI/UX and powerful backend systems.",
    features: [
      "Custom SaaS platforms",
      "Business applications",
      "Admin dashboards & analytics",
      "Scalable cloud architectures",
      "Modern UI/UX systems",
    ],
  },
]

export default function ServicesPage() {
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
              <Badge className="mb-4 px-3 py-1">Our Services</Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                What we build for you
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                From fullstack web apps to AI-powered systems — we deliver
                production-ready solutions that drive real results.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid gap-8 mx-auto max-w-xl">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.25, ease: "easeOut" } }}
                >
                  <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
                    <CardContent className="p-8">
                      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary ring-1 ring-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                        <service.icon className="h-7 w-7" />
                      </div>
                      <h3 className="mb-3 text-xl font-semibold">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                        {service.desc}
                      </p>
                      <ul className="space-y-2.5">
                        {service.features.map((f) => (
                          <li
                            key={f}
                            className="text-sm flex items-center gap-2.5"
                          >
                            <Check className="h-4 w-4 shrink-0 text-primary" />
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
        <section className="bg-muted/30 py-20 md:py-28">
          <div className="container">
            <motion.div {...fadeIn} className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">Process</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                How we{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  deliver
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                A proven process that takes your project from idea to launch.
              </p>
            </motion.div>
            <div className="mt-12 grid gap-6 md:grid-cols-4">
              {[
                { step: "01", title: "Discovery", desc: "We learn your business, goals, and requirements." },
                { step: "02", title: "Design", desc: "We architect and design the perfect solution." },
                { step: "03", title: "Build", desc: "We develop, integrate, and iterate rapidly." },
                { step: "04", title: "Deploy", desc: "We ship, monitor, and support long-term." },
              ].map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-primary-foreground font-bold text-sm shadow-lg shadow-primary/25">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-lg">{step.title}</h3>
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
            <motion.div {...fadeIn} className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Ready to build{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  something great?
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Tell us about your project and we&apos;ll craft the perfect solution.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild className="rounded-xl gap-1.5">
                  <Link href="/contact">
                    Let&apos;s Talk <ArrowRight className="h-4 w-4" />
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
