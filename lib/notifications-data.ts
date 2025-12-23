export interface NotificationType {
  label: string;
  icon: string;
  color: string;
}

export const NOTIFICATION_TYPES: Record<string, NotificationType> = {
  order: { label: 'Order', icon: 'Gavel', color: '#3b82f6' },
  pv: { label: 'Procès-Verbal', icon: 'FileText', color: '#8b5cf6' },
  circular: { label: 'Circular', icon: 'Globe', color: '#10b981' },
  letter: { label: 'Letter', icon: 'Mail', color: '#f59e0b' },
  pleading: { label: 'Pleading', icon: 'FileText', color: '#6366f1' },
  judgment: { label: 'Judgment', icon: 'Scale', color: '#dc2626' },
  agenda: { label: 'Meeting Agenda', icon: 'Calendar', color: '#0ea5e9' },
  internal: { label: 'Internal Note', icon: 'FileText', color: '#6b7280' }
};

export const PRIORITY_LEVELS = {
  urgent: { label: 'Urgent', color: '#dc2626' },
  high: { label: 'High Priority', color: '#f59e0b' },
  normal: { label: 'Normal', color: '#6b7280' }
};

export interface Attachment {
  id: string;
  name: string;
  language: string;
  type: string;
  pages: number;
  size: string;
  url?: string;
  confidential?: boolean;
}

export interface LetterPreview {
  heading?: string;
  title?: string;
  subtitle?: string;
  body: string;
  signature?: string;
  date?: string;
}

export interface Notification {
  id: string;
  type: keyof typeof NOTIFICATION_TYPES;
  priority: keyof typeof PRIORITY_LEVELS;
  status: 'unread' | 'read' | 'acknowledged';

  subject: string;
  summary: string;

  transmittedAt: string;
  transmittedBy: {
    name: string;
    department: string;
    signedBy?: string;
  };

  relatedCase?: {
    id: string;
    number: number;
    shortTitle: string;
    parties: string;
  } | null;

  relatedMeeting?: {
    id: string;
    date: string;
    type: string;
  } | null;

  letterPreview?: LetterPreview;
  attachments: Attachment[];

  requiresAction?: boolean;
  actionRequired?: string;

  hasConfidentialSections?: boolean;

