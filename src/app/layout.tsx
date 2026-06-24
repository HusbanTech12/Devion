import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { Navbar } from "@/src/components/layout/navbar"
import { Toaster } from "@/src/components/shared/toaster"
import { SplashScreen } from "@/src/components/shared/splash-screen"
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:ring-2 focus:ring-primary"
        >
          Skip to content
        </a>
        <ClerkProvider afterSignOutUrl="/" signInUrl="/sign-in" signUpUrl="/sign-up">
          <Navbar />
          {children}
          <Toaster />
        </ClerkProvider>
        <SplashScreen />
      </body>
    </html>
  )
}
