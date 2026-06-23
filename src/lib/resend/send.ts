import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

type SendEmailParams = {
  to: string | string[]
  subject: string
  react: React.ReactElement
  from?: string
}

export async function sendEmail({ to, subject, react, from }: SendEmailParams) {
  const { data, error } = await resend.emails.send({
    from: from ?? "Devion <husbantech08@gmail.com>",
    to: Array.isArray(to) ? to : [to],
    subject,
    react,
  })

  if (error) {
    console.error("Resend error:", error)
    throw new Error(error.message)
  }

  return data
}
