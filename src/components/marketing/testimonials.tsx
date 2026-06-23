"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Section } from "./section"

const testimonials = [
  {
    quote: "Devion transformed our customer operations. What took our team 8 hours now takes 12 minutes. The AI support system they built paid for itself in the first month.",
    author: "Sarah Chen",
    role: "CTO, TechFlow Inc.",
    initials: "SC",
    color: "from-green-400 to-emerald-600",
  },
  {
    quote: "The predictive analytics dashboard saved us $2.3M in Q3 alone. The accuracy of their models is remarkable, and the team was a pleasure to work with.",
    author: "Marcus Rivera",
    role: "VP Engineering, DataSync",
    initials: "MR",
    color: "from-blue-400 to-indigo-600",
  },
  {
    quote: "We evaluated 12 agencies before choosing Devion. They were the only ones who could deploy to our air-gapped environment and meet our compliance requirements.",
    author: "Emily Park",
    role: "Head of AI, SecureNet",
    initials: "EP",
    color: "from-purple-400 to-violet-600",
  },
  {
    quote: "Our mobile app went from concept to App Store in 8 weeks. The cross-platform build quality is exceptional — users can't tell it's not native.",
    author: "James Okonkwo",
    role: "Founder, BrightMind",
    initials: "JO",
    color: "from-amber-400 to-orange-600",
  },
]

export function Testimonials() {
  return (
    <Section className="py-20 md:py-28" id="testimonials">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">Testimonials</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">industry leaders</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our clients say about working with Devion.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
            >
              <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
                <div className={`absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-gradient-to-br ${t.color} opacity-10 blur-2xl`} />
                <CardContent className="relative p-6">
                  <Quote className="mb-4 h-8 w-8 text-primary/20" />
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 border-t pt-4">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${t.color} text-xs font-bold text-white`}>
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.author}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
