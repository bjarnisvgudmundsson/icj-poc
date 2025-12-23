export interface DistributionDocument {
  id: string;
  name: string;
  language: string;
  confidential?: boolean;
}

export interface RecipientDetail {
  state?: string;
  flag?: string;
  name?: string;
  role?: string;
  agent?: string;
  org?: string;
  email: string;
  status: 'read' | 'delivered' | 'sent' | 'failed';
  readAt: string | null;
  error?: string;
}

export interface Distribution {
  id: string;
  subject: string;
  type: 'external' | 'internal';
  subType: 'circular' | 'parties' | 'art63' | 'art34' | 'internal-judges' | 'internal-staff';
  caseId: string;
  caseNumber: number;
  caseTitle: string;
  conventionRef?: string;
  documents: DistributionDocument[];
  status: 'sent' | 'partial' | 'pending';
  createdBy: string;
  createdAt: string;
  sentAt: string | null;
  recipients: {
    total: number;
    sent: number;
    delivered: number;
    read: number;
    failed: number;
    excluded?: number;
  };
  excludedParties?: string[];
  recipientDetails: RecipientDetail[];
  confidential?: boolean;
}

export const MOCK_DISTRIBUTIONS: Distribution[] = [
  {
    id: 'D-047',
    subject: 'Circular notification - Institution of proceedings (Gabon v. Equatorial Guinea)',
    type: 'external',
    subType: 'circular',
    caseId: 'gg-2024-001',
    caseNumber: 187,
    caseTitle: 'Obligation to Prosecute or Extradite',
    documents: [
      { id: 'NOT-002', name: 'Circular Letter', language: 'EN' },
      { id: 'NOT-002-FR', name: 'Lettre circulaire', language: 'FR' },
      { id: 'D-001', name: 'Application (public version)', language: 'EN' }
    ],
    status: 'sent',
    createdBy: 'M. Laurent',
    createdAt: '2024-12-15T09:30:00Z',
    sentAt: '2024-12-15T10:15:00Z',
    recipients: {
      total: 193,
      sent: 193,
      delivered: 189,
      read: 156,
      failed: 4,
      excluded: 2
    },
    excludedParties: ['Gabon', 'Equatorial Guinea'],
    recipientDetails: [
      { state: 'Afghanistan', email: 'mission.afghanistan@un.int', status: 'read', readAt: '2024-12-15T14:22:00Z' },
      { state: 'Albania', email: 'mission.albania@un.int', status: 'read', readAt: '2024-12-15T11:05:00Z' },
      { state: 'Algeria', email: 'mission.algeria@un.int', status: 'delivered', readAt: null },
      { state: 'Andorra', email: 'mission.andorra@un.int', status: 'failed', readAt: null, error: 'Mailbox full' },
      { state: 'Argentina', email: 'mission.argentina@un.int', status: 'read', readAt: '2024-12-15T12:30:00Z' },
      { state: 'Australia', email: 'mission.australia@un.int', status: 'read', readAt: '2024-12-15T10:45:00Z' },
    ]
  },
  {
    id: 'D-046',
    subject: 'Order on Time-limits - Internal Distribution',
    type: 'internal',
    subType: 'internal-judges',
    caseId: 'ua-2022-001',
    caseNumber: 182,
    caseTitle: 'Allegations of Genocide',
    documents: [
      { id: 'ORD-2024-12', name: 'Order Fixing Time-limits', language: 'EN' },
      { id: 'ORD-2024-12-FR', name: 'Ordonnance fixant les délais', language: 'FR' },
      { id: 'COV-001', name: 'Cover Page', language: 'EN/FR' }
    ],
    status: 'sent',
    createdBy: 'S. Peters',
    createdAt: '2024-12-14T08:00:00Z',
    sentAt: '2024-12-14T08:30:00Z',
    recipients: {
      total: 15,
      sent: 15,
      delivered: 15,
      read: 12,
      failed: 0
    },
    recipientDetails: [
      { name: 'Judge Donoghue', role: 'President', email: 'donoghue@icj.org', status: 'read', readAt: '2024-12-14T09:15:00Z' },
      { name: 'Judge Tomka', role: 'Vice-President', email: 'tomka@icj.org', status: 'read', readAt: '2024-12-14T09:45:00Z' },
      { name: 'Judge Abraham', role: 'Judge', email: 'abraham@icj.org', status: 'read', readAt: '2024-12-14T10:20:00Z' },
      { name: 'Judge Bennouna', role: 'Judge', email: 'bennouna@icj.org', status: 'delivered', readAt: null },
      { name: 'Judge Yusuf', role: 'Judge', email: 'yusuf@icj.org', status: 'read', readAt: '2024-12-14T11:05:00Z' },
    ]
  },
  {
    id: 'D-045',
    subject: 'Memorial of South Africa - Transmission to Respondent',
    type: 'external',
    subType: 'parties',
    caseId: 'za-2024-001',
    caseNumber: 188,
    caseTitle: 'Application of the Genocide Convention (Gaza)',
    documents: [
      { id: 'MEM-001', name: 'Memorial of South Africa', language: 'EN' },
      { id: 'NOT-015', name: 'Transmittal Letter', language: 'EN' }
    ],
    status: 'sent',
    createdBy: 'M. Laurent',
    createdAt: '2024-12-12T14:00:00Z',
    sentAt: '2024-12-12T14:30:00Z',
    recipients: {
      total: 2,
      sent: 2,
      delivered: 2,
      read: 2,
      failed: 0
    },
    recipientDetails: [
      { state: 'Israel', agent: 'H.E. Mr. Gilad Erdan', email: 'agent.israel@gov.il', status: 'read', readAt: '2024-12-12T16:45:00Z' },
      { state: 'Israel', agent: 'Prof. Malcolm Shaw KC', email: 'm.shaw@counsel.com', status: 'read', readAt: '2024-12-12T15:20:00Z' }
    ]
  },
  {
    id: 'D-044',
    subject: 'Article 63 Notification - Genocide Convention',
    type: 'external',
    subType: 'art63',
    caseId: 'za-2024-001',
    caseNumber: 188,
    caseTitle: 'Application of the Genocide Convention (Gaza)',
    conventionRef: 'Convention on the Prevention and Punishment of the Crime of Genocide (1948)',
    documents: [
      { id: 'NOT-ART63', name: 'Article 63 Notification Letter', language: 'EN' },
      { id: 'NOT-ART63-FR', name: 'Notification Article 63', language: 'FR' }
    ],
    status: 'sent',
    createdBy: 'Legal Officer',
    createdAt: '2024-12-10T10:00:00Z',
    sentAt: '2024-12-10T11:00:00Z',
    recipients: {
      total: 153,
      sent: 153,
      delivered: 150,
      read: 98,
      failed: 3,
      excluded: 2
    },
    excludedParties: ['South Africa', 'Israel'],
    recipientDetails: [
      { state: 'Afghanistan', email: 'mission.afghanistan@un.int', status: 'read', readAt: '2024-12-10T13:22:00Z' },
      { state: 'Albania', email: 'mission.albania@un.int', status: 'read', readAt: '2024-12-10T12:05:00Z' },
      { state: 'Algeria', email: 'mission.algeria@un.int', status: 'delivered', readAt: null },
      { state: 'Argentina', email: 'mission.argentina@un.int', status: 'failed', readAt: null, error: 'Connection timeout' },
    ]
  },
  {
    id: 'D-043',
    subject: 'Notification to UN Secretary-General',
    type: 'external',
    subType: 'art34',
    caseId: 'ps-2023-001',
    caseNumber: 186,
    caseTitle: 'Occupied Palestinian Territory (Advisory)',
    documents: [
      { id: 'NOT-SG', name: 'Letter to Secretary-General', language: 'EN' },
      { id: 'NOT-SG-FR', name: 'Lettre au Secrétaire général', language: 'FR' }
    ],
    status: 'sent',
    createdBy: 'S. Peters',
    createdAt: '2024-12-08T09:00:00Z',
    sentAt: '2024-12-08T09:30:00Z',
    recipients: {
      total: 1,
      sent: 1,
      delivered: 1,
      read: 1,
      failed: 0
    },
    recipientDetails: [
      { name: 'UN Secretary-General', org: 'United Nations', email: 'sg@un.org', status: 'read', readAt: '2024-12-08T10:15:00Z' }
    ]
  },
  {
    id: 'D-042',
    subject: 'Draft Judgment - Confidential Distribution',
    type: 'internal',
    subType: 'internal-judges',
    caseId: 'ir-2023-002',
    caseNumber: 185,
    caseTitle: 'Certain Iranian Assets',
    documents: [
      { id: 'JUD-DRAFT', name: 'Draft Judgment (Confidential)', language: 'EN', confidential: true }
    ],
    status: 'sent',
    createdBy: 'Registry',
    createdAt: '2024-12-05T08:00:00Z',
    sentAt: '2024-12-05T08:15:00Z',
    recipients: {
      total: 15,
      sent: 15,
      delivered: 15,
      read: 15,
      failed: 0
    },
    confidential: true,
    recipientDetails: [
      { name: 'Judge Donoghue', role: 'President', email: 'donoghue@icj.org', status: 'read', readAt: '2024-12-05T09:15:00Z' },
      { name: 'Judge Tomka', role: 'Vice-President', email: 'tomka@icj.org', status: 'read', readAt: '2024-12-05T09:30:00Z' },
    ]
  },
  {
    id: 'D-041',
    subject: 'Counter-Memorial - Transmission to Applicant',
    type: 'external',
    subType: 'parties',
    caseId: 'ua-2022-001',
    caseNumber: 182,
    caseTitle: 'Allegations of Genocide',
    documents: [
      { id: 'CM-001', name: 'Counter-Memorial', language: 'EN' },
      { id: 'NOT-016', name: 'Transmittal Letter', language: 'EN' }
    ],
    status: 'partial',
    createdBy: 'M. Laurent',
    createdAt: '2024-12-01T10:00:00Z',
    sentAt: '2024-12-01T10:30:00Z',
    recipients: {
      total: 3,
      sent: 3,
      delivered: 2,
      read: 1,
      failed: 1
    },
    recipientDetails: [
      { state: 'Ukraine', agent: 'H.E. Mr. Anton Korynevych', email: 'agent.ukraine@gov.ua', status: 'read', readAt: '2024-12-01T12:15:00Z' },
      { state: 'Ukraine', agent: 'Prof. Harold Koh', email: 'h.koh@counsel.com', status: 'delivered', readAt: null },
      { state: 'Ukraine', agent: 'Dr. Marko Milanovic', email: 'm.milanovic@counsel.com', status: 'failed', readAt: null, error: 'Invalid email address' }
    ]
  }
];

export interface DistributionType {
  id: string;
  label: string;
  icon: string;
  recipients: string;
}

export const DISTRIBUTION_TYPES: DistributionType[] = [
  { id: 'circular', label: 'Circular to UN Member States', icon: 'Globe', recipients: '~193 states' },
  { id: 'parties', label: 'Parties to the Case', icon: 'Users', recipients: 'Agents & Counsel' },
  { id: 'art63', label: 'Article 63 (Convention Parties)', icon: 'FileText', recipients: 'State parties to convention' },
  { id: 'art34', label: 'Article 34 (Int\'l Organizations)', icon: 'Building', recipients: 'Specified organizations' },
  { id: 'internal-judges', label: 'Internal - Judges', icon: 'Scale', recipients: '15 Judges' },
  { id: 'internal-staff', label: 'Internal - Registry Staff', icon: 'Users', recipients: 'Selected staff' }
];
