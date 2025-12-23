import type { ChecklistItem } from "./types";

export const initiationChecklist: ChecklistItem[] = [
  {
    id: "init-1",
    phase: "initiation",
    title: "Register filing in case management system",
    description: "Initial registration of application",
    actions: [
      {
        id: "init-1-a1",
        label: "Record registration",
        kind: "record_event",
        primary: true,
        payload: { eventType: "registration" },
      },
    ],
    evidence: [
      {
        id: "ev-init-1-1",
        type: "event",
        title: "General List entry created",
        href: "/icj/cases/gg-2024-001/events/reg-001",
        createdAt: "2024-03-15T10:00:00Z",
      },
    ],
    status: "complete",
  },
  {
    id: "init-2",
    phase: "initiation",
    title: "Send acknowledgement to Applicant",
    description: "Formal acknowledgement letter sent",
    requiredLanguages: ["EN", "FR"],
    languages: { en: "complete", fr: "awaiting" },
    actions: [
      {
        id: "init-2-a1",
        label: "Generate acknowledgement (EN)",
        kind: "generate_letter",
        primary: true,
        payload: { letterType: "Acknowledgement", language: "EN", recipient: "Applicant" },
      },
      {
        id: "init-2-a2",
        label: "Generate acknowledgement (FR)",
        kind: "generate_letter",
        payload: { letterType: "Acknowledgement", language: "FR", recipient: "Applicant" },
      },
    ],
    evidence: [
      {
        id: "ev-init-2-1",
        type: "document",
        title: "ACK-001",
        href: "/icj/cases/gg-2024-001/documents/d6",
        language: "EN",
        createdAt: "2024-03-16T09:00:00Z",
      },
    ],
    status: "partial",
  },
  {
    id: "init-3",
    phase: "initiation",
    title: "Transmit application to Respondent",
    description: "Official notification sent to Respondent",
    requiredLanguages: ["EN"],
    languages: { en: "complete" },
    actions: [
      {
        id: "init-3-a1",
        label: "Generate transmittal",
        kind: "generate_letter",
        primary: true,
        payload: { letterType: "Transmittal", language: "EN", recipient: "Respondent" },
      },
      {
        id: "init-3-a2",
        label: "Create delivery",
        kind: "create_distribution",
        payload: { scope: "Respondent", language: "EN" },
      },
    ],
    evidence: [
      {
        id: "ev-init-3-1",
        type: "document",
        title: "NOT-003",
        href: "/icj/cases/gg-2024-001/documents/d7",
        language: "EN",
        createdAt: "2024-03-18T10:00:00Z",
      },
      {
        id: "ev-init-3-2",
        type: "distribution",
        title: "D-001",
        href: "/icj/cases/gg-2024-001/distributions/dist1",
        meta: "Delivered",
        createdAt: "2024-03-18T10:30:00Z",
      },
    ],
    status: "complete",
  },
  {
    id: "init-4",
    phase: "initiation",
    title: "Circular notification to UN Member States",
    description: "Distribute to 193 states, excluding parties",
    requiredLanguages: ["EN", "FR"],
    languages: { en: "complete", fr: "awaiting" },
    actions: [
      {
        id: "init-4-a1",
        label: "Create circular (EN)",
        kind: "create_distribution",
        primary: true,
        payload: { scope: "All States", language: "EN", excludeParties: true },
      },
      {
        id: "init-4-a2",
        label: "Create circular (FR)",
        kind: "create_distribution",
        payload: { scope: "All States", language: "FR", excludeParties: true },
      },
    ],
    evidence: [
      {
        id: "ev-init-4-1",
        type: "document",
        title: "NOT-002",
        href: "/icj/cases/gg-2024-001/documents/d8",
        language: "EN",
        createdAt: "2024-03-20T09:00:00Z",
      },
      {
        id: "ev-init-4-2",
        type: "distribution",
        title: "D-002",
        href: "/icj/cases/gg-2024-001/distributions/dist2",
        language: "EN",
        meta: "189/191",
        createdAt: "2024-03-20T10:00:00Z",
      },
      {
        id: "ev-init-4-3",
        type: "document",
        title: "NOT-002",
        href: "/icj/cases/gg-2024-001/documents/d9",
        language: "FR",
        createdAt: "2024-03-27T09:00:00Z",
      },
      {
        id: "ev-init-4-4",
        type: "distribution",
        title: "D-003",
        href: "/icj/cases/gg-2024-001/distributions/dist3",
        language: "FR",
        meta: "191/191",
        createdAt: "2024-03-27T10:00:00Z",
      },
    ],
    status: "partial",
  },
  {
    id: "init-5",
    phase: "initiation",
    title: "Notify UN Secretary-General",
    description: "Formal notification per ICJ Statute",
    requiredLanguages: ["EN", "FR"],
    languages: { en: "complete", fr: "complete" },
    actions: [
      {
        id: "init-5-a1",
        label: "Generate SG letter (EN)",
        kind: "generate_letter",
        primary: true,
        payload: { letterType: "UN Secretary-General", language: "EN" },
      },
      {
        id: "init-5-a2",
        label: "Generate SG letter (FR)",
        kind: "generate_letter",
        payload: { letterType: "UN Secretary-General", language: "FR" },
      },
    ],
    evidence: [
      {
        id: "ev-init-5-1",
        type: "document",
        title: "NOT-001",
        href: "/icj/cases/gg-2024-001/documents/not-001-en",
        language: "EN",
        createdAt: "2024-03-16T14:00:00Z",
      },
      {
        id: "ev-init-5-2",
        type: "document",
        title: "NOT-001",
        href: "/icj/cases/gg-2024-001/documents/not-001-fr",
        language: "FR",
        createdAt: "2024-03-22T14:00:00Z",
      },
    ],
    status: "complete",
  },
  {
    id: "init-6",
    phase: "initiation",
    title: "Generate internal distribution cover pages",
    description: "Bilingual cover pages for judges",
    requiredLanguages: ["EN", "FR"],
    languages: { en: "complete", fr: "complete" },
    actions: [
      {
        id: "init-6-a1",
        label: "Create cover pages",
        kind: "file_document",
        primary: true,
        payload: { documentType: "Cover Page", bilingual: true },
      },
    ],
    evidence: [
      {
        id: "ev-init-6-1",
        type: "document",
        title: "Cover Page",
        href: "/icj/cases/gg-2024-001/documents/cover-en",
        language: "EN",
        createdAt: "2024-03-17T09:00:00Z",
      },
      {
        id: "ev-init-6-2",
        type: "document",
        title: "Cover Page",
        href: "/icj/cases/gg-2024-001/documents/cover-fr",
        language: "FR",
        createdAt: "2024-03-17T09:05:00Z",
      },
    ],
    status: "complete",
  },
  {
    id: "init-7",
    phase: "initiation",
    title: "Publish press release",
    description: "Public announcement of case filing",
    actions: [
      {
        id: "init-7-a1",
        label: "File press release",
        kind: "file_document",
        primary: true,
        payload: { documentType: "Press Release" },
      },
    ],
    evidence: [
      {
        id: "ev-init-7-1",
        type: "document",
        title: "PR-001",
        href: "/icj/cases/gg-2024-001/documents/d10",
        createdAt: "2024-03-15T16:00:00Z",
      },
    ],
    status: "complete",
  },
  {
    id: "init-8",
    phase: "initiation",
    title: "Time-limits fixed by Order",
    description: "President issues procedural order",
    actions: [
      {
        id: "init-8-a1",
        label: "Record Order",
        kind: "file_document",
        primary: true,
        payload: { documentType: "Order" },
      },
    ],
    evidence: [],
    status: "pending",
    dueDate: "2024-12-20",
  },
  {
    id: "init-9",
    phase: "initiation",
    title: "Track delivery confirmations from all States",
    description: "Monitor and follow up on undelivered notifications",
    actions: [
      {
        id: "init-9-a1",
        label: "Review delivery status",
        kind: "open_modal",
        primary: true,
        payload: { modalType: "delivery_tracking" },
      },
    ],
    evidence: [],
    status: "partial",
  },
];

