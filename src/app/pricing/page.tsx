"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/src/components/layout/navbar"
import { Footer } from "@/src/components/layout/footer"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter } from "@/src/components/ui/card"

const plans = [
  {
    name: "Starter",
    price: "$499",
    desc: "Everything you need to establish a polished online presence.",
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
    desc: "A fullstack solution with AI, analytics, and room to scale.",
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
    desc: "The complete package — AI, apps, video, and priority support.",
    features: [
      "Everything in Growth Plan",
      "Advanced AI Assistants & Chatbots",
      "Custom Dashboards & Reporting",
      "Mobile App Development",
      "Professional Video Editing & Motion Graphics",
      "Priority Support & Maintenance",
    ],
  },
]

export default function PricingPage() {
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
              <Badge className="mb-4 px-3 py-1">Pricing</Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Investment that{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  pays for itself
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Fixed-price packages with no hidden fees. Pick the tier that fits
                your goals and budget.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-3 mx-auto max-w-5xl items-start">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="relative flex"
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-primary/30">
                        <Sparkles className="h-3.5 w-3.5" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <Card
                    className={`relative flex w-full flex-col overflow-hidden transition-all duration-300 ${
                      plan.popular
                        ? "border-primary/60 shadow-2xl shadow-primary/10 ring-1 ring-primary/20 lg:scale-105"
                        : "border-border hover:shadow-xl hover:border-primary/30"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-primary/80" />
                    )}

                    <CardContent className="flex flex-col p-0">
                      <div className="p-8 pb-0">
                        <h3 className="text-xl font-bold tracking-tight">
                          {plan.name}
                        </h3>
                        <div className="mt-4 flex items-baseline gap-1">
                          <span className="text-5xl font-bold tracking-tight">{plan.price}</span>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {plan.desc}
                        </p>
                      </div>

                      <div className="mt-8 px-8">
                        <div className="h-px bg-gradient-to-r from-border via-border to-transparent" />
                      </div>

                      <div className="p-8 pt-6 flex-1">
                        <ul className="space-y-3.5">
                          {plan.features.map((f) => (
                            <li key={f} className="flex items-start gap-3 text-sm">
                              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                <Check className="h-3 w-3 text-primary" />
                              </span>
                              <span className="text-muted-foreground">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-8 pt-0">
                        <Button
                          className="w-full rounded-xl"
                          variant={plan.popular ? "default" : "outline"}
                          size="lg"
                          asChild
                        >
                          <Link href="/contact">
                            Get Started <ArrowRight className="ml-1.5 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t bg-muted/30 py-16 md:py-20">
          <div className="container max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                Not sure which package fits?
              </h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                Every project is unique. Let&apos;s discuss your requirements and
                we&apos;ll recommend the right approach — no pressure, no commitment.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild className="rounded-xl">
                  <Link href="/contact">
                    Talk to Us <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="rounded-xl">
                  <Link href="/services">
                    View Services
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
