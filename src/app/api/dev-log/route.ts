// app/api/dev-log/route.ts
export async function POST(request: Request) {
  const { message } = await request.json();
  console.log('🦄 [CLIENT-LOG]:', message); // Muncul di terminal
  return Response.json({ success: true });
}