"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/src/components/layout/navbar"
import { Footer } from "@/src/components/layout/footer"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"

const posts = [
  {
    title: "How LLMs Are Transforming Enterprise Workflows in 2026",
    excerpt:
      "Large language models have moved beyond chatbots. Here's how enterprises are using them to automate complex workflows.",
    date: "Jun 15, 2026",
    readTime: "8 min read",
    category: "AI Trends",
    author: "Alex Chen",
  },
  {
    title: "Building Production-Ready RAG Systems: A Practical Guide",
    excerpt:
      "Retrieval-augmented generation is the backbone of modern AI applications. Learn the architecture patterns that work at scale.",
    date: "Jun 10, 2026",
    readTime: "12 min read",
    category: "Engineering",
    author: "James Wilson",
  },
  {
    title: "The ROI of AI: Measuring Impact Beyond the Hype",
    excerpt:
      "How do you measure the return on your AI investment? We break down the metrics that matter for executives.",
    date: "Jun 5, 2026",
    readTime: "6 min read",
    category: "Business",
    author: "Lisa Thompson",
  },
  {
    title: "Fine-Tuning vs. RAG: When to Use Which Approach",
    excerpt:
      "Two powerful techniques, different use cases. A decision framework for choosing the right approach for your project.",
    date: "May 28, 2026",
    readTime: "10 min read",
    category: "Engineering",
    author: "Sarah Mitchell",
  },
  {
    title: "AI Governance: Building Trustworthy Systems",
    excerpt:
      "As AI becomes central to business operations, governance frameworks are essential. Here's how to build them.",
    date: "May 20, 2026",
    readTime: "7 min read",
    category: "Best Practices",
    author: "David Kim",
  },
  {
    title: "The Future of AI-Powered Solutions: 2026 & Beyond",
    excerpt:
      "From agentic workflows to multimodal models — what's coming next in AI development and how to prepare.",
    date: "May 12, 2026",
    readTime: "9 min read",
    category: "AI Trends",
    author: "Alex Chen",
  },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background py-24 md:py-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-3xl text-center"
            >
              <Badge className="mb-4 px-3 py-1">Blog</Badge>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Insights from the forefront of AI
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Engineering deep-dives, industry analysis, and best practices
                from our team.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Posts */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="group h-full transition-all hover:shadow-lg flex flex-col">
                    <CardContent className="p-6 flex flex-col flex-1">
                      <Badge variant="secondary" className="w-fit mb-3">
                        {post.category}
                      </Badge>
                      <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground flex-1">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t pt-4">
                        <span className="text-xs text-muted-foreground">
                          {post.author}
                        </span>
                        <Link
                          href="#"
                          className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1"
                        >
                          Read more <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              {...fadeIn}
              className="mt-12 text-center"
            >
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
