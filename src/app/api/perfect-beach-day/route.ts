import { buildPerfectBeachDayResponse } from "@/lib/perfect-beach-day";
import type { PerfectBeachDayRequest } from "@/types/perfect-beach-day";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Use POST /api/perfect-beach-day with beachId and prompt.",
  });
}

export async function POST(request: Request) {
  let body: PerfectBeachDayRequest;

  try {
    body = (await request.json()) as PerfectBeachDayRequest;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body. Expected { beachId: string, prompt: string }." },
      { status: 400 },
    );
  }

  if (!body.beachId || typeof body.beachId !== "string" || !body.beachId.trim()) {
    return NextResponse.json(
      { error: "Missing or empty beachId field." },
      { status: 400 },
    );
  }

  if (!body.prompt || typeof body.prompt !== "string" || !body.prompt.trim()) {
    return NextResponse.json(
      { error: "Missing or empty prompt field." },
      { status: 400 },
    );
  }

  const beachId = body.beachId.trim();
  const prompt = body.prompt.trim();
  const response = await buildPerfectBeachDayResponse(beachId, prompt);

  if (!response) {
    return NextResponse.json(
      { error: `Unknown beachId: ${beachId}` },
      { status: 400 },
    );
  }

  return NextResponse.json(response);
}
