import { buildMockAskResponse } from "@/lib/mock-ask";
import type { AskRequestBody } from "@/types/surfscout";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: AskRequestBody;

  try {
    body = (await request.json()) as AskRequestBody;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body. Expected { message: string }." },
      { status: 400 },
    );
  }

  if (!body.message || typeof body.message !== "string" || !body.message.trim()) {
    return NextResponse.json(
      { error: "Missing or empty message field." },
      { status: 400 },
    );
  }

  const response = buildMockAskResponse(body.message.trim());

  return NextResponse.json(response);
}
