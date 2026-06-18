import Image from "next/image"
import Link from "next/link"
import { cn } from "@/src/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-3", className)}>
      <Image
        src="/images/Devion Logo.svg"
        alt="Devion Logo"
        width={160}
        height={50}
        className="h-10 w-auto"
        priority
        unoptimized
      />
      {showText && (
        <span className="font-bold text-lg hidden sm:inline">Devion</span>
      )}
    </Link>
  )
}
