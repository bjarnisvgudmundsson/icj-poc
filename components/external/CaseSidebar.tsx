"use client";

import Link from "next/link";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";
import type { ExternalCase } from "@/types/external";

interface CaseSidebarProps {
  caseData: ExternalCase;
  activeSection?: string;
}

export function CaseSidebar({ caseData, activeSection = 'overview' }: CaseSidebarProps) {
  const t = useExternalTranslation();

  const sections = [
    { id: 'overview', label: t.overview, href: `/external/case/${caseData.id}` },
    { id: 'institution', label: t.institutionProceedings, href: `/external/case/${caseData.id}/institution` },
    { id: 'provisional', label: t.provisionalMeasures, href: `/external/case/${caseData.id}/provisional` },
    { id: 'written', label: t.writtenProceedings, href: `/external/case/${caseData.id}/written` },
    { id: 'oral', label: t.oralProceedings, href: `/external/case/${caseData.id}/oral` },
    { id: 'orders', label: t.orders, href: `/external/case/${caseData.id}/orders` },
    { id: 'correspondence', label: t.correspondence, href: `/external/case/${caseData.id}/correspondence` },
    { id: 'summaries', label: t.summaries, href: `/external/case/${caseData.id}/summaries` },
    { id: 'press', label: t.pressReleases, href: `/external/case/${caseData.id}/press` },
    { divider: true },
    { id: 'submit', label: t.submitFiling, href: `/external/case/${caseData.id}/submit`, highlight: true },
    { id: 'team', label: t.yourTeam, href: `/external/case/${caseData.id}/team` },
    { id: 'deadlines', label: t.deadlines, href: `/external/case/${caseData.id}/deadlines` },
  ];

  return (
    <div className="sidebar-nav sticky top-4">
      <ul className="space-y-1">
        {sections.map((section, idx) =>
          section.divider ? (
            <li key={idx} className="border-t border-gray-300 my-3" />
          ) : (
            <li key={section.id}>
              <Link
                href={section.href || '#'}
                className={`
                  ${activeSection === section.id ? 'active' : ''}
                  ${section.highlight ? 'font-semibold' : ''}
                `}
              >
                {section.label}
              </Link>
            </li>
          )
        )}
      </ul>

      {/* Case info box */}
      <div className="info-box">
        <div className="info-box-label">{t.yourRole}</div>
        <div className="info-box-value mb-3">{caseData.role}</div>

        <div className="info-box-label">{t.casePhase}</div>
        <div className="info-box-value mb-3">{caseData.phase}</div>

        <div className="info-box-label">{t.nextDeadline}</div>
        <div className="info-box-value">
          {new Date(caseData.nextDeadline.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </div>
        <div className="text-xs text-gray-600 mt-0.5">
          {caseData.nextDeadline.label}
        </div>
      </div>
    </div>
  );
}
