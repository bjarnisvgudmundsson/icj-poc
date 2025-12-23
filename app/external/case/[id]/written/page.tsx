"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";
import { mockCases, mockDocuments } from "@/lib/mockExternalData";
import { CaseSidebar } from "@/components/external/CaseSidebar";

export default function WrittenProceedingsPage() {
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

  // Group documents by type
  const pleadings = caseDocuments.filter(d => d.type === 'Pleading');
  const orders = caseDocuments.filter(d => d.type === 'Order');
  const correspondence = caseDocuments.filter(d => d.type === 'Correspondence');
  const verbatim = caseDocuments.filter(d => d.type === 'Verbatim');
  const press = caseDocuments.filter(d => d.type === 'Press');

  return (
    <div className="max-w-7xl mx-auto px-4 py-1.5">
      {/* Navigation breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <Link href="/external" className="hover:text-[#005A9C] transition-colors">
          {t.cases}
        </Link>
        <span>|</span>
        <Link href={`/external/case/${caseId}`} className="hover:text-[#005A9C] transition-colors">
          {t.overview}
        </Link>
        <span>|</span>
        <span className="text-gray-900">{t.writtenProceedings}</span>
      </div>

      {/* Case title */}
      <div className="mb-3">
        <div className="icj-divider mb-2" />

        <h1 className="case-title">
          {caseData.fullTitle}
        </h1>

        <p className="text-sm text-gray-600 mt-1.5">{caseData.shortTitle}</p>

        <div className="icj-divider mt-2" />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main content - Left 2/3 */}
        <div className="lg:col-span-2">
          <h2 className="section-header">{t.writtenProceedings}</h2>

          {/* Pleadings */}
          {pleadings.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Pleadings and Documents
              </h3>
              <div className="latest-developments">
                {pleadings.map((doc) => (
                  <div key={doc.id} className="document-card">
                    <div className="document-date">{doc.date}</div>
                    <div className="document-link text-base">
                      {doc.title}
                    </div>
                    <div className="language-links mt-2">
                      <span className="text-sm text-gray-500 mr-2">
                        {t.availableIn}:
                      </span>
                      {doc.languages.includes('EN') && (
                        <Link
                          href={`/external/case/${caseId}/document/${doc.id}/en`}
                          className="hover:underline"
                        >
                          {t.english}
                        </Link>
                      )}
                      {doc.languages.includes('FR') && (
                        <>
                          {' | '}
                          <Link
                            href={`/external/case/${caseId}/document/${doc.id}/fr`}
                            className="hover:underline"
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
                            className="hover:underline"
                          >
                            {t.bilingual}
                          </Link>
                        </>
                      )}
                    </div>
                    {doc.isNew && <span className="badge-new">{t.new}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders */}
          {orders.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Orders
              </h3>
              <div className="latest-developments">
                {orders.map((doc) => (
                  <div key={doc.id} className="document-card">
                    <div className="document-date">{doc.date}</div>
                    <div className="document-link text-base">
                      {doc.title}
                    </div>
                    <div className="language-links mt-2">
                      <span className="text-sm text-gray-500 mr-2">
                        {t.availableIn}:
                      </span>
                      {doc.languages.includes('EN') && (
                        <Link
                          href={`/external/case/${caseId}/document/${doc.id}/en`}
                          className="hover:underline"
                        >
                          {t.english}
                        </Link>
                      )}
                      {doc.languages.includes('FR') && (
                        <>
                          {' | '}
                          <Link
                            href={`/external/case/${caseId}/document/${doc.id}/fr`}
                            className="hover:underline"
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
                            className="hover:underline"
                          >
                            {t.bilingual}
                          </Link>
                        </>
                      )}
                    </div>
                    {doc.isNew && <span className="badge-new">{t.new}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Correspondence */}
          {correspondence.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Correspondence
              </h3>
              <div className="latest-developments">
                {correspondence.map((doc) => (
                  <div key={doc.id} className="document-card">
                    <div className="document-date">{doc.date}</div>
                    <div className="document-link text-base">
                      {doc.title}
                    </div>
                    <div className="language-links mt-2">
                      <span className="text-sm text-gray-500 mr-2">
                        {t.availableIn}:
                      </span>
                      {doc.languages.includes('EN') && (
                        <Link
                          href={`/external/case/${caseId}/document/${doc.id}/en`}
                          className="hover:underline"
                        >
                          {t.english}
                        </Link>
                      )}
                      {doc.languages.includes('FR') && (
                        <>
                          {' | '}
                          <Link
                            href={`/external/case/${caseId}/document/${doc.id}/fr`}
                            className="hover:underline"
                          >
                            {t.french}
                          </Link>
                        </>
                      )}
                    </div>
                    {doc.isNew && <span className="badge-new">{t.new}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Right 1/3 */}
        <div className="lg:col-span-1">
          <CaseSidebar caseData={caseData} activeSection="written" />
        </div>
      </div>
    </div>
  );
}
