export interface MeetingType {
  label: string;
  color: string;
  description: string;
}

export const MEETING_TYPES: Record<string, MeetingType> = {
  administrative: {
    label: 'Administrative Meeting',
    color: '#f59e0b',
    description: 'Regular administrative business of the Court'
  },
  judicial: {
    label: 'Judicial Meeting',
    color: '#8b5cf6',
    description: 'Deliberations and judicial matters'
  },
  special: {
    label: 'Special Session',
    color: '#3b82f6',
    description: 'Extraordinary meetings'
  }
};

export interface AgendaItem {
  id: string;
  number: number;
  title: string;
  type: 'procedural' | 'case-related' | 'administrative';
  confidential: boolean;
  confidentialReason?: string;
  accessLevel?: 'restricted';
  relatedCase?: {
    id: string;
    number: number;
    shortTitle: string;
    parties: string;
  } | null;
  documents?: Array<{ id: string; name: string }>;
  proposedDecision?: string;
  decision?: string;
}

export interface Agenda {
  id: string;
  status: 'draft' | 'approved' | 'distributed' | 'completed';
  createdAt?: string;
  createdBy?: string;
  distributedAt?: string;
  distributedTo?: string[];
  readStatus?: { read: number; total: number };
  items: AgendaItem[];
}

export interface PV {
  id: string;
  number: string;
  status: 'draft' | 'review' | 'approved' | 'distributed' | 'restricted';
  confidential?: boolean;
  accessLevel?: 'judges-only' | 'restricted';
  createdAt?: string;
  createdBy?: string;
  approvedAt?: string;
  approvedBy?: string;
  distributedAt?: string;
  distributedTo?: string[];
  readStatus?: { read: number; total: number };
  documents?: Array<{ id: string; name: string; language: string }>;
  decisions?: Array<{
    id: string;
    agendaItem: number;
    summary: string;
    detail?: string;
    relatedCase?: { id: string; number: number };
  }>;
  hasConfidentialSections?: boolean;
}

export interface Meeting {
  id: string;
  type: 'administrative' | 'judicial' | 'special';
  title: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  confidential?: boolean;
  relatedCase?: {
    id: string;
    number: number;
    shortTitle: string;
  };
  attendees?: {
    required?: string[];
    optional?: string[];
    confirmed?: number;
    total?: number;
    present?: number;
    absent?: number;
    absentNames?: string[];
  };
  agenda?: Agenda | null;
  pv?: PV | null;
}

