import type {
  ExternalUser,
  ExternalCase,
  ExternalNotification,
  ExternalDeadline,
  ExternalDocument,
  TeamMember
} from "@/types/external";

export const mockUser: ExternalUser = {
  id: 'ua-agent-001',
  name: 'H.E. Mr. Anton Korynevych',
  role: 'Agent of Ukraine',
  email: 'agent.ukraine@mfa.gov.ua',
  country: 'Ukraine',
  countryCode: 'UA'
};

export const mockCases: ExternalCase[] = [
  {
    id: 182,
    caseNumber: 'No. 182',
    generalList: '166',
    shortTitle: 'Ukraine v. Russian Federation',
    fullTitle: 'Application of the Convention on the Prevention and Punishment of the Crime of Genocide',
    role: 'Applicant',
    phase: 'Written Proceedings',
    nextDeadline: { date: '2025-03-15', label: 'Counter-Memorial of Russia' },
    unreadDocs: 3,
    pendingActions: 1
  },
  {
    id: 188,
    caseNumber: 'No. 188',
    generalList: '192',
    shortTitle: 'South Africa v. Israel',
    fullTitle: 'Application of the Convention on the Prevention and Punishment of the Crime of Genocide',
    role: 'Article 63 Intervener',
    phase: 'Merits',
    nextDeadline: { date: '2025-04-30', label: 'Written Statement due' },
    unreadDocs: 1,
    pendingActions: 0
  }
];

export const mockNotifications: ExternalNotification[] = [
  {
    id: 1,
    type: 'order',
    title: 'Order Fixing Time-Limits',
    caseId: 182,
    date: '17 Dec 2025',
    status: 'unread',
    urgent: true,
    content: `Excellency,

On behalf of the Registrar of the International Court of Justice, I have the honour to transmit herewith the Order of the Court dated 17 December 2025 fixing time-limits for the written proceedings in the case concerning the Application of the Convention on the Prevention and Punishment of the Crime of Genocide (Ukraine v. Russian Federation).

The Court has fixed the following time-limits:
- For the filing of the Counter-Memorial of the Russian Federation: 15 March 2026
- For the filing of the Reply of Ukraine: 15 June 2026

Please accept, Excellency, the assurances of my highest consideration.

Philippe Gautier
Registrar`,
    attachments: [
      { id: 'att-1', name: 'Order Fixing Time-Limits (EN).pdf', size: '2.4 MB', language: 'EN' },
      { id: 'att-2', name: 'Order Fixing Time-Limits (FR).pdf', size: '2.5 MB', language: 'FR' }
    ]
  },
  {
    id: 2,
    type: 'transmission',
    title: 'Transmission of Counter-Memorial',
    caseId: 182,
    date: '15 Dec 2025',
    status: 'unread',
    urgent: false,
    content: `Excellency,

I have the honour to inform you that the Counter-Memorial of the Russian Federation has been filed with the Court on 1 December 2025 and is now available for your examination.

The document has been filed in accordance with the time-limit fixed by the Court's Order of 16 March 2025.

Please accept, Excellency, the assurances of my highest consideration.

Philippe Gautier
Registrar`,
    attachments: [
      { id: 'att-3', name: 'Counter-Memorial of Russia (EN).pdf', size: '24.8 MB', language: 'EN' }
    ]
  },
  {
    id: 3,
    type: 'circular',
    title: 'Circular Letter No. 2025/03',
    caseId: null,
    date: '10 Dec 2025',
    status: 'read',
    urgent: false,
    content: `Excellencies,

The Registrar of the International Court of Justice presents his compliments and has the honour to inform the Parties that the Court's winter recess will commence on 20 December 2025 and end on 6 January 2026.

During this period, urgent matters may be addressed to the Deputy-Registrar.

The Registrar avails himself of this opportunity to renew to the Parties the assurances of his highest consideration.

Philippe Gautier
Registrar`
  },
  {
    id: 4,
    type: 'letter',
    title: 'Letter from the Registrar',
    caseId: 182,
    date: '05 Dec 2025',
    status: 'acknowledged',
    urgent: false,
    content: `Excellency,

Further to my letter of 1 December 2025, I wish to confirm that the Court has received your request for an extension of the time-limit for filing the Reply.

The Court will examine your request at its next meeting and will communicate its decision in due course.

Please accept, Excellency, the assurances of my highest consideration.

Philippe Gautier
Registrar`
  }
];

export const mockDeadlines: ExternalDeadline[] = [
  { id: 1, caseId: 182, label: 'Counter-Memorial of Russia', date: '2025-03-15', daysRemaining: 88, party: 'Respondent' },
  { id: 2, caseId: 182, label: 'Reply of Ukraine', date: '2025-06-15', daysRemaining: 180, party: 'Applicant' },
  { id: 3, caseId: 188, label: 'Written Statement', date: '2025-04-30', daysRemaining: 134, party: 'Intervener' }
];

