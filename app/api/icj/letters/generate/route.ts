import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { caseId, letterType, language } = body;

  // Mock letter generation
  const draftLetter = {
    id: `letter-${Date.now()}`,
    type: letterType,
    language,
    mergeFields: {
      agentName: "H.E. Mr. Jean-Pierre Mouamba",
      caseTitle: "Gabon v. Equatorial Guinea",
      date: new Date().toLocaleDateString(),
    },
    content: `[${language}] ${letterType} Letter\n\nDear [Agent Name],\n\nRe: ${caseId}\n\n...`,
  };

  const activity = {
    id: `act-${Date.now()}`,
    type: "letter",
    title: `${letterType} letter generated`,
    subtitle: `${language} version`,
    timestamp: new Date().toISOString(),
    icon: "Mail",
  };

  return NextResponse.json({ letter: draftLetter, activity });
}
