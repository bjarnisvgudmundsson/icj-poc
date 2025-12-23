"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  ChevronDown,
  Mail,
  Send,
  FileText,
  PenLine,
  ClipboardCheck,
  Link2,
} from "lucide-react";
import { ActionModal } from "@/components/ActionModal";
import type {
  ChecklistItem,
  ChecklistPhaseId,
  ChecklistAction,
  ActivityItem,
  ChecklistItemStatus,
  LanguageStatus,
} from "@/lib/types";

interface EnhancedChecklistProps {
  checklistData: Record<string, ChecklistItem[]>;
  caseId: string;
  onActionExecute: (action: ChecklistAction, itemId: string) => void;
  onActivityAdd: (item: ActivityItem) => void;
}

const STORAGE_KEY = "icj-checklist-state";

function getActionIcon(actionKind: string) {
  switch (actionKind) {
    case "generate_letter":
      return <Mail className="h-4 w-4" />;
    case "create_distribution":
      return <Send className="h-4 w-4" />;
    case "file_document":
      return <FileText className="h-4 w-4" />;
    case "record_event":
      return <ClipboardCheck className="h-4 w-4" />;
    default:
      return <PenLine className="h-4 w-4" />;
  }
}

interface StatusIndicatorProps {
  status: ChecklistItemStatus;
  onClick: (e: React.MouseEvent) => void;
}

function StatusIndicator({ status, onClick }: StatusIndicatorProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(e);
  };

  switch (status) {
    case "complete":
      return (
        <div
          onClick={handleClick}
          className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-green-500 flex-shrink-0 cursor-pointer hover:scale-110 transition-transform"
          title="Click to change status"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-white" />
        </div>
      );
    case "partial":
      return (
        <div
          onClick={handleClick}
          className="flex items-center justify-center w-[22px] h-[22px] rounded-full border-2 border-amber-500 bg-white flex-shrink-0 cursor-pointer hover:scale-110 transition-transform"
          title="Click to change status"
        >
          <div className="w-2 h-2 rounded-full bg-amber-500" />
        </div>
      );
    default: // pending
      return (
        <div
          onClick={handleClick}
          className="w-[22px] h-[22px] rounded-full border-2 border-slate-300 bg-white flex-shrink-0 cursor-pointer hover:scale-110 transition-transform"
          title="Click to change status"
        />
      );
  }
}

interface LanguageBadgeProps {
  language: "en" | "fr";
  status: LanguageStatus;
  onClick: (e: React.MouseEvent) => void;
}

function LanguageBadge({ language, status, onClick }: LanguageBadgeProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick(e);
  };

  const lang = language.toUpperCase();

  let className = "text-[11px] font-semibold px-2 py-1 rounded cursor-pointer hover:scale-105 transition-transform select-none";
  let displayText = lang;

  if (status === "na") {
    className += " bg-slate-50 text-slate-300 opacity-60";
  } else if (status === "complete") {
    className += " bg-green-100 text-green-800";
    displayText = `✓ ${lang}`;
  } else if (status === "awaiting") {
    className += " bg-amber-100 text-amber-800";
    displayText = `⏳ ${lang}`;
  } else {
    className += " bg-slate-100 text-slate-500";
  }

  return (
    <span
      onClick={handleClick}
      className={className}
      title={`Click to change ${lang} status`}
    >
      {displayText}
    </span>
  );
}

interface CollapsibleChecklistItemProps {
  item: ChecklistItem;
  onActionClick: (action: ChecklistAction, item: ChecklistItem) => void;
  onStatusChange: (itemId: string, newStatus: ChecklistItemStatus) => void;
  onLanguageStatusChange: (
    itemId: string,
    language: "en" | "fr",
    newStatus: LanguageStatus
  ) => void;
}

