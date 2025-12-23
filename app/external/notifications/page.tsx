"use client";

import { useState } from "react";
import { ArrowLeft, Bell, FileText, Mail, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";
import { mockNotifications } from "@/lib/mockExternalData";
import { NotificationModal } from "@/components/external/NotificationModal";
import type { ExternalNotification, NotificationType } from "@/types/external";

function getNotificationIcon(type: string) {
  switch (type) {
    case 'order':
      return <FileText size={16} className="text-gray-600" />;
    case 'transmission':
      return <Mail size={16} className="text-gray-600" />;
    case 'circular':
      return <Bell size={16} className="text-gray-600" />;
    case 'letter':
      return <Mail size={16} className="text-gray-600" />;
    default:
      return <Bell size={16} className="text-gray-600" />;
  }
}

export default function NotificationsPage() {
  const t = useExternalTranslation();
  const [filter, setFilter] = useState<'all' | NotificationType>('all');
  const [selectedNotification, setSelectedNotification] = useState<ExternalNotification | null>(null);
  const [notifications, setNotifications] = useState(mockNotifications);

  const filteredNotifications = filter === 'all'
    ? notifications
    : notifications.filter(n => n.type === filter);

  const handleAcknowledge = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, status: 'acknowledged' as const } : n)
    );
  };

  const filters = [
    { id: 'all' as const, label: t.all },
    { id: 'order' as NotificationType, label: t.orders },
    { id: 'transmission' as NotificationType, label: 'Transmissions' },
    { id: 'letter' as NotificationType, label: t.letters },
    { id: 'circular' as NotificationType, label: 'Circulars' },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-1.5">
        {/* Back Button */}
        <Link
          href="/external"
          className="inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 transition-colors mb-2 leading-tight"
        >
          <ArrowLeft size={14} />
          {t.backToDashboard}
        </Link>

        {/* Page Header */}
        <div className="mb-2">
          <div className="icj-divider mb-1" />
          <h1 className="case-title text-lg">
            {t.correspondence}
          </h1>
          <p className="text-xs text-gray-600 mt-0.5 leading-tight">
            {notifications.filter(n => n.status === 'unread').length} unread notifications
          </p>
          <div className="icj-divider mt-1" />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-xs font-medium text-gray-600 mr-1">{t.filter}</span>
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-2 py-0.5 text-xs font-medium rounded transition-colors ${
                filter === f.id
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="bg-gray-50 border border-gray-200 rounded overflow-hidden divide-y divide-gray-200">
          {filteredNotifications.map(notification => (
            <button
              key={notification.id}
              onClick={() => setSelectedNotification(notification)}
              className={`w-full flex items-start gap-2 px-2 py-1.5 hover:bg-gray-100 transition-colors text-left ${
                notification.status === 'unread' ? 'bg-gray-100/50' : ''
              }`}
            >
              {/* Icon */}
              <div className="flex-shrink-0 mt-0.5">
                {getNotificationIcon(notification.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <h3 className={`text-xs leading-tight ${
                    notification.status === 'unread' ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'
                  }`}>
                    {notification.title}
                  </h3>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {notification.urgent && (
                      <AlertCircle size={12} className="text-gray-700" />
                    )}
                    <span className="text-xs text-gray-600 leading-tight">
                      {notification.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-gray-200 text-gray-700">
                    {notification.type.toUpperCase()}
                  </span>

                  {notification.caseId && (
                    <span className="text-xs text-gray-600 leading-tight">
                      Case No. {notification.caseId}
                    </span>
                  )}

                  {notification.attachments && notification.attachments.length > 0 && (
                    <span className="text-xs text-gray-600 leading-tight">
                      • {notification.attachments.length} {t.attachments.toLowerCase()}
                    </span>
                  )}

                  {notification.status === 'unread' && (
                    <div className="w-1.5 h-1.5 bg-gray-700 rounded-full ml-auto" />
                  )}

                  {notification.status === 'acknowledged' && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-gray-300 text-gray-700 ml-auto">
                      {t.acknowledged}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        notification={selectedNotification}
        isOpen={!!selectedNotification}
        onClose={() => setSelectedNotification(null)}
        onAcknowledge={handleAcknowledge}
      />
    </>
  );
}
