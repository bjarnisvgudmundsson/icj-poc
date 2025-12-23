"use client";

import { Bell, ChevronRight, FileText, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";
import type { ExternalNotification } from "@/types/external";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";

interface ExternalNotificationsPanelProps {
  notifications: ExternalNotification[];
}

function getNotificationIcon(type: string) {
  switch (type) {
    case 'order':
      return <FileText size={14} className="text-blue-600" />;
    case 'transmission':
      return <Mail size={14} className="text-emerald-600" />;
    case 'circular':
      return <Bell size={14} className="text-slate-600" />;
    case 'letter':
      return <Mail size={14} className="text-amber-600" />;
    default:
      return <Bell size={14} className="text-slate-600" />;
  }
}

export function ExternalNotificationsPanel({ notifications }: ExternalNotificationsPanelProps) {
  const t = useExternalTranslation();
  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col">
      {/* Panel Header */}
      <div className="flex justify-between items-center px-3.5 py-3 border-b border-slate-100 bg-slate-50/50 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <Bell size={16} className="text-slate-600" />
          <h3 className="text-xs font-semibold text-slate-900">{t.recentNotifications}</h3>
        </div>
        {unreadCount > 0 && (
          <span className="text-[10px] font-bold min-w-[20px] h-5 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full px-2">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Panel List - Scrollable */}
      <div className="flex-1 overflow-y-auto max-h-[400px]">
        {notifications.slice(0, 5).map(notification => (
          <button
            key={notification.id}
            className={`w-full flex items-start gap-2 px-3.5 py-2.5 border-b border-slate-50 cursor-pointer transition-colors hover:bg-slate-50 text-left ${
              notification.status === 'unread' ? 'bg-blue-50/30' : ''
            }`}
          >
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {getNotificationIcon(notification.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-0.5">
                <span className={`text-[11px] leading-tight line-clamp-2 ${
                  notification.status === 'unread' ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'
                }`}>
                  {notification.title}
                </span>
                {notification.urgent && (
                  <AlertCircle size={12} className="text-red-600 flex-shrink-0" />
                )}
              </div>
              <span className="text-[10px] text-slate-600 block">
                {notification.date}
              </span>
              {notification.status === 'unread' && (
                <span className="inline-block mt-1 w-2 h-2 bg-blue-600 rounded-full" />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Footer Link */}
      <Link
        href="/external/notifications"
        className="flex items-center justify-center gap-1 py-2.5 text-[11px] font-medium text-blue-600 border-t border-slate-100 bg-slate-50/50 hover:bg-slate-100 transition-colors flex-shrink-0"
      >
        {t.viewAll} <ChevronRight size={14} />
      </Link>
    </div>
  );
}
