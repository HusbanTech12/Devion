import { Html, Head, Body, Container, Text, Link, Section } from "@react-email/components"

interface InvitationEmailProps {
  inviterName?: string
  inviteLink?: string
}

export default function InvitationEmail({
  inviterName = "A team member",
  inviteLink = "https://devion.ai/invite",
}: InvitationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "sans-serif", padding: 24 }}>
        <Container>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Devion</Text>
          <Text>You&apos;ve been invited!</Text>
          <Text>
            {inviterName} has invited you to join their team on Devion.
          </Text>
          <Section>
            <Link
              href={inviteLink}
              style={{
                background: "#4F7CFF",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              Accept Invitation
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
