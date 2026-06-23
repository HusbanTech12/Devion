"use client"

import { motion } from "framer-motion"
import { Section } from "./section"

const logos = [
  "TechFlow", "DataSync", "SecureNet", "CloudBase", "NovaTech",
  "Quantum", "ApexSoft", "BrightMind", "CyberCore", "FusionLabs",
]

export function TrustedBy() {
  return (
    <Section className="py-16 md:py-20 border-y border-primary/5 bg-muted/20">
      <div className="container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-medium text-muted-foreground mb-8 tracking-wider uppercase"
        >
          Trusted by innovative companies worldwide
        </motion.p>

        <div className="relative overflow-hidden">
          <div className="flex gap-12 items-center justify-center flex-wrap">
            {logos.map((name) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex h-10 items-center justify-center"
              >
                <span className="text-lg font-semibold text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors select-none">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
