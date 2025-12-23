"use client";

import { Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { DeadlineItem } from "@/lib/cases-data";
import { formatDate } from "@/lib/utils";

interface DeadlinesPanelProps {
  deadlines: DeadlineItem[];
}

function getUrgency(dateStr: string): 'overdue' | 'urgent' | 'soon' | 'normal' {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'overdue';
  if (diffDays <= 7) return 'urgent';
  if (diffDays <= 30) return 'soon';
  return 'normal';
}

function getDaysLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    const overdueDays = Math.abs(diffDays);
    return overdueDays === 1 ? '1 day ago' : `${overdueDays}d ago`;
  }
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays <= 7) return `${diffDays}d`;
  if (diffDays <= 30) return `${Math.ceil(diffDays / 7)}w`;
  return `${Math.ceil(diffDays / 30)}mo`;
}

export function DeadlinesPanel({ deadlines }: DeadlinesPanelProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col">
      {/* Panel Header */}
      <div className="flex justify-between items-center px-3.5 py-3 border-b border-slate-100 bg-slate-50/50 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <Clock size={16} className="text-slate-600" />
          <h3 className="text-xs font-semibold text-slate-900">Upcoming Deadlines</h3>
        </div>
        <span className="text-[10px] font-bold min-w-[20px] h-5 flex items-center justify-center bg-slate-100 text-slate-600 rounded-full px-2">
          {deadlines.length}
        </span>
      </div>

      {/* Panel List - Scrollable */}
      <div className="flex-1 overflow-y-auto max-h-[400px]">
        {deadlines.slice(0, 6).map(deadline => {
          const urgency = getUrgency(deadline.date);

          return (
            <Link
              key={deadline.id}
              href={`/icj/cases/${deadline.caseId}`}
              className={`flex items-start gap-2 px-3.5 py-2.5 border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50 group`}
            >
              {/* Urgency Indicator Bar */}
              <div
                className={`w-[3px] h-7 rounded-full flex-shrink-0 mt-0.5 ${
                  urgency === 'overdue' ? 'bg-red-600' :
                  urgency === 'urgent' ? 'bg-amber-500' :
                  urgency === 'soon' ? 'bg-blue-500' :
                  'bg-emerald-500'
                }`}
              />

              {/* Content */}
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-medium text-slate-900 leading-tight block mb-0.5 line-clamp-2">
                  {deadline.label}
                </span>
                <span className="text-[10px] text-slate-600">
                  <span className="font-semibold text-blue-600">No. {deadline.caseNumber}</span> • {deadline.caseShortTitle}
                </span>
              </div>

              {/* Days Badge */}
              <span
                className={`text-[9px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 whitespace-nowrap ${
                  urgency === 'overdue' ? 'bg-red-50 text-red-700' :
                  urgency === 'urgent' ? 'bg-amber-50 text-amber-700' :
                  urgency === 'soon' ? 'bg-blue-50 text-blue-700' :
                  'bg-emerald-50 text-emerald-700'
                }`}
              >
                {getDaysLabel(deadline.date)}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Footer Link */}
      <Link
        href="/icj/calendar"
        className="flex items-center justify-center gap-1 py-2.5 text-[11px] font-medium text-blue-600 border-t border-slate-100 bg-slate-50/50 hover:bg-slate-100 transition-colors flex-shrink-0"
      >
        Calendar <ChevronRight size={14} />
      </Link>
    </div>
  );
}
