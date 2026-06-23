"use client"

import { useState } from "react"
import Link from "next/link"
import { useSignIn } from "@clerk/nextjs"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { APP_NAME } from "@/src/lib/constants"

export default function SignInPage() {
  const { signIn, fetchStatus } = useSignIn()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!signIn || fetchStatus === "fetching") return
    setError("")
    setLoading(true)

    try {
      const createRes = await signIn.create({ identifier: email })
      if (createRes.error) {
        setError(createRes.error.longMessage || createRes.error.message || "Sign in failed.")
        setLoading(false)
        return
      }

      const passwordRes = await signIn.password({ password })
      if (passwordRes.error) {
        const code = passwordRes.error.code
        if (code === "form_password_incorrect") {
          setError("Incorrect password.")
        } else {
          setError(passwordRes.error.longMessage || passwordRes.error.message || "Sign in failed.")
        }
        setLoading(false)
        return
      }

      const finalizeRes = await signIn.finalize()
      if (finalizeRes.error) {
        setError(finalizeRes.error.longMessage || "Failed to complete sign in.")
        setLoading(false)
        return
      }
      toast.success("Welcome back!", { description: "Signed in successfully." })
      window.location.href = "/"
    } catch (err) {
      console.error("Sign-in error:", err)
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to {APP_NAME}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            autoFocus
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs text-muted-foreground hover:text-primary">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading || fetchStatus === "fetching"} size="lg">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Don&apos;t have an account?
          </span>
        </div>
      </div>

      <Button asChild variant="outline" className="w-full" size="lg">
        <Link href="/sign-up">Create account</Link>
      </Button>
    </div>
  )
}
