"use client"

import { motion } from "framer-motion"
import { CheckCircle, Sparkles, Target, Users } from "lucide-react"
import { Navbar } from "@/src/components/layout/navbar"
import { Footer } from "@/src/components/layout/footer"
import { Badge } from "@/src/components/ui/badge"
import { Card, CardContent } from "@/src/components/ui/card"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

const values = [
  {
    icon: Target,
    title: "Precision",
    desc: "We engineer AI systems that deliver accurate, reliable results every time.",
  },
  {
    icon: Users,
    title: "Collaboration",
    desc: "We work hand-in-hand with your team to ensure seamless integration.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    desc: "We stay at the cutting edge so you don't have to.",
  },
  {
    icon: CheckCircle,
    title: "Excellence",
    desc: "Every solution we ship meets the highest standards of quality.",
  },
]

const team = [
  { name: "Alex Chen", role: "CEO & Founder", initials: "AC" },
  { name: "Sarah Mitchell", role: "CTO", initials: "SM" },
  { name: "James Wilson", role: "Head of AI", initials: "JW" },
  { name: "Emily Rodriguez", role: "Head of Design", initials: "ER" },
  { name: "David Kim", role: "Lead Engineer", initials: "DK" },
  { name: "Lisa Thompson", role: "Head of Growth", initials: "LT" },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background py-24 md:py-32">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl text-center"
            >
              <Badge className="mb-4 px-3 py-1">About Us</Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                We&apos;re on a mission to make AI accessible to every business
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Founded in 2023, Devion has grown from a small team of AI
                researchers into a full-service development platform trusted by
                enterprises worldwide.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <motion.h2
                {...fadeIn}
                className="text-3xl font-bold tracking-tight md:text-4xl"
              >
                Our Story
              </motion.h2>
              <motion.p
                {...fadeIn}
                transition={{ delay: 0.1 }}
                className="mt-6 text-muted-foreground leading-relaxed"
              >
                We started with a simple observation: most businesses know AI can
                transform their operations, but few have the expertise to build and
                deploy it effectively. The gap between AI potential and real-world
                implementation was vast — and expensive.
              </motion.p>
              <motion.p
                {...fadeIn}
                transition={{ delay: 0.2 }}
                className="mt-4 text-muted-foreground leading-relaxed"
              >
                Today, we&apos;ve helped over 150 companies deploy 1,200+ AI models
                across industries — from healthcare to finance to logistics. Our
                platform combines cutting-edge research with battle-tested
                engineering to deliver AI that works.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-y bg-muted/30 py-20 md:py-28">
          <div className="container">
            <motion.div {...fadeIn} className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                What we believe in
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our values shape every project we deliver.
              </p>
            </motion.div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <value.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold">{value.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {value.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 md:py-28">
          <div className="container">
            <motion.div {...fadeIn} className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Meet the team
              </h2>
              <p className="mt-4 text-muted-foreground">
                The people behind the platform.
              </p>
            </motion.div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="h-full text-center">
                    <CardContent className="p-6">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-lg font-bold">
                        {member.initials}
                      </div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                    </CardContent>
                  </Card>
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