export const MOCK_MEETINGS: Meeting[] = [
  {
    id: 'mtg-2024-048',
    type: 'administrative',
    title: 'Administrative Meeting',
    date: '2025-12-24',
    time: '10:00',
    endTime: '12:00',
    location: 'Conference Room A',
    status: 'scheduled',
    attendees: {
      required: ['President', 'Vice-President', 'Registrar', 'All Judges'],
      optional: ['Deputy Registrar', 'Principal Legal Officers'],
      confirmed: 17,
      total: 18
    },
    agenda: {
      id: 'agenda-2024-048',
      status: 'distributed',
      createdAt: '2025-12-14',
      createdBy: 'Registry',
      distributedAt: '2025-12-16',
      distributedTo: ['judges', 'registrar'],
      readStatus: { read: 15, total: 15 },
      items: [
        {
          id: 'ai-1',
          number: 1,
          title: 'Approval of the Procès-Verbal of the previous meeting',
          type: 'procedural',
          confidential: false,
          relatedCase: null,
          documents: [{ id: 'pv-2024-24', name: 'PV 2024/24' }]
        },
        {
          id: 'ai-2',
          number: 2,
          title: 'Time-limits for the written proceedings',
          type: 'case-related',
          confidential: false,
          relatedCase: {
            id: 'gg-2024-001',
            number: 187,
            shortTitle: 'Obligation to Prosecute or Extradite',
            parties: 'Gabon v. Equatorial Guinea'
          },
          documents: [{ id: 'note-187-tl', name: 'Note by the Registry' }],
          proposedDecision: 'Fix time-limits: Memorial by Feb 28, 2026; Counter-Memorial by Aug 28, 2026'
        },
        {
          id: 'ai-3',
          number: 3,
          title: 'Request for extension of time-limit',
          type: 'case-related',
          confidential: false,
          relatedCase: {
            id: 'ua-2022-001',
            number: 182,
            shortTitle: 'Allegations of Genocide',
            parties: 'Ukraine v. Russian Federation'
          },
          documents: [
            { id: 'letter-182-ext', name: 'Letter from Respondent' },
            { id: 'note-182-ext', name: 'Note by the Registry' }
          ],
          proposedDecision: 'Grant 3-month extension for Counter-Memorial'
        },
        {
          id: 'ai-4',
          number: 4,
          title: 'Personnel matters',
          type: 'administrative',
          confidential: true,
          confidentialReason: 'Personnel',
          relatedCase: null,
          accessLevel: 'restricted'
        },
        {
          id: 'ai-5',
          number: 5,
          title: 'Composition of Chamber',
          type: 'case-related',
          confidential: false,
          relatedCase: {
            id: 'ni-2023-001',
            number: 184,
            shortTitle: 'Navigational Rights',
            parties: 'Nicaragua v. Colombia'
          },
          documents: [{ id: 'note-184-ch', name: 'Note on Chamber composition' }]
        },
        {
          id: 'ai-6',
          number: 6,
          title: 'Budget review - Q4 2024',
          type: 'administrative',
          confidential: true,
          confidentialReason: 'Financial',
          relatedCase: null,
          accessLevel: 'restricted'
        }
      ]
    },
    pv: null
  },
  {
    id: 'mtg-2024-047',
    type: 'administrative',
    title: 'Administrative Meeting',
    date: '2025-12-11',
    time: '10:00',
    location: 'Conference Room A',
    status: 'completed',
    attendees: {
      present: 16,
      absent: 1,
      absentNames: ['Judge Xue (excused)']
    },
    agenda: {
      id: 'agenda-2024-047',
      status: 'completed',
      items: [
        {
          id: 'ai-47-1',
          number: 1,
          title: 'Approval of PV 2024/23',
          type: 'procedural',
          confidential: false,
          decision: 'Approved without modification'
        },
        {
          id: 'ai-47-2',
          number: 2,
          title: 'Time-limits for No. 187',
          type: 'case-related',
          confidential: false,
          relatedCase: {
            id: 'gg-2024-001',
            number: 187,
            shortTitle: 'Obligation to Prosecute or Extradite',
            parties: 'Gabon v. Equatorial Guinea'
          },
          decision: 'Time-limits fixed as proposed'
        },
        {
          id: 'ai-47-3',
          number: 3,
          title: 'Extension request - Counter-Memorial (No. 182)',
          type: 'case-related',
          confidential: false,
          relatedCase: {
            id: 'ua-2022-001',
            number: 182,
            shortTitle: 'Allegations of Genocide',
            parties: 'Ukraine v. Russian Federation'
          },
          decision: 'Extension of 3 months granted'
        },
        {
          id: 'ai-47-4',
          number: 4,
          title: 'Salary adjustments',
          type: 'administrative',
          confidential: true,
          confidentialReason: 'Personnel/Financial',
          decision: '[Restricted]'
        }
      ]
    },
    pv: {
      id: 'pv-2024-24',
      number: '2024/24',
      status: 'distributed',
      createdAt: '2025-12-12',
      createdBy: 'Registry',
      approvedAt: '2025-12-12',
      approvedBy: 'President',
      distributedAt: '2025-12-13',
      distributedTo: ['judges'],
      readStatus: { read: 15, total: 15 },
      documents: [
        { id: 'pv-2024-24-en', name: 'PV 2024/24', language: 'EN' },
        { id: 'pv-2024-24-fr', name: 'PV 2024/24', language: 'FR' }
      ],
      decisions: [
        {
          id: 'd-1',
          agendaItem: 2,
          summary: 'Time-limits fixed for No. 187',
          detail: 'Memorial: Feb 28, 2026; Counter-Memorial: Aug 28, 2026',
          relatedCase: { id: 'gg-2024-001', number: 187 }
        },
        {
          id: 'd-2',
          agendaItem: 3,
          summary: 'Extension granted for Counter-Memorial (No. 182)',
          detail: '3-month extension; new deadline: Mar 15, 2026',
          relatedCase: { id: 'ua-2022-001', number: 182 }
        }
      ],
      hasConfidentialSections: true
    }
  },
  {
    id: 'mtg-2024-046',
    type: 'judicial',
    title: 'Judicial Meeting - Deliberation',
    date: '2025-12-09',
    time: '14:30',
    location: 'Deliberation Room',
    status: 'completed',
    confidential: true,
    relatedCase: {
      id: 'ir-2023-002',
      number: 185,
      shortTitle: 'Certain Iranian Assets'
    },
    attendees: {
      present: 15,
      absent: 0
    },
    pv: {
      id: 'pv-jud-2024-12',
      number: 'JUD/2024/12',
      status: 'restricted',
      confidential: true,
      accessLevel: 'judges-only'
    }
  },
  {
    id: 'mtg-2024-049',
    type: 'administrative',
    title: 'Administrative Meeting',
    date: '2026-01-15',
    time: '10:00',
    location: 'Conference Room A',
    status: 'scheduled',
    attendees: {
      confirmed: 0,
      total: 18
    },
    agenda: {
      id: 'agenda-2024-049',
      status: 'draft',
      items: []
    },
    pv: null
  },
  {
    id: 'mtg-2025-001',
    type: 'special',
    title: 'Special Session - Year Planning',
    date: '2026-01-08',
    time: '09:00',
    endTime: '16:00',
    location: 'Great Hall of Justice',
    status: 'scheduled',
    attendees: {
      confirmed: 12,
      total: 18
    },
    agenda: {
      id: 'agenda-2025-001',
      status: 'draft',
      items: []
    }
  }
];

