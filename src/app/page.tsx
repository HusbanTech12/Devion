"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Bot,
  BarChart3,
  CheckCircle,
  ChevronRight,
  Clapperboard,
  Globe,
  MessageSquare,
  SearchCheck,
  Smartphone,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Footer } from "@/src/components/layout/footer"

function Section({ children, className, ...props }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  )
}

function AnimatedCounter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 60 })
  const rounded = useTransform(springValue, (v) => Math.round(v))

  useEffect(() => {
    if (isInView) motionValue.set(target)
  }, [isInView, motionValue, target])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="text-center"
    >
      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-2 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent ring-1 ring-primary/10 shadow-lg shadow-primary/5 md:h-32 md:w-32">
        <motion.span className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
          <motion.span>{rounded}</motion.span>
          {suffix}
        </motion.span>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">{label}</div>
    </motion.div>
  )
}

function FloatingOrb({ className, delay = 0, size = 300 }: { className: string; delay?: number; size?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{ width: size, height: size }}
      animate={{
        x: [0, 30, -20, 0, 15, -10, 0],
        y: [0, -40, 20, -10, 30, -20, 0],
        scale: [1, 1.05, 0.95, 1.02, 0.98, 1],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  )
}

function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover"
      >
        <source src="/videos/14519632_3840_2160_25fps.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

function FeatureCard({ feature, i }: { feature: { icon: React.ElementType; title: string; desc: string }; i: number }) {
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
            hovered
              ? "shadow-2xl -translate-y-4 border-primary/50 shadow-primary/10"
              : "shadow-sm shadow-black/5 border-transparent"
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
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)/0.3), transparent 50%, hsl(var(--primary)/0.1))",
            }}
            animate={hovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
          <CardContent className="relative p-6">
            <motion.div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary"
              animate={
                hovered
                  ? { scale: 1.15, rotate: [0, -10, 8, -4, 0], borderRadius: ["12px", "14px", "16px", "14px", "12px"] }
                  : { scale: 1, rotate: 0, borderRadius: "12px" }
              }
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <motion.div
                animate={hovered ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="h-6 w-6" />
              </motion.div>
            </motion.div>
            <motion.h3
              className="mb-2 text-lg font-semibold"
              animate={hovered ? { x: 2 } : { x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {feature.title}
            </motion.h3>
            <motion.p
              className="text-sm leading-relaxed text-muted-foreground"
              animate={hovered ? { x: 2 } : { x: 0 }}
              transition={{ duration: 0.2, delay: 0.05 }}
            >
              {feature.desc}
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

const stats = [
  { target: 500, suffix: "+", label: "Projects Delivered" },
  { target: 150, suffix: "+", label: "Enterprise Clients" },
  { target: 1200, suffix: "+", label: "AI Models Deployed" },
  { target: 100, suffix: "%", label: "Uptime SLA" },
]

const features = [
  { icon: Globe, title: "Fullstack Web Development", desc: "Business websites, SaaS platforms, dashboards, and admin systems with scalable architectures and premium responsive UI." },
  { icon: Smartphone, title: "App Development", desc: "Native and cross-platform mobile applications with seamless backend integration and polished user experiences." },
  { icon: SearchCheck, title: "SEO Services", desc: "On-page and technical SEO, keyword strategy, content optimization, and analytics to boost search rankings and organic traffic." },
  { icon: Bot, title: "AI Systems Integration", desc: "Intelligent AI assistants, RAG chatbot systems, and AI-powered web experiences that transform how you operate." },
  { icon: BarChart3, title: "Dashboard Systems", desc: "Powerful admin dashboards, analytics systems, lead management, and reporting interfaces for data-driven decisions." },
  { icon: Clapperboard, title: "Video Editing", desc: "Professional video production, motion graphics, and post-production services for marketing, brand stories, and content." },
]

const testimonials = [
  { quote: "Devion transformed our customer operations. What took our team 8 hours now takes 12 minutes.", author: "Sarah Chen", role: "CTO, TechFlow Inc.", initials: "SC", color: "from-green-400 to-emerald-600" },
  { quote: "The predictive analytics module saved us $2.3M in Q3 alone. The accuracy is remarkable.", author: "Marcus Rivera", role: "VP Engineering, DataSync", initials: "MR", color: "from-blue-400 to-indigo-600" },
  { quote: "We evaluated 12 AI platforms. Devion was the only one that could deploy to our air-gapped environment.", author: "Emily Park", role: "Head of AI, SecureNet", initials: "EP", color: "from-purple-400 to-violet-600" },
]

const steps = [
  { step: "01", title: "Discovery", desc: "We audit your data, infrastructure, and business goals to map the optimal AI strategy." },
  { step: "02", title: "Architect", desc: "Our engineers design a scalable solution tailored to your stack, security, and compliance needs." },
  { step: "03", title: "Build & Train", desc: "We develop and train models on your data, iterating rapidly with continuous feedback." },
  { step: "04", title: "Deploy & Monitor", desc: "Production deployment with real-time monitoring, drift detection, and automated retraining." },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
})

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* ─── HERO ─── */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <VideoBackground />

          <div className="container relative z-10 py-24 md:py-32">
            <div className="mx-auto max-w-5xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Badge variant="secondary" className="mb-6 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm shadow-sm">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    Trusted by 150+ enterprises globally
                  </Badge>
                </motion.div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
              >
                <span className="text-white">AI-Powered</span>{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Solutions
                </span>
                <br />
                <span className="text-white">for the</span>{" "}
                <span className="bg-gradient-to-r from-primary/60 via-primary to-primary/80 bg-clip-text text-transparent">
                  Future
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl"
              >
                We engineer intelligent systems that automate, predict, and transform.
                Deploy production-ready AI at scale — without the complexity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  layout
                >
                  <motion.div
                    className="relative overflow-hidden rounded-lg"
                    whileHover={{ boxShadow: "0 0 30px hsl(var(--primary)/0.35)" }}
                  >
                    <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/30 relative overflow-hidden" asChild>
                      <Link href="/contact">
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        Get Started
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <ArrowRight className="ml-1.5 h-4 w-4" />
                        </motion.span>
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                    <Link href="/services">
                      View All Services
                      <ChevronRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <Section className="py-20 md:py-28" id="features">
          <div className="container">
            <motion.div {...fadeUp(0)} className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">What We Build</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                From idea to{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  production-ready solution
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We design and build everything you need to grow — from fullstack applications to AI-powered systems.
              </p>
            </motion.div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <FeatureCard key={feature.title} feature={feature} i={i} />
              ))}
            </div>
            <motion.div {...fadeUp(6)} className="mt-12 text-center">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                <Link href="/services">
                  View All Services
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </Section>

        {/* ─── HOW IT WORKS ─── */}
        <Section className="bg-muted/30 py-20 md:py-28">
          <div className="container">
            <motion.div {...fadeUp(0)} className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">Process</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                From idea to{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  production
                </span>{" "}
                <br className="hidden sm:inline" />
                in weeks, not months
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Our proven four-phase process de-risks AI adoption and delivers measurable value fast.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-8 md:grid-cols-4">
              {steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="relative text-center"
                >
                  {i < steps.length - 1 && (
                    <motion.div
                      className="absolute left-[60%] top-8 hidden h-[2px] w-[80%] bg-gradient-to-r from-primary/30 to-transparent md:block"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.3, duration: 0.6 }}
                    />
                  )}
                  <motion.div
                    className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20"
                    whileHover={{ scale: 1.15, rotate: 8, boxShadow: "0 20px 40px hsl(var(--primary)/0.3)" }}
                    transition={{ type: "spring", stiffness: 250, damping: 12 }}
                  >
                    <span className="text-xl font-bold text-primary-foreground">{step.step}</span>
                  </motion.div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeUp(4)} className="mt-12 text-center">
              <Button size="lg" variant="default" className="h-12 px-8 text-base shadow-lg shadow-primary/25" asChild>
                <Link href="/pricing">
                  View Pricing
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </Section>

        {/* ─── STATS ─── */}
        <Section className="bg-muted/40 py-20 md:py-28">
          <div className="container">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <AnimatedCounter key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </Section>

        {/* ─── TESTIMONIALS ─── */}
        <Section className="py-20 md:py-28">
          <div className="container">
            <motion.div {...fadeUp(0)} className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">Testimonials</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Trusted by{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  industry leaders
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See what our customers say about working with Devion.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.author}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25, ease: "easeOut" } }}
                >
                  <Card className="group relative h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
                    <div className={`absolute top-0 right-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-gradient-to-br ${t.color} opacity-10 blur-2xl`} />
                    <CardContent className="relative p-6">
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

        {/* ─── CTA ─── */}
        <Section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20 md:py-28">
          <motion.div
            className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="container relative">
            <motion.div {...fadeUp(0)} className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4 px-3 py-1 tracking-wide">Get Started</Badge>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Ready to{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  transform
                </span>{" "}
                your business with AI?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join 150+ enterprises already using Devion to build smarter, ship faster, and scale further.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                  <motion.div
                    animate={{ boxShadow: ["0 0 0 0 hsl(var(--primary)/0.3)", "0 0 0 20px hsl(var(--primary)/0)", "0 0 0 0 hsl(var(--primary)/0.3)"] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="rounded-lg relative overflow-hidden"
                    whileHover={{ boxShadow: "0 0 40px hsl(var(--primary)/0.4)" }}
                  >
                    <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20 relative overflow-hidden" asChild>
                      <Link href="/contact">
                        <motion.span
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "200%" }}
                          transition={{ duration: 0.7 }}
                        />
                        Start Your Journey
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base relative overflow-hidden" asChild>
                    <Link href="/pricing">
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/8 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      View Pricing
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  )
}
