import { useLanguage } from '@/contexts/ExternalLanguageContext';

const translations = {
  en: {
    // Header
    subtitle: 'State Agent Portal',
    home: 'Home',
    contact: 'Contact',
    faq: 'FAQ',
    help: 'Help',
    search: 'Search',
    employment: 'Employment',
    sitemap: 'Sitemap',

    // Navigation
    cases: 'Cases',
    previous: 'Previous',
    next: 'Next',

    // Dashboard
    myCases: 'MY CASES',
    upcomingDeadlines: 'UPCOMING DEADLINES',
    recentNotifications: 'RECENT NOTIFICATIONS',
    viewCase: 'View Case',
    days: 'days',

    // Case detail
    latestDevelopments: 'LATEST UPDATES',
    overview: 'Overview',
    writtenProceedings: 'Written proceedings',
    oralProceedings: 'Oral proceedings',
    orders: 'Orders',
    correspondence: 'Correspondence',
    pressReleases: 'Press releases',
    institutionProceedings: 'Institution of proceedings',
    provisionalMeasures: 'Provisional measures',
    summaries: 'Summaries',
    submitFiling: 'Submit Filing',
    yourTeam: 'Your Team',
    deadlines: 'Deadlines',

    // Document
    availableIn: 'Available in',
    english: 'English',
    french: 'French',
    bilingual: 'Bilingual',
    procedures: 'Procedure(s)',

    // Case info
    yourRole: 'YOUR ROLE',
    casePhase: 'CASE PHASE',
    nextDeadline: 'NEXT DEADLINE',
    applicant: 'Applicant',
    respondent: 'Respondent',
    intervener: 'Article 63 Intervener',

    // Status
    unread: 'Unread',
    read: 'Read',
    acknowledged: 'Acknowledged',
    new: 'NEW',
    actionRequired: 'Action required',

    // Submit
    dragDropFiles: 'Drag and drop files here',
    orClickBrowse: 'or click to browse',
    selectFilingType: 'Select filing type',
    submit: 'Submit',
    filingType: 'Filing Type',

    // Footer
    disclaimer: 'Disclaimer',
    accessibility: 'Accessibility',
    allRightsReserved: 'All rights reserved',
    copyright: 'International Court of Justice',

    // Common
    documents: 'Documents',
    download: 'Download',
    caseNumber: 'Case No.',
    generalList: 'General List No.',
    phase: 'Phase',
    view: 'View',
    actions: 'Actions',
    type: 'Type',
    date: 'Date',
    language: 'Language',
    status: 'Status',
    active: 'Active',
    role: 'Role',
    email: 'Email',
    name: 'Name',
    close: 'Close',
    attachments: 'Attachments',
    acknowledgeReceipt: 'Acknowledge Receipt',
    teamMembers: 'Team Members',
    addMember: 'Add Member'
  },
  fr: {
    // Header
    subtitle: 'Portail des agents des États',
    home: 'Accueil',
    contact: 'Contact',
    faq: 'FAQ',
    help: 'Aide',
    search: 'Recherche',
    employment: 'Emploi',
    sitemap: 'Plan du site',

    // Navigation
    cases: 'Affaires',
    previous: 'Précédent',
    next: 'Suivant',

    // Dashboard
    myCases: 'MES AFFAIRES',
    upcomingDeadlines: 'PROCHAINS DÉLAIS',
    recentNotifications: 'NOTIFICATIONS RÉCENTES',
    viewCase: 'Voir l\'affaire',
    days: 'jours',

    // Case detail
    latestDevelopments: 'DERNIÈRES MISES À JOUR',
    overview: 'Aperçu',
    writtenProceedings: 'Procédure écrite',
    oralProceedings: 'Procédure orale',
    orders: 'Ordonnances',
    correspondence: 'Correspondance',
    pressReleases: 'Communiqués de presse',
    institutionProceedings: 'Introduction de l\'instance',
    provisionalMeasures: 'Mesures conservatoires',
    summaries: 'Résumés',
    submitFiling: 'Soumettre un document',
    yourTeam: 'Votre équipe',
    deadlines: 'Délais',

    // Document
    availableIn: 'Disponible en',
    english: 'Anglais',
    french: 'Français',
    bilingual: 'Bilingue',
    procedures: 'Procédure(s)',

    // Case info
    yourRole: 'VOTRE RÔLE',
    casePhase: 'PHASE DE L\'AFFAIRE',
    nextDeadline: 'PROCHAIN DÉLAI',
    applicant: 'Demandeur',
    respondent: 'Défendeur',
    intervener: 'Intervenant (Article 63)',

    // Status
    unread: 'Non lu',
    read: 'Lu',
    acknowledged: 'Accusé de réception',
    new: 'NOUVEAU',
    actionRequired: 'Action requise',

    // Submit
    dragDropFiles: 'Glissez-déposez les fichiers ici',
    orClickBrowse: 'ou cliquez pour parcourir',
    selectFilingType: 'Sélectionnez le type de document',
    submit: 'Soumettre',
    filingType: 'Type de document',

    // Footer
    disclaimer: 'Avertissement',
    accessibility: 'Accessibilité',
    allRightsReserved: 'Tous droits réservés',
    copyright: 'Cour internationale de Justice',

    // Common
    documents: 'Documents',
    download: 'Télécharger',
    caseNumber: 'Affaire n°',
    generalList: 'Rôle général n°',
    phase: 'Phase',
    view: 'Voir',
    actions: 'Actions',
    type: 'Type',
    date: 'Date',
    language: 'Langue',
    status: 'Statut',
    active: 'Actif',
    role: 'Rôle',
    email: 'Courriel',
    name: 'Nom',
    close: 'Fermer',
    attachments: 'Pièces jointes',
    acknowledgeReceipt: 'Accuser réception',
    teamMembers: 'Membres de l\'équipe',
    addMember: 'Ajouter'
  }
};

export function useExternalTranslation() {
  const { language } = useLanguage();
  return translations[language];
}
