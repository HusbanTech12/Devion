"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useMediaQuery } from "@/src/hooks/use-media-query"

const PARTICLES = Array.from({ length: 24 }, (_, i) => {
  const n = i * 137.508
  return {
    id: i,
    x: ((n * 7) % 100),
    y: ((n * 11 + 33) % 100),
    size: ((n * 3) % 25) / 10 + 0.5,
    duration: ((n * 5) % 30) / 10 + 3,
    delay: ((n * 13) % 30) / 10,
  }
})

function Particles({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/10"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -(Math.random() * 20 + 10), 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

export function SplashScreen() {
  const [show, setShow] = useState(true)
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  useEffect(() => {
    const seen = localStorage.getItem("devion-splash-seen")
    if (seen) {
      setShow(false)
      return
    }

    const timer = setTimeout(() => {
      localStorage.setItem("devion-splash-seen", "true")
      setShow(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#07070d]"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-1/3 -right-1/4 w-1/2 h-1/2 rounded-full bg-emerald-500/8 blur-[120px]"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-1/3 -left-1/4 w-1/2 h-1/2 rounded-full bg-blue-500/5 blur-[120px]"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#07070d_100%)]" />
          </div>

          <Particles reducedMotion={reducedMotion} />

          <div className="relative flex flex-col items-center gap-12">
            <motion.div
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.92, filter: "blur(10px)" }
              }
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-emerald-500/8 blur-[100px]" />
              </div>

              <Image
                src="/images/wordmark-dark.svg"
                alt="Devion"
                width={320}
                height={64}
                priority
                unoptimized
                className="relative h-9 md:h-14 w-auto"
              />
            </motion.div>

            {!reducedMotion && (
              <div className="relative h-px w-40 md:w-56">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{ originX: "50%" }}
                />
              </div>
            )}

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: reducedMotion ? 0.3 : 0.95,
                duration: 0.5,
                ease: "easeOut",
              }}
              className="text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-white/35"
            >
              Powering Digital Excellence
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
