"use client";

import { X, Download, Check } from "lucide-react";
import { ICJEmblem } from "./ICJEmblem";
import type { ExternalNotification } from "@/types/external";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";

interface NotificationModalProps {
  notification: ExternalNotification | null;
  isOpen: boolean;
  onClose: () => void;
  onAcknowledge?: (id: number) => void;
}

export function NotificationModal({ notification, isOpen, onClose, onAcknowledge }: NotificationModalProps) {
  const t = useExternalTranslation();

  if (!isOpen || !notification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <ICJEmblem size={36} />
            <div>
              <h2 className="text-sm font-serif font-semibold text-gray-900 leading-tight">
                {t.officialCommunication}
              </h2>
              <p className="text-xs text-gray-600 leading-tight">{notification.date}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {/* Title */}
          <h3 className="text-base font-serif font-semibold text-gray-900 mb-2 leading-tight">
            {notification.title}
          </h3>

          {/* Type Badge */}
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-200 text-gray-700">
              {notification.type.toUpperCase()}
            </span>
            {notification.urgent && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-400 text-white">
                URGENT
              </span>
            )}
          </div>

          {/* Content Text */}
          {notification.content && (
            <div className="bg-gray-50 rounded p-3 mb-3">
              <div className="text-sm text-gray-800 whitespace-pre-wrap font-serif leading-tight">
                {notification.content}
              </div>
            </div>
          )}

          {/* Attachments */}
          {notification.attachments && notification.attachments.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-gray-900 mb-1.5 leading-tight">
                {t.attachments} ({notification.attachments.length})
              </h4>
              <div className="space-y-1">
                {notification.attachments.map(attachment => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded hover:border-gray-400 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900 leading-tight">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-gray-600 leading-tight">
                        {attachment.size} • {attachment.language}
                      </p>
                    </div>
                    <button className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-white bg-gray-700 rounded hover:bg-gray-800 transition-colors">
                      <Download size={12} />
                      {t.download}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-3 py-2 border-t border-gray-200 bg-gray-50">
          <div className="text-xs text-gray-600 leading-tight">
            {notification.status === 'acknowledged' ? (
              <span className="flex items-center gap-1 text-gray-700">
                <Check size={12} />
                {t.acknowledged}
              </span>
            ) : (
              <span>{t.status}: {notification.status}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {notification.status !== 'acknowledged' && onAcknowledge && (
              <button
                onClick={() => onAcknowledge(notification.id)}
                className="px-3 py-1.5 text-xs font-medium text-white bg-gray-700 rounded hover:bg-gray-800 transition-colors"
              >
                {t.acknowledgeReceipt}
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
