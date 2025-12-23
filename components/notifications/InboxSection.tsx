"use client";

import { Mail, CheckCircle, ChevronRight, FileText, Globe, Calendar, AlertCircle } from "lucide-react";
import type { Notification } from "@/lib/notifications-data";

interface InboxSectionProps {
  notifications: Notification[];
  onOpen: (notification: Notification) => void;
}

function formatRelative(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));

  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'order':
      return <FileText size={18} />;
    case 'pv':
      return <FileText size={18} />;
    case 'circular':
      return <Globe size={18} />;
    case 'letter':
      return <Mail size={18} />;
    case 'agenda':
      return <Calendar size={18} />;
    default:
      return <FileText size={18} />;
  }
}

export function InboxSection({ notifications, onOpen }: InboxSectionProps) {
  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <section className="bg-white border border-slate-200 rounded-lg mb-6 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex items-center gap-2.5">
          <Mail size={18} className="text-slate-600" />
          <h2 className="text-sm font-semibold text-slate-900">Inbox</h2>
          {unreadCount > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 bg-red-500 text-white rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <a href="/icj/inbox" className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
          View All <ChevronRight size={12} />
        </a>
      </div>

      <div className="divide-y divide-slate-100">
        {notifications.slice(0, 4).map(notification => (
          <div
            key={notification.id}
            onClick={() => onOpen(notification)}
            className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-slate-50 ${
              notification.status === 'unread' ? 'bg-amber-50/50 hover:bg-amber-50' : ''
            } ${
              notification.priority === 'urgent' ? 'border-l-[3px] border-l-red-500' : ''
            }`}
          >
            {/* Status Indicator */}
            <div className="w-5 flex items-center justify-center pt-0.5">
              {notification.status === 'unread' ? (
                <span className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_0_3px_rgba(59,130,246,0.2)]" />
              ) : notification.status === 'acknowledged' ? (
                <CheckCircle size={14} className="text-emerald-500" />
              ) : (
                <span className="w-2 h-2 bg-slate-300 rounded-full" />
              )}
            </div>

            {/* Type Icon */}
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
              notification.type === 'order' ? 'bg-blue-50 text-blue-600' :
              notification.type === 'pv' ? 'bg-purple-50 text-purple-600' :
              notification.type === 'circular' ? 'bg-emerald-50 text-emerald-600' :
              notification.type === 'letter' ? 'bg-amber-50 text-amber-600' :
              notification.type === 'agenda' ? 'bg-sky-50 text-sky-600' :
              'bg-slate-50 text-slate-600'
            }`}>
              {getTypeIcon(notification.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 mb-0.5">
                <span className="text-sm font-semibold text-slate-900 flex-1 leading-tight">
                  {notification.subject}
                </span>
                {notification.priority === 'urgent' && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 bg-red-500 text-white rounded uppercase">
                    Urgent
                  </span>
                )}
              </div>

              {notification.relatedCase && (
                <span className="text-xs text-slate-600 block mb-0.5">
                  No. {notification.relatedCase.number} • {notification.relatedCase.parties}
                </span>
              )}

              <span className="text-[11px] text-slate-500">
                From: {notification.transmittedBy.name}
              </span>

              {notification.requiresAction && (
                <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-red-600 bg-red-50 px-2 py-1 rounded-md w-fit">
                  <AlertCircle size={10} />
                  <span>{notification.actionRequired}</span>
                </div>
              )}
            </div>

            {/* Timestamp & Action */}
            <div className="flex flex-col items-end gap-2">
              <span className="text-[11px] text-slate-400 whitespace-nowrap">
                {formatRelative(notification.transmittedAt)}
              </span>
              <button className="text-xs font-medium px-3 py-1 bg-white border border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-md transition-colors">
                {notification.status === 'unread' ? 'Open' : 'View'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-slate-400">
          <Mail size={32} className="mb-2" />
          <span className="text-sm">No notifications</span>
        </div>
      )}
    </section>
  );
}
