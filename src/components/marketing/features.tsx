"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ChevronRight, Globe } from "lucide-react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Section } from "./section"
import { SERVICES } from "@/src/lib/constants"

const icons = [Globe]

function FeatureCard({ feature, icon: Icon, i }: { feature: typeof SERVICES[number]; icon: React.ElementType; i: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: i * 0.08, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={hovered ? { rotateX: 2, rotateY: -2, scale: 1.02 } : { rotateX: 0, rotateY: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <Card
          className={`group relative h-full overflow-hidden transition-all duration-500 ${
            hovered ? "shadow-2xl -translate-y-4 border-primary/50 shadow-primary/10" : "shadow-sm shadow-black/5 border-transparent"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.15), hsl(var(--primary)/0.02))" }}
            initial={{ opacity: 0 }}
            animate={hovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="pointer-events-none absolute -inset-[1px] rounded-xl opacity-0"
            style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.3), transparent 50%, hsl(var(--primary)/0.1))" }}
            animate={hovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
          <CardContent className="relative p-6">
            <motion.div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary"
              animate={hovered ? { scale: 1.15, rotate: [0, -10, 8, -4, 0], borderRadius: ["12px", "14px", "16px", "14px", "12px"] } : { scale: 1, rotate: 0, borderRadius: "12px" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <motion.div animate={hovered ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : { scale: 1, rotate: 0 }} transition={{ duration: 0.5 }}>
                <Icon className="h-6 w-6" />
              </motion.div>
            </motion.div>
            <motion.h3 className="mb-2 text-lg font-semibold" animate={hovered ? { x: 2 } : { x: 0 }} transition={{ duration: 0.2 }}>
              {feature.title}
            </motion.h3>
            <motion.p className="text-sm leading-relaxed text-muted-foreground" animate={hovered ? { x: 2 } : { x: 0 }} transition={{ duration: 0.2, delay: 0.05 }}>
              {feature.description}
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

export function Features() {
  return (
    <Section className="py-20 md:py-28" id="services">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">Our Services</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">succeed online</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From web applications to AI systems — we design, build, and deploy solutions that drive real business results.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-8 mx-auto max-w-xl">
          {SERVICES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} icon={icons[i]} i={i} />
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.5 }} className="mt-12 text-center">
          <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
            <Link href="/services">
              View All Services
              <ChevronRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </Section>
  )
}
