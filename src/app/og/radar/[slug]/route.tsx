import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const destination = new URL(`/og/radar-${slug}`, request.url);
  return NextResponse.redirect(destination, 308);
}