export const proceduralChecklist: ChecklistItem[] = [
  {
    id: "proc-1",
    phase: "procedural",
    title: "Agents appointed",
    description: "Official agent appointments received and recorded",
    actions: [
      {
        id: "proc-1-a1",
        label: "Record appointments",
        kind: "record_event",
        primary: true,
      },
    ],
    evidence: [],
    status: "pending",
  },
  {
    id: "proc-2",
    phase: "procedural",
    title: "Procedural meeting scheduled",
    description: "Initial procedural meeting with parties",
    actions: [
      {
        id: "proc-2-a1",
        label: "Schedule meeting",
        kind: "record_event",
        primary: true,
      },
    ],
    evidence: [],
    status: "pending",
  },
  {
    id: "proc-3",
    phase: "procedural",
    title: "Time-limits fixed by Order",
    description: "President issues Order fixing time-limits for pleadings",
    requiredLanguages: ["EN", "FR"],
    actions: [
      {
        id: "proc-3-a1",
        label: "File Order",
        kind: "file_document",
        primary: true,
      },
    ],
    evidence: [],
    status: "pending",
  },
];

export const writtenChecklist: ChecklistItem[] = [
  {
    id: "written-1",
    phase: "written",
    title: "Memorial pending (reminders)",
    description: "Monitor Memorial deadline and send reminders",
    actions: [
      {
        id: "written-1-a1",
        label: "Send reminder",
        kind: "generate_letter",
        primary: true,
      },
    ],
    evidence: [],
    status: "pending",
  },
  {
    id: "written-2",
    phase: "written",
    title: "Memorial filed (transmittal)",
    description: "Transmit Memorial to Respondent",
    requiredLanguages: ["EN"],
    actions: [
      {
        id: "written-2-a1",
        label: "Create transmittal",
        kind: "create_distribution",
        primary: true,
      },
    ],
    evidence: [],
    status: "pending",
  },
  {
    id: "written-3",
    phase: "written",
    title: "Counter-Memorial pending",
    description: "Monitor Counter-Memorial deadline",
    actions: [
      {
        id: "written-3-a1",
        label: "Track deadline",
        kind: "open_modal",
        primary: true,
      },
    ],
    evidence: [],
    status: "pending",
  },
];

