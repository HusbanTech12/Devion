"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import { Badge } from "@/src/components/ui/badge"
import { Section } from "./section"
import { cn } from "@/src/lib/utils"

const faqs = [
  {
    q: "What does a typical project timeline look like?",
    a: "Most projects take 4–12 weeks from kickoff to launch, depending on scope. A simple business website can ship in 2–3 weeks, while a full SaaS platform with AI features might take 8–12 weeks. We'll give you a precise timeline during the free consultation.",
  },
  {
    q: "How do you handle revisions and feedback?",
    a: "We use an agile process with weekly sprint reviews. You'll see progress every step of the way and can provide feedback at each milestone. Most plans include up to 3 revision rounds per phase.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. Every project includes a post-launch support period. We also offer ongoing maintenance and support retainers for businesses that need continued development, monitoring, and updates.",
  },
  {
    q: "What technologies do you use?",
    a: "We specialize in modern stacks: Next.js, React, React Native, Node.js, Python, TypeScript, PostgreSQL, Supabase, AWS, and more. For AI projects we use OpenAI, LangChain, TensorFlow, and custom ML pipelines. We choose the right tech for each project.",
  },
  {
    q: "Can you work with our existing codebase?",
    a: "Absolutely. We regularly take over existing projects, refactor legacy code, and add new features to established platforms. We'll audit your current stack and provide a roadmap for improvements.",
  },
  {
    q: "How do you ensure project security?",
    a: "Security is built into every phase. We follow OWASP guidelines, implement proper auth (Clerk/Auth0), encrypt data in transit and at rest, and conduct security audits before launch. We can also work within compliance frameworks (SOC 2, HIPAA, GDPR).",
  },
  {
    q: "What is your pricing model?",
    a: "We offer fixed-price packages for defined scopes and hourly retainers for ongoing work. Every project starts with a free consultation where we'll define the scope and provide a detailed quote. No hidden fees, no surprises.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <Section className="py-20 md:py-28" id="faq">
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">FAQ</Badge>
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">questions</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about working with us.
          </p>
        </motion.div>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-panel-${i}`}
                className={cn(
                  "w-full text-left rounded-2xl border transition-all duration-300 p-5 cursor-pointer",
                  openIndex === i
                    ? "border-primary/30 bg-primary/5 shadow-lg shadow-primary/5"
                    : "border-primary/5 bg-muted/20 hover:border-primary/20 hover:bg-muted/30"
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold md:text-base">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                      openIndex === i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}
                  >
                    <Plus className="h-4 w-4" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
