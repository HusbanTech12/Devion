import Image from "next/image"
import Link from "next/link"
import { cn } from "@/src/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const iconSizes = { sm: 24, md: 32, lg: 40 }
  const textSizes = { sm: "text-base", md: "text-lg", lg: "text-xl" }
  const iconSize = iconSizes[size]

  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/images/icon.svg"
        alt="Devion"
        width={iconSize}
        height={iconSize}
        className="flex-shrink-0"
        priority
        unoptimized
      />
      {showText && (
        <span className={cn("font-bold tracking-tight", textSizes[size])}>
          <span className="text-foreground">De</span>
          <span className="text-[#4F7CFF]">v</span>
          <span className="text-foreground">ion</span>
        </span>
      )}
    </Link>
  )
}
