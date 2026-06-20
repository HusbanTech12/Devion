"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { Footer } from "@/src/components/layout/footer"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Card, CardContent } from "@/src/components/ui/card"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@aiagency.com",
    href: "mailto:hello@aiagency.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "San Francisco, CA",
    href: "#",
  },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Simulate send
    await new Promise((r) => setTimeout(r, 1000))
    setSent(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Contact Form + Info */}
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl text-center mb-6"
            >
              <Badge className="mb-3 px-3 py-1">Contact</Badge>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Let&apos;s Talk
              </h1>
            </motion.div>
            <div className="grid gap-6 lg:grid-cols-5 mx-auto max-w-5xl">
              {/* Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 space-y-6"
              >
                <h2 className="text-2xl font-bold">Contact us</h2>
                <p className="text-muted-foreground">
                  Whether you have a question about our services, pricing, or
                  anything else — our team is ready to help.
                </p>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {item.label}
                        </div>
                        {item.value}
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-3"
              >
                <Card>
                  <CardContent className="p-6">
                    {sent ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-12 text-center"
                      >
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Send className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-semibold">
                          Message sent!
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                          We&apos;ll get back to you within 24 hours.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-6"
                          onClick={() => setSent(false)}
                        >
                          Send another message
                        </Button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="name"
                              className="text-sm font-medium"
                            >
                              Name
                            </label>
                            <Input
                              id="name"
                              placeholder="Your name"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <label
                              htmlFor="email"
                              className="text-sm font-medium"
                            >
                              Email
                            </label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="you@company.com"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="subject"
                            className="text-sm font-medium"
                          >
                            Subject
                          </label>
                          <Input
                            id="subject"
                            placeholder="How can we help?"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="message"
                            className="text-sm font-medium"
                          >
                            Message
                          </label>
                          <Textarea
                            id="message"
                            placeholder="Tell us about your project..."
                            rows={6}
                            required
                          />
                        </div>
                        <Button type="submit" size="lg" className="w-full">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
