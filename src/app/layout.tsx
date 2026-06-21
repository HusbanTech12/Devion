import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { Navbar } from "@/src/components/layout/navbar"
import { Toaster } from "@/src/components/shared/toaster"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Devion — AI-Powered Solutions",
  description:
    "We build cutting-edge AI-powered solutions that transform your business. From intelligent automation to predictive analytics.",
  icons: {
    icon: "/images/favicon.svg",
    apple: "/images/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ClerkProvider afterSignOutUrl="/" signInUrl="/sign-in" signUpUrl="/sign-up">
          <Navbar />
          {children}
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  )
}
