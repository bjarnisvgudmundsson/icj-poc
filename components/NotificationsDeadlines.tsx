"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Clock,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import type {
  NotificationTrackRow,
  Deadline,
  Language,
} from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface NotificationsDeadlinesProps {
  notifications: NotificationTrackRow[];
  deadlines: Deadline[];
  caseId: string;
  onGenerateLetter?: (notificationId: string, language: Language) => void;
  onConvertToTask?: (actionId: string, actionTitle: string) => void;
}

export function NotificationsDeadlines({
  notifications,
  deadlines,
  caseId,
  onGenerateLetter,
  onConvertToTask,
}: NotificationsDeadlinesProps) {
  const [activeView, setActiveView] = useState<"deadlines" | "notifications">("deadlines");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case "waiting_response":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return <Badge className="bg-green-50 text-green-700 border-green-200">Complete</Badge>;
      case "waiting_response":
        return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200">Awaiting Response</Badge>;
      default:
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200">Open</Badge>;
    }
  };

  const getDaysRemaining = (date: string) => {
    const today = new Date();
    const deadline = new Date(date);
    const diff = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diff < 0) return `${Math.abs(diff)} days overdue`;
    if (diff === 0) return "Due today";
    if (diff === 1) return "Due tomorrow";
    return `${diff} days remaining`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Notifications & Time-Limits</CardTitle>
        <p className="text-xs text-muted-foreground mt-1">
          Parties' deadlines and Registry follow-ups (case-specific)
        </p>

        <div className="flex gap-2 mt-4">
          <Button
            variant={activeView === "deadlines" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("deadlines")}
            className="flex-1"
          >
            Deadlines
          </Button>
          <Button
            variant={activeView === "notifications" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("notifications")}
            className="flex-1"
          >
            Notifications
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {activeView === "deadlines" && (
          <div className="space-y-3">
            {deadlines.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-8">
                No deadlines set
              </div>
            ) : (
              deadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/5"
                >
                  <div className="mt-0.5">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{deadline.title}</div>
                    <div className="text-xs text-muted-foreground">{deadline.party}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-medium">{formatDate(deadline.date)}</div>
                    <div className="text-xs text-muted-foreground">
                      {getDaysRemaining(deadline.date)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeView === "notifications" && (
          <div>
            {notifications.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-8">
                No notifications tracked
              </div>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {notifications.map((notif) => (
                  <AccordionItem key={notif.id} value={notif.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 flex-1 text-left pr-4">
                        {getStatusIcon(notif.status)}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">
                            {notif.conventions.length === 1
                              ? notif.conventions[0].name
                              : `${notif.conventions.length} conventions`}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            {notif.outstandingActions.length > 0
                              ? `${notif.outstandingActions.length} outstanding action${notif.outstandingActions.length > 1 ? "s" : ""}`
                              : "No outstanding actions"}
                          </div>
                        </div>
                        {getStatusBadge(notif.status)}
                      </div>
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="space-y-4 pt-2">
                        {/* Conventions */}
                        <div>
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                            Conventions Potentially at Issue
                          </div>
                          <div className="space-y-1">
                            {notif.conventions.map((conv, idx) => (
                              <div key={idx} className="text-sm">
                                <div className="font-medium">{conv.name}</div>
                                {conv.reference && (
                                  <div className="text-xs text-muted-foreground">{conv.reference}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Registry Recommendation */}
                        <div className="border-t pt-4">
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                            Recommendation of Registry
                          </div>
                          <div className="text-sm">{notif.registryRecommendation}</div>
                        </div>

                        {/* Court Decision */}
                        {notif.courtDecision.pvRef && (
                          <div className="border-t pt-4">
                            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                              Decision of Court
                            </div>
                            <div className="text-sm">
                              <Badge variant="outline" className="mb-2">{notif.courtDecision.pvRef}</Badge>
                              {notif.courtDecision.decisionSummary && (
                                <div className="text-sm">{notif.courtDecision.decisionSummary}</div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Letters Sent */}
                        <div className="border-t pt-4">
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                            Letters Sent
                          </div>
                          {notif.lettersSent.length === 0 ? (
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onGenerateLetter?.(notif.id, "EN")}
                                className="h-8"
                              >
                                <Mail className="h-3 w-3 mr-1.5" />
                                Generate letter (EN)
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onGenerateLetter?.(notif.id, "FR")}
                                className="h-8"
                              >
                                <Mail className="h-3 w-3 mr-1.5" />
                                Generate letter (FR)
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {notif.lettersSent.map((letter) => (
                                <Link key={letter.id} href={letter.href}>
                                  <Badge variant="outline" className="cursor-pointer hover:bg-accent">
                                    <FileText className="h-3 w-3 mr-1" />
                                    {letter.title}
                                    {letter.language && ` (${letter.language})`}
                                    <ExternalLink className="h-2.5 w-2.5 ml-1" />
                                  </Badge>
                                </Link>
                              ))}
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onGenerateLetter?.(notif.id, "EN")}
                                className="h-7 text-xs"
                              >
                                <Mail className="h-3 w-3 mr-1" />
                                Add letter
                              </Button>
                            </div>
                          )}
                        </div>

                        {/* Responses Received */}
                        <div className="border-t pt-4">
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                            Response Received
                          </div>
                          {notif.responsesReceived.length === 0 ? (
                            <div className="text-sm text-muted-foreground">No responses yet</div>
                          ) : (
                            <div className="space-y-2">
                              {notif.responsesReceived.map((resp) => (
                                <div key={resp.id} className="text-sm">
                                  <div className="font-medium">{resp.from}</div>
                                  <div className="text-xs text-muted-foreground">{resp.summary}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {formatDate(resp.date)}
                                    {resp.href && (
                                      <Link href={resp.href} className="ml-2 text-primary hover:underline inline-flex items-center">
                                        View document
                                        <ExternalLink className="h-2.5 w-2.5 ml-1" />
                                      </Link>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Outstanding Actions */}
                        <div className="border-t pt-4">
                          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                            Outstanding Actions
                          </div>
                          {notif.outstandingActions.length === 0 ? (
                            <div className="text-sm text-green-600 flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4" />
                              No further action needed
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {notif.outstandingActions.map((action) => (
                                <div key={action.id} className="flex items-start gap-2 text-sm">
                                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                                  <div className="flex-1">
                                    <div>{action.title}</div>
                                    {action.due && (
                                      <div className="text-xs text-muted-foreground">
                                        Due: {formatDate(action.due)}
                                      </div>
                                    )}
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => onConvertToTask?.(action.id, action.title)}
                                    className="h-7 text-xs"
                                  >
                                    Convert to task
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
