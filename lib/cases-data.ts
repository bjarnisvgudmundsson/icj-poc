export interface CaseOverview {
  id: string;
  number: number;
  year: number;
  shortTitle: string;
  fullTitle: string;
  parties: {
    applicant: { state: string; flag: string };
    respondent: { state: string; flag: string } | null;
  };
  dateFiled: string;
  stage: string;
  stageLabel: string;
  phase: string;
  currentPhase: string;
  phaseProgress: number;
  nextDeadline: {
    label: string;
    date: string;
    party: string | null;
    type?: string;
  } | null;
  president: string;
  documentsCount: number;
  hasProvisionalMeasures: boolean;
  hasPreliminaryObjections: boolean;
  status: string;
  isAdvisory?: boolean;
  pendingApproval?: {
    item: string;
    submittedAt: string;
    submittedBy: string;
  } | null;
  lastApproval?: {
    date: string;
    item: string;
    signatureType: 'electronic' | 'manual';
    approvedBy: string;
  } | null;
  pendingActions: number;
  pendingActionsList?: Array<{
    id: string;
    label: string;
    type: string;
  }>;
}

export const MOCK_CASES: CaseOverview[] = [
  {
    id: 'gg-2024-001',
    number: 187,
    year: 2024,
    shortTitle: 'Obligation to Prosecute or Extradite',
    fullTitle: 'Certain Questions Relating to the Obligation to Prosecute or Extradite',
    parties: {
      applicant: { state: 'Gabon', flag: '🇬🇦' },
      respondent: { state: 'Equatorial Guinea', flag: '🇬🇶' }
    },
    dateFiled: '2024-03-15',
    stage: 'written',
    stageLabel: 'Written Proceedings',
    phase: 'Memorial',
    currentPhase: 'Memorial',
    phaseProgress: 2,
    nextDeadline: { label: 'Memorial of Gabon', date: '2026-02-28', party: 'Applicant', type: 'pleading' },
    president: 'Judge Joan E. Donoghue',
    documentsCount: 47,
    hasProvisionalMeasures: false,
    hasPreliminaryObjections: false,
    status: 'active',
    pendingApproval: null,
    lastApproval: {
      date: '2024-12-10',
      item: 'Distribution to UN Member States',
      signatureType: 'electronic',
      approvedBy: 'Registrar'
    },
    pendingActions: 2,
    pendingActionsList: [
      { id: 'pa-1', label: 'French translation of Application', type: 'translation' },
      { id: 'pa-2', label: 'Time-limits Order', type: 'order' }
    ]
  },
  {
    id: 'ua-2022-001',
    number: 182,
    year: 2022,
    shortTitle: 'Allegations of Genocide',
    fullTitle: 'Allegations of Genocide under the Convention on the Prevention and Punishment of the Crime of Genocide',
    parties: {
      applicant: { state: 'Ukraine', flag: '🇺🇦' },
      respondent: { state: 'Russian Federation', flag: '🇷🇺' }
    },
    dateFiled: '2022-02-26',
    stage: 'written',
    stageLabel: 'Written Proceedings',
    phase: 'Counter-Memorial',
    currentPhase: 'Counter-Memorial',
    phaseProgress: 3,
    nextDeadline: { label: 'Counter-Memorial of Russia', date: '2026-03-15', party: 'Respondent', type: 'pleading' },
    president: 'Judge Joan E. Donoghue',
    documentsCount: 234,
    hasProvisionalMeasures: true,
    hasPreliminaryObjections: true,
    status: 'active',
    pendingApproval: {
      item: 'Letter to Respondent re: extension request',
      submittedAt: '2025-12-16',
      submittedBy: 'Legal Department'
    },
    lastApproval: null,
    pendingActions: 1,
    pendingActionsList: [
      { id: 'pa-3', label: 'Review extension request', type: 'procedural' }
    ]
  },
  {
    id: 'ps-2023-001',
    number: 186,
    year: 2023,
    shortTitle: 'Occupied Palestinian Territory',
    fullTitle: 'Legal Consequences arising from the Policies and Practices of Israel in the Occupied Palestinian Territory',
    parties: {
      applicant: { state: 'UN General Assembly', flag: '🇺🇳' },
      respondent: null
    },
    dateFiled: '2023-01-17',
    stage: 'oral',
    stageLabel: 'Oral Proceedings',
    phase: 'Public Hearings',
    currentPhase: 'Public Hearings',
    phaseProgress: 4,
    nextDeadline: { label: 'Continuation of hearings', date: '2026-01-15', party: null },
    president: 'Judge Joan E. Donoghue',
    documentsCount: 156,
    hasProvisionalMeasures: false,
    hasPreliminaryObjections: false,
    status: 'active',
    isAdvisory: true,
    pendingApproval: null,
    lastApproval: {
      date: '2025-12-12',
      item: 'Hearing schedule distribution',
      signatureType: 'electronic',
      approvedBy: 'Registrar'
    },
    pendingActions: 0
  },
  {
    id: 'ir-2023-002',
    number: 185,
    year: 2016,
    shortTitle: 'Certain Iranian Assets',
    fullTitle: 'Certain Iranian Assets',
    parties: {
      applicant: { state: 'Iran', flag: '🇮🇷' },
      respondent: { state: 'United States', flag: '🇺🇸' }
    },
    dateFiled: '2016-06-14',
    stage: 'deliberation',
    stageLabel: 'Deliberation',
    phase: 'Judgment Pending',
    currentPhase: 'Judgment Pending',
    phaseProgress: 5,
    nextDeadline: null,
    president: 'Judge Joan E. Donoghue',
    documentsCount: 312,
    hasProvisionalMeasures: false,
    hasPreliminaryObjections: true,
    status: 'active',
    pendingApproval: null,
    lastApproval: {
      date: '2025-12-05',
      item: 'Final deliberation notes',
      signatureType: 'manual',
      approvedBy: 'President'
    },
    pendingActions: 0
  },
  {
    id: 'za-2024-001',
    number: 188,
    year: 2023,
    shortTitle: 'Application of the Genocide Convention',
    fullTitle: 'Application of the Convention on the Prevention and Punishment of the Crime of Genocide in the Gaza Strip',
    parties: {
      applicant: { state: 'South Africa', flag: '🇿🇦' },
      respondent: { state: 'Israel', flag: '🇮🇱' }
    },
    dateFiled: '2023-12-29',
    stage: 'written',
    stageLabel: 'Written Proceedings',
    phase: 'Memorial',
    currentPhase: 'Memorial',
    phaseProgress: 2,
    nextDeadline: { label: 'Memorial of South Africa', date: '2026-04-01', party: 'Applicant', type: 'pleading' },
    president: 'Judge Joan E. Donoghue',
    documentsCount: 89,
    hasProvisionalMeasures: true,
    hasPreliminaryObjections: false,
    status: 'active',
    pendingApproval: null,
    lastApproval: {
      date: '2025-12-14',
      item: 'Provisional measures modification order',
      signatureType: 'electronic',
      approvedBy: 'Registrar'
    },
    pendingActions: 0
  },
  {
    id: 'ni-2023-001',
    number: 184,
    year: 2022,
    shortTitle: 'Navigational Rights',
    fullTitle: 'Dispute over Navigational and Related Rights',
    parties: {
      applicant: { state: 'Nicaragua', flag: '🇳🇮' },
      respondent: { state: 'Colombia', flag: '🇨🇴' }
    },
    dateFiled: '2022-09-12',
    stage: 'written',
    stageLabel: 'Written Proceedings',
    phase: 'Reply',
    currentPhase: 'Reply',
    phaseProgress: 4,
    nextDeadline: { label: 'Reply of Nicaragua', date: '2026-05-15', party: 'Applicant', type: 'pleading' },
    president: 'Judge Joan E. Donoghue',
    documentsCount: 78,
    hasProvisionalMeasures: false,
    hasPreliminaryObjections: false,
    status: 'active',
    pendingApproval: null,
    lastApproval: {
      date: '2025-11-20',
      item: 'Rejoinder time-limits',
      signatureType: 'electronic',
      approvedBy: 'Registrar'
    },
    pendingActions: 0
  },
  {
    id: 'am-2021-001',
    number: 180,
    year: 2021,
    shortTitle: 'Application of CERD',
    fullTitle: 'Application of the International Convention on the Elimination of All Forms of Racial Discrimination',
    parties: {
      applicant: { state: 'Armenia', flag: '🇦🇲' },
      respondent: { state: 'Azerbaijan', flag: '🇦🇿' }
    },
    dateFiled: '2021-09-16',
    stage: 'oral',
    stageLabel: 'Oral Proceedings',
    phase: 'Hearings Scheduled',
    currentPhase: 'Oral Hearings',
    phaseProgress: 4,
    nextDeadline: { label: 'Start of oral hearings', date: '2025-12-18', party: null },
    president: 'Judge Joan E. Donoghue',
    documentsCount: 145,
    hasProvisionalMeasures: true,
    hasPreliminaryObjections: true,
    status: 'active',
    pendingApproval: null,
    lastApproval: {
      date: '2025-12-01',
      item: 'Hearing schedule and participant list',
      signatureType: 'electronic',
      approvedBy: 'Registrar'
    },
    pendingActions: 0
  }
];

export interface DeadlineItem {
  id: string;
  caseId: string;
  caseNumber: number;
  caseShortTitle: string;
  label: string;
  date: string;
  party: string | null;
  partyFlag?: string;
  partyRole?: string;
}

export function getAllDeadlines(): DeadlineItem[] {
  const deadlines: DeadlineItem[] = [];

  MOCK_CASES.forEach(caseItem => {
    if (caseItem.nextDeadline) {
      const partyData = caseItem.nextDeadline.party === 'Applicant'
        ? caseItem.parties.applicant
        : caseItem.nextDeadline.party === 'Respondent'
        ? caseItem.parties.respondent
        : null;

      deadlines.push({
        id: `${caseItem.id}-deadline`,
        caseId: caseItem.id,
        caseNumber: caseItem.number,
        caseShortTitle: caseItem.shortTitle,
        label: caseItem.nextDeadline.label,
        date: caseItem.nextDeadline.date,
        party: caseItem.nextDeadline.party,
        partyFlag: partyData?.flag,
        partyRole: caseItem.nextDeadline.party || undefined,
      });
    }
  });

  return deadlines.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
