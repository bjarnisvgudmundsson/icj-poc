"use client";

import { ChevronRight, FileText, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { ExternalCase } from "@/types/external";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";

interface CaseCardProps {
  case_: ExternalCase;
}

function getPhaseColor(phase: string) {
  switch (phase) {
    case 'Written Proceedings':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'Oral Proceedings':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Deliberation':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Merits':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
}

function getRoleColor(role: string) {
  switch (role) {
    case 'Applicant':
      return 'text-blue-700 bg-blue-50';
    case 'Respondent':
      return 'text-red-700 bg-red-50';
    case 'Article 63 Intervener':
      return 'text-amber-700 bg-amber-50';
    default:
      return 'text-slate-700 bg-slate-50';
  }
}

function getDaysUntilDeadline(dateStr: string): number {
  const deadline = new Date(dateStr);
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function CaseCard({ case_ }: CaseCardProps) {
  const t = useExternalTranslation();
  const daysUntil = getDaysUntilDeadline(case_.nextDeadline.date);

  return (
    <Link
      href={`/external/case/${case_.id}`}
      className="block bg-white border border-slate-200 rounded-lg hover:shadow-md hover:border-[#5B92E5] transition-all group"
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#5B92E5]">
                {case_.caseNumber}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-600">
                {t.generalList} {case_.generalList}
              </span>
            </div>
            <h3 className="text-sm font-serif font-semibold text-slate-900 line-clamp-2 mb-2">
              {case_.fullTitle}
            </h3>
            <p className="text-xs text-slate-600 mb-2">{case_.shortTitle}</p>
          </div>
          <ChevronRight
            size={18}
            className="text-slate-400 group-hover:text-[#5B92E5] transition-colors flex-shrink-0 ml-2"
          />
        </div>

        {/* Role and Phase */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[10px] font-semibold px-2 py-1 rounded ${getRoleColor(case_.role)}`}>
            {case_.role}
          </span>
          <span className={`text-[10px] font-semibold px-2 py-1 rounded border ${getPhaseColor(case_.phase)}`}>
            {case_.phase}
          </span>
        </div>

        {/* Next Deadline */}
        <div className="bg-slate-50 rounded-lg p-3 mb-3">
          <div className="flex items-start gap-2">
            <Clock size={14} className="text-slate-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-slate-600 mb-0.5">{t.nextDeadline}</p>
              <p className="text-xs font-semibold text-slate-900">{case_.nextDeadline.label}</p>
              <p className="text-[10px] text-slate-600 mt-1">
                {new Date(case_.nextDeadline.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
            <span
              className={`text-[9px] font-bold px-2 py-1 rounded flex-shrink-0 ${
                daysUntil < 30
                  ? 'bg-red-50 text-red-700'
                  : daysUntil < 90
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {daysUntil} {t.daysRemaining}
            </span>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3 text-[10px]">
          {case_.unreadDocs > 0 && (
            <div className="flex items-center gap-1">
              <FileText size={12} className="text-blue-600" />
              <span className="font-semibold text-blue-600">{case_.unreadDocs}</span>
              <span className="text-slate-600">{t.newDocs}</span>
            </div>
          )}
          {case_.pendingActions > 0 && (
            <div className="flex items-center gap-1">
              <AlertCircle size={12} className="text-amber-600" />
              <span className="font-semibold text-amber-600">{case_.pendingActions}</span>
              <span className="text-slate-600">{t.pendingAction}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
