"use client"

import { useRef, useState, useCallback } from "react"
import { useUser } from "@clerk/nextjs"
import { toast } from "sonner"
import { Camera, Loader2, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"

type Props = {
  size?: number
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_SIZE = 2 * 1024 * 1024

function getInitials(name: string | null | undefined, email?: string): string {
  if (name) {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
  }
  return email?.charAt(0).toUpperCase() ?? "U"
}

export function AvatarUpload({ size = 100 }: Props) {
  const { user, isLoaded } = useUser()
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const currentImage = preview ?? user?.imageUrl ?? null
  const initials = getInitials(user?.fullName, user?.primaryEmailAddress?.emailAddress)

  const handleUpload = useCallback(async (file: File) => {
    if (!user) return
    setUploading(true)
    try {
      await user.setProfileImage({ file })
      toast.success("Profile updated", { description: "Your profile image has been updated." })
    } catch (err) {
      console.error("Upload error:", err)
      toast.error("Upload failed", { description: "Could not update profile image. Try again." })
    } finally {
      setUploading(false)
      setPreview(null)
    }
  }, [user])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Invalid format", { description: "Please use JPG, PNG, or WebP images." })
      return
    }

    if (file.size > MAX_SIZE) {
      toast.error("File too large", { description: "Maximum size is 2MB." })
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    handleUpload(file)
  }, [handleUpload])

  const handleRemove = useCallback(async () => {
    if (!user) return
    setUploading(true)
    try {
      await user.setProfileImage({ file: null })
      toast.success("Image removed", { description: "Your profile image has been removed." })
    } catch (err) {
      console.error("Remove error:", err)
      toast.error("Failed to remove image", { description: "Could not remove profile image. Try again." })
    } finally {
      setUploading(false)
      setPreview(null)
    }
  }, [user])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center">
        <div style={{ width: size, height: size }} className="rounded-full bg-muted animate-pulse" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <Avatar
          className="ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all"
          style={{ width: size, height: size }}
        >
          <AvatarImage src={currentImage ?? undefined} alt={user?.fullName ?? ""} />
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-lg font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/60 backdrop-blur-sm">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
          </div>
        )}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          aria-label="Upload profile photo"
          className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Camera className="h-4 w-4" />
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="flex items-center gap-2">
        {currentImage && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemove}
            disabled={uploading}
            className="gap-1.5"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </Button>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        JPG, PNG, or WebP. Max 2MB.
      </p>
    </div>
  )
}
