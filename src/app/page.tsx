import type { Metadata } from "next"
import { Hero } from "@/src/components/marketing/hero"
import { Features } from "@/src/components/marketing/features"
import { WhyChooseUs } from "@/src/components/marketing/why-choose-us"
import { Portfolio } from "@/src/components/marketing/portfolio"
import { Process } from "@/src/components/marketing/process"
import { Testimonials } from "@/src/components/marketing/testimonials"
import { FAQ } from "@/src/components/marketing/faq"
import { CTASection } from "@/src/components/marketing/cta-section"
import { Footer } from "@/src/components/layout/footer"

export const metadata: Metadata = {
  title: "Devion — AI-Powered Software Solutions",
  description:
    "We build scalable web applications, AI solutions, and digital experiences that help businesses grow faster — from concept to deployment in weeks.",
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Hero />
        <Features />
        <WhyChooseUs />
        <Portfolio />
        <Process />
        <Testimonials />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
