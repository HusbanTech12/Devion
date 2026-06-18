"use client"

import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/src/components/layout/navbar"
import { Footer } from "@/src/components/layout/footer"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card"

const plans = [
  {
    name: "Starter",
    price: "$499",
    desc: "Perfect for small teams looking to get started with AI.",
    features: [
      "1 AI model deployment",
      "5,000 API calls/month",
      "Email support",
      "Basic analytics",
      "Community access",
    ],
  },
  {
    name: "Growth",
    price: "$1,499",
    desc: "For growing teams that need more power and flexibility.",
    popular: true,
    features: [
      "5 AI model deployments",
      "50,000 API calls/month",
      "Priority email & chat support",
      "Advanced analytics",
      "Custom integrations",
      "Dedicated account manager",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For organizations that need a fully customized solution.",
    features: [
      "Unlimited deployments",
      "Unlimited API calls",
      "24/7 phone & email support",
      "Real-time dashboards",
      "Custom model training",
      "Dedicated engineering team",
      "SLA guarantee",
      "On-premise option",
    ],
  },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

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
                Simple, transparent pricing
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                No hidden fees. No surprises. Scale as you grow.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-3 mx-auto max-w-5xl">
              {plans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-0 right-0 flex justify-center">
                      <Badge className="px-4 py-1">Most Popular</Badge>
                    </div>
                  )}
                  <Card
                    className={`h-full ${plan.popular ? "border-primary shadow-lg md:scale-105" : ""}`}
                  >
                    <CardHeader className="p-6">
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <div className="mt-2">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        {plan.price !== "Custom" && (
                          <span className="text-muted-foreground">/month</span>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {plan.desc}
                      </p>
                    </CardHeader>
                    <CardContent className="p-6 pt-0">
                      <ul className="space-y-3">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="p-6 pt-0">
                      <Button
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                        asChild
                      >
                        <Link href="/contact">
                          {plan.price === "Custom"
                            ? "Contact Us"
                            : "Get Started"}
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t bg-muted/30 py-20 md:py-28">
          <div className="container max-w-3xl">
            <motion.h2
              {...fadeIn}
              className="text-3xl font-bold tracking-tight md:text-4xl text-center"
            >
              Frequently asked questions
            </motion.h2>
            <div className="mt-12 space-y-6">
              {[
                {
                  q: "Can I upgrade my plan at any time?",
                  a: "Yes. You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.",
                },
                {
                  q: "Do you offer a free trial?",
                  a: "Yes. We offer a 14-day free trial on all plans. No credit card required.",
                },
                {
                  q: "What kind of support do you provide?",
                  a: "All plans include email support. Growth plans add chat support, and Enterprise includes 24/7 phone support.",
                },
              ].map((faq, i) => (
                <motion.div
                  key={faq.q}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <h3 className="font-semibold">{faq.q}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
