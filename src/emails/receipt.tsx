import { Html, Head, Body, Container, Text, Section } from "@react-email/components"

interface ReceiptEmailProps {
  amount?: string
  planName?: string
}

export default function ReceiptEmail({
  amount = "$0.00",
  planName = "Starter",
}: ReceiptEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "sans-serif", padding: 24 }}>
        <Container>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Devion</Text>
          <Text>Payment Receipt</Text>
          <Section style={{ background: "#f5f5f5", padding: 16, borderRadius: 8 }}>
            <Text>Plan: {planName}</Text>
            <Text>Amount: {amount}</Text>
          </Section>
          <Text style={{ color: "#666", fontSize: 12 }}>
            Thank you for choosing Devion.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