export const oralChecklist: ChecklistItem[] = [
  {
    id: "oral-1",
    phase: "oral",
    title: "Oral phase scheduled (Order + timetable)",
    description: "President issues Order scheduling oral proceedings",
    requiredLanguages: ["EN", "FR"],
    actions: [
      {
        id: "oral-1-a1",
        label: "File scheduling Order",
        kind: "file_document",
        primary: true,
      },
    ],
    evidence: [],
    status: "pending",
  },
  {
    id: "oral-2",
    phase: "oral",
    title: "Daily CR generated",
    description: "Verbatim records (CR) produced daily",
    actions: [
      {
        id: "oral-2-a1",
        label: "Generate CR",
        kind: "file_document",
        primary: true,
      },
    ],
    evidence: [],
    status: "pending",
  },
  {
    id: "oral-3",
    phase: "oral",
    title: "Oral phase closed",
    description: "Proceedings declared closed, case under deliberation",
    actions: [
      {
        id: "oral-3-a1",
        label: "Record closure",
        kind: "record_event",
        primary: true,
      },
    ],
    evidence: [],
    status: "pending",
  },
];

export const judgmentChecklist: ChecklistItem[] = [
  {
    id: "judgment-1",
    phase: "judgment",
    title: "Under deliberation",
    description: "Case under deliberation by the Court",
    actions: [
      {
        id: "judgment-1-a1",
        label: "Mark as deliberating",
        kind: "record_event",
        primary: true,
      },
    ],
    evidence: [],
    status: "pending",
  },
  {
    id: "judgment-2",
    phase: "judgment",
    title: "Judgment scheduled",
    description: "Public reading of judgment scheduled",
    actions: [
      {
        id: "judgment-2-a1",
        label: "Schedule judgment",
        kind: "record_event",
        primary: true,
      },
    ],
    evidence: [],
    status: "pending",
  },
  {
    id: "judgment-3",
    phase: "judgment",
    title: "Judgment delivered (distribution)",
    description: "Judgment delivered and distributed to parties and states",
    requiredLanguages: ["EN", "FR"],
    actions: [
      {
        id: "judgment-3-a1",
        label: "Distribute judgment",
        kind: "create_distribution",
        primary: true,
      },
    ],
    evidence: [],
    status: "pending",
  },
];

export const closureChecklist: ChecklistItem[] = [
  {
    id: "closure-1",
    phase: "closure",
    title: "Archive case",
    description: "Move case files to archives",
    actions: [
      {
        id: "closure-1-a1",
        label: "Archive case",
        kind: "record_event",
        primary: true,
      },
    ],
    evidence: [],
    status: "pending",
  },
  {
    id: "closure-2",
    phase: "closure",
    title: "Publications completed",
    description: "All official publications finalized",
    actions: [
      {
        id: "closure-2-a1",
        label: "Confirm publications",
        kind: "record_event",
        primary: true,
      },
    ],
    evidence: [],
    status: "pending",
  },
];

export function getAllChecklists(): Record<string, ChecklistItem[]> {
  return {
    initiation: initiationChecklist,
    procedural: proceduralChecklist,
    written: writtenChecklist,
    oral: oralChecklist,
    judgment: judgmentChecklist,
    closure: closureChecklist,
  };
}
