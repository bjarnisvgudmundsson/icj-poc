"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CalendarEvent } from "@/lib/calendar-data";
import { EVENT_TYPES } from "@/lib/calendar-data";

interface CalendarGridProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getFirstDayOfMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function CalendarGrid({ events, selectedDate, onDateSelect }: CalendarGridProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);

  const getEventsForDate = (date: Date) => {
    return events.filter(e => {
      const eventDate = new Date(e.date);
      return isSameDay(eventDate, date);
    });
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} className="text-slate-600" />
        </button>
        <h2 className="text-lg font-semibold text-slate-900">
          {formatMonthYear(currentMonth)}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronRight size={20} className="text-slate-600" />
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-xs font-semibold text-slate-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for days before month starts */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Days of the month */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
          const dayEvents = getEventsForDate(date);
          const isSelected = isSameDay(date, selectedDate);
          const isToday = isSameDay(date, new Date());

          return (
            <div
              key={i}
              className={`aspect-square p-2 rounded-lg cursor-pointer transition-all flex flex-col ${
                isSelected
                  ? 'bg-blue-500 text-white'
                  : isToday
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'hover:bg-slate-50'
              }`}
              onClick={() => onDateSelect(date)}
            >
              <span className={`text-sm font-medium mb-auto ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                {i + 1}
              </span>

              {dayEvents.length > 0 && (
                <div className="flex gap-1 flex-wrap mt-1">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className={`w-2 h-2 rounded-full ${event.scope === 'internal' ? 'opacity-60' : ''}`}
                      style={{ backgroundColor: EVENT_TYPES[event.type].color }}
                      title={event.title}
                    />
                  ))}
                  {dayEvents.length > 3 && (
                    <span className={`text-[10px] ${isSelected ? 'text-white' : 'text-slate-500'}`}>
                      +{dayEvents.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-5 pt-5 border-t border-slate-200">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="w-3 h-3 rounded-full bg-blue-500" />
          <span>External</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span className="w-3 h-3 rounded-full bg-purple-500 opacity-60" />
          <span>Internal</span>
        </div>
      </div>
    </div>
  );
}
