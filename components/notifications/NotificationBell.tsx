"use client";

import { Bell } from "lucide-react";
import type { Notification } from "@/lib/notifications-data";

interface NotificationBellProps {
  notifications: Notification[];
  onClick: () => void;
}

export function NotificationBell({ notifications, onClick }: NotificationBellProps) {
  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  return (
    <button
      onClick={onClick}
      className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
      aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
    >
      <Bell size={20} className="text-slate-600" />
      {unreadCount > 0 && (
        <>
          {/* Pulsing indicator */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          {/* Count badge */}
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold bg-red-500 text-white rounded-full px-1">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        </>
      )}
    </button>
  );
}
