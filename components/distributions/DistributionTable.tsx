"use client";

import { ChevronRight } from "lucide-react";
import type { Distribution } from "@/lib/distributions-data";
import { formatDate } from "@/lib/utils";

interface DistributionTableProps {
  distributions: Distribution[];
  onSelectDistribution: (distribution: Distribution) => void;
}

function getTypeLabel(type: string, subType: string): string {
  if (type === "external") {
    if (subType === "circular") return "Circular";
    if (subType === "parties") return "Parties";
    if (subType === "art63") return "Art. 63";
    if (subType === "art34") return "Art. 34";
  }
  if (type === "internal") {
    if (subType === "internal-judges") return "Internal - Judges";
    if (subType === "internal-staff") return "Internal - Staff";
  }
  return subType;
}

export function DistributionTable({
  distributions,
  onSelectDistribution,
}: DistributionTableProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                ID
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Subject
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Type
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Case
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Read
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Date
              </th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            {distributions.map((dist) => {
              const readPercentage = Math.round(
                (dist.recipients.read / dist.recipients.total) * 100
              );

              return (
                <tr
                  key={dist.id}
                  onClick={() => onSelectDistribution(dist)}
                  className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  {/* ID */}
                  <td className="px-4 py-4">
                    <span className="text-sm font-semibold text-slate-900">
                      {dist.id}
                    </span>
                    {dist.confidential && (
                      <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-100 text-red-700">
                        CONF
                      </span>
                    )}
                  </td>

                  {/* Subject */}
                  <td className="px-4 py-4 max-w-md">
                    <div className="text-sm font-medium text-slate-900 truncate">
                      {dist.subject}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {dist.documents.length} document
                      {dist.documents.length !== 1 ? "s" : ""}
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`inline-flex items-center text-[11px] font-semibold px-2 py-1 rounded-md w-fit ${
                          dist.type === "external"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {dist.type === "external" ? "External" : "Internal"}
                      </span>
                      <span className="text-xs text-slate-600">
                        {getTypeLabel(dist.type, dist.subType)}
                      </span>
                    </div>
                  </td>

                  {/* Case */}
                  <td className="px-4 py-4">
                    <div className="text-sm text-slate-900">
                      No. {dist.caseNumber}
                    </div>
                    <div className="text-xs text-slate-500 max-w-[200px] truncate">
                      {dist.caseTitle}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                        dist.status === "sent"
                          ? "bg-green-100 text-green-800"
                          : dist.status === "partial"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {dist.status === "sent"
                        ? "Sent"
                        : dist.status === "partial"
                        ? "Partial"
                        : "Pending"}
                    </span>
                  </td>

                  {/* Read Progress */}
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1.5 min-w-[120px]">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600">
                          {dist.recipients.read}/{dist.recipients.total}
                        </span>
                        <span className="font-semibold text-slate-900">
                          {readPercentage}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 transition-all"
                          style={{ width: `${readPercentage}%` }}
                        />
                      </div>
                      {dist.recipients.failed > 0 && (
                        <span className="text-[10px] text-red-600 font-medium">
                          {dist.recipients.failed} failed
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-4 py-4">
                    <div className="text-sm text-slate-900">
                      {dist.sentAt ? formatDate(dist.sentAt) : "-"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {dist.createdBy}
                    </div>
                  </td>

                  {/* Arrow */}
                  <td className="px-4 py-4">
                    <ChevronRight size={16} className="text-slate-400" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {distributions.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-slate-400 mb-2">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              No distributions found
            </h3>
            <p className="text-sm text-slate-500">
              Create a new distribution to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
