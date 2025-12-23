export type UserRole = 'Agent' | 'Co-Agent' | 'Counsel';
export type CaseRole = 'Applicant' | 'Respondent' | 'Article 63 Intervener';
export type CasePhase = 'Written Proceedings' | 'Oral Proceedings' | 'Deliberation' | 'Merits';
export type NotificationType = 'order' | 'transmission' | 'circular' | 'letter';
export type NotificationStatus = 'unread' | 'read' | 'acknowledged';
export type DocumentType = 'Order' | 'Pleading' | 'Correspondence';
export type FilingType = 'Memorial' | 'Counter-Memorial' | 'Reply' | 'Rejoinder' | 'Letter/Request' | 'Evidence/Annex';
export type Language = 'en' | 'fr';

export interface ExternalUser {
  id: string;
  name: string;
  role: string;
  email: string;
  country: string;
  countryCode: string;
}

export interface ExternalCase {
  id: number;
  caseNumber: string;
  generalList: string;
  shortTitle: string;
  fullTitle: string;
  role: CaseRole;
  phase: CasePhase;
  nextDeadline: {
    date: string;
    label: string;
  };
  unreadDocs: number;
  pendingActions: number;
}

export interface ExternalNotification {
  id: number;
  type: NotificationType;
  title: string;
  caseId: number | null;
  date: string;
  status: NotificationStatus;
  urgent: boolean;
  content?: string;
  attachments?: ExternalAttachment[];
}

export interface ExternalAttachment {
  id: string;
  name: string;
  size: string;
  language: string;
}

export interface ExternalDeadline {
  id: number;
  caseId: number;
  label: string;
  date: string;
  daysRemaining: number;
  party: string;
}

export interface ExternalDocument {
  id: number;
  type: DocumentType;
  title: string;
  date: string;
  languages: string[];
  caseId: number;
  isNew: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  avatar?: string;
}
