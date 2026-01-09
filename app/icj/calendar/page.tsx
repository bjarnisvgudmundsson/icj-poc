"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Page } from "@/components/layout/Page";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { DayEventsList } from "@/components/calendar/DayEventsList";
import { UpcomingSidebar } from "@/components/calendar/UpcomingSidebar";
import { EventDetailModal } from "@/components/calendar/EventDetailModal";
import { NewEventModal } from "@/components/calendar/NewEventModal";
import { Button } from "@/components/ui/button";
import { MOCK_EVENTS, type CalendarEvent } from "@/lib/calendar-data";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showNewEventModal, setShowNewEventModal] = useState(false);

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseEventDetail = () => {
    setSelectedEvent(null);
  };

  const handleSaveNewEvent = (data: any) => {
    console.log("Creating new event:", data);
    // In a real app, this would make an API call
    setShowNewEventModal(false);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <AppShell>
      <Page title="Calendar">
        <div className="min-h-screen bg-slate-50">
          <div className="max-w-[1600px] mx-auto px-8 py-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-slate-900">Calendar</h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToday}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
                >
                  Today
                </button>
                <Button
                  onClick={() => setShowNewEventModal(true)}
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  New Event
                </Button>
              </div>
            </div>

            {/* Main Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr_280px] gap-6">
              {/* Calendar Grid */}
              <div className="lg:col-span-1">
                <CalendarGrid
                  events={MOCK_EVENTS}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                />
              </div>

              {/* Day Events List */}
              <div>
                <DayEventsList
                  date={selectedDate}
                  events={MOCK_EVENTS}
                  onEventClick={handleEventClick}
                />
              </div>

              {/* Upcoming Sidebar */}
              <div className="hidden lg:block">
                <UpcomingSidebar
                  events={MOCK_EVENTS}
                  onEventClick={handleEventClick}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Event Detail Modal */}
        <EventDetailModal
          event={selectedEvent}
          onClose={handleCloseEventDetail}
        />

        {/* New Event Modal */}
        <NewEventModal
          isOpen={showNewEventModal}
          onClose={() => setShowNewEventModal(false)}
          onSave={handleSaveNewEvent}
        />
      </Page>
    </AppShell>
  );
}
