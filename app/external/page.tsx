"use client";

import Link from "next/link";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";
import { mockUser, mockCases, mockDeadlines, mockNotifications } from "@/lib/mockExternalData";

export default function ExternalDashboard() {
  const t = useExternalTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 py-2">
      {/* Welcome message */}
      <div className="mb-1.5">
        <p className="text-sm text-gray-700 mb-0.5 leading-tight">
          Welcome, <span className="font-semibold text-gray-900">{mockUser.name}</span>
        </p>
        <p className="text-xs text-gray-500 leading-tight">
          {mockUser.role} • {mockUser.country}
        </p>
      </div>

      {/* MY CASES Section */}
      <div className="mb-3">
        <h2 className="section-header">{t.myCases}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5">
        {mockCases.map((case_, index) => (
          <div key={case_.id}>
            <div className="document-card">
              {/* Case number and GL number */}
              <div className="document-date leading-tight mb-0.5">
                {case_.caseNumber} • {t.generalList} {case_.generalList}
              </div>

              {/* Case title - link with Times font */}
              <Link href={`/external/case/${case_.id}`} className="block text-sm font-serif text-gray-900 hover:text-gray-700 transition-colors mb-0.5 leading-tight">
                {case_.fullTitle}
              </Link>

              {/* Short title */}
              <p className="text-xs text-gray-600 mb-1.5 leading-tight">
                {case_.shortTitle}
              </p>

              {/* Info grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs mb-1.5 leading-tight">
                <div>
                  <span className="text-gray-500">{t.yourRole}:</span>{' '}
                  <span className="font-medium text-gray-800">{case_.role}</span>
                </div>
                <div>
                  <span className="text-gray-500">{t.phase}:</span>{' '}
                  <span className="font-medium text-gray-800">{case_.phase}</span>
                </div>
              </div>

              {/* Next deadline detail - very compact */}
              <div className="bg-gray-50 border-l-2 border-gray-400 pl-1.5 py-0.5 text-xs mb-1 leading-tight">
                <span className="text-gray-500">{t.nextDeadline}:</span>{' '}
                <span className="font-medium text-gray-800">
                  {new Date(case_.nextDeadline.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
                {' • '}
                <span className="text-gray-600">{case_.nextDeadline.label}</span>
              </div>

              {/* Status indicators - minimal */}
              <div className="flex gap-1.5 items-center leading-none">
                {case_.unreadDocs > 0 && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-600 text-white">
                    {case_.unreadDocs} new
                  </span>
                )}
                {case_.pendingActions > 0 && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-500 text-white">
                    {case_.pendingActions} action{case_.pendingActions > 1 ? 's' : ''}
                  </span>
                )}
                <Link
                  href={`/external/case/${case_.id}`}
                  className="text-xs text-gray-700 hover:text-gray-900 hover:underline ml-auto"
                >
                  {t.viewCase} →
                </Link>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Two-column layout for Deadlines and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

        {/* UPCOMING DEADLINES Section */}
        <div>
          <h2 className="section-header">{t.upcomingDeadlines}</h2>

          <div className="space-y-0.5 bg-gray-50 border border-gray-200 rounded p-1.5">
            {mockDeadlines.slice(0, 6).map(deadline => (
              <div key={deadline.id} className="flex items-center justify-between py-0.5 border-b border-gray-200 last:border-0">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 leading-tight">
                    {new Date(deadline.date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </p>
                  <p className="text-xs text-gray-800 leading-tight">{deadline.label}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs px-1 py-0.5 rounded bg-gray-100 text-gray-600">
                    {deadline.daysRemaining}d
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT NOTIFICATIONS Section */}
        <div>
          <h2 className="section-header">{t.recentNotifications}</h2>

          <div className="space-y-0.5 bg-gray-50 border border-gray-200 rounded p-1.5">
            {mockNotifications.slice(0, 6).map(notification => (
              <div key={notification.id} className="flex gap-1.5 py-0.5 border-b border-gray-200 last:border-0">
                <div className="flex-shrink-0">
                  {notification.status === 'unread' ? (
                    <span className="inline-block w-1.5 h-1.5 bg-gray-700 rounded-full mt-1" />
                  ) : (
                    <span className="inline-block w-1.5 h-1.5 bg-gray-300 rounded-full mt-1" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500 leading-tight">{notification.date}</span>
                    {notification.urgent && (
                      <span className="inline-flex items-center px-1 py-0.5 rounded text-xs bg-gray-600 text-white leading-none">
                        URGENT
                      </span>
                    )}
                  </div>
                  <Link
                    href="/external/notifications"
                    className={`text-xs leading-tight ${
                      notification.status === 'unread'
                        ? 'text-gray-800 font-medium hover:underline'
                        : 'text-gray-600 hover:underline'
                    }`}
                  >
                    {notification.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-1">
            <Link href="/external/notifications" className="text-xs text-gray-700 hover:text-gray-900 hover:underline">
              View all →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
