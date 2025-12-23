import { NextRequest, NextResponse } from "next/server";
import { getCaseById } from "@/lib/icj-mock";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const caseData = getCaseById(id);

  if (!caseData) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 });
  }

  return NextResponse.json(caseData);
}
