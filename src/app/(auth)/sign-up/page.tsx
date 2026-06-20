"use client"

import { useState } from "react"
import Link from "next/link"
import { useSignUp } from "@clerk/nextjs"
import { toast } from "sonner"
import { Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { APP_NAME } from "@/src/lib/constants"

export default function SignUpPage() {
  const { signUp } = useSignUp()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [verifying, setVerifying] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!signUp) return
    setError("")
    setLoading(true)

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName: name.split(" ")[0],
        lastName: name.split(" ").slice(1).join(" ") || undefined,
      })

      if (result.error) {
        setError(result.error.message || "Something went wrong")
        return
      }

      if (signUp.status === "complete") {
        await signUp.finalize()
        toast.success("Account created!", { description: "Welcome to Devion." })
        window.location.href = "/dashboard"
        return
      }

      const { error: sendErr } = await signUp.verifications.sendEmailCode()
      if (sendErr) {
        setError(sendErr.message || "Failed to send verification code")
        return
      }
      setVerifying(true)
      toast.success("Verification code sent", { description: "Check your email inbox." })
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    if (!signUp || code.length < 6) return
    setError("")
    setLoading(true)

    try {
      const { error: verifyErr } = await signUp.verifications.verifyEmailCode({ code })
      if (verifyErr) {
        setError(verifyErr.message || "Invalid code")
        return
      }

      await signUp.finalize()
      toast.success("Account created!", { description: "Welcome to Devion." })
      window.location.href = "/dashboard"
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (verifying) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setVerifying(false)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>
          <p className="text-sm text-muted-foreground">
            We sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Verification code</Label>
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              placeholder="000000"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              required
              autoFocus
              className="text-center text-lg tracking-[0.5em]"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive text-center">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading || code.length < 6}
            size="lg"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Verifying..." : "Verify email"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
              onClick={async () => {
                const { error: sendErr } = await signUp!.verifications.sendEmailCode()
                if (sendErr) {
                  setError(sendErr.message)
                } else {
                  toast.success("Code resent", { description: "Check your email." })
                }
              }}
            >
              Resend code
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Get started with {APP_NAME} — free forever
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            autoFocus
          />
        </div>
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
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        <div id="clerk-captcha" />

        {error && (
          <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading} size="lg">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Already have an account?</span>
        </div>
      </div>

      <Button asChild variant="outline" className="w-full" size="lg">
        <Link href="/sign-in">Sign in</Link>
      </Button>
    </div>
  )
}
