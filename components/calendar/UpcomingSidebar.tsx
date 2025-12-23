"use client";

import { Globe, Lock } from "lucide-react";
import type { CalendarEvent } from "@/lib/calendar-data";
import { EVENT_TYPES } from "@/lib/calendar-data";

interface UpcomingSidebarProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

function getRelativeDate(date: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(date);
  eventDate.setHours(0, 0, 0, 0);

  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays > 1 && diffDays <= 7) return 'This Week';
  if (diffDays > 7 && diffDays <= 14) return 'Next Week';
  if (diffDays > 14 && diffDays <= 30) return 'This Month';
  return 'Later';
}

function groupEventsByRelativeDate(events: CalendarEvent[]): Record<string, CalendarEvent[]> {
  const groups: Record<string, CalendarEvent[]> = {
    'Today': [],
    'Tomorrow': [],
    'This Week': [],
    'Next Week': [],
    'This Month': [],
    'Later': []
  };

  events.forEach(event => {
    const group = getRelativeDate(new Date(event.date));
    if (groups[group]) {
      groups[group].push(event);
    }
  });

  // Remove empty groups
  Object.keys(groups).forEach(key => {
    if (groups[key].length === 0) {
      delete groups[key];
    }
  });

  return groups;
}

export function UpcomingSidebar({ events, onEventClick }: UpcomingSidebarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = events
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 10);

  const grouped = groupEventsByRelativeDate(upcoming);

  return (
    <aside className="bg-white border border-slate-200 rounded-xl p-5 sticky top-8">
      <h3 className="text-base font-semibold text-slate-900 mb-5">Upcoming</h3>

      {upcoming.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-8">No upcoming events</p>
      ) : (
        <div className="space-y-5">
          {Object.entries(grouped).map(([label, groupEvents]) => (
            <div key={label} className="space-y-2">
              <h4 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                {label}
              </h4>
              {groupEvents.map(event => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => onEventClick(event)}
                >
                  <div
                    className="w-1 h-10 rounded-full flex-shrink-0"
                    style={{ backgroundColor: EVENT_TYPES[event.type].color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 truncate">
                      {event.title}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      {event.startTime || 'All day'}
                      {event.caseNumber && (
                        <>
                          <span>•</span>
                          <span>No. {event.caseNumber}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {event.scope === 'internal' ? (
                      <Lock size={12} className="text-purple-600" />
                    ) : (
                      <Globe size={12} className="text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Filter by Type */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Filter by Type
        </h4>
        <div className="space-y-2">
          {Object.entries(EVENT_TYPES).map(([key, config]) => (
            <label key={key} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-slate-50 p-1.5 rounded">
              <input type="checkbox" defaultChecked className="rounded" />
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: config.color }}
              />
              <span className="text-slate-700">{config.label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}
