import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { caseId, itemId, action } = body;

  // Mock execution based on action kind
  let evidence = null;
  let activity = null;

  const timestamp = new Date().toISOString();

  switch (action.kind) {
    case "generate_letter":
      evidence = {
        id: `ev-${Date.now()}`,
        type: "document",
        title: `${action.payload?.letterType || "Letter"}-${Math.floor(Math.random() * 1000)}`,
        href: `/icj/cases/${caseId}/documents/doc-${Date.now()}`,
        language: action.payload?.language || "EN",
        createdAt: timestamp,
      };
      activity = {
        id: `act-${Date.now()}`,
        type: "letter",
        title: `${action.payload?.letterType} letter generated`,
        subtitle: `${action.payload?.language} version`,
        timestamp,
        icon: "Mail",
      };
      break;

    case "create_distribution":
      evidence = {
        id: `ev-${Date.now()}`,
        type: "distribution",
        title: `D-${Math.floor(Math.random() * 1000)}`,
        href: `/icj/cases/${caseId}/distributions/dist-${Date.now()}`,
        language: action.payload?.language,
        meta: action.payload?.scope === "All States" ? "191/191" : "Delivered",
        createdAt: timestamp,
      };
      activity = {
        id: `act-${Date.now()}`,
        type: "distribution",
        title: "Distribution created",
        subtitle: action.payload?.scope || "Recipients notified",
        timestamp,
        icon: "Send",
      };
      break;

    case "file_document":
      evidence = {
        id: `ev-${Date.now()}`,
        type: "document",
        title: `${action.payload?.documentType || "DOC"}-${Math.floor(Math.random() * 1000)}`,
        href: `/icj/cases/${caseId}/documents/doc-${Date.now()}`,
        createdAt: timestamp,
      };
      activity = {
        id: `act-${Date.now()}`,
        type: "document",
        title: "Document filed",
        subtitle: action.payload?.documentType || "New document",
        timestamp,
        icon: "FileText",
      };
      break;

    case "record_event":
      evidence = {
        id: `ev-${Date.now()}`,
        type: "event",
        title: action.payload?.eventType || "Event recorded",
        href: `/icj/cases/${caseId}/events/event-${Date.now()}`,
        createdAt: timestamp,
      };
      activity = {
        id: `act-${Date.now()}`,
        type: "action",
        title: "Event recorded",
        subtitle: action.payload?.eventType || "Case event",
        timestamp,
        icon: "CheckCircle2",
      };
      break;

    default:
      evidence = {
        id: `ev-${Date.now()}`,
        type: "event",
        title: "Action completed",
        href: `/icj/cases/${caseId}/events/event-${Date.now()}`,
        createdAt: timestamp,
      };
      activity = {
        id: `act-${Date.now()}`,
        type: "action",
        title: action.label,
        subtitle: "Completed",
        timestamp,
        icon: "CheckCircle2",
      };
  }

  return NextResponse.json({ evidence, activity });
}
