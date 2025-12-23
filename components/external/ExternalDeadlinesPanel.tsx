"use client";

import { Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ExternalDeadline } from "@/types/external";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";

interface ExternalDeadlinesPanelProps {
  deadlines: ExternalDeadline[];
}

function getUrgencyColor(daysRemaining: number) {
  if (daysRemaining < 30) return 'bg-red-500';
  if (daysRemaining < 90) return 'bg-amber-500';
  return 'bg-emerald-500';
}

function getUrgencyBadgeColor(daysRemaining: number) {
  if (daysRemaining < 30) return 'bg-red-50 text-red-700';
  if (daysRemaining < 90) return 'bg-amber-50 text-amber-700';
  return 'bg-emerald-50 text-emerald-700';
}

export function ExternalDeadlinesPanel({ deadlines }: ExternalDeadlinesPanelProps) {
  const t = useExternalTranslation();

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col">
      {/* Panel Header */}
      <div className="flex justify-between items-center px-3.5 py-3 border-b border-slate-100 bg-slate-50/50 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <Clock size={16} className="text-slate-600" />
          <h3 className="text-xs font-semibold text-slate-900">{t.upcomingDeadlines}</h3>
        </div>
        <span className="text-[10px] font-bold min-w-[20px] h-5 flex items-center justify-center bg-slate-100 text-slate-600 rounded-full px-2">
          {deadlines.length}
        </span>
      </div>

      {/* Panel List - Scrollable */}
      <div className="flex-1 overflow-y-auto max-h-[400px]">
        {deadlines.map(deadline => (
          <Link
            key={deadline.id}
            href={`/external/case/${deadline.caseId}`}
            className="flex items-start gap-2 px-3.5 py-2.5 border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50 group"
          >
            {/* Urgency Indicator Bar */}
            <div
              className={`w-[3px] h-7 rounded-full flex-shrink-0 mt-0.5 ${getUrgencyColor(deadline.daysRemaining)}`}
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-medium text-slate-900 leading-tight block mb-0.5 line-clamp-2">
                {deadline.label}
              </span>
              <span className="text-[10px] text-slate-600">
                {deadline.party} • {new Date(deadline.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>

            {/* Days Badge */}
            <span
              className={`text-[9px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 whitespace-nowrap ${getUrgencyBadgeColor(deadline.daysRemaining)}`}
            >
              {deadline.daysRemaining}d
            </span>
          </Link>
        ))}
      </div>

      {/* Footer Link */}
      <Link
        href="/external/deadlines"
        className="flex items-center justify-center gap-1 py-2.5 text-[11px] font-medium text-blue-600 border-t border-slate-100 bg-slate-50/50 hover:bg-slate-100 transition-colors flex-shrink-0"
      >
        {t.viewAll} <ChevronRight size={14} />
      </Link>
    </div>
  );
}
