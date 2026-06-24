export async function POST(req: Request) {
  await req.json()
  return Response.json({ received: true })
}
