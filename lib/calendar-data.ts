export interface CalendarEvent {
  id: string;
  type: 'deadline' | 'hearing' | 'deliberation' | 'admin' | 'distribution' | 'pressRelease' | 'reading';
  title: string;
  caseId?: string;
  caseNumber?: number;
  caseTitle?: string;
  scope: 'external' | 'internal' | 'both';
  date: string;
  allDay?: boolean;
  startTime?: string;
  endTime?: string;
  location?: string;
  party?: string;
  partyState?: string;
  description?: string;
  documents?: Array<{ id: string; name: string; language: string }>;
  createdBy?: string;
  participants?: Array<{
    role?: string;
    state?: string;
    name?: string;
    agents?: string[];
  }>;
  isPublic?: boolean;
  webcast?: boolean;
  confidential?: boolean;
  agenda?: string[];
  relatedDistribution?: string;
}

export interface EventType {
  label: string;
  color: string;
  icon: string;
  scope: 'external' | 'internal' | 'both';
}

export const EVENT_TYPES: Record<string, EventType> = {
  deadline: { label: 'Deadline', color: '#dc2626', icon: 'Clock', scope: 'external' },
  hearing: { label: 'Oral Hearing', color: '#0ea5e9', icon: 'Mic', scope: 'external' },
  deliberation: { label: 'Deliberation', color: '#7c3aed', icon: 'Lock', scope: 'internal' },
  admin: { label: 'Administrative Meeting', color: '#f59e0b', icon: 'Users', scope: 'internal' },
  distribution: { label: 'Distribution', color: '#10b981', icon: 'Send', scope: 'both' },
  pressRelease: { label: 'Press Release', color: '#ec4899', icon: 'Newspaper', scope: 'external' },
  reading: { label: 'Judgment Reading', color: '#1e293b', icon: 'Gavel', scope: 'external' }
};

