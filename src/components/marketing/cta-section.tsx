"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Section } from "./section"

export function CTASection() {
  return (
    <Section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20 md:py-28">
      <motion.div
        className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">Let&apos;s Talk</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Ready to build something{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              great
            </span>
            ?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Book a free consultation and let&apos;s discuss your project. No commitment, just a conversation about how we can help you grow.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
              <motion.div
                animate={{ boxShadow: ["0 0 0 0 hsl(var(--primary)/0.3)", "0 0 0 20px hsl(var(--primary)/0)", "0 0 0 0 hsl(var(--primary)/0.3)"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="rounded-lg relative overflow-hidden"
                whileHover={{ boxShadow: "0 0 40px hsl(var(--primary)/0.4)" }}
              >
                <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 relative overflow-hidden gap-2" asChild>
                  <Link href="/contact">
                    <motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" initial={{ x: "-100%" }} whileHover={{ x: "200%" }} transition={{ duration: 0.7 }} />
                    <Calendar className="h-4 w-4" />
                    Book a Free Consultation
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base relative overflow-hidden gap-2" asChild>
                <Link href="/services">
                  <motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.6 }} />
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
