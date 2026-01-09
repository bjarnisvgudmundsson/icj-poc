"use client";

import { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Page } from "@/components/layout/Page";
import {
  Plus,
  Search,
  MapPin,
  FileText,
  Users,
  Lock,
  ChevronRight,
  Send,
  Edit,
  AlertCircle,
  Calendar
} from "lucide-react";
import {
  MOCK_MEETINGS,
  MOCK_PVS,
  MEETING_TYPES,
  type Meeting,
  type PVListItem
} from "@/lib/meetings-data";
import { formatDate } from "@/lib/utils";

function formatRelative(dateStr: string): string {
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

function MeetingCard({ meeting }: { meeting: Meeting }) {
  const isPast = meeting.status === 'completed';
  const isConfidential = meeting.confidential;

  return (
    <div className={`bg-white border rounded-lg p-4 transition-all hover:border-slate-300 ${
      isConfidential ? 'border-l-[3px] border-l-purple-500' : 'border-slate-200'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-900">
            {formatDate(meeting.date, 'EEE, MMM d, yyyy')}
          </span>
          <span className="text-xs text-slate-500">
            {meeting.time}{meeting.endTime && ` - ${meeting.endTime}`}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-semibold px-2 py-1 rounded uppercase ${
            meeting.type === 'administrative'
              ? 'bg-amber-50 text-amber-700'
              : meeting.type === 'judicial'
              ? 'bg-purple-50 text-purple-700'
              : 'bg-sky-50 text-sky-700'
          }`}>
            {MEETING_TYPES[meeting.type].label}
          </span>
          {meeting.status === 'completed' && (
            <span className="text-[10px] font-semibold px-2 py-1 rounded bg-emerald-50 text-emerald-700">
              ✓ Completed
            </span>
          )}
          {isConfidential && (
            <span className="text-[10px] font-semibold px-2 py-1 rounded bg-slate-100 text-slate-600 flex items-center gap-1">
              <Lock size={10} /> Confidential
            </span>
          )}
        </div>
      </div>

      {/* Title & Location */}
      <h3 className="text-sm font-semibold text-slate-900 mb-1.5">{meeting.title}</h3>
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
        <MapPin size={12} />
        <span>{meeting.location}</span>
      </div>

      {/* Related Case */}
      {meeting.relatedCase && (
        <Link
          href={`/icj/cases/${meeting.relatedCase.id}`}
          className="flex items-center gap-2 p-2 bg-slate-50 rounded-md mb-3 hover:bg-slate-100 transition-colors"
        >
          <span className="text-xs font-semibold text-blue-600">
            No. {meeting.relatedCase.number}
          </span>
          <span className="text-xs text-slate-700 flex-1">
            {meeting.relatedCase.shortTitle}
          </span>
          <ChevronRight size={12} className="text-slate-400" />
        </Link>
      )}

      {/* Agenda Status */}
      {meeting.agenda && (
        <div className="py-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs">
            <FileText size={12} className="text-slate-400" />
            <span className="font-semibold text-slate-500">Agenda:</span>
            {meeting.agenda.status === 'distributed' ? (
              <>
                <span className="text-slate-600 flex-1">
                  Distributed {formatRelative(meeting.agenda.distributedAt!)}
                </span>
                <span className="text-[11px] font-semibold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                  {meeting.agenda.readStatus!.read}/{meeting.agenda.readStatus!.total} read
                </span>
                <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                  View
                </button>
              </>
            ) : meeting.agenda.status === 'draft' ? (
              <span className="text-amber-600">Draft - Not distributed</span>
            ) : (
              <span className="text-slate-500">Pending</span>
            )}
          </div>
        </div>
      )}

      {/* Agenda Items Preview */}
      {meeting.agenda?.items && meeting.agenda.items.length > 0 && !isPast && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="text-[10px] font-semibold text-slate-400 uppercase mb-2">
            Agenda Items ({meeting.agenda.items.length})
          </div>
          <div className="space-y-1.5">
            {meeting.agenda.items.map(item => (
              <div
                key={item.id}
                className={`flex items-start gap-2 text-xs p-2 rounded-md ${
                  item.confidential ? 'bg-purple-50' : 'bg-slate-50'
                }`}
              >
                <span className="font-semibold text-slate-500 w-5">{item.number}.</span>
                <div className="flex-1 min-w-0">
                  {item.confidential ? (
                    <span className="text-purple-700 flex items-center gap-1.5">
                      <Lock size={10} /> {item.title}
                    </span>
                  ) : (
                    <span className="text-slate-700">{item.title}</span>
                  )}
                  {item.relatedCase && (
                    <Link
                      href={`/icj/cases/${item.relatedCase.id}`}
                      className="block mt-0.5 text-[11px] text-blue-600 hover:text-blue-700"
                    >
                      → {item.relatedCase.parties}
                    </Link>
                  )}
                </div>
                {item.confidential && (
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded whitespace-nowrap">
                    {item.confidentialReason}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PV Status */}
      {isPast && meeting.pv && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs">
            <FileText size={12} className="text-slate-400" />
            <span className="font-semibold text-slate-500">PV {meeting.pv.number}:</span>
            {meeting.pv.status === 'distributed' ? (
              <>
                <span className="text-slate-600 flex-1">
                  Created {formatRelative(meeting.pv.createdAt!)} •
                  Distributed {formatRelative(meeting.pv.distributedAt!)}
                </span>
                <span className="text-[11px] font-semibold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                  {meeting.pv.readStatus!.read}/{meeting.pv.readStatus!.total} read
                </span>
              </>
            ) : meeting.pv.status === 'restricted' ? (
              <span className="text-purple-600 flex items-center gap-1">
                <Lock size={10} /> Restricted access
              </span>
            ) : (
              <span className="text-amber-600">Draft - Under review</span>
            )}
            <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
              View PV
            </button>
          </div>
        </div>
      )}

      {/* Decisions Summary */}
      {isPast && meeting.pv?.decisions && meeting.pv.decisions.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="text-[10px] font-semibold text-slate-400 uppercase mb-2">
            Decisions:
          </div>
          <ul className="space-y-1 text-xs text-slate-700">
            {meeting.pv.decisions.map(decision => (
              <li key={decision.id} className="flex items-start gap-1.5">
                <span className="text-slate-400">•</span>
                <span className="flex-1">
                  {decision.summary}
                  {decision.relatedCase && (
                    <Link
                      href={`/icj/cases/${decision.relatedCase.id}`}
                      className="ml-1 text-blue-600 hover:text-blue-700"
                    >
                      (No. {decision.relatedCase.number})
                    </Link>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Attendees */}
      {meeting.attendees && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
          <Users size={12} />
          {meeting.status === 'completed' ? (
            <span>
              {meeting.attendees.present} present
              {meeting.attendees.absent! > 0 && `, ${meeting.attendees.absent} absent`}
            </span>
          ) : (
            <span>
              {meeting.attendees.confirmed}/{meeting.attendees.total} confirmed
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      {(meeting.status === 'scheduled' || (meeting.status === 'completed' && !meeting.pv)) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
          {meeting.status === 'scheduled' && !meeting.agenda?.items?.length && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors">
              <Edit size={12} /> Prepare Agenda
            </button>
          )}
          {meeting.status === 'scheduled' && meeting.agenda?.status === 'draft' && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
              <Send size={12} /> Distribute Agenda
            </button>
          )}
          {meeting.status === 'completed' && !meeting.pv && (
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
              <FileText size={12} /> Create PV
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function PVCard({ pv }: { pv: PVListItem }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 cursor-pointer hover:border-blue-400 transition-all">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="font-bold text-sm text-slate-900 mb-0.5">PV {pv.number}</div>
          <div className="text-xs text-slate-500">
            Meeting of {formatDate(pv.meetingDate, 'MMM d, yyyy')}
          </div>
        </div>
        <span className={`text-[10px] font-semibold px-2 py-1 rounded uppercase ${
          pv.meetingType === 'administrative'
            ? 'bg-amber-50 text-amber-700'
            : pv.meetingType === 'judicial'
            ? 'bg-purple-50 text-purple-700'
            : 'bg-sky-50 text-sky-700'
        }`}>
          {MEETING_TYPES[pv.meetingType].label}
        </span>
      </div>

      <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-2">
        <span>{pv.decisionsCount} decisions</span>
        {pv.relatedCases.length > 0 && (
          <>
            <span className="text-slate-300">•</span>
            <span>Cases: {pv.relatedCases.map(c => `No. ${c}`).join(', ')}</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
        <span className={`text-[10px] font-semibold px-2 py-1 rounded ${
          pv.status === 'distributed'
            ? 'bg-emerald-50 text-emerald-700'
            : 'bg-slate-100 text-slate-600'
        }`}>
          {pv.status === 'distributed' ? 'Distributed' : pv.status}
        </span>
        {pv.readStatus && (
          <span className="text-[11px] font-semibold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
            {pv.readStatus.read}/{pv.readStatus.total} read
          </span>
        )}
        {pv.hasConfidentialSections && (
          <span className="text-[10px] text-purple-600 flex items-center gap-1 ml-auto">
            <Lock size={10} /> Has restricted sections
          </span>
        )}
      </div>
    </div>
  );
}

export default function MeetingsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'agendas' | 'pv'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const upcomingMeetings = MOCK_MEETINGS.filter(m => m.status === 'scheduled');
  const pastMeetings = MOCK_MEETINGS.filter(m => m.status === 'completed');

  const pendingActions = MOCK_MEETINGS.filter(m =>
    (m.status === 'scheduled' && m.agenda?.status === 'draft') ||
    (m.status === 'completed' && !m.pv)
  );

  const casesOnAgenda = Array.from(
    new Set(
      MOCK_MEETINGS
        .filter(m => m.status === 'scheduled')
        .flatMap(m => m.agenda?.items || [])
        .filter(item => item.relatedCase)
        .map(item => JSON.stringify({
          id: item.relatedCase!.id,
          number: item.relatedCase!.number,
          shortTitle: item.relatedCase!.shortTitle
        }))
    )
  ).map(str => JSON.parse(str));

  return (
    <AppShell>
      <Page title="Meetings">
        <div className="min-h-screen bg-slate-50">
          <div className="max-w-[1400px] mx-auto px-8 py-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-slate-900">
                Administrative and Judicial Meetings
              </h1>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                <Plus size={16} /> Schedule Meeting
              </button>
            </div>

            {/* Tabs & Search */}
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-200">
              <div className="flex gap-1">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'upcoming'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Upcoming
                  <span className={`ml-2 text-[11px] px-2 py-0.5 rounded-full ${
                    activeTab === 'upcoming'
                      ? 'bg-white/20'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {upcomingMeetings.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'past'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Past Meetings
                </button>
                <button
                  onClick={() => setActiveTab('agendas')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'agendas'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Agendas
                </button>
                <button
                  onClick={() => setActiveTab('pv')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === 'pv'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Procès-Verbaux
                </button>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg w-72">
                <Search size={14} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search meetings, agenda items, decisions..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 text-sm border-none outline-none"
                />
              </div>
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
              {/* Main Content */}
              <div className="space-y-4">
                {activeTab === 'upcoming' && upcomingMeetings.map(meeting => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}

                {activeTab === 'past' && pastMeetings.map(meeting => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))}

                {activeTab === 'pv' && (
                  <div className="space-y-3">
                    {MOCK_PVS.map(pv => (
                      <PVCard key={pv.id} pv={pv} />
                    ))}
                  </div>
                )}

                {activeTab === 'agendas' && (
                  <div className="space-y-3">
                    {MOCK_MEETINGS.filter(m => m.agenda).map(meeting => (
                      <div key={meeting.id} className="bg-white border border-slate-200 rounded-lg p-3.5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-slate-900">
                            {meeting.title} • {formatDate(meeting.date, 'MMM d, yyyy')}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-1 rounded ${
                            meeting.agenda!.status === 'distributed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : meeting.agenda!.status === 'draft'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {meeting.agenda!.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span>{meeting.agenda!.items?.length || 0} items</span>
                          {meeting.agenda!.items?.filter(i => i.confidential).length > 0 && (
                            <>
                              <span className="text-slate-300">•</span>
                              <span className="flex items-center gap-1 text-purple-600">
                                <Lock size={10} />
                                {meeting.agenda!.items.filter(i => i.confidential).length} restricted
                              </span>
                            </>
                          )}
                        </div>
                        {meeting.agenda!.status === 'distributed' && meeting.agenda!.readStatus && (
                          <div className="mt-2 text-xs text-slate-500">
                            Distributed {formatRelative(meeting.agenda!.distributedAt!)} •
                            {meeting.agenda!.readStatus.read}/{meeting.agenda!.readStatus.total} read
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
                {/* Stats */}
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">
                    This Month
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">4</div>
                      <div className="text-[11px] text-slate-500">Meetings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">3</div>
                      <div className="text-[11px] text-slate-500">PVs Distributed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">12</div>
                      <div className="text-[11px] text-slate-500">Decisions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">1</div>
                      <div className="text-[11px] text-slate-500">Pending Agenda</div>
                    </div>
                  </div>
                </div>

                {/* Next Meeting */}
                {upcomingMeetings[0] && (
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">
                      Next Meeting
                    </h3>
                    <div className="space-y-1.5">
                      <div className="text-sm font-semibold text-slate-900">
                        {formatDate(upcomingMeetings[0].date, 'EEE, MMM d')}
                      </div>
                      <div className="text-xs text-slate-500">{upcomingMeetings[0].time}</div>
                      <div className="text-sm text-slate-700 mt-2">{upcomingMeetings[0].title}</div>
                      {upcomingMeetings[0].agenda?.status === 'draft' && (
                        <div className="flex items-center gap-1.5 mt-2 p-2 bg-amber-50 rounded-md text-[11px] text-amber-800">
                          <AlertCircle size={12} />
                          Agenda not yet distributed
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Pending Actions */}
                {pendingActions.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">
                      Pending Actions
                    </h3>
                    <div className="space-y-2">
                      {pendingActions.map(m => (
                        <div key={m.id} className="flex items-center gap-2 text-xs text-slate-700 p-2 bg-slate-50 rounded-md">
                          {m.status === 'scheduled' && m.agenda?.status === 'draft' ? (
                            <>
                              <Edit size={12} className="text-slate-400" />
                              <span>Prepare agenda for {formatDate(m.date, 'MMM d')}</span>
                            </>
                          ) : (
                            <>
                              <FileText size={12} className="text-slate-400" />
                              <span>Create PV for {formatDate(m.date, 'MMM d')}</span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cases on Upcoming Agendas */}
                {casesOnAgenda.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">
                      Cases on Upcoming Agendas
                    </h3>
                    <div className="space-y-1.5">
                      {casesOnAgenda.map(c => (
                        <Link
                          key={c.id}
                          href={`/icj/cases/${c.id}`}
                          className="flex flex-col p-2 bg-slate-50 rounded-md hover:bg-slate-100 transition-colors"
                        >
                          <span className="text-xs font-semibold text-blue-600">
                            No. {c.number}
                          </span>
                          <span className="text-[11px] text-slate-600">{c.shortTitle}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Page>
    </AppShell>
  );
}
