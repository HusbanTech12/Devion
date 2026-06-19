export async function POST(req: Request) {
  const payload = await req.json()
  return Response.json({ received: true })
}
