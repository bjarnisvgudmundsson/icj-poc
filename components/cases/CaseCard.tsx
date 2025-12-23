"use client";

import Link from "next/link";
import { Calendar, FileText, Clock } from "lucide-react";
import type { CaseOverview } from "@/lib/cases-data";
import { formatDate } from "@/lib/utils";

interface CaseCardProps {
  caseItem: CaseOverview;
}

function getDaysUntil(dateStr: string): number {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
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

function getUrgency(dateStr: string): 'overdue' | 'urgent' | 'soon' | 'normal' {
  const days = getDaysUntil(dateStr);
  if (days < 0) return 'overdue';
  if (days <= 7) return 'urgent';
  if (days <= 14) return 'soon';
  return 'normal';
}

function formatApprovalDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;

  const months = Math.floor(diffDays / 30);
  return `${months}mo ago`;
}

export function CaseCard({ caseItem }: CaseCardProps) {
  const urgency = caseItem.nextDeadline ? getUrgency(caseItem.nextDeadline.date) : 'normal';

  return (
    <Link href={`/icj/cases/${caseItem.id}`} className="h-full">
      <div className="h-full flex flex-col bg-white border border-slate-200 rounded-lg p-3.5 cursor-pointer transition-all hover:border-blue-400 hover:shadow-md gap-2">
        {/* Header - Case Number + Stage */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[13px] font-bold text-blue-600">
              No. {caseItem.number}
            </span>
            <span className="text-[11px] text-slate-400">
              {caseItem.year}
            </span>
          </div>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase tracking-wide ${
              caseItem.stage === "initiation"
                ? "bg-sky-100 text-sky-700"
                : caseItem.stage === "written"
                ? "bg-amber-50 text-amber-700"
                : caseItem.stage === "oral"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-purple-50 text-purple-700"
            }`}
          >
            {caseItem.stageLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-slate-900 leading-tight min-h-[34px]">
          {caseItem.shortTitle}
        </h3>

        {/* Parties - NO FLAGS, just text */}
        <div className="text-[13px] text-slate-600">
          {caseItem.isAdvisory ? (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                Advisory Opinion
              </span>
              <span>{caseItem.parties.applicant.state}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="font-medium">{caseItem.parties.applicant.state}</span>
              <span className="text-[11px] text-slate-400">v.</span>
              <span className="font-medium">{caseItem.parties.respondent?.state}</span>
            </div>
          )}
        </div>

        {/* Phase Progress - Compact inline */}
        <div className="flex items-center gap-2 py-1.5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide w-[38px]">
            Phase
          </span>
          <div className="flex gap-0.5 flex-1">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`h-0.5 flex-1 rounded-full ${
                  step < caseItem.phaseProgress
                    ? 'bg-emerald-500'
                    : step === caseItem.phaseProgress
                    ? 'bg-blue-500'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-slate-700 w-[85px] text-right">
            {caseItem.currentPhase}
          </span>
        </div>

        {/* Stats Row - inline, compact */}
        <div className="flex items-center gap-2.5 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            Filed {formatDate(caseItem.dateFiled)}
          </span>
          <span className="flex items-center gap-1">
            {caseItem.documentsCount} docs
          </span>
          {caseItem.hasProvisionalMeasures && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-50 text-red-700">
              PM
            </span>
          )}
          {caseItem.hasPreliminaryObjections && (
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">
              PO
            </span>
          )}
        </div>

        {/* Approval Status - CLEARER */}
        {caseItem.pendingApproval ? (
          <div className="flex items-center gap-1.5 px-2 py-1.5 bg-amber-50 rounded text-[11px] text-amber-900">
            <span>⏳</span>
            <span className="font-medium">Awaiting Registrar approval</span>
            <span className="ml-auto opacity-80 truncate max-w-[120px]">
              {caseItem.pendingApproval.item}
            </span>
          </div>
        ) : caseItem.lastApproval ? (
          <div className="flex items-center gap-1.5 px-2 py-1.5 bg-emerald-50 rounded text-[11px] text-emerald-900">
            <span>✓</span>
            <span className="font-medium">
              Approved by Registrar • {formatApprovalDate(caseItem.lastApproval.date)}
            </span>
            <span className="ml-auto text-[10px] px-1.5 py-0.5 bg-emerald-900/10 rounded">
              {caseItem.lastApproval.signatureType === 'electronic' ? 'E-signed' : 'Signed'}
            </span>
          </div>
        ) : null}

        {/* Divider */}
        <div className="h-px bg-slate-100 my-0.5" />

        {/* Next Milestone - compact */}
        {caseItem.nextDeadline && (
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                Next Milestone
              </span>
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                  urgency === 'overdue'
                    ? 'bg-red-50 text-red-700'
                    : urgency === 'urgent'
                    ? 'bg-amber-50 text-amber-700'
                    : urgency === 'soon'
                    ? 'bg-sky-50 text-sky-700'
                    : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                {getDaysLabel(caseItem.nextDeadline.date)}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-medium text-slate-900">
                {caseItem.nextDeadline.label}
              </span>
              <span className="text-[11px] text-slate-500">
                {formatDate(caseItem.nextDeadline.date)}
                {caseItem.nextDeadline.party && ` • ${caseItem.nextDeadline.party}`}
              </span>
            </div>
          </div>
        )}

        {/* Pending Actions - SAME FORMAT as milestone */}
        {caseItem.pendingActions > 0 && (
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                Pending Actions
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-red-50 text-red-700 rounded-full">
                {caseItem.pendingActions}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              {caseItem.pendingActionsList?.slice(0, 2).map(action => (
                <span key={action.id} className="text-xs text-slate-700 flex items-center gap-1.5">
                  <span className="text-[10px] text-red-600">•</span>
                  {action.label}
                </span>
              ))}
              {caseItem.pendingActions > 2 && (
                <span className="text-[11px] text-slate-500 italic">
                  +{caseItem.pendingActions - 2} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
