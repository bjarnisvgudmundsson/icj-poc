"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";
import { mockCases, mockDocuments, mockDeadlines } from "@/lib/mockExternalData";
import { CaseSidebar } from "@/components/external/CaseSidebar";

export default function CaseDetailPage() {
  const params = useParams();
  const t = useExternalTranslation();

  const caseId = Number(params.id);
  const caseData = mockCases.find(c => c.id === caseId);

  if (!caseData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Case not found</p>
      </div>
    );
  }

  const caseDocuments = mockDocuments.filter(d => d.caseId === caseId);
  const caseDeadlines = mockDeadlines.filter(d => d.caseId === caseId);

  return (
    <div className="max-w-7xl mx-auto px-4 py-1.5">
      {/* Navigation breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-600 mb-1 leading-tight">
        <Link href="/external" className="hover:text-[#005A9C] transition-colors">
          {t.cases}
        </Link>
        <span>|</span>
        <span className="text-gray-400">{t.previous}</span>
        <span>|</span>
        <span className="text-gray-400">{t.next}</span>
      </div>

      {/* Case title */}
      <div className="mb-2">
        <div className="icj-divider mb-1" />

        <h1 className="case-title">
          {caseData.fullTitle}
        </h1>

        <p className="text-xs text-gray-600 mt-1 leading-tight">{caseData.shortTitle}</p>

        <div className="icj-divider mt-1" />
      </div>

      {/* Two-column layout - matching ICJ website */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Main content - Left 2/3 */}
        <div className="lg:col-span-2">
          {/* Latest Updates */}
          <div className="mb-3">
            <h2 className="section-header">{t.latestDevelopments}</h2>

            <div className="latest-developments">
              {/* Document listing - ICJ website style */}
              {caseDocuments.slice(0, 5).map((doc) => (
                <div key={doc.id} className="document-card">
                  {/* Date */}
                  <div className="document-date leading-tight">{doc.date}</div>

                  {/* Title */}
                  <div className="document-link text-sm leading-tight">
                    {doc.title}
                  </div>

                  {/* Available in languages */}
                  <div className="language-links mt-1">
                    <span className="text-xs text-gray-500 mr-1.5">
                      {t.availableIn}:
                    </span>
                    {doc.languages.includes('EN') && (
                      <Link
                        href={`/external/case/${caseId}/document/${doc.id}/en`}
                        className="hover:underline text-gray-700 hover:text-gray-900"
                      >
                        {t.english}
                      </Link>
                    )}
                    {doc.languages.includes('FR') && (
                      <>
                        {' | '}
                        <Link
                          href={`/external/case/${caseId}/document/${doc.id}/fr`}
                          className="hover:underline text-gray-700 hover:text-gray-900"
                        >
                          {t.french}
                        </Link>
                      </>
                    )}
                    {doc.languages.length > 1 && (
                      <>
                        {' | '}
                        <Link
                          href={`/external/case/${caseId}/document/${doc.id}/bi`}
                          className="hover:underline text-gray-700 hover:text-gray-900"
                        >
                          {t.bilingual}
                        </Link>
                      </>
                    )}
                  </div>

                  {/* NEW badge */}
                  {doc.isNew && <span className="badge-new">{t.new}</span>}
                </div>
              ))}

              {caseDocuments.length > 5 && (
                <div className="mt-2">
                  <Link
                    href={`/external/case/${caseId}/written`}
                    className="text-xs text-gray-700 hover:text-gray-900 hover:underline"
                  >
                    View all documents →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Case Information Section */}
          <div className="mb-3">
            <h2 className="section-header">CASE INFORMATION</h2>

            <dl className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-xs bg-gray-50 border border-gray-200 rounded p-1.5 leading-tight">
              <div>
                <dt className="text-gray-500 mb-0.5">{t.caseNumber}:</dt>
                <dd className="font-medium text-gray-900">{caseData.caseNumber}</dd>
              </div>
              <div>
                <dt className="text-gray-500 mb-0.5">{t.generalList}:</dt>
                <dd className="font-medium text-gray-900">{caseData.generalList}</dd>
              </div>
              <div>
                <dt className="text-gray-500 mb-0.5">{t.phase}:</dt>
                <dd className="font-medium text-gray-900">{caseData.phase}</dd>
              </div>
              <div>
                <dt className="text-gray-500 mb-0.5">{t.yourRole}:</dt>
                <dd className="font-medium text-gray-900">{caseData.role}</dd>
              </div>
            </dl>
          </div>

          {/* Upcoming Deadlines Section */}
          <div className="mb-3">
            <h2 className="section-header">{t.upcomingDeadlines}</h2>

            <div className="space-y-0.5 bg-gray-50 border border-gray-200 rounded p-1.5">
              {caseDeadlines.map(deadline => (
                <div key={deadline.id} className="flex items-center justify-between py-0.5 border-b border-gray-200 last:border-0">
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 leading-tight">
                      {new Date(deadline.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </p>
                    <p className="text-xs text-gray-800 leading-tight">{deadline.label}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-1 py-0.5 rounded bg-gray-100 text-gray-600">
                      {deadline.daysRemaining}d
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Right 1/3 */}
        <div className="lg:col-span-1">
          <CaseSidebar caseData={caseData} activeSection="overview" />
        </div>
      </div>
    </div>
  );
}
