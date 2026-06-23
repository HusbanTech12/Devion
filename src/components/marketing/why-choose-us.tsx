"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code2, Zap, Shield, HeadphonesIcon, Lightbulb, Lock } from "lucide-react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Section } from "./section"

const reasons = [
  { icon: Code2, title: "Expert Engineering", desc: "Senior engineers with experience across fintech, healthcare, e-commerce, and enterprise SaaS." },
  { icon: Zap, title: "Rapid Delivery", desc: "From concept to production in weeks, not months. Our agile process ensures fast, iterative results." },
  { icon: Shield, title: "Enterprise Security", desc: "SOC 2 compliant development with end-to-end encryption, secure auth, and robust data protection." },
  { icon: HeadphonesIcon, title: "Dedicated Support", desc: "Ongoing maintenance, monitoring, and priority support — we're with you long after launch." },
  { icon: Lightbulb, title: "Strategic Partnership", desc: "We don't just build — we advise. Every project includes strategy, architecture, and growth planning." },
  { icon: Lock, title: "Future-Proof Tech", desc: "Modern stacks (Next.js, React Native, AI/ML) that scale with your business and evolve with the market." },
]

function ReasonCard({ reason, i }: { reason: typeof reasons[number]; i: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.08, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <Card className="h-full border-primary/5 bg-muted/20 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <CardContent className="p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <reason.icon className="h-6 w-6" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">{reason.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{reason.desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function WhyChooseUs() {
  return (
    <Section className="py-20 md:py-28 bg-muted/30" id="why-us">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">Why Choose Us</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            We deliver more than{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">just code</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every project is backed by deep expertise, strategic thinking, and a commitment to your success.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.title} reason={reason} i={i} />
          ))}
        </div>
      </div>
    </Section>
  )
}
