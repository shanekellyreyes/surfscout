import { buildSeededResearchResponse } from "@/lib/seeded-research";
import type { ResearchRequestBody } from "@/types/research";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Use POST /api/research with a beachId.",
  });
}

export async function POST(request: Request) {
  let body: ResearchRequestBody;

  try {
    body = (await request.json()) as ResearchRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body. Expected { beachId: string }." },
      { status: 400 },
    );
  }

  if (!body.beachId || typeof body.beachId !== "string" || !body.beachId.trim()) {
    return NextResponse.json(
      { error: "Missing or empty beachId field." },
      { status: 400 },
    );
  }

  const beachId = body.beachId.trim();
  const response = buildSeededResearchResponse(beachId);

  if (!response) {
    return NextResponse.json(
      { error: `Unknown beachId: ${beachId}` },
      { status: 400 },
    );
  }

  return NextResponse.json(response);
}
