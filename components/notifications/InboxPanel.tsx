"use client";

import { Mail, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import type { Notification } from "@/lib/notifications-data";

interface InboxPanelProps {
  notifications: Notification[];
  onOpen: (notification: Notification) => void;
}

export function InboxPanel({ notifications, onOpen }: InboxPanelProps) {
  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col">
      {/* Panel Header */}
      <div className="flex justify-between items-center px-3.5 py-3 border-b border-slate-100 bg-slate-50/50 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <Mail size={16} className="text-slate-600" />
          <h3 className="text-xs font-semibold text-slate-900">Inbox</h3>
        </div>
        {unreadCount > 0 && (
          <span className="text-[10px] font-bold min-w-[20px] h-5 flex items-center justify-center bg-red-500 text-white rounded-full px-2">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Panel List - Scrollable */}
      <div className="flex-1 overflow-y-auto max-h-[400px]">
        {notifications.slice(0, 6).map(notification => (
          <div
            key={notification.id}
            onClick={() => onOpen(notification)}
            className={`flex items-start gap-2 px-3.5 py-2.5 border-b border-slate-50 cursor-pointer transition-colors group ${
              notification.status === 'unread'
                ? 'bg-amber-50/50 hover:bg-amber-50'
                : 'hover:bg-slate-50'
            }`}
          >
            {/* Status Dot */}
            <div
              className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${
                notification.status === 'unread'
                  ? 'bg-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.2)]'
                  : notification.status === 'acknowledged'
                  ? 'bg-emerald-500'
                  : 'bg-slate-300'
              } ${
                notification.status === 'acknowledged'
                  ? 'flex items-center justify-center'
                  : ''
              }`}
            >
              {notification.status === 'acknowledged' && (
                <Check size={6} className="text-white" strokeWidth={3} />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <span className="text-[11px] font-medium text-slate-900 leading-tight block mb-0.5 line-clamp-2">
                {notification.subject}
              </span>
              {notification.relatedCase && (
                <span className="text-[10px] text-slate-600">
                  <span className="font-semibold text-blue-600">
                    No. {notification.relatedCase.number}
                  </span>
                </span>
              )}
            </div>

            {/* Action Button */}
            <button
              className="text-[9px] font-medium px-2 py-1 bg-white border border-slate-200 rounded hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onOpen(notification);
              }}
            >
              {notification.status === 'unread' ? 'Open' : 'View'}
            </button>
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <Link
        href="/icj/inbox"
        className="flex items-center justify-center gap-1 py-2.5 text-[11px] font-medium text-blue-600 border-t border-slate-100 bg-slate-50/50 hover:bg-slate-100 transition-colors flex-shrink-0"
      >
        View All <ChevronRight size={14} />
      </Link>
    </div>
  );
}