function CollapsibleChecklistItem({
  item,
  onActionClick,
  onStatusChange,
  onLanguageStatusChange,
}: CollapsibleChecklistItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const enStatus = item.languages?.en;
  const frStatus = item.languages?.fr;
  const hasLanguages = enStatus || frStatus;

  const handleStatusClick = () => {
    const statusCycle: ChecklistItemStatus[] = ["pending", "partial", "complete"];
    const currentIndex = statusCycle.indexOf(item.status);
    const nextIndex = (currentIndex + 1) % statusCycle.length;
    onStatusChange(item.id, statusCycle[nextIndex]);
  };

  const handleLanguageClick = (language: "en" | "fr") => {
    const currentStatus = item.languages?.[language] || "pending";
    const statusCycle: LanguageStatus[] = ["pending", "awaiting", "complete"];
    const currentIndex = statusCycle.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusCycle.length;
    onLanguageStatusChange(item.id, language, statusCycle[nextIndex]);
  };

  return (
    <div
      className={`border rounded-lg transition-colors ${
        item.status === "partial"
          ? "border-l-[3px] border-l-amber-500"
          : "border-slate-200"
      } hover:bg-slate-50`}
      data-item-id={item.id}
    >
      {/* Collapsed Row */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left px-6 py-4 flex items-start gap-3"
        aria-expanded={isExpanded}
      >
        {/* Status Indicator */}
        <StatusIndicator status={item.status} onClick={handleStatusClick} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-slate-900 text-sm">{item.title}</div>
          {item.description && (
            <div className="text-xs text-slate-600 mt-0.5">
              {item.description}
            </div>
          )}
        </div>

        {/* Language Badges */}
        {hasLanguages && (
          <div className="flex items-center gap-1.5 flex-shrink-0 mr-3">
            {enStatus && enStatus !== "na" && (
              <LanguageBadge
                language="en"
                status={enStatus}
                onClick={() => handleLanguageClick("en")}
              />
            )}
            {frStatus && frStatus !== "na" && (
              <LanguageBadge
                language="fr"
                status={frStatus}
                onClick={() => handleLanguageClick("fr")}
              />
            )}
          </div>
        )}

        {/* Expand Chevron */}
        <ChevronDown
          className={`h-5 w-5 text-slate-400 transition-transform flex-shrink-0 ${
            isExpanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-slate-200 px-6 py-4 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Actions Column */}
            {item.actions.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Actions
                </div>
                <div className="space-y-2">
                  {item.actions.map((action) => (
                    <Button
                      key={action.id}
                      onClick={() => onActionClick(action, item)}
                      variant={action.primary ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start gap-2 h-9"
                    >
                      {getActionIcon(action.kind)}
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Evidence Column */}
            {item.evidence.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                  Evidence
                </div>
                <div className="space-y-1.5">
                  {item.evidence.map((ev) => (
                    <Link key={ev.id} href={ev.href}>
                      <div className="flex items-center gap-2 p-2 rounded-md border border-slate-200 hover:bg-white hover:border-slate-300 transition-colors text-sm">
                        <Link2 className="h-3.5 w-3.5 text-slate-400 flex-shrink-0" />
                        <span className="flex-1 text-slate-700">{ev.title}</span>
                        {ev.language && (
                          <Badge variant="outline" className="text-[10px] px-1.5">
                            {ev.language}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function EnhancedChecklist({
  checklistData,
  caseId,
  onActionExecute,
  onActivityAdd,
}: EnhancedChecklistProps) {
  const [selectedPhase, setSelectedPhase] =
    useState<ChecklistPhaseId>("initiation");
  const [items, setItems] = useState(checklistData);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState<{
    action: ChecklistAction;
    item: ChecklistItem;
  } | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const loadState = () => {
      try {
        const saved = localStorage.getItem(`${STORAGE_KEY}-${caseId}`);
        if (!saved) return;

        const state = JSON.parse(saved);

        setItems((prevItems) => {
          const updatedItems = { ...prevItems };

          Object.keys(updatedItems).forEach((phase) => {
            updatedItems[phase] = updatedItems[phase].map((item) => {
              const savedItem = state[item.id];
              if (savedItem) {
                return {
                  ...item,
                  status: savedItem.status || item.status,
                  languages: savedItem.languages || item.languages,
                };
              }
              return item;
            });
          });

          return updatedItems;
        });
      } catch (error) {
        console.error("Failed to load checklist state:", error);
      }
    };

    loadState();
  }, [caseId]);

  // Save state to localStorage whenever items change
  useEffect(() => {
    const saveState = () => {
      try {
        const state: Record<string, any> = {};

        Object.keys(items).forEach((phase) => {
          items[phase].forEach((item) => {
            state[item.id] = {
              status: item.status,
              languages: item.languages,
            };
          });
        });

        localStorage.setItem(`${STORAGE_KEY}-${caseId}`, JSON.stringify(state));
      } catch (error) {
        console.error("Failed to save checklist state:", error);
      }
    };

    saveState();
  }, [items, caseId]);

  const currentItems = items[selectedPhase] || [];
  const completedItems = currentItems.filter((item) => item.status === "complete").length;
  const totalItems = currentItems.length;
  const awaitingTranslation = currentItems.filter((item) => {
    const enAwaiting = item.languages?.en === "awaiting";
    const frAwaiting = item.languages?.fr === "awaiting";
    return enAwaiting || frAwaiting;
  }).length;

  const handleStatusChange = (itemId: string, newStatus: ChecklistItemStatus) => {
    setItems((prevItems) => {
      const updatedPhaseItems = prevItems[selectedPhase].map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item
      );
      return {
        ...prevItems,
        [selectedPhase]: updatedPhaseItems,
      };
    });

    // Log activity
    onActivityAdd({
      id: `activity-${Date.now()}`,
      type: "status_change",
      description: `Checklist item status changed to ${newStatus}`,
      timestamp: new Date().toISOString(),
      user: "Current User",
    });
  };

  const handleLanguageStatusChange = (
    itemId: string,
    language: "en" | "fr",
    newStatus: LanguageStatus
  ) => {
    setItems((prevItems) => {
      const updatedPhaseItems = prevItems[selectedPhase].map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            languages: {
              ...item.languages,
              [language]: newStatus,
            },
          };
        }
        return item;
      });
      return {
        ...prevItems,
        [selectedPhase]: updatedPhaseItems,
      };
    });

    // Log activity
    onActivityAdd({
      id: `activity-${Date.now()}`,
      type: "language_status_change",
      description: `${language.toUpperCase()} language status changed to ${newStatus}`,
      timestamp: new Date().toISOString(),
      user: "Current User",
    });
  };

  const handleActionClick = (action: ChecklistAction, item: ChecklistItem) => {
    setCurrentAction({ action, item });
    setModalOpen(true);
  };

  const handleModalExecute = (data: any) => {
    if (currentAction) {
      onActionExecute(currentAction.action, currentAction.item.id);

      // Log activity
      onActivityAdd({
        id: `activity-${Date.now()}`,
        type: "action",
        description: `Executed: ${currentAction.action.label}`,
        timestamp: new Date().toISOString(),
        user: "Current User",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Initiation Checklist</CardTitle>
          <Select
            value={selectedPhase}
            onValueChange={(v) => setSelectedPhase(v as ChecklistPhaseId)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="initiation">Initiation</SelectItem>
              <SelectItem value="procedural">Procedural</SelectItem>
              <SelectItem value="written">Written</SelectItem>
              <SelectItem value="oral">Oral</SelectItem>
              <SelectItem value="judgment">Judgment</SelectItem>
              <SelectItem value="closure">Closure</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              {completedItems} of {totalItems} tasks complete
            </span>
            {awaitingTranslation > 0 && (
              <span className="text-xs text-amber-700">
                {awaitingTranslation} awaiting translation
              </span>
            )}
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1">
            <div
              className="bg-gradient-to-r from-green-500 to-green-600 h-1 rounded-full transition-all"
              style={{
                width: `${totalItems > 0 ? (completedItems / totalItems) * 100 : 0}%`,
              }}
              role="progressbar"
              aria-valuenow={completedItems}
              aria-valuemin={0}
              aria-valuemax={totalItems}
            />
          </div>
        </div>

        {/* Checklist Items */}
        <div className="space-y-2">
          {currentItems.map((item) => (
            <CollapsibleChecklistItem
              key={item.id}
              item={item}
              onActionClick={handleActionClick}
              onStatusChange={handleStatusChange}
              onLanguageStatusChange={handleLanguageStatusChange}
            />
          ))}

          {currentItems.length === 0 && (
            <div className="text-sm text-slate-500 text-center py-8">
              No checklist items for this phase
            </div>
          )}
        </div>
      </CardContent>

      {/* Action Modal */}
      <ActionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        action={currentAction?.action || null}
        itemTitle={currentAction?.item.title || ""}
        onExecute={handleModalExecute}
      />
    </Card>
  );
}
