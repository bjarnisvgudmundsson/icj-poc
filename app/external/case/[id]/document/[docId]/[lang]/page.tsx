"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";
import { mockCases, mockDocuments } from "@/lib/mockExternalData";

export default function DocumentViewerPage() {
  const params = useParams();
  const t = useExternalTranslation();

  const caseId = Number(params.id);
  const docId = Number(params.docId);
  const lang = params.lang as string;

  const caseData = mockCases.find(c => c.id === caseId);
  const document = mockDocuments.find(d => d.id === docId);

  if (!caseData || !document) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Document not found</p>
      </div>
    );
  }

  const languageDisplay = lang === 'en' ? 'English' : lang === 'fr' ? 'French' : 'Bilingual';

  // Mock PDF content based on document type
  const getMockContent = () => {
    if (document.type === 'Order') {
      return `INTERNATIONAL COURT OF JUSTICE

PEACE PALACE, THE HAGUE

${document.title}

${document.date}

THE COURT,

Composed as above,

After deliberation,

Makes the following Order:

1. The Counter-Memorial of the Russian Federation shall be filed not later than 15 March 2026.

2. The Reply of Ukraine shall be filed not later than 15 June 2026.

Done in English and in French, the English text being authoritative, at the Peace Palace, The Hague, this seventeenth day of December two thousand and twenty-five, in three copies, one of which will be placed in the archives of the Court and the others transmitted to the Government of Ukraine and the Government of the Russian Federation, respectively.

(Signed) Nawaf SALAM,
         President.

(Signed) Philippe GAUTIER,
         Registrar.`;
    } else if (document.type === 'Pleading') {
      return `INTERNATIONAL COURT OF JUSTICE

CASE CONCERNING THE APPLICATION OF THE CONVENTION ON THE PREVENTION
AND PUNISHMENT OF THE CRIME OF GENOCIDE

(UKRAINE v. RUSSIAN FEDERATION)

${document.title}

${document.date}

VOLUME I

TABLE OF CONTENTS

CHAPTER I: INTRODUCTION
  1.1 Background to the Dispute
  1.2 Basis of the Court's Jurisdiction
  1.3 Admissibility
  1.4 Structure of the Memorial

CHAPTER II: FACTUAL BACKGROUND
  2.1 Historical Context
  2.2 Events Leading to the Application
  2.3 Chronology of Events

CHAPTER III: LEGAL ARGUMENTS
  3.1 Interpretation of the Genocide Convention
  3.2 Application of the Convention to the Facts
  3.3 State Responsibility

CHAPTER IV: REMEDIES SOUGHT
  4.1 Declaratory Relief
  4.2 Cessation and Non-Repetition
  4.3 Reparations

CHAPTER V: CONCLUSION

[This is a mock document for demonstration purposes in the External Portal]`;
    } else if (document.type === 'Correspondence') {
      return `THE INTERNATIONAL COURT OF JUSTICE

THE REGISTRAR

Letter No. ${document.title.split('No. ')[1] || '2025/128'}

${document.date}

Excellency,

I have the honour to refer to the case concerning the Application of the Convention on the Prevention and Punishment of the Crime of Genocide (Ukraine v. Russian Federation).

Further to my previous correspondence, I wish to inform Your Excellency that the Court has decided to fix the following time-limits for the written proceedings:

- For the filing of the Counter-Memorial of the Russian Federation: 15 March 2026
- For the filing of the Reply of Ukraine: 15 June 2026

The Court's Order will be transmitted to the Parties in due course.

Please accept, Excellency, the assurances of my highest consideration.

Philippe GAUTIER
Registrar

His Excellency Mr. Anton Korynevych
Agent of Ukraine
[Address]`;
    } else {
      return `INTERNATIONAL COURT OF JUSTICE

${document.title}

${document.date}

[This is a mock document for demonstration purposes in the External Portal]

The full text of this document would appear here in a real implementation.`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-2">
      {/* Navigation breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
        <Link href="/external" className="hover:text-[#005A9C] transition-colors">
          {t.cases}
        </Link>
        <span>|</span>
        <Link href={`/external/case/${caseId}`} className="hover:text-[#005A9C] transition-colors">
          {caseData.shortTitle}
        </Link>
        <span>|</span>
        <Link href={`/external/case/${caseId}/written`} className="hover:text-[#005A9C] transition-colors">
          {t.documents}
        </Link>
      </div>

      {/* Document header */}
      <div className="bg-white border-b border-gray-200 pb-4 mb-4">
        <h1 className="text-2xl font-serif text-gray-900 mb-2">
          {document.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{document.date}</span>
          <span>•</span>
          <span>{document.type}</span>
          <span>•</span>
          <span>{languageDisplay}</span>
        </div>

        {/* Language switcher */}
        {document.languages.length > 1 && (
          <div className="flex items-center gap-3 mt-3">
            <span className="text-sm text-gray-500">View in:</span>
            {document.languages.includes('EN') && (
              <Link
                href={`/external/case/${caseId}/document/${docId}/en`}
                className={`text-sm px-3 py-1 rounded ${
                  lang === 'en'
                    ? 'bg-[#005A9C] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                English
              </Link>
            )}
            {document.languages.includes('FR') && (
              <Link
                href={`/external/case/${caseId}/document/${docId}/fr`}
                className={`text-sm px-3 py-1 rounded ${
                  lang === 'fr'
                    ? 'bg-[#005A9C] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Français
              </Link>
            )}
            {document.languages.length > 1 && (
              <Link
                href={`/external/case/${caseId}/document/${docId}/bi`}
                className={`text-sm px-3 py-1 rounded ${
                  lang === 'bi'
                    ? 'bg-[#005A9C] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Bilingual
              </Link>
            )}
          </div>
        )}

        {/* Download button */}
        <div className="mt-3">
          <button className="btn-icj-primary inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>

      {/* Document content (mock) */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        {/* PDF Viewer simulation */}
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Page 1 of {document.type === 'Pleading' ? '245' : '3'}
          </span>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50">
              -
            </button>
            <span className="text-sm">100%</span>
            <button className="px-2 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50">
              +
            </button>
          </div>
        </div>

        {/* Mock document content */}
        <div className="p-8 bg-white min-h-[800px]">
          <div className="max-w-3xl mx-auto bg-white shadow-sm border border-gray-200 p-12">
            <pre className="font-serif text-sm leading-relaxed whitespace-pre-wrap text-gray-900">
              {getMockContent()}
            </pre>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="mt-4">
        <Link
          href={`/external/case/${caseId}/written`}
          className="text-sm text-[#005A9C] hover:underline"
        >
          ← Back to {t.writtenProceedings}
        </Link>
      </div>
    </div>
  );
}
