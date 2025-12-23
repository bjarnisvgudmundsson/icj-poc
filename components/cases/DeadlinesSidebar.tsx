"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import type { DeadlineItem } from "@/lib/cases-data";
import { formatDate } from "@/lib/utils";

interface DeadlinesSidebarProps {
  deadlines: DeadlineItem[];
}

function getDaysUntil(dateStr: string): number {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function getUrgency(dateStr: string): 'overdue' | 'urgent' | 'normal' {
  const days = getDaysUntil(dateStr);
  if (days < 0) return 'overdue';
  if (days <= 14) return 'urgent';
  return 'normal';
}

function getDaysLabel(dateStr: string): string {
  const days = getDaysUntil(dateStr);
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  if (days < 7) return `in ${days}d`;
  if (days < 30) return `in ${days}d`;

  const months = Math.floor(days / 30);
  return `in ${months}mo`;
}

function getDaysClass(dateStr: string): string {
  const days = getDaysUntil(dateStr);
  if (days === 1) return 'tomorrow';
  if (days <= 7) return 'soon';
  return '';
}

export function DeadlinesSidebar({ deadlines }: DeadlinesSidebarProps) {
  return (
    <aside className="bg-white border border-slate-200 rounded-lg p-4 sticky top-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-slate-900">
          Upcoming Deadlines
        </h3>
        <span className="text-[11px] font-semibold px-2 py-0.5 bg-sky-50 text-sky-700 rounded-full">
          {deadlines.length}
        </span>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-1 mb-3">
        <button className="flex-1 text-[11px] px-2.5 py-1 font-medium bg-blue-600 text-white rounded">
          All
        </button>
        <button className="flex-1 text-[11px] px-2.5 py-1 font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded">
          This Week
        </button>
        <button className="flex-1 text-[11px] px-2.5 py-1 font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded">
          Month
        </button>
      </div>

      {/* Deadlines List */}
      <div className="space-y-0 mb-4">
        {deadlines.slice(0, 10).map((deadline) => {
          const urgency = getUrgency(deadline.date);

          return (
            <Link key={deadline.id} href={`/icj/cases/${deadline.caseId}`}>
              <div className="flex gap-2.5 py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 -mx-2 px-2 rounded transition-colors cursor-pointer">
                {/* Urgency Indicator */}
                <div
                  className={`w-0.5 rounded-full flex-shrink-0 ${
                    urgency === 'overdue'
                      ? 'bg-red-500'
                      : urgency === 'urgent'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Deadline Title */}
                  <div className="text-xs font-medium text-slate-900 mb-0.5 leading-tight">
                    {deadline.label}
                  </div>

                  {/* Case Info */}
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[10px] font-semibold text-blue-600">
                      No. {deadline.caseNumber}
                    </span>
                    <span className="text-[10px] text-slate-400">•</span>
                    <span className="text-[10px] text-slate-600 truncate">
                      {deadline.caseShortTitle}
                    </span>
                  </div>

                  {/* Date & Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-500">
                      {formatDate(deadline.date)}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        urgency === 'overdue'
                          ? 'bg-red-50 text-red-700'
                          : urgency === 'urgent'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-sky-50 text-sky-700'
                      } ${
                        getDaysClass(deadline.date) === 'tomorrow'
                          ? 'bg-red-50 text-red-700'
                          : getDaysClass(deadline.date) === 'soon'
                          ? 'bg-sky-50 text-sky-700'
                          : ''
                      }`}
                    >
                      {getDaysLabel(deadline.date)}
                    </span>
                  </div>
                </div>

                {/* Party Role Badge (if available) */}
                {deadline.partyRole && (
                  <div className="flex-shrink-0">
                    <span className="text-[9px] font-semibold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded uppercase">
                      {deadline.partyRole.slice(0, 4)}
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}

        {deadlines.length === 0 && (
          <div className="py-8 text-center text-sm text-slate-500">
            No upcoming deadlines
          </div>
        )}
      </div>

      {/* View Calendar Button */}
      <Link href="/icj/calendar">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors">
          <Calendar size={14} />
          View Full Calendar
        </button>
      </Link>
    </aside>
  );
}
