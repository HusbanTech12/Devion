import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Link,
  Section,
} from "@react-email/components"

interface WelcomeEmailProps {
  name?: string
}

export default function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "sans-serif", padding: 24 }}>
        <Container>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Devion</Text>
          <Text>Welcome{name ? `, ${name}` : ""}!</Text>
          <Text>
            We&apos;re excited to have you onboard. Start building intelligent
            systems with Devion.
          </Text>
          <Section>
            <Link
              href="https://devion.ai/dashboard"
              style={{
                background: "#4F7CFF",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: 8,
                textDecoration: "none",
              }}
            >
              Go to Dashboard
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}
