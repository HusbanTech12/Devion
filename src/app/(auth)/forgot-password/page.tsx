"use client"

import { useState } from "react"
import Link from "next/link"
import { useSignIn } from "@clerk/nextjs"
import { isClerkAPIResponseError } from "@clerk/nextjs/errors"
import { toast } from "sonner"
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { APP_NAME } from "@/src/lib/constants"

type Step = "email" | "code" | "new-password" | "done"

export default function ForgotPasswordPage() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [step, setStep] = useState<Step>("email")
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault()
    if (!isLoaded || !signIn) return
    setError("")
    setLoading(true)

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      setStep("code")
      toast.success("Code sent!", { description: "Check your email for the reset code." })
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const clerkErr = err.errors?.[0]
        if (clerkErr?.code === "form_identifier_not_found") {
          setError("No account found with this email address.")
        } else {
          setError(clerkErr?.longMessage || "Failed to send reset code.")
        }
      } else {
        setError("Something went wrong. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault()
    if (!isLoaded || !signIn) return
    setError("")
    setLoading(true)

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
      })

      if (result.status === "complete" || result.status === "needs_second_factor") {
        setStep("new-password")
      } else {
        setError("Invalid code. Please try again.")
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        const clerkErr = err.errors?.[0]
        if (clerkErr?.code === "form_code_incorrect") {
          setError("Incorrect code. Please try again.")
        } else {
          setError(clerkErr?.longMessage || "Failed to verify code.")
        }
      } else {
        setError("Something went wrong. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault()
    if (!isLoaded || !signIn) return
    setError("")

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)

    try {
      const result = await signIn.resetPassword({ password })

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId })
        setStep("done")
        toast.success("Password reset!", { description: "You are now signed in." })
      } else {
        setError("Something went wrong. Please try again.")
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setError(err.errors?.[0]?.longMessage || "Failed to reset password.")
      } else {
        setError("Something went wrong. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  function resendCode() {
    setCode("")
    setError("")
    handleSendCode({ preventDefault: () => {} } as React.FormEvent)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">Reset password</h1>
        <p className="text-sm text-muted-foreground">
          {step === "email" && `Send a reset code to your email`}
          {step === "code" && `Enter the code sent to ${email}`}
          {step === "new-password" && "Choose a new password"}
          {step === "done" && "Password reset successfully"}
        </p>
      </div>

      {step === "email" && (
        <form onSubmit={handleSendCode} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading} size="lg">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Sending..." : "Send reset code"}
          </Button>

          <Button asChild variant="link" className="w-full" size="sm">
            <Link href="/sign-in">
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to sign in
            </Link>
          </Button>
        </form>
      )}

      {step === "code" && (
        <form onSubmit={handleVerifyCode} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Verification code</Label>
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              required
              autoFocus
              maxLength={6}
              className="text-center text-lg tracking-[0.5em]"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading || code.length !== 6} size="lg">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Verifying..." : "Verify code"}
          </Button>

          <div className="flex items-center justify-between">
            <Button variant="link" size="sm" onClick={resendCode} disabled={loading}>
              Resend code
            </Button>
            <Button variant="link" size="sm" onClick={() => setStep("email")} disabled={loading}>
              Change email
            </Button>
          </div>
        </form>
      )}

      {step === "new-password" && (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New password</Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Repeat your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading} size="lg">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Resetting..." : "Reset password"}
          </Button>
        </form>
      )}

      {step === "done" && (
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground">
            Your password has been reset. You are now signed in to {APP_NAME}.
          </p>
          <Button asChild className="w-full" size="lg">
            <Link href="/dashboard">Go to dashboard</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
