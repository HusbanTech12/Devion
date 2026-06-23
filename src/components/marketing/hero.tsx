"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion"
import { ArrowRight, ChevronRight, Sparkles, Play } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"

function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.7
  }, [])
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <video ref={videoRef} autoPlay loop muted playsInline className="h-full w-full object-cover">
        <source src="/videos/14519632_3840_2160_25fps.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

function FloatingOrb({ className, delay = 0, size = 300 }: { className: string; delay?: number; size?: number }) {
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{ width: size, height: size }}
      animate={{ x: [0, 30, -20, 0, 15, -10, 0], y: [0, -40, 20, -10, 30, -20, 0], scale: [1, 1.05, 0.95, 1.02, 0.98, 1] }}
      transition={{ duration: 12, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  )
}

function AnimatedStat({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 60 })
  const rounded = useTransform(springValue, (v) => Math.round(v))

  useEffect(() => {
    if (isInView) motionValue.set(target)
  }, [isInView, motionValue, target])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
      <div className="flex flex-col items-center justify-center h-28 w-28 md:h-32 md:w-32 rounded-full border-2 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent ring-1 ring-primary/10 shadow-lg shadow-primary/20 shadow-[0_0_30px_hsl(var(--primary)/0.15)]">
        <div className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
          <motion.span>{rounded}</motion.span>{suffix}
        </div>
        <div className="mt-0.5 text-[10px] md:text-xs text-muted-foreground text-center leading-tight px-2">{label}</div>
      </div>
    </motion.div>
  )
}

const stats = [
  { target: 500, suffix: "+", label: "Projects Delivered" },
  { target: 150, suffix: "+", label: "Enterprise Clients" },
  { target: 50, suffix: "+", label: "Expert Engineers" },
  { target: 4.9, suffix: "", label: "Client Rating", decimal: true },
]

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <VideoBackground />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/85 via-background/70 to-background/90" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />

      <FloatingOrb className="top-20 left-10 bg-primary/10" delay={0} size={400} />
      <FloatingOrb className="bottom-20 right-10 bg-primary/5" delay={4} size={300} />

      <div className="container relative z-10 py-24 md:py-32">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
              <Badge variant="secondary" className="mb-6 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Trusted by businesses worldwide
              </Badge>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          >
            <span className="text-white">AI-Powered Software</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Solutions That Drive Growth
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/80 md:text-xl"
          >
            We build scalable web applications, AI solutions, and digital experiences that help businesses grow faster — from concept to deployment in weeks.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
              <motion.div
                className="relative overflow-hidden rounded-lg"
                whileHover={{ boxShadow: "0 0 30px hsl(var(--primary)/0.35)" }}
              >
                <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/30 relative overflow-hidden" asChild>
                  <Link href="/contact">
                    <motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" initial={{ x: "-100%" }} whileHover={{ x: "100%" }} transition={{ duration: 0.6 }} />
                    Book a Free Consultation
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base gap-2" asChild>
                <Link href="/services">
                  <Play className="h-4 w-4" />
                  View Our Work
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 md:mt-20"
          >
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {stats.map((stat) => (
                <AnimatedStat key={stat.label} {...stat} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
