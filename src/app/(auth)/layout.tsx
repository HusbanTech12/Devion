import Link from "next/link"
import Image from "next/image"
import { APP_NAME } from "@/src/lib/constants"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 relative flex-col bg-gradient-to-br from-primary/20 via-primary/5 to-background p-12">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="relative z-10 flex flex-col h-full">
          <Link href="/" className="flex items-center">
            <Image src="/images/logo-dark.svg" alt={APP_NAME} width={160} height={48} className="h-12 w-auto" priority unoptimized />
          </Link>
          <div className="flex-1 flex flex-col justify-center max-w-md">
            <blockquote className="space-y-3">
              <p className="text-2xl font-medium leading-relaxed">
                &ldquo;We build cutting-edge AI-powered solutions that transform businesses. From intelligent automation to predictive analytics.&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                  DH
                </div>
                <div>
                  <p className="text-sm font-medium">Devion Team</p>
                  <p className="text-xs text-muted-foreground">AI-Powered Development Platform</p>
                </div>
              </footer>
            </blockquote>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Fullstack Web
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                AI Systems
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Mobile Apps
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
