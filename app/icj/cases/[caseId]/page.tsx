"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Page } from "@/components/layout/Page";
import { CommandPalette } from "@/components/CommandPalette";
import { EnhancedChecklist } from "@/components/EnhancedChecklist";
import { NotificationsDeadlines } from "@/components/NotificationsDeadlines";
import { CaseFolderDrawer } from "@/components/CaseFolderDrawer";
import { LetterModal } from "@/components/modals/LetterModal";
import { DistributionModal } from "@/components/modals/DistributionModal";
import { DocumentModal } from "@/components/modals/DocumentModal";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Mail,
  Send,
  Upload,
  Star,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  FolderOpen,
} from "lucide-react";
import type { Case, ActivityItem, Document, ChecklistItem, ChecklistAction, ChecklistEvidence, Language } from "@/lib/types";
import { formatDate, formatDateTime } from "@/lib/utils";
import { getAllChecklists } from "@/lib/checklist-data";
import { mockCases } from "@/lib/icj-mock";

export default function CaseDashboardPage() {
  const params = useParams();
  const caseId = params.caseId as string;

  const [caseData, setCaseData] = useState<Case | null>(null);
  const [letterModalOpen, setLetterModalOpen] = useState(false);
  const [distModalOpen, setDistModalOpen] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [caseFolderOpen, setCaseFolderOpen] = useState(false);
  const [checklistData, setChecklistData] = useState(getAllChecklists());

  useEffect(() => {
    // Use mock data directly instead of API call
    const mockCase = mockCases.find((c) => c.id === caseId);
    if (mockCase) {
      setCaseData(mockCase);
    }
  }, [caseId]);

  if (!caseData) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-96">
          <div className="text-muted-foreground">Loading case data...</div>
        </div>
      </AppShell>
    );
  }

  const handleActivityAdd = (item: ActivityItem) => {
    setCaseData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        recentActivity: [item, ...prev.recentActivity],
      };
    });

    toast({
      title: item.title,
      description: item.subtitle,
    });
  };

  const handleDocumentAdd = (doc: Document) => {
    setCaseData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        documents: [...prev.documents, doc],
        documentCount: prev.documentCount + 1,
      };
    });
  };

  const toggleKeyDocument = (docId: string) => {
    setCaseData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        documents: prev.documents.map((d) =>
          d.id === docId ? { ...d, isKey: !d.isKey } : d
        ),
      };
    });
  };

  const handleChecklistAction = async (action: ChecklistAction, itemId: string) => {
    try {
      const response = await fetch("/api/icj/checklist/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ caseId, itemId, action }),
      });

      const data = await response.json();

      // Add evidence to checklist item
      if (data.evidence) {
        setChecklistData((prev) => {
          const updated = { ...prev };
          Object.keys(updated).forEach((phase) => {
            updated[phase] = updated[phase].map((item) =>
              item.id === itemId
                ? { ...item, evidence: [...item.evidence, data.evidence] }
                : item
            );
          });
          return updated;
        });
      }

      // Add to activity feed
      if (data.activity) {
        handleActivityAdd(data.activity);
      }

      toast({
        title: "Action completed",
        description: action.label,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to execute action",
        variant: "destructive",
      });
    }
  };

  const handleGenerateNotificationLetter = (notificationId: string, language: Language) => {
    const mockLetter = {
      id: `letter-${Date.now()}`,
      title: `NOTIF-${Date.now()}`,
      language,
      date: new Date().toISOString().split("T")[0],
      href: `/icj/cases/${caseId}/documents/doc-${Date.now()}`,
    };

    setCaseData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        notifications: prev.notifications.map((n) =>
          n.id === notificationId
            ? { ...n, lettersSent: [...n.lettersSent, mockLetter] }
            : n
        ),
      };
    });

    handleActivityAdd({
      id: `act-${Date.now()}`,
      type: "letter",
      title: `Notification letter generated`,
      subtitle: `${language} version`,
      timestamp: new Date().toISOString(),
      icon: "Mail",
    });

    toast({
      title: "Letter generated",
      description: `Notification letter (${language}) created successfully`,
    });
  };

  const handleConvertToTask = (actionId: string, actionTitle: string) => {
    handleActivityAdd({
      id: `task-${Date.now()}`,
      type: "action",
      title: "Task created from outstanding action",
      subtitle: actionTitle,
      timestamp: new Date().toISOString(),
      icon: "CheckCircle2",
    });

    toast({
      title: "Task created",
      description: actionTitle,
    });
  };

  const keyDocuments = caseData.documents.filter((d) => d.isKey);
  const correspondenceDocs = caseData.documents.filter(
    (d) => d.category === "Correspondence"
  );
  const pleadingsDocs = caseData.documents.filter((d) => d.category === "Pleadings");

  return (
    <AppShell>
      <Page
        title={caseData.title}
        breadcrumbs={[
          { label: "Cases", href: "/icj/cases" },
          { label: "Contentious" },
          { label: caseData.shortTitle },
        ]}
        actions={
          <>
            <Button variant="outline" onClick={() => setLetterModalOpen(true)}>
              <Mail className="h-4 w-4" />
              Generate Letter
            </Button>
            <Button variant="outline" onClick={() => setDistModalOpen(true)}>
              <Send className="h-4 w-4" />
              New Distribution
            </Button>
            <Button onClick={() => setDocModalOpen(true)}>
              <Upload className="h-4 w-4" />
              File Document
            </Button>
          </>
        }
      >
        {/* Compact Case Meta Bar */}
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="flex items-center gap-6 text-xs">
            <div>
              <span className="text-slate-500">Filed:</span>
              <span className="ml-1.5 font-medium text-slate-900">{formatDate(caseData.dateFiled)}</span>
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div>
              <span className="text-slate-500">Jurisdiction:</span>
              <span className="ml-1.5 font-medium text-slate-900">{caseData.basisOfJurisdiction}</span>
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div>
              <span className="text-slate-500">President:</span>
              <span className="ml-1.5 font-medium text-slate-900">{caseData.president}</span>
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div>
              <span className="text-slate-500">PLO:</span>
              <span className="ml-1.5 font-medium text-slate-900">{caseData.principalLegalOfficer}</span>
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div>
              <span className="text-slate-500">Documents:</span>
              <span className="ml-1.5 font-medium text-slate-900">{caseData.documentCount}</span>
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div>
              <span className="text-slate-500">Next Deadline:</span>
              <span className="ml-1.5 font-medium text-slate-900">
                {caseData.nextDeadline ? formatDate(caseData.nextDeadline) : "N/A"}
              </span>
            </div>
            <div className="ml-auto">
              <Badge className="text-[10px]">{caseData.status}</Badge>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
          {/* Left Column (wider) */}
          <div className="space-y-4">
            {/* Enhanced Checklist */}
            <EnhancedChecklist
              checklistData={checklistData}
              caseId={caseId}
              onActionExecute={handleChecklistAction}
              onActivityAdd={handleActivityAdd}
            />

            {/* Documents */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Documents</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCaseFolderOpen(true)}
                  >
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Case folder
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="key">
                  <TabsList className="mb-4">
                    <TabsTrigger value="key">
                      Key Documents ({keyDocuments.length})
                    </TabsTrigger>
                    <TabsTrigger value="all">
                      All Documents ({caseData.documents.length})
                    </TabsTrigger>
                    <TabsTrigger value="corr">
                      Correspondence ({correspondenceDocs.length})
                    </TabsTrigger>
                    <TabsTrigger value="pleadings">
                      Pleadings ({pleadingsDocs.length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="key">
                    <DocumentList docs={keyDocuments} onToggleKey={toggleKeyDocument} />
                  </TabsContent>

                  <TabsContent value="all">
                    <DocumentList docs={caseData.documents} onToggleKey={toggleKeyDocument} />
                  </TabsContent>

                  <TabsContent value="corr">
                    <DocumentList docs={correspondenceDocs} onToggleKey={toggleKeyDocument} />
                  </TabsContent>

                  <TabsContent value="pleadings">
                    <DocumentList docs={pleadingsDocs} onToggleKey={toggleKeyDocument} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Incidental Proceedings - Only show if active */}
            {caseData.incidentalProceedings.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Incidental Proceedings</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="pm">
                    <TabsList className="mb-4">
                      <TabsTrigger value="pm" disabled={!hasIncidental(caseData, "Provisional Measures")}>
                        Provisional Measures
                      </TabsTrigger>
                      <TabsTrigger value="po" disabled={!hasIncidental(caseData, "Preliminary Objections")}>
                        Prelim. Objections
                      </TabsTrigger>
                      <TabsTrigger value="int" disabled={!hasIncidental(caseData, "Intervention")}>
                        Interventions
                      </TabsTrigger>
                      <TabsTrigger value="cc" disabled={!hasIncidental(caseData, "Counter-claim")}>
                        Counter-claims
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="pm">
                      {renderIncidentalContent(caseData, "Provisional Measures")}
                    </TabsContent>
                    <TabsContent value="po">
                      {renderIncidentalContent(caseData, "Preliminary Objections")}
                    </TabsContent>
                    <TabsContent value="int">
                      {renderIncidentalContent(caseData, "Intervention")}
                    </TabsContent>
                    <TabsContent value="cc">
                      {renderIncidentalContent(caseData, "Counter-claim")}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Latest Distribution Status */}
            {caseData.distributions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Latest Distribution Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <DistributionStatus distribution={caseData.distributions[0]} parties={caseData.parties} />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column (narrower) - Sticky */}
          <div className="space-y-4 lg:sticky lg:top-8 lg:self-start">
            {/* Parties */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Parties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {caseData.parties.map((party) => (
                  <div key={party.country} className="space-y-0.5">
                    <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      {party.role}
                    </div>
                    <div className="font-semibold text-sm text-slate-900">{party.country}</div>
                    <div className="text-xs">
                      <div className="font-medium text-slate-700">{party.agent.name}</div>
                      <div className="text-slate-500 text-[11px]">{party.agent.title}</div>
                      <div className="text-slate-500 text-[11px]">{party.agent.email}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 pt-0">
                {caseData.deadlines.map((deadline) => (
                  <div
                    key={deadline.id}
                    className="p-2.5 rounded-md border border-slate-200 bg-slate-50/50"
                  >
                    <div className="text-xs font-semibold text-slate-900">{deadline.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {formatDate(deadline.date)} • {deadline.party}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Related PV Decisions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Related PV Decisions</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1.5">
                  {caseData.pvDecisions.map((decision) => (
                    <div key={decision.id} className="text-xs">
                      <div className="font-medium text-slate-900">{decision.title}</div>
                      <div className="text-[11px] text-slate-500">
                        {formatDate(decision.date)} • {decision.ref}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-2 rounded-md bg-slate-50 text-[11px] text-slate-500">
                  <AlertCircle className="h-3.5 w-3.5 inline mr-1" />
                  Access managed by permissions
                </div>
              </CardContent>
            </Card>

            {/* Notifications & Deadlines */}
            <NotificationsDeadlines
              notifications={caseData.notifications}
              deadlines={caseData.deadlines}
              caseId={caseId}
              onGenerateLetter={handleGenerateNotificationLetter}
              onConvertToTask={handleConvertToTask}
            />

            {/* Recent Activity */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2.5">
                  {caseData.recentActivity.slice(0, 10).map((item) => (
                    <div key={item.id} className="flex gap-2.5">
                      <div className="mt-0.5">{getActivityIcon(item.icon)}</div>
                      <div className="flex-1">
                        <div className="text-xs font-medium text-slate-900">{item.title}</div>
                        {item.subtitle && (
                          <div className="text-[11px] text-slate-500">{item.subtitle}</div>
                        )}
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {formatDateTime(item.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Page>

      <CaseFolderDrawer
        open={caseFolderOpen}
        onOpenChange={setCaseFolderOpen}
        folderStructure={caseData.caseFolderStructure}
        documents={caseData.documents}
        caseId={caseId}
      />

      <CommandPalette caseId={caseId} onActivityAdd={handleActivityAdd} />
      <LetterModal
        open={letterModalOpen}
        onOpenChange={setLetterModalOpen}
        caseId={caseId}
        caseTitle={caseData.title}
        agentName={caseData.parties[0]?.agent.name || ""}
        nextDeadline={caseData.nextDeadline}
        onActivityAdd={handleActivityAdd}
      />
      <DistributionModal
        open={distModalOpen}
        onOpenChange={setDistModalOpen}
        caseId={caseId}
        parties={caseData.parties}
        documents={caseData.documents.map((d) => ({ id: d.id, title: d.title, pages: d.pages }))}
        onActivityAdd={handleActivityAdd}
      />
      <DocumentModal
        open={docModalOpen}
        onOpenChange={setDocModalOpen}
        caseId={caseId}
        onActivityAdd={handleActivityAdd}
        onDocumentAdd={handleDocumentAdd}
      />
      <Toaster />
    </AppShell>
  );
}

function DocumentList({
  docs,
  onToggleKey,
}: {
  docs: Document[];
  onToggleKey: (id: string) => void;
}) {
  return (
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {docs.length === 0 ? (
        <div className="text-sm text-muted-foreground text-center py-8">
          No documents in this category
        </div>
      ) : (
        docs.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center gap-3 p-3 rounded-md border hover:bg-accent/50 transition-colors"
          >
            <FileText className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{doc.title}</div>
              <div className="text-xs text-muted-foreground">
                {doc.ref} • {formatDate(doc.date)} • {doc.pages}p
              </div>
              {doc.annexCount && doc.annexCount > 0 && (
                <div className="text-xs text-muted-foreground mt-1">
                  {doc.annexCount} annexes
                  {doc.ocrStatus && ` • OCR: ${doc.ocrStatus}`}
                  {doc.singlePdfWarning && (
                    <span className="text-yellow-600 ml-1">⚠ Single PDF</span>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              {/* Language Badge - Checklist Style */}
              <span className={`text-[11px] font-semibold px-2 py-1 rounded ${
                doc.language === "EN"
                  ? "bg-green-100 text-green-800"
                  : "bg-slate-100 text-slate-600"
              }`}>
                {doc.language === "EN" ? "✓ EN" : doc.language === "FR" ? "✓ FR" : doc.language}
              </span>
              {/* Translation Status Badge - Checklist Style */}
              <span className={`text-[11px] font-semibold px-2 py-1 rounded ${
                doc.translationStatus === "Received"
                  ? "bg-green-100 text-green-800"
                  : doc.translationStatus === "Awaited"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-slate-100 text-slate-500"
              }`}>
                {doc.translationStatus === "Received" && "✓ "}
                {doc.translationStatus === "Awaited" && "⏳ "}
                {doc.translationStatus}
              </span>
              <button
                onClick={() => onToggleKey(doc.id)}
                className="p-1 hover:bg-accent rounded"
              >
                <Star
                  className={`h-4 w-4 ${
                    doc.isKey ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function hasIncidental(caseData: Case, type: string): boolean {
  return caseData.incidentalProceedings.some((ip) => ip.type === type);
}

function renderIncidentalContent(caseData: Case, type: string) {
  const proceeding = caseData.incidentalProceedings.find((ip) => ip.type === type);

  if (!proceeding) {
    return (
      <div className="text-sm text-muted-foreground text-center py-8">
        No {type.toLowerCase()} initiated
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-sm">
        <span className="font-medium">Status:</span> {proceeding.status}
      </div>
      <div className="text-sm">
        <span className="font-medium">Filed:</span> {formatDate(proceeding.filedDate)}
      </div>
      <div className="text-sm font-medium mt-4">Documents:</div>
      <div className="space-y-2">
        {proceeding.documents.map((doc) => (
          <div key={doc.id} className="text-sm flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {doc.title}
          </div>
        ))}
      </div>
    </div>
  );
}

function DistributionStatus({
  distribution,
  parties,
}: {
  distribution: any;
  parties: any[];
}) {
  const delivered = distribution.recipients.filter((r: any) => r.status === "Delivered").length;
  const pending = distribution.recipients.filter((r: any) => r.status === "Pending").length;
  const failed = distribution.recipients.filter((r: any) => r.status === "Failed").length;

  return (
    <div className="space-y-2.5">
      <div className="text-xs font-medium text-slate-900">{distribution.title}</div>
      <div className="flex items-center gap-2 text-[11px]">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-emerald-700">{delivered}</span>
          <span className="text-slate-500">Delivered</span>
        </div>
        <span className="text-slate-300">•</span>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-amber-700">{pending}</span>
          <span className="text-slate-500">Pending</span>
        </div>
        <span className="text-slate-300">•</span>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-red-700">{failed}</span>
          <span className="text-slate-500">Failed</span>
        </div>
      </div>
      <div className="text-[11px] text-slate-500">
        <span className="font-medium">Excluded:</span> {parties.map((p) => p.country).join(", ")}
      </div>
      <div className="text-[11px] text-slate-400">
        +{distribution.recipientCount - 25} more recipients
      </div>
    </div>
  );
}

function getActivityIcon(iconName: string) {
  const icons: Record<string, any> = {
    FileText,
    Mail,
    Send,
    Star,
    CheckCircle2,
    AlertCircle,
  };
  const Icon = icons[iconName] || FileText;
  return <Icon className="h-4 w-4 text-muted-foreground" />;
}
