export type CaseStatus = "Written Proceedings" | "Oral Proceedings" | "Deliberation" | "Judgment" | "Closed";
export type Language = "EN" | "FR";
export type TranslationStatus = "Translation" | "Received" | "Pending" | "Awaited" | "N/A";
export type DocumentCategory = "Key Documents" | "All Documents" | "Correspondence" | "Pleadings";
export type DeliveryStatus = "Delivered" | "Pending" | "Failed";
export type LetterType = "Acknowledgement" | "Transmittal" | "Circular" | "Reminder";
export type RecipientScope = "All States" | "Selected" | "Judges internal";
export type OcrStatus = "Complete" | "Partial" | "Not run";

export interface Party {
  role: "Applicant" | "Respondent";
  country: string;
  agent: {
    name: string;
    title: string;
    email: string;
  };
}

export interface Document {
  id: string;
  title: string;
  ref: string;
  date: string;
  pages: number;
  language: Language;
  translationStatus: TranslationStatus;
  isKey: boolean;
  category: DocumentCategory;
  annexCount?: number;
  ocrStatus?: OcrStatus;
  singlePdfWarning?: boolean;
}

export type ChecklistPhaseId = "initiation" | "procedural" | "written" | "oral" | "judgment" | "closure";
export type ChecklistItemStatus = "complete" | "partial" | "pending";
export type LanguageStatus = "complete" | "awaiting" | "na";
export type ChecklistActionKind = "generate_letter" | "create_distribution" | "file_document" | "record_event" | "open_modal";
export type EvidenceType = "document" | "distribution" | "event";

export interface ChecklistEvidence {
  id: string;
  type: EvidenceType;
  title: string;
  href: string;
  language?: Language;
  meta?: string;
  createdAt: string;
}

export interface ChecklistAction {
  id: string;
  label: string;
  kind: ChecklistActionKind;
  primary?: boolean;
  payload?: any;
}

export interface ChecklistItem {
  id: string;
  phase: ChecklistPhaseId;
  title: string;
  description?: string;
  requiredLanguages?: Language[];
  languages?: {
    en?: LanguageStatus;
    fr?: LanguageStatus;
  };
  actions: ChecklistAction[];
  evidence: ChecklistEvidence[];
  status: ChecklistItemStatus;
  dueDate?: string;
}

export interface Deadline {
  id: string;
  title: string;
  date: string;
  party: string;
}

export interface PVDecision {
  id: string;
  title: string;
  date: string;
  ref: string;
}

export interface Contact {
  id: string;
  country: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  versionHistory: {
    date: string;
    changedBy: string;
    changes: string;
  }[];
}

export interface DistributionRecipient {
  id: string;
  name: string;
  country: string;
  email: string;
  status: DeliveryStatus;
  deliveredAt?: string;
}

export interface Distribution {
  id: string;
  title: string;
  date: string;
  recipientCount: number;
  recipients: DistributionRecipient[];
  exclusions: string[];
  attachments: string[];
  fileSizeWarning?: boolean;
}

export interface IncidentalProceeding {
  type: "Provisional Measures" | "Preliminary Objections" | "Intervention" | "Counter-claim";
  status: string;
  filedDate: string;
  documents: Document[];
}

export interface ActivityItem {
  id: string;
  type: "letter" | "distribution" | "document" | "action" | "ai";
  title: string;
  subtitle?: string;
  timestamp: string;
  icon: string;
}

export type NotificationTrackType = "ART63_CONVENTIONS" | "INTERVENTION" | "INTERNAL_TASKS";
export type NotificationStatus = "open" | "waiting_response" | "complete";

export interface NotificationConvention {
  name: string;
  reference?: string;
}

export interface NotificationCourtDecision {
  pvRef?: string;
  decisionSummary?: string;
}

export interface NotificationLetter {
  id: string;
  title: string;
  language?: Language;
  date: string;
  href: string;
}

export interface NotificationResponse {
  id: string;
  from: string;
  summary: string;
  date: string;
  href?: string;
}

export interface NotificationOutstandingAction {
  id: string;
  title: string;
  due?: string;
  actionRef?: string;
}

export interface NotificationTrackRow {
  id: string;
  trackType: NotificationTrackType;
  conventions: NotificationConvention[];
  registryRecommendation: string;
  courtDecision: NotificationCourtDecision;
  lettersSent: NotificationLetter[];
  responsesReceived: NotificationResponse[];
  outstandingActions: NotificationOutstandingAction[];
  status: NotificationStatus;
  lastUpdated: string;
}

export interface CaseFolderNode {
  id: string;
  title: string;
  documentIds: string[];
  children?: CaseFolderNode[];
}

export interface Case {
  id: string;
  title: string;
  shortTitle: string;
  status: CaseStatus;
  dateFiled: string;
  basisOfJurisdiction: string;
  president: string;
  principalLegalOfficer: string;
  documentCount: number;
  nextDeadline?: string;
  parties: Party[];
  documents: Document[];
  checklist: ChecklistItem[];
  deadlines: Deadline[];
  pvDecisions: PVDecision[];
  distributions: Distribution[];
  incidentalProceedings: IncidentalProceeding[];
  recentActivity: ActivityItem[];
  notifications: NotificationTrackRow[];
  caseFolderStructure: CaseFolderNode[];
}