export interface PVListItem {
  id: string;
  number: string;
  meetingId: string;
  meetingDate: string;
  meetingType: 'administrative' | 'judicial' | 'special';
  status: 'draft' | 'review' | 'approved' | 'distributed' | 'restricted';
  createdAt: string;
  distributedAt?: string;
  readStatus?: { read: number; total: number };
  decisionsCount: number;
  hasConfidentialSections?: boolean;
  relatedCases: number[];
}

export const MOCK_PVS: PVListItem[] = [
  {
    id: 'pv-2024-24',
    number: '2024/24',
    meetingId: 'mtg-2024-047',
    meetingDate: '2025-12-11',
    meetingType: 'administrative',
    status: 'distributed',
    createdAt: '2025-12-12',
    distributedAt: '2025-12-13',
    readStatus: { read: 15, total: 15 },
    decisionsCount: 3,
    hasConfidentialSections: true,
    relatedCases: [187, 182]
  },
  {
    id: 'pv-2024-23',
    number: '2024/23',
    meetingId: 'mtg-2024-045',
    meetingDate: '2025-12-04',
    meetingType: 'administrative',
    status: 'distributed',
    createdAt: '2025-12-05',
    distributedAt: '2025-12-06',
    readStatus: { read: 15, total: 15 },
    decisionsCount: 4,
    hasConfidentialSections: false,
    relatedCases: [186, 180]
  },
  {
    id: 'pv-2024-22',
    number: '2024/22',
    meetingId: 'mtg-2024-043',
    meetingDate: '2025-11-27',
    meetingType: 'administrative',
    status: 'distributed',
    createdAt: '2025-11-28',
    distributedAt: '2025-11-29',
    readStatus: { read: 15, total: 15 },
    decisionsCount: 2,
    relatedCases: [188]
  }
];
