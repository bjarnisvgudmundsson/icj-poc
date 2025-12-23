"use client";

import { useState } from "react";
import { X, Globe, Lock, Plus } from "lucide-react";
import { EVENT_TYPES } from "@/lib/calendar-data";
import { MOCK_CASES } from "@/lib/cases-data";

interface NewEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function NewEventModal({ isOpen, onClose, onSave }: NewEventModalProps) {
  const [eventType, setEventType] = useState('deadline');
  const [scope, setScope] = useState<'external' | 'internal'>('external');
  const [title, setTitle] = useState('');
  const [caseId, setCaseId] = useState('');
  const [date, setDate] = useState('');
  const [allDay, setAllDay] = useState(true);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [confidential, setConfidential] = useState(false);

  if (!isOpen) return null;

  const handleTypeSelect = (type: string) => {
    setEventType(type);
    setScope(EVENT_TYPES[type].scope === 'both' ? 'external' : EVENT_TYPES[type].scope as 'external' | 'internal');
  };

  const handleSubmit = () => {
    const eventData = {
      eventType,
      scope,
      title,
      caseId,
      date,
      allDay,
      startTime: allDay ? undefined : startTime,
      endTime: allDay ? undefined : endTime,
      location,
      description,
      confidential
    };
    onSave(eventData);
    handleClose();
  };

  const handleClose = () => {
    // Reset form
    setEventType('deadline');
    setScope('external');
    setTitle('');
    setCaseId('');
    setDate('');
    setAllDay(true);
    setStartTime('');
    setEndTime('');
    setLocation('');
    setDescription('');
    setConfidential(false);
    onClose();
  };

  const canSubmit = title && date && (allDay || (startTime && endTime));

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">New Event</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Event Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Event Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(EVENT_TYPES).map(([key, config]) => (
                <button
                  key={key}
                  className={`p-3 rounded-lg border-2 transition-all text-left ${
                    eventType === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  onClick={() => handleTypeSelect(key)}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: config.color }}
                    />
                    <span className="text-sm font-medium text-slate-900">{config.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Scope */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Scope
            </label>
            <div className="flex gap-3">
              <button
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  scope === 'internal'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
                onClick={() => setScope('internal')}
              >
                <Lock size={16} />
                <span className="text-sm font-medium">Internal</span>
              </button>
              <button
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  scope === 'external'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
                onClick={() => setScope('external')}
              >
                <Globe size={16} />
                <span className="text-sm font-medium">External</span>
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Related Case */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Related Case (optional)
            </label>
            <select
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select case...</option>
              {MOCK_CASES.map(c => (
                <option key={c.id} value={c.id}>
                  No. {c.number} - {c.shortTitle}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
                className="rounded"
              />
              All day event
            </label>
          </div>

          {!allDay && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select location...</option>
              <option value="Great Hall of Justice">Great Hall of Justice</option>
              <option value="Deliberation Room">Deliberation Room</option>
              <option value="Conference Room A">Conference Room A</option>
              <option value="Conference Room B">Conference Room B</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Event details..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Confidential */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={confidential}
                onChange={(e) => setConfidential(e.target.checked)}
                className="rounded"
              />
              <Lock size={14} />
              Mark as confidential
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-4 border-t border-slate-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              canSubmit
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Plus size={16} />
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}
