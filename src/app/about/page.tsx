"use client"

import { motion } from "framer-motion"
import { CheckCircle, Sparkles, Target, Users } from "lucide-react"
import Image from "next/image"
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
  { name: "Syed Husban", role: "CEO & Founder", initials: "SH" },
  { name: "Syed Iqbal", role: "Co-Founder & CTO", initials: "SI" },
  { name: "Mrs. Abdul Moiz", role: "Co-Founder & Head of Marketing", initials: "MA" },
  { name: "Mrs. Sajjad", role: "Co-Founder & Head of Operations", initials: "MS" },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0">
            <Image
              src="/images/about/team-office.jpg"
              alt="Team office"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          </div>
          <div className="container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl text-center"
            >
              <Badge className="mb-4 px-3 py-1 border-white/20 bg-white/10 text-white backdrop-blur-sm">
                About Us
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                We&apos;re on a mission to make AI accessible to every business
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
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
            <div className="grid items-center gap-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">Our Story</Badge>
                <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                  From a bold idea to a{" "}
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                    platform that delivers
                  </span>
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                  We started with a simple observation: most businesses know AI can
                  transform their operations, but few have the expertise to build and
                  deploy it effectively. The gap between AI potential and real-world
                  implementation was vast — and expensive.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed text-base md:text-lg">
                  Today, we&apos;ve helped over 150 companies deploy 1,200+ AI models
                  across industries — from healthcare to finance to logistics. Our
                  platform combines cutting-edge research with battle-tested
                  engineering to deliver AI that works.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <Image
                  src="/images/about/collaboration.jpg"
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted/30 py-20 md:py-28">
          <div className="container">
            <motion.div {...fadeIn} className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">Our Values</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                What we{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  believe in
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
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
                  whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
                >
                  <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
                    <div className={`absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${
                      i === 0 ? "from-green-400/20 to-emerald-600/10" :
                      i === 1 ? "from-blue-400/20 to-indigo-600/10" :
                      i === 2 ? "from-purple-400/20 to-violet-600/10" :
                      "from-amber-400/20 to-orange-600/10"
                    } blur-2xl`} />
                    <CardContent className="relative p-6 text-center">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary ring-1 ring-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                        <value.icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-semibold text-lg">{value.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
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
              <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">Our Team</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Meet the{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  people behind it
                </span>
              </h2>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                The minds building the future of AI.
              </p>
            </motion.div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
                >
                  <Card className="group h-full overflow-hidden text-center transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
                    <div className="h-24 bg-gradient-to-br from-primary/80 to-primary/20 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_white_0%,_transparent_60%)] opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                    </div>
                    <CardContent className="relative px-6 pb-6 pt-0">
                      <div className="relative -mt-12 mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 text-white text-xl font-bold shadow-lg shadow-primary/25 ring-4 ring-background transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                        {member.initials}
                      </div>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
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
