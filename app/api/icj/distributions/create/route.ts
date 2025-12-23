import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { caseId, scope, attachments } = body;

  const recipientCount = scope === "All States" ? 191 : scope === "Selected" ? 25 : 15;

  const distribution = {
    id: `dist-${Date.now()}`,
    title: "New distribution",
    date: new Date().toISOString(),
    recipientCount,
    scope,
    attachments,
    deliveryTracking: {
      delivered: 0,
      pending: recipientCount,
      failed: 0,
    },
  };

  const activity = {
    id: `act-${Date.now()}`,
    type: "distribution",
    title: "Distribution created",
    subtitle: `${recipientCount} recipients`,
    timestamp: new Date().toISOString(),
    icon: "Send",
  };

  return NextResponse.json({ distribution, activity });
}