export const mockDocuments: ExternalDocument[] = [
  // Recent documents (new)
  { id: 1, type: 'Order', title: 'Order Fixing Time-Limits for the Filing of Further Written Pleadings', date: '17 Dec 2025', languages: ['EN', 'FR'], caseId: 182, isNew: true },
  { id: 2, type: 'Pleading', title: 'Counter-Memorial of the Russian Federation', date: '01 Dec 2025', languages: ['EN'], caseId: 182, isNew: true },
  { id: 3, type: 'Correspondence', title: 'Letter from the Registrar No. 2025/128', date: '10 Dec 2025', languages: ['EN', 'FR'], caseId: 182, isNew: true },

  // Written proceedings - Memorial phase
  { id: 4, type: 'Pleading', title: 'Memorial of Ukraine', date: '15 Sep 2025', languages: ['EN', 'FR'], caseId: 182, isNew: false },
  { id: 5, type: 'Pleading', title: 'Observations of Ukraine on the Preliminary Objections of the Russian Federation', date: '14 Jun 2024', languages: ['EN', 'FR'], caseId: 182, isNew: false },
  { id: 6, type: 'Pleading', title: 'Preliminary Objections of the Russian Federation', date: '03 Oct 2023', languages: ['EN', 'FR'], caseId: 182, isNew: false },
  { id: 7, type: 'Pleading', title: 'Application Instituting Proceedings', date: '26 Feb 2022', languages: ['EN', 'FR'], caseId: 182, isNew: false },

  // Provisional measures
  { id: 8, type: 'Order', title: 'Order on Provisional Measures', date: '16 Mar 2022', languages: ['EN', 'FR'], caseId: 182, isNew: false },
  { id: 9, type: 'Order', title: 'Order on the Request for the Indication of Provisional Measures', date: '07 Mar 2022', languages: ['EN', 'FR'], caseId: 182, isNew: false },
  { id: 10, type: 'Pleading', title: 'Request for the Indication of Provisional Measures', date: '26 Feb 2022', languages: ['EN', 'FR'], caseId: 182, isNew: false },

  // Oral proceedings
  { id: 11, type: 'Verbatim', title: 'Verbatim Record of Public Sitting (CR 2024/12)', date: '23 Oct 2024', languages: ['EN', 'FR'], caseId: 182, isNew: false },
  { id: 12, type: 'Verbatim', title: 'Verbatim Record of Public Sitting (CR 2024/11)', date: '22 Oct 2024', languages: ['EN', 'FR'], caseId: 182, isNew: false },
  { id: 13, type: 'Verbatim', title: 'Verbatim Record of Public Sitting (CR 2024/10)', date: '21 Oct 2024', languages: ['EN', 'FR'], caseId: 182, isNew: false },

  // Orders and communications
  { id: 14, type: 'Order', title: 'Order Fixing the Time-Limit for the Filing of the Memorial', date: '16 Mar 2023', languages: ['EN', 'FR'], caseId: 182, isNew: false },
  { id: 15, type: 'Order', title: 'Order on the Composition of the Court', date: '19 Apr 2022', languages: ['EN', 'FR'], caseId: 182, isNew: false },
  { id: 16, type: 'Correspondence', title: 'Letter from the Registrar No. 2024/256', date: '15 Nov 2024', languages: ['EN', 'FR'], caseId: 182, isNew: false },
  { id: 17, type: 'Correspondence', title: 'Letter from the Registrar No. 2023/189', date: '20 Aug 2023', languages: ['EN', 'FR'], caseId: 182, isNew: false },

  // Press releases
  { id: 18, type: 'Press', title: 'Press Release No. 2025/47 - Time-limits fixed', date: '17 Dec 2025', languages: ['EN', 'FR'], caseId: 182, isNew: true },
  { id: 19, type: 'Press', title: 'Press Release No. 2024/89 - Oral proceedings concluded', date: '25 Oct 2024', languages: ['EN', 'FR'], caseId: 182, isNew: false },
  { id: 20, type: 'Press', title: 'Press Release No. 2022/15 - Provisional measures indicated', date: '16 Mar 2022', languages: ['EN', 'FR'], caseId: 182, isNew: false },

  // Case 188 documents
  { id: 21, type: 'Order', title: 'Order Authorizing Intervention under Article 63', date: '05 Nov 2025', languages: ['EN', 'FR'], caseId: 188, isNew: false },
  { id: 22, type: 'Pleading', title: 'Declaration of Intervention of Ukraine', date: '12 Jun 2024', languages: ['EN', 'FR'], caseId: 188, isNew: false },
  { id: 23, type: 'Order', title: 'Order on Provisional Measures', date: '26 Jan 2024', languages: ['EN', 'FR'], caseId: 188, isNew: false }
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'H.E. Mr. Anton Korynevych',
    email: 'agent.ukraine@mfa.gov.ua',
    role: 'Agent',
    active: true
  },
  {
    id: 'tm-2',
    name: 'Dr. Oksana Zolotaryova',
    email: 'co-agent@mfa.gov.ua',
    role: 'Co-Agent',
    active: true
  },
  {
    id: 'tm-3',
    name: 'Prof. Harold Koh',
    email: 'harold.koh@yale.edu',
    role: 'Counsel',
    active: true
  },
  {
    id: 'tm-4',
    name: 'Ms. Jennifer Trahan',
    email: 'jennifer.trahan@nyu.edu',
    role: 'Counsel',
    active: true
  }
];