  readAt?: string | null;
  acknowledgedAt?: string | null;
  acknowledgedBy?: string | null;
}

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-001',
    type: 'order',
    priority: 'high',
    status: 'unread',

    subject: 'Order Fixing Time-Limits for Written Proceedings',
    summary: 'Time-limits fixed: Memorial by Feb 28, 2026; Counter-Memorial by Aug 28, 2026',

    transmittedAt: '2025-12-17T10:15:00Z',
    transmittedBy: {
      name: 'Registry',
      department: 'Legal Department',
      signedBy: 'Philippe Gautier, Registrar'
    },

    relatedCase: {
      id: 'gg-2024-001',
      number: 187,
      shortTitle: 'Obligation to Prosecute or Extradite',
      parties: 'Gabon v. Equatorial Guinea'
    },

    letterPreview: {
      heading: 'INTERNATIONAL COURT OF JUSTICE',
      title: 'ORDER',
      subtitle: 'Fixing Time-Limits for Written Proceedings',
      body: `The Court,

Having regard to Article 48 of the Statute of the Court and to Article 44 of the Rules of Court,

Having regard to the Application filed by the Republic of Gabon on 15 March 2024,

Makes the following Order:

The time-limits for the filing of the written pleadings are fixed as follows:

• For the Memorial of Gabon: 28 February 2026
• For the Counter-Memorial of Equatorial Guinea: 28 August 2026

Reserved the subsequent procedure for further decision.`,
      signature: 'Joan E. DONOGHUE\nPresident',
      date: '17 December 2025'
    },

    attachments: [
      {
        id: 'att-001',
        name: 'Order Fixing Time-Limits',
        language: 'EN',
        type: 'pdf',
        pages: 2,
        size: '124 KB',
        url: '/documents/order-187-time-limits-en.pdf'
      },
      {
        id: 'att-002',
        name: 'Ordonnance fixant les délais',
        language: 'FR',
        type: 'pdf',
        pages: 2,
        size: '128 KB',
        url: '/documents/order-187-time-limits-fr.pdf'
      },
      {
        id: 'att-003',
        name: 'Cover Page',
        language: 'EN/FR',
        type: 'pdf',
        pages: 1,
        size: '45 KB',
        url: '/documents/cover-187-order.pdf'
      }
    ],

    readAt: null,
    acknowledgedAt: null,
    acknowledgedBy: null
  },
  {
    id: 'notif-002',
    type: 'pv',
    priority: 'normal',
    status: 'unread',

    subject: 'PV 2024/24 — Administrative Meeting of 11 December 2025',
    summary: 'Minutes of the administrative meeting including decisions on time-limits and extension requests',

    transmittedAt: '2025-12-16T14:30:00Z',
    transmittedBy: {
      name: 'Registry',
      department: 'Registry'
    },

    relatedCase: null,
    relatedMeeting: {
      id: 'mtg-2024-047',
      date: '2025-12-11',
      type: 'administrative'
    },

    letterPreview: {
      heading: 'INTERNATIONAL COURT OF JUSTICE',
      title: 'PROCÈS-VERBAL',
      subtitle: 'Administrative Meeting No. 2024/24',
      body: `Meeting held on 11 December 2025 at 10:00 a.m.

Present: All Members of the Court except Judge Xue (excused)

AGENDA:
1. Approval of PV 2024/23
2. Time-limits for Case No. 187
3. Extension request for Case No. 182
4. [Restricted: Personnel matters]

DECISIONS:
The Court approved the time-limits for Case No. 187 as proposed by the Registry.
The Court granted a 3-month extension for the Counter-Memorial in Case No. 182.`,
      date: '12 December 2025'
    },

    attachments: [
      {
        id: 'att-pv-001',
        name: 'PV 2024/24',
        language: 'EN',
        type: 'pdf',
        pages: 4,
        size: '256 KB',
        confidential: false
      },
      {
        id: 'att-pv-002',
        name: 'PV 2024/24',
        language: 'FR',
        type: 'pdf',
        pages: 4,
        size: '261 KB',
        confidential: false
      }
    ],

    hasConfidentialSections: true,
    readAt: null,
    acknowledgedAt: null
  },
  {
    id: 'notif-003',
    type: 'circular',
    priority: 'normal',
    status: 'acknowledged',

    subject: 'Circular Notification — Institution of Proceedings',
    summary: 'Notification to all Judges of the institution of new proceedings in Case No. 187',

    transmittedAt: '2025-12-15T09:00:00Z',
    transmittedBy: {
      name: 'Registry',
      department: 'Legal Department'
    },

    relatedCase: {
      id: 'gg-2024-001',
      number: 187,
      shortTitle: 'Obligation to Prosecute or Extradite',
      parties: 'Gabon v. Equatorial Guinea'
    },

    attachments: [
      {
        id: 'att-circ-001',
        name: 'Circular Letter',
        language: 'EN',
        type: 'pdf',
        pages: 1,
        size: '89 KB'
      },
      {
        id: 'att-circ-002',
        name: 'Application (Public Version)',
        language: 'EN',
        type: 'pdf',
        pages: 48,
        size: '2.4 MB'
      }
    ],

    readAt: '2025-12-15T10:22:00Z',
    acknowledgedAt: '2025-12-15T11:32:00Z',
    acknowledgedBy: 'Judge [Current User]'
  },
  {
    id: 'notif-004',
    type: 'letter',
    priority: 'urgent',
    status: 'unread',

    subject: 'Request for Extension — Counter-Memorial',
    summary: 'Letter from Respondent requesting 3-month extension for Counter-Memorial filing',

    transmittedAt: '2025-12-17T08:45:00Z',
    transmittedBy: {
      name: 'Registry',
      department: 'Legal Department'
    },

    relatedCase: {
      id: 'ua-2022-001',
      number: 182,
      shortTitle: 'Allegations of Genocide',
      parties: 'Ukraine v. Russian Federation'
    },

    requiresAction: true,
    actionRequired: 'Review and provide opinion by Dec 20',

    attachments: [
      {
        id: 'att-let-001',
        name: 'Letter from Russian Federation',
        language: 'EN',
        type: 'pdf',
        pages: 2,
        size: '156 KB'
      },
      {
        id: 'att-let-002',
        name: 'Note by the Registry',
        language: 'EN',
        type: 'pdf',
        pages: 1,
        size: '78 KB'
      }
    ],

    readAt: null,
    acknowledgedAt: null
  },
  {
    id: 'notif-005',
    type: 'agenda',
    priority: 'normal',
    status: 'read',

    subject: 'Agenda — Administrative Meeting of 18 December 2025',
    summary: '6 items including time-limits for No. 187 and personnel matters',

    transmittedAt: '2025-12-16T09:00:00Z',
    transmittedBy: {
      name: 'Registry',
      department: 'Registry'
    },

    relatedMeeting: {
      id: 'mtg-2024-048',
      date: '2025-12-18',
      type: 'administrative'
    },

    attachments: [
      {
        id: 'att-agenda-001',
        name: 'Agenda',
        language: 'EN',
        type: 'pdf',
        pages: 2,
        size: '112 KB'
      },
      {
        id: 'att-agenda-002',
        name: 'Supporting Documents',
        language: 'EN',
        type: 'pdf',
        pages: 15,
        size: '1.2 MB'
      }
    ],

    readAt: '2025-12-16T09:45:00Z',
    acknowledgedAt: null
  }
];
