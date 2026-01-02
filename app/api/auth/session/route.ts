import { getAuthSession } from "@/auth";

export async function GET() {
  const session = await getAuthSession();
  return new Response(JSON.stringify(session), {
    headers: { "Content-Type": "application/json" },
  });
}
