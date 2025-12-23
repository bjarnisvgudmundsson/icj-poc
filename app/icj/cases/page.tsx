"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Page } from "@/components/layout/Page";
import { CaseCard } from "@/components/cases/CaseCard";
import { CaseSearch, SearchFilters } from "@/components/cases/CaseSearch";
import { DeadlinesPanel } from "@/components/cases/DeadlinesPanel";
import { InboxPanel } from "@/components/notifications/InboxPanel";
import { EnvelopeModal } from "@/components/notifications/EnvelopeModal";
import { NotificationBell } from "@/components/notifications/NotificationBell";
import { Button } from "@/components/ui/button";
import { MOCK_CASES, getAllDeadlines } from "@/lib/cases-data";
import { MOCK_NOTIFICATIONS } from "@/lib/notifications-data";
import type { Notification } from "@/lib/notifications-data";

export default function CasesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    stage: null,
    hasPM: false,
    hasPO: false,
  });
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const deadlines = getAllDeadlines();

  // Handler for opening a notification
  const handleOpenNotification = (notification: Notification) => {
    setSelectedNotification(notification);

    // Mark as read if unread
    if (notification.status === 'unread') {
      setNotifications(prev =>
        prev.map(n =>
          n.id === notification.id
            ? { ...n, status: 'read', readAt: new Date().toISOString() }
            : n
        )
      );
    }
  };

  // Handler for acknowledging a notification
  const handleAcknowledge = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId
          ? {
              ...n,
              status: 'acknowledged',
              acknowledgedAt: new Date().toISOString(),
              acknowledgedBy: 'Judge [Current User]'
            }
          : n
      )
    );

    // Update the selected notification to show acknowledgment immediately
    setSelectedNotification(prev =>
      prev && prev.id === notificationId
        ? {
            ...prev,
            status: 'acknowledged',
            acknowledgedAt: new Date().toISOString(),
            acknowledgedBy: 'Judge [Current User]'
          }
        : prev
    );
  };

  // Filter cases based on search and filters
  const filteredCases = useMemo(() => {
    return MOCK_CASES.filter((caseItem) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          caseItem.shortTitle.toLowerCase().includes(query) ||
          caseItem.fullTitle.toLowerCase().includes(query) ||
          caseItem.parties.applicant.state.toLowerCase().includes(query) ||
          (caseItem.parties.respondent?.state || "").toLowerCase().includes(query);

        if (!matchesSearch) return false;
      }

      // Stage filter
      if (filters.stage && caseItem.stage !== filters.stage) {
        return false;
      }

      // PM filter
      if (filters.hasPM && !caseItem.hasProvisionalMeasures) {
        return false;
      }

      // PO filter
      if (filters.hasPO && !caseItem.hasPreliminaryObjections) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  return (
    <AppShell>
      <Page>
        <div className="min-h-screen bg-slate-50">
          <div className="max-w-[1400px] mx-auto px-8 py-8">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-slate-900">Cases</h1>
              <div className="flex items-center gap-3">
                <NotificationBell
                  notifications={notifications}
                  onClick={() => {
                    // Scroll smoothly to the main layout section
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                  }}
                />
                <Link href="/icj/cases/new">
                  <Button className="flex items-center gap-2">
                    <Plus size={16} />
                    New Case
                  </Button>
                </Link>
              </div>
            </div>

            {/* Search */}
            <CaseSearch
              onSearch={setSearchQuery}
              onFiltersChange={setFilters}
            />

            {/* Main Layout - 50/50 Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Left 50%: Cases Grid */}
              <div>
                {filteredCases.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {filteredCases.map((caseItem) => (
                      <CaseCard key={caseItem.id} caseItem={caseItem} />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <div className="text-slate-400 mb-2">
                      <svg
                        className="w-16 h-16 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">
                      No cases found
                    </h3>
                    <p className="text-sm text-slate-500">
                      Try adjusting your search or filters
                    </p>
                  </div>
                )}
              </div>

              {/* Right 50%: Deadlines & Inbox Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DeadlinesPanel deadlines={deadlines} />
                <InboxPanel
                  notifications={notifications}
                  onOpen={handleOpenNotification}
                />
              </div>
            </div>
          </div>
        </div>
      </Page>

      {/* Envelope Modal */}
      {selectedNotification && (
        <EnvelopeModal
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
          onAcknowledge={handleAcknowledge}
        />
      )}
    </AppShell>
  );
}
