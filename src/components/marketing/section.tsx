"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

type Props = {
  children: React.ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, ...props }: Props) {
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
