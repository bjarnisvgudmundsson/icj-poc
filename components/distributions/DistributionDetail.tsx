"use client";

import { useState } from "react";
import { X, FileText, Download, RotateCw, CheckCircle, XCircle, Clock, Mail } from "lucide-react";
import type { Distribution, RecipientDetail } from "@/lib/distributions-data";
import { formatDate } from "@/lib/utils";

interface DistributionDetailProps {
  distribution: Distribution | null;
  onClose: () => void;
}

type RecipientFilter = "all" | "read" | "delivered" | "sent" | "failed";

function getStatusIcon(status: string) {
  switch (status) {
    case "read":
      return <CheckCircle size={14} className="text-green-600" />;
    case "delivered":
      return <Mail size={14} className="text-blue-600" />;
    case "sent":
      return <Clock size={14} className="text-slate-500" />;
    case "failed":
      return <XCircle size={14} className="text-red-600" />;
    default:
      return null;
  }
}

function getStatusLabel(status: string): string {
  switch (status) {
    case "read":
      return "Read";
    case "delivered":
      return "Delivered";
    case "sent":
      return "Sent";
    case "failed":
      return "Failed";
    default:
      return status;
  }
}

export function DistributionDetail({
  distribution,
  onClose,
}: DistributionDetailProps) {
  const [recipientFilter, setRecipientFilter] =
    useState<RecipientFilter>("all");

  if (!distribution) return null;

  const filteredRecipients = distribution.recipientDetails.filter(
    (recipient) => {
      if (recipientFilter === "all") return true;
      return recipient.status === recipientFilter;
    }
  );

  const failedCount = distribution.recipients.failed || 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div className="fixed top-0 right-0 bottom-0 w-[600px] bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-semibold text-slate-900">
                {distribution.id}
              </h2>
              {distribution.confidential && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
                  CONFIDENTIAL
                </span>
              )}
            </div>
            <p className="text-sm text-slate-600 truncate">
              {distribution.subject}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Case Info */}
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Case Information
            </h3>
            <div className="space-y-1">
              <div className="text-sm">
                <span className="text-slate-600">No. </span>
                <span className="font-medium text-slate-900">
                  {distribution.caseNumber}
                </span>
              </div>
              <div className="text-sm text-slate-900">
                {distribution.caseTitle}
              </div>
              {distribution.conventionRef && (
                <div className="text-xs text-slate-600 mt-2">
                  {distribution.conventionRef}
                </div>
              )}
            </div>
          </div>

          {/* Documents */}
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Documents ({distribution.documents.length})
            </h3>
            <div className="space-y-2">
              {distribution.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50"
                >
                  <FileText size={16} className="text-slate-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900">
                      {doc.name}
                    </div>
                    <div className="text-xs text-slate-500">{doc.id}</div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {doc.language}
                  </span>
                  {doc.confidential && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
                      CONF
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Distribution Info */}
          <div className="px-6 py-4 border-b border-slate-100">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Distribution Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-500 mb-1">Created</div>
                <div className="text-sm font-medium text-slate-900">
                  {formatDate(distribution.createdAt)}
                </div>
                <div className="text-xs text-slate-600">
                  {distribution.createdBy}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Sent</div>
                <div className="text-sm font-medium text-slate-900">
                  {distribution.sentAt ? formatDate(distribution.sentAt) : "Not sent"}
                </div>
              </div>
            </div>
            {distribution.excludedParties && distribution.excludedParties.length > 0 && (
              <div className="mt-3">
                <div className="text-xs text-slate-500 mb-1">Excluded Parties</div>
                <div className="text-sm text-slate-900">
                  {distribution.excludedParties.join(", ")}
                </div>
              </div>
            )}
          </div>

          {/* Recipients */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Recipients ({distribution.recipients.total})
              </h3>
              <div className="flex items-center gap-2">
                {failedCount > 0 && (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
                    <RotateCw size={12} />
                    Retry Failed
                  </button>
                )}
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                  <Download size={12} />
                  Export
                </button>
              </div>
            </div>

            {/* Status Overview */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-xs text-green-700 mb-1">Read</div>
                <div className="text-lg font-bold text-green-900">
                  {distribution.recipients.read}
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-xs text-blue-700 mb-1">Delivered</div>
                <div className="text-lg font-bold text-blue-900">
                  {distribution.recipients.delivered}
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-700 mb-1">Sent</div>
                <div className="text-lg font-bold text-slate-900">
                  {distribution.recipients.sent}
                </div>
              </div>
              {failedCount > 0 && (
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-xs text-red-700 mb-1">Failed</div>
                  <div className="text-lg font-bold text-red-900">
                    {failedCount}
                  </div>
                </div>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 mb-4 p-1 bg-slate-100 rounded-lg">
              {[
                { key: "all" as const, label: "All", count: distribution.recipients.total },
                { key: "read" as const, label: "Read", count: distribution.recipients.read },
                { key: "delivered" as const, label: "Delivered", count: distribution.recipients.delivered },
                { key: "sent" as const, label: "Sent", count: distribution.recipients.sent },
                ...(failedCount > 0 ? [{ key: "failed" as const, label: "Failed", count: failedCount }] : []),
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setRecipientFilter(filter.key)}
                  className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    recipientFilter === filter.key
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            {/* Recipients List */}
            <div className="space-y-2">
              {filteredRecipients.map((recipient, idx) => (
                <div
                  key={`${recipient.email}-${idx}`}
                  className="p-3 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      {recipient.state && (
                        <div className="text-sm font-semibold text-slate-900 mb-0.5">
                          {recipient.state}
                        </div>
                      )}
                      {recipient.name && (
                        <div className="text-sm font-medium text-slate-900 mb-0.5">
                          {recipient.name}
                        </div>
                      )}
                      {recipient.role && (
                        <div className="text-xs text-slate-600 mb-0.5">
                          {recipient.role}
                        </div>
                      )}
                      {recipient.agent && (
                        <div className="text-xs text-slate-600 mb-0.5">
                          Agent: {recipient.agent}
                        </div>
                      )}
                      {recipient.org && (
                        <div className="text-xs text-slate-600 mb-0.5">
                          {recipient.org}
                        </div>
                      )}
                      <div className="text-xs text-slate-500">
                        {recipient.email}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {getStatusIcon(recipient.status)}
                      <span
                        className={`text-xs font-medium ${
                          recipient.status === "read"
                            ? "text-green-700"
                            : recipient.status === "delivered"
                            ? "text-blue-700"
                            : recipient.status === "failed"
                            ? "text-red-700"
                            : "text-slate-700"
                        }`}
                      >
                        {getStatusLabel(recipient.status)}
                      </span>
                    </div>
                  </div>
                  {recipient.readAt && (
                    <div className="text-xs text-slate-500">
                      Read: {formatDate(recipient.readAt)}
                    </div>
                  )}
                  {recipient.error && (
                    <div className="mt-2 p-2 bg-red-50 rounded text-xs text-red-700">
                      <span className="font-semibold">Error:</span> {recipient.error}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredRecipients.length === 0 && (
              <div className="py-8 text-center text-sm text-slate-500">
                No recipients match this filter
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
