"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Section } from "./section"
import { PLANS } from "@/src/lib/constants"

export function Pricing() {
  return (
    <Section className="py-20 md:py-28 bg-muted/30" id="pricing">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">Pricing</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Transparent pricing for{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">every stage</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Fixed-price packages with no hidden fees. Every project includes a free consultation.
          </p>
        </motion.div>

        <div className="mt-12 mx-auto max-w-3xl grid gap-8 md:grid-cols-2">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider shadow-lg shadow-primary/20">
                    Most Popular
                  </Badge>
                </div>
              )}
              <Card className={`relative h-full border-primary/10 transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 ${
                plan.popular ? "border-primary/30 shadow-xl shadow-primary/10 scale-105 md:scale-110" : ""
              }`}>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                      <span className="text-sm text-muted-foreground">/project</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    className={`mt-8 w-full gap-2 ${plan.popular ? "" : "variant-outline"}`}
                    variant={plan.popular ? "default" : "outline"}
                    asChild
                  >
                    <Link href="/contact">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Need a custom solution?{" "}
            <Link href="/contact" className="text-primary hover:underline font-medium">
              Contact us for a tailored quote
            </Link>
          </p>
        </motion.div>
      </div>
    </Section>
  )
}
