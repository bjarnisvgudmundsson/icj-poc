import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { caseId, documentId } = body;

  // Mock AI summary
  const summary = {
    id: `summary-${Date.now()}`,
    summary:
      "The Application concerns a dispute between Gabon and Equatorial Guinea regarding the obligation to prosecute or extradite under the Convention against Torture. Gabon requests the Court to adjudge that Equatorial Guinea has failed to comply with its obligations under Article 7 of the Convention.",
    extractedDates: [
      { label: "Application filed", date: "2024-03-15" },
      { label: "Memorial due", date: "2024-09-15" },
      { label: "Counter-Memorial due", date: "2025-02-28" },
    ],
    extractedParties: [
      { role: "Applicant", country: "Gabon", agent: "H.E. Mr. Jean-Pierre Mouamba" },
      {
        role: "Respondent",
        country: "Equatorial Guinea",
        agent: "H.E. Ms. Maria Estefania Nguema",
      },
    ],
    missingSteps: [
      { step: "Time-limits fixed by Order", reason: "Awaiting presidential order" },
      {
        step: "Track delivery confirmations",
        reason: "5 states have not confirmed receipt",
      },
    ],
    citations: [
      { documentId: "d1", page: 3, text: "Article 7 obligations..." },
      { documentId: "d1", page: 12, text: "Request for adjudication..." },
    ],
  };

  const activity = {
    id: `act-${Date.now()}`,
    type: "ai",
    title: "AI summary generated",
    subtitle: "Extracted dates, parties, and missing steps",
    timestamp: new Date().toISOString(),
    icon: "Sparkles",
  };

  return NextResponse.json({ summary, activity });
}
