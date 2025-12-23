"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  X,
  FileText,
  Paperclip,
  Eye,
  Download,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Shield,
  Check
} from "lucide-react";
import type { Notification, Attachment } from "@/lib/notifications-data";
import { formatDate } from "@/lib/utils";
import { MockDocumentViewer } from "./MockDocumentViewer";

interface EnvelopeModalProps {
  notification: Notification;
  onClose: () => void;
  onAcknowledge: (notificationId: string) => void;
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export function EnvelopeModal({ notification, onClose, onAcknowledge }: EnvelopeModalProps) {
  const [isOpening, setIsOpening] = useState(true);
  const [activeAttachment, setActiveAttachment] = useState<Attachment | null>(null);
  const [showViewer, setShowViewer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpening(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const openDocument = (attachment: Attachment) => {
    setActiveAttachment(attachment);
    setShowViewer(true);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-10"
      onClick={onClose}
    >
      <div
        className={`w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex transition-all duration-600 ${
          showViewer ? 'max-w-[1400px]' : 'max-w-[800px]'
        } ${
          isOpening ? 'scale-90 rotate-x-10' : 'scale-100 rotate-x-0'
        }`}
        onClick={e => e.stopPropagation()}
        style={{ transformStyle: 'preserve-3d', maxHeight: '90vh' }}
      >
        <div className={`flex flex-col overflow-hidden ${showViewer ? 'w-[700px]' : 'w-full'} flex-shrink-0`}>
          <div
            className={`h-0 bg-gradient-to-br from-[#1e3a5f] to-[#2d5a87] transition-all duration-300 ${
              isOpening ? 'h-[60px]' : 'h-0'
            }`}
          />

          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex items-center gap-4 px-6 py-5 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] text-white">
              <div className="flex-1">
                <div className="text-base font-semibold">International Court of Justice</div>
                <div className="text-xs opacity-80">Cour internationale de Justice</div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
              <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] rounded-t-lg" />

                <div className="flex items-center justify-between mb-5">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded uppercase tracking-wide ${
                    notification.type === 'order' ? 'bg-blue-50 text-blue-700' :
                    notification.type === 'pv' ? 'bg-purple-50 text-purple-700' :
                    notification.type === 'circular' ? 'bg-emerald-50 text-emerald-700' :
                    notification.type === 'letter' ? 'bg-amber-50 text-amber-700' :
                    notification.type === 'agenda' ? 'bg-sky-50 text-sky-700' :
                    'bg-slate-50 text-slate-700'
                  }`}>
                    {notification.type}
                  </span>
                  {notification.priority === 'urgent' && (
                    <span className="text-xs font-extrabold text-red-600 border-2 border-red-600 px-3 py-1 rounded transform -rotate-3">
                      URGENT
                    </span>
                  )}
                </div>

                <h1 className="text-xl font-bold text-slate-900 text-center mb-2">
                  {notification.letterPreview?.title || notification.subject}
                </h1>

                {notification.letterPreview?.subtitle && (
                  <h2 className="text-base font-medium text-slate-600 text-center mb-5">
                    {notification.letterPreview.subtitle}
                  </h2>
                )}

                {notification.relatedCase && (
                  <div className="flex gap-2 p-3 bg-slate-50 rounded-md mb-5">
                    <span className="text-xs font-semibold text-slate-500">Re:</span>
                    <div className="flex-1">
                      <div className="text-sm text-slate-900 font-medium">
                        {notification.relatedCase.shortTitle}
                      </div>
                      <div className="text-xs text-slate-600 italic">
                        ({notification.relatedCase.parties})
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap mb-6">
                  {notification.letterPreview?.body || notification.summary}
                </div>

                {notification.letterPreview?.signature && (
                  <div className="text-sm text-slate-900 whitespace-pre-wrap text-right mt-8 mb-4">
                    {notification.letterPreview.signature}
                  </div>
                )}

                <div className="text-sm text-slate-500 text-right">
                  {notification.letterPreview?.date || formatDate(notification.transmittedAt, 'MMMM d, yyyy')}
                </div>
              </div>

              <div className="mt-5 bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <Paperclip size={14} />
                  <span>Attachments ({notification.attachments.length})</span>
                </div>

                <div className="flex flex-col gap-2">
                  {notification.attachments.map(attachment => (
                    <div
                      key={attachment.id}
                      className={`flex items-center gap-3 p-3 bg-slate-50 border rounded-lg cursor-pointer transition-all ${
                        activeAttachment?.id === attachment.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-blue-400'
                      }`}
                      onClick={() => openDocument(attachment)}
                    >
                      <div className="relative flex items-center justify-center w-10 h-10 bg-white rounded-lg text-red-600 border border-slate-200 flex-shrink-0">
                        <FileText size={20} />
                        <span className="absolute -bottom-1 -right-1 text-[8px] font-bold px-1 py-0.5 bg-red-500 text-white rounded">
                          {attachment.type.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-slate-900">
                          {attachment.name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {attachment.language} • {attachment.pages}p • {attachment.size}
                        </div>
                      </div>
                      <button
                        className="p-1.5 bg-white border border-slate-200 rounded hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDocument(attachment);
                        }}
                      >
                        <Eye size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 bg-white border border-slate-200 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-semibold text-slate-500 w-24">Transmitted:</span>
                  <span className="text-slate-700">
                    {formatDate(notification.transmittedAt, 'MMMM d, yyyy')} at {formatTime(notification.transmittedAt)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="font-semibold text-slate-500 w-24">From:</span>
                  <span className="text-slate-700">
                    {notification.transmittedBy.name}
                    {notification.transmittedBy.signedBy && ` — ${notification.transmittedBy.signedBy}`}
                  </span>
                </div>
                {notification.relatedCase && (
                  <div className="flex gap-2">
                    <span className="font-semibold text-slate-500 w-24">Related Case:</span>
                    <Link
                      href={`/icj/cases/${notification.relatedCase.id}`}
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      No. {notification.relatedCase.number} — {notification.relatedCase.shortTitle}
                      <ExternalLink size={10} />
                    </Link>
                  </div>
                )}
                {notification.relatedMeeting && (
                  <div className="flex gap-2">
                    <span className="font-semibold text-slate-500 w-24">Related Meeting:</span>
                    <Link
                      href={`/icj/meetings`}
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      {notification.relatedMeeting.type} Meeting — {formatDate(notification.relatedMeeting.date)}
                      <ExternalLink size={10} />
                    </Link>
                  </div>
                )}
              </div>

              {notification.requiresAction && (
                <div className="mt-5 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold">Action Required</div>
                    <div className="text-xs mt-0.5">{notification.actionRequired}</div>
                  </div>
                </div>
              )}

              <div className="mt-5 bg-white border border-slate-200 rounded-lg p-5">
                {notification.status === 'acknowledged' ? (
                  <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800">
                    <CheckCircle size={20} className="flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold">Receipt Acknowledged</div>
                      <div className="text-xs mt-0.5">
                        {formatDate(notification.acknowledgedAt!, 'MMMM d, yyyy')} at {formatTime(notification.acknowledgedAt!)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600 justify-center">
                      <Shield size={16} />
                      <span>By acknowledging, you confirm formal receipt of this document.</span>
                    </div>
                    <button
                      onClick={() => onAcknowledge(notification.id)}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                    >
                      <Check size={18} />
                      Acknowledge Receipt
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showViewer && activeAttachment && (
          <div className="flex-1 min-w-[500px] border-l border-slate-200 bg-[#525659] flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-[#3c3f41] text-white border-b border-[#2d2d2d]">
              <span className="text-xs font-medium truncate">{activeAttachment.name}</span>
              <button
                onClick={() => setShowViewer(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <MockDocumentViewer document={activeAttachment} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
