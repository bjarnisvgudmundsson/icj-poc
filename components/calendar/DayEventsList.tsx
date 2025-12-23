"use client";

import { Calendar, ChevronRight, Globe, Lock, MapPin, Video } from "lucide-react";
import type { CalendarEvent } from "@/lib/calendar-data";
import { EVENT_TYPES } from "@/lib/calendar-data";

interface DayEventsListProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function formatDayTitle(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export function DayEventsList({ date, events, onEventClick }: DayEventsListProps) {
  const dayEvents = events
    .filter(e => isSameDay(new Date(e.date), date))
    .sort((a, b) => {
      if (a.allDay && !b.allDay) return -1;
      if (!a.allDay && b.allDay) return 1;
      if (a.startTime && b.startTime) return a.startTime.localeCompare(b.startTime);
      return 0;
    });

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-slate-900">
          {formatDayTitle(date)}
        </h3>
        <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
          {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
        </span>
      </div>

      {dayEvents.length === 0 ? (
        <div className="py-16 text-center">
          <Calendar size={48} className="mx-auto mb-4 text-slate-300" />
          <p className="text-slate-500">No events scheduled</p>
        </div>
      ) : (
        <div className="space-y-3">
          {dayEvents.map(event => (
            <div
              key={event.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 cursor-pointer transition-all border border-slate-200 hover:border-slate-300 hover:shadow-sm"
              onClick={() => onEventClick(event)}
            >
              {/* Color Bar */}
              <div
                className="w-1 h-full rounded-full flex-shrink-0"
                style={{ backgroundColor: EVENT_TYPES[event.type].color }}
              />

              {/* Time */}
              <div className="w-16 flex-shrink-0 pt-1">
                {event.allDay ? (
                  <span className="text-xs text-slate-500">All day</span>
                ) : (
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">{event.startTime}</span>
                    {event.endTime && (
                      <span className="text-xs text-slate-500">- {event.endTime}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="text-sm font-semibold text-slate-900">{event.title}</h4>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full flex-shrink-0 ${
                      event.scope === 'internal'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {event.scope === 'internal' ? (
                      <><Lock size={10} /> Internal</>
                    ) : (
                      <><Globe size={10} /> External</>
                    )}
                  </span>
                </div>

                {event.caseNumber && (
                  <div className="text-xs text-slate-600 mb-2">
                    <span className="font-semibold">No. {event.caseNumber}</span>
                    <span className="mx-1">•</span>
                    <span>{event.caseTitle}</span>
                  </div>
                )}

                {event.location && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-2">
                    <MapPin size={12} />
                    <span>{event.location}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className="text-[11px] font-medium px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: `${EVENT_TYPES[event.type].color}20`,
                      color: EVENT_TYPES[event.type].color
                    }}
                  >
                    {EVENT_TYPES[event.type].label}
                  </span>
                  {event.confidential && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-red-700">
                      <Lock size={10} /> Confidential
                    </span>
                  )}
                  {event.webcast && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-green-700">
                      <Video size={10} /> Webcast
                    </span>
                  )}
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight size={16} className="text-slate-400 flex-shrink-0 mt-1" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
