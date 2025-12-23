"use client";

import Link from "next/link";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Briefcase,
  Users,
  FileText,
  Send,
  ChevronRight,
  Globe,
  Lock,
  Eye,
  Video,
  Download,
  List
} from "lucide-react";
import type { CalendarEvent } from "@/lib/calendar-data";
import { EVENT_TYPES } from "@/lib/calendar-data";

interface EventDetailModalProps {
  event: CalendarEvent | null;
  onClose: () => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  if (!event) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-start justify-between p-6 border-b border-slate-200 border-l-4"
            style={{ borderLeftColor: EVENT_TYPES[event.type].color }}
          >
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-semibold text-slate-900">{event.title}</h2>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
                    event.scope === 'internal'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {event.scope === 'internal' ? (
                    <><Lock size={12} /> Internal</>
                  ) : (
                    <><Globe size={12} /> External</>
                  )}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-slate-600" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Type & Status */}
            <div className="flex gap-2 flex-wrap">
              <span
                className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg text-white"
                style={{ backgroundColor: EVENT_TYPES[event.type].color }}
              >
                {EVENT_TYPES[event.type].label}
              </span>
              {event.confidential && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-100 text-red-800">
                  <Lock size={12} /> Confidential
                </span>
              )}
              {event.isPublic && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-green-100 text-green-800">
                  <Eye size={12} /> Public
                </span>
              )}
            </div>

            {/* Date & Time */}
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <Calendar size={14} /> Date & Time
              </h4>
              <p className="text-base font-semibold text-slate-900">{formatDate(event.date)}</p>
              {event.allDay ? (
                <p className="text-sm text-slate-600">All day</p>
              ) : (
                <p className="text-sm text-slate-600">
                  {event.startTime} {event.endTime && `- ${event.endTime}`}
                </p>
              )}
            </div>

            {/* Location */}
            {event.location && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <MapPin size={14} /> Location
                </h4>
                <p className="text-sm text-slate-900">{event.location}</p>
                {event.webcast && (
                  <p className="flex items-center gap-1.5 text-sm text-green-700 font-medium">
                    <Video size={14} /> Live webcast available
                  </p>
                )}
              </div>
            )}

            {/* Related Case */}
            {event.caseNumber && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <Briefcase size={14} /> Related Case
                </h4>
                <Link
                  href={`/icj/cases/${event.caseId}`}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div>
                    <span className="text-sm font-semibold text-blue-600">No. {event.caseNumber}</span>
                    <p className="text-sm text-slate-900">{event.caseTitle}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
              </div>
            )}

            {/* Participants */}
            {event.participants && event.participants.length > 0 && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <Users size={14} /> Participants
                </h4>
                <div className="space-y-2">
                  {event.participants.map((p, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-lg">
                      {p.state && <div className="font-semibold text-slate-900">{p.state}</div>}
                      {p.role && <div className="text-sm text-slate-600">{p.role}</div>}
                      {p.name && <div className="text-sm text-slate-700">{p.name}</div>}
                      {p.agents && p.agents.map(a => (
                        <div key={a} className="text-sm text-slate-600">{a}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agenda */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <List size={14} /> Agenda
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                  {event.agenda.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Party & Deadline Info */}
            {event.party && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <Clock size={14} /> Deadline For
                </h4>
                <p className="text-sm text-slate-900">
                  <strong>{event.party}</strong> ({event.partyState})
                </p>
              </div>
            )}

            {/* Description */}
            {event.description && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <FileText size={14} /> Description
                </h4>
                <p className="text-sm text-slate-700">{event.description}</p>
              </div>
            )}

            {/* Documents */}
            {event.documents && event.documents.length > 0 && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <FileText size={14} /> Documents
                </h4>
                <div className="space-y-2">
                  {event.documents.map(doc => (
                    <a
                      key={doc.id}
                      href="#"
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-slate-400" />
                        <span className="text-sm text-slate-900">{doc.name}</span>
                      </div>
                      <span className="text-xs font-medium text-slate-500 bg-white px-2 py-1 rounded">
                        {doc.language}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Related Distribution */}
            {event.relatedDistribution && (
              <div className="space-y-2">
                <h4 className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <Send size={14} /> Related Distribution
                </h4>
                <Link
                  href={`/icj/distributions?id=${event.relatedDistribution}`}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <span className="text-sm text-slate-900">View Distribution {event.relatedDistribution}</span>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-4 border-t border-slate-200">
            {event.scope === 'external' && event.type === 'hearing' && (
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                <Download size={16} />
                Download Schedule
              </button>
            )}
            {event.caseId && (
              <Link
                href={`/icj/cases/${event.caseId}`}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Briefcase size={16} />
                Go to Case
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