export const MOCK_EVENTS: CalendarEvent[] = [
  // === DEADLINES FROM CASES ===
  {
    id: 'evt-001',
    type: 'deadline',
    title: 'Memorial of Gabon',
    caseId: 'gg-2024-001',
    caseNumber: 187,
    caseTitle: 'Obligation to Prosecute or Extradite',
    scope: 'external',
    date: '2026-02-28',
    allDay: true,
    party: 'Applicant',
    partyState: 'Gabon',
    description: 'Deadline for filing of Memorial by the Applicant',
    documents: [],
    createdBy: 'Registry'
  },
  {
    id: 'evt-002',
    type: 'deadline',
    title: 'Counter-Memorial of Russia',
    caseId: 'ua-2022-001',
    caseNumber: 182,
    caseTitle: 'Allegations of Genocide',
    scope: 'external',
    date: '2026-03-15',
    allDay: true,
    party: 'Respondent',
    partyState: 'Russian Federation',
    description: 'Deadline for filing of Counter-Memorial by the Respondent',
    documents: []
  },
  {
    id: 'evt-003',
    type: 'deadline',
    title: 'Continuation of hearings',
    caseId: 'ps-2023-001',
    caseNumber: 186,
    caseTitle: 'Occupied Palestinian Territory',
    scope: 'external',
    date: '2026-01-15',
    allDay: true,
    description: 'Continuation of public hearings in Advisory Opinion proceedings',
    documents: []
  },
  {
    id: 'evt-004',
    type: 'deadline',
    title: 'Memorial of South Africa',
    caseId: 'za-2024-001',
    caseNumber: 188,
    caseTitle: 'Application of the Genocide Convention',
    scope: 'external',
    date: '2026-04-01',
    allDay: true,
    party: 'Applicant',
    partyState: 'South Africa',
    description: 'Deadline for filing of Memorial by the Applicant',
    documents: []
  },
  {
    id: 'evt-005',
    type: 'deadline',
    title: 'Reply of Nicaragua',
    caseId: 'ni-2023-001',
    caseNumber: 184,
    caseTitle: 'Navigational Rights',
    scope: 'external',
    date: '2026-05-15',
    allDay: true,
    party: 'Applicant',
    partyState: 'Nicaragua',
    description: 'Deadline for filing of Reply by the Applicant',
    documents: []
  },

  // === ORAL HEARINGS ===
  // Armenia v. Azerbaijan - Application of CERD (No. 180)
  {
    id: 'evt-010',
    type: 'hearing',
    title: 'Oral Hearings - Day 1',
    caseId: 'am-2021-001',
    caseNumber: 180,
    caseTitle: 'Application of CERD',
    scope: 'external',
    date: '2025-12-18',
    startTime: '10:00',
    endTime: '13:00',
    location: 'Great Hall of Justice',
    participants: [
      { role: 'Applicant', state: 'Armenia', agents: ['H.E. Mr. Yeghishe Kirakosyan'] },
      { role: 'Respondent', state: 'Azerbaijan', agents: ['H.E. Mr. Elnur Mammadov'] }
    ],
    isPublic: true,
    webcast: true,
    description: 'First round of oral arguments - Applicant',
    documents: []
  },
  {
    id: 'evt-011',
    type: 'hearing',
    title: 'Oral Hearings - Day 2',
    caseId: 'am-2021-001',
    caseNumber: 180,
    caseTitle: 'Application of CERD',
    scope: 'external',
    date: '2025-12-19',
    startTime: '10:00',
    endTime: '13:00',
    location: 'Great Hall of Justice',
    participants: [
      { role: 'Respondent', state: 'Azerbaijan', agents: ['H.E. Mr. Elnur Mammadov'] }
    ],
    isPublic: true,
    webcast: true,
    description: 'First round of oral arguments - Respondent'
  },
  {
    id: 'evt-012',
    type: 'hearing',
    title: 'Oral Hearings - Day 3',
    caseId: 'am-2021-001',
    caseNumber: 180,
    caseTitle: 'Application of CERD',
    scope: 'external',
    date: '2025-12-20',
    startTime: '10:00',
    endTime: '13:00',
    location: 'Great Hall of Justice',
    isPublic: true,
    webcast: true,
    description: 'Second round of oral arguments - Applicant'
  },
  {
    id: 'evt-013',
    type: 'hearing',
    title: 'Oral Hearings - Day 4',
    caseId: 'am-2021-001',
    caseNumber: 180,
    caseTitle: 'Application of CERD',
    scope: 'external',
    date: '2025-12-23',
    startTime: '10:00',
    endTime: '13:00',
    location: 'Great Hall of Justice',
    isPublic: true,
    webcast: true,
    description: 'Second round of oral arguments - Respondent'
  },

  // Palestinian Territory Advisory Opinion (No. 186)
  {
    id: 'evt-014',
    type: 'hearing',
    title: 'Public Hearings - Day 1',
    caseId: 'ps-2023-001',
    caseNumber: 186,
    caseTitle: 'Occupied Palestinian Territory',
    scope: 'external',
    date: '2026-01-15',
    startTime: '10:00',
    endTime: '18:00',
    location: 'Great Hall of Justice',
    isPublic: true,
    webcast: true,
    description: 'First day of public hearings on Advisory Opinion - Participating States',
    documents: []
  },
  {
    id: 'evt-015',
    type: 'hearing',
    title: 'Public Hearings - Day 2',
    caseId: 'ps-2023-001',
    caseNumber: 186,
    caseTitle: 'Occupied Palestinian Territory',
    scope: 'external',
    date: '2026-01-16',
    startTime: '10:00',
    endTime: '18:00',
    location: 'Great Hall of Justice',
    isPublic: true,
    webcast: true,
    description: 'Second day of public hearings - Participating States and Organizations'
  },
  {
    id: 'evt-016',
    type: 'hearing',
    title: 'Public Hearings - Day 3',
    caseId: 'ps-2023-001',
    caseNumber: 186,
    caseTitle: 'Occupied Palestinian Territory',
    scope: 'external',
    date: '2026-01-17',
    startTime: '10:00',
    endTime: '18:00',
    location: 'Great Hall of Justice',
    isPublic: true,
    webcast: true,
    description: 'Final day of public hearings - Concluding submissions'
  },

  // === DELIBERATIONS (INTERNAL) ===
  // Certain Iranian Assets (No. 185) - in deliberation phase
  {
    id: 'evt-020',
    type: 'deliberation',
    title: 'Deliberation Session',
    caseId: 'ir-2023-002',
    caseNumber: 185,
    caseTitle: 'Certain Iranian Assets',
    scope: 'internal',
    date: '2026-01-14',
    startTime: '10:00',
    endTime: '17:00',
    location: 'Deliberation Room',
    confidential: true,
    participants: [
      { name: 'All Members of the Court' }
    ],
    description: 'Continued deliberation on merits - judgment drafting',
    documents: [
      { id: 'DEL-NOTE-12', name: 'Deliberation Notes (Confidential)', language: 'EN' }
    ]
  },
  {
    id: 'evt-021',
    type: 'deliberation',
    title: 'Final Deliberation Session',
    caseId: 'ir-2023-002',
    caseNumber: 185,
    caseTitle: 'Certain Iranian Assets',
    scope: 'internal',
    date: '2026-02-11',
    startTime: '10:00',
    endTime: '16:00',
    location: 'Deliberation Room',
    confidential: true,
    participants: [
      { name: 'All Members of the Court' }
    ],
    description: 'Final deliberation before judgment reading'
  },

  // Armenia v. Azerbaijan - deliberation after hearings
  {
    id: 'evt-022',
    type: 'deliberation',
    title: 'First Deliberation',
    caseId: 'am-2021-001',
    caseNumber: 180,
    caseTitle: 'Application of CERD',
    scope: 'internal',
    date: '2026-01-05',
    startTime: '10:00',
    endTime: '17:00',
    location: 'Deliberation Room',
    confidential: true,
    participants: [
      { name: 'All Members of the Court' }
    ],
    description: 'First deliberation following oral proceedings'
  },

  // Ukraine v. Russia - provisional measures review
  {
    id: 'evt-023',
    type: 'deliberation',
    title: 'Deliberation on Provisional Measures',
    caseId: 'ua-2022-001',
    caseNumber: 182,
    caseTitle: 'Allegations of Genocide',
    scope: 'internal',
    date: '2026-02-18',
    startTime: '10:00',
    endTime: '16:00',
    location: 'Deliberation Room',
    confidential: true,
    description: 'Deliberation on compliance with provisional measures'
  },

  // South Africa v. Israel - provisional measures deliberation
  {
    id: 'evt-024',
    type: 'deliberation',
    title: 'Deliberation on Provisional Measures',
    caseId: 'za-2024-001',
    caseNumber: 188,
    caseTitle: 'Application of the Genocide Convention',
    scope: 'internal',
    date: '2025-12-22',
    startTime: '14:00',
    endTime: '18:00',
    location: 'Deliberation Room',
    confidential: true,
    description: 'Deliberation on request for modification of provisional measures'
  },

  // === ADMINISTRATIVE MEETINGS ===
  {
    id: 'evt-030',
    type: 'admin',
    title: 'Administrative Meeting',
    scope: 'internal',
    date: '2025-12-19',
    startTime: '10:00',
    endTime: '12:00',
    location: 'Conference Room A',
    participants: [
      { name: 'President' },
      { name: 'Vice-President' },
      { name: 'Registrar' }
    ],
    agenda: [
      'Review of pending cases',
      'Time-limits for No. 187 (Gabon v. Equatorial Guinea)',
      'Oral hearings schedule for No. 180 (Armenia v. Azerbaijan)',
      'Budget matters for 2026'
    ],
    description: 'Regular administrative meeting of the Court',
    documents: [
      { id: 'PV-2025-24', name: 'Procès-Verbal', language: 'EN/FR' }
    ]
  },
  {
    id: 'evt-031',
    type: 'admin',
    title: 'Judges Meeting',
    scope: 'internal',
    date: '2026-01-12',
    startTime: '09:30',
    endTime: '11:30',
    location: 'Conference Room A',
    confidential: true,
    description: 'Meeting of all Members of the Court - Case management'
  },
  {
    id: 'evt-032',
    type: 'admin',
    title: 'Registry Staff Meeting',
    scope: 'internal',
    date: '2025-12-18',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Conference Room B',
    description: 'Monthly coordination meeting - preparation for hearings'
  },

  // === DISTRIBUTIONS ===
  {
    id: 'evt-040',
    type: 'distribution',
    title: 'Order on Time-limits - Internal Distribution',
    caseId: 'gg-2024-001',
    caseNumber: 187,
    caseTitle: 'Obligation to Prosecute or Extradite',
    scope: 'internal',
    date: '2025-12-19',
    startTime: '14:00',
    description: 'Distribution of Order fixing time-limits to all Judges',
    relatedDistribution: 'D-046'
  },
  {
    id: 'evt-041',
    type: 'distribution',
    title: 'Circular Notification - Institution of Proceedings',
    caseId: 'gg-2024-001',
    caseNumber: 187,
    caseTitle: 'Obligation to Prosecute or Extradite',
    scope: 'external',
    date: '2025-12-23',
    allDay: true,
    description: 'Circular notification to all UN Member States',
    relatedDistribution: 'D-047'
  },
  {
    id: 'evt-042',
    type: 'distribution',
    title: 'Memorial Transmission to Respondent',
    caseId: 'gg-2024-001',
    caseNumber: 187,
    caseTitle: 'Obligation to Prosecute or Extradite',
    scope: 'external',
    date: '2026-03-03',
    allDay: true,
    description: 'Transmission of Memorial to Equatorial Guinea'
  },

  // === PRESS RELEASES ===
  {
    id: 'evt-050',
    type: 'pressRelease',
    title: 'Press Release - Hearing Dates Announced',
    caseId: 'am-2021-001',
    caseNumber: 180,
    caseTitle: 'Application of CERD',
    scope: 'external',
    date: '2025-12-17',
    allDay: true,
    description: 'Announcement of oral hearing dates for December 2025',
    documents: [
      { id: 'PR-2025-45', name: 'Press Release 2025/45', language: 'EN/FR' }
    ]
  },
  {
    id: 'evt-051',
    type: 'pressRelease',
    title: 'Press Release - Judgment Date',
    caseId: 'ir-2023-002',
    caseNumber: 185,
    caseTitle: 'Certain Iranian Assets',
    scope: 'external',
    date: '2026-02-05',
    allDay: true,
    description: 'Announcement of judgment reading date',
    documents: [
      { id: 'PR-2026-02', name: 'Press Release 2026/2', language: 'EN/FR' }
    ]
  },
  {
    id: 'evt-052',
    type: 'pressRelease',
    title: 'Press Release - Advisory Opinion Hearings',
    caseId: 'ps-2023-001',
    caseNumber: 186,
    caseTitle: 'Occupied Palestinian Territory',
    scope: 'external',
    date: '2026-01-08',
    allDay: true,
    description: 'Announcement of public hearings schedule',
    documents: [
      { id: 'PR-2026-01', name: 'Press Release 2026/1', language: 'EN/FR' }
    ]
  },

  // === JUDGMENT READING ===
  {
    id: 'evt-060',
    type: 'reading',
    title: 'Reading of Judgment',
    caseId: 'ir-2023-002',
    caseNumber: 185,
    caseTitle: 'Certain Iranian Assets',
    scope: 'external',
    date: '2026-02-25',
    startTime: '10:00',
    location: 'Great Hall of Justice',
    isPublic: true,
    webcast: true,
    description: 'Public reading of the Judgment by the President',
    documents: []
  },

  // === PROVISIONAL MEASURES HEARINGS ===
  {
    id: 'evt-070',
    type: 'hearing',
    title: 'Provisional Measures Hearing',
    caseId: 'za-2024-001',
    caseNumber: 188,
    caseTitle: 'Application of the Genocide Convention',
    scope: 'external',
    date: '2025-12-20',
    startTime: '10:00',
    endTime: '17:00',
    location: 'Great Hall of Justice',
    isPublic: true,
    webcast: true,
    description: 'Hearing on request for modification of provisional measures',
    participants: [
      { role: 'Applicant', state: 'South Africa' },
      { role: 'Respondent', state: 'Israel' }
    ]
  },
  {
    id: 'evt-071',
    type: 'reading',
    title: 'Reading of Order on Provisional Measures',
    caseId: 'za-2024-001',
    caseNumber: 188,
    caseTitle: 'Application of the Genocide Convention',
    scope: 'external',
    date: '2026-01-09',
    startTime: '15:00',
    location: 'Great Hall of Justice',
    isPublic: true,
    webcast: true,
    description: 'Public reading of Order on provisional measures'
  }
];
