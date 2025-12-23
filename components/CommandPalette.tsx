"use client";

import { useEffect, useState, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FileText, Send, Mail, Sparkles, Star, Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ActivityItem } from "@/lib/types";

interface Command {
  id: string;
  category: string;
  label: string;
  icon: string;
  execute: () => Promise<ActivityItem>;
}

interface CommandPaletteProps {
  caseId: string;
  onActivityAdd: (item: ActivityItem) => void;
}

export function CommandPalette({ caseId, onActivityAdd }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const commands: Command[] = [
    {
      id: "gen-ack",
      category: "Quick Actions",
      label: "Generate acknowledgement letter",
      icon: "Mail",
      execute: async () => ({
        id: `act-${Date.now()}`,
        type: "letter",
        title: "Acknowledgement letter generated",
        subtitle: "English version, ready for review",
        timestamp: new Date().toISOString(),
        icon: "Mail",
      }),
    },
    {
      id: "gen-trans",
      category: "Quick Actions",
      label: "Generate transmittal to Respondent",
      icon: "Send",
      execute: async () => ({
        id: `act-${Date.now()}`,
        type: "letter",
        title: "Transmittal letter generated",
        subtitle: "To Respondent agent",
        timestamp: new Date().toISOString(),
        icon: "Send",
      }),
    },
    {
      id: "prep-circ",
      category: "Quick Actions",
      label: "Prepare circular letter (exclude parties)",
      icon: "Mail",
      execute: async () => ({
        id: `act-${Date.now()}`,
        type: "letter",
        title: "Circular letter prepared",
        subtitle: "191 recipients (parties excluded)",
        timestamp: new Date().toISOString(),
        icon: "Mail",
      }),
    },
    {
      id: "cover-page",
      category: "Documents",
      label: "Create distribution cover page (EN/FR)",
      icon: "FileText",
      execute: async () => ({
        id: `act-${Date.now()}`,
        type: "document",
        title: "Bilingual cover pages created",
        subtitle: "English and French versions",
        timestamp: new Date().toISOString(),
        icon: "FileText",
      }),
    },
    {
      id: "new-dist",
      category: "Distributions",
      label: "Create new distribution to 193+ States",
      icon: "Send",
      execute: async () => ({
        id: `act-${Date.now()}`,
        type: "distribution",
        title: "Distribution created",
        subtitle: "191 recipients (parties excluded)",
        timestamp: new Date().toISOString(),
        icon: "Send",
      }),
    },
    {
      id: "track-del",
      category: "Distributions",
      label: "Track delivery confirmations",
      icon: "Flag",
      execute: async () => ({
        id: `act-${Date.now()}`,
        type: "action",
        title: "Delivery tracking initiated",
        subtitle: "Monitoring 191 recipients",
        timestamp: new Date().toISOString(),
        icon: "Flag",
      }),
    },
    {
      id: "flag-key",
      category: "Documents",
      label: "Flag/unflag key documents",
      icon: "Star",
      execute: async () => ({
        id: `act-${Date.now()}`,
        type: "action",
        title: "Document flagged as key",
        subtitle: "Added to Key Documents tab",
        timestamp: new Date().toISOString(),
        icon: "Star",
      }),
    },
    {
      id: "ai-summarize",
      category: "AI Actions",
      label: "Summarise application + extract dates/parties",
      icon: "Sparkles",
      execute: async () => ({
        id: `act-${Date.now()}`,
        type: "ai",
        title: "AI summary generated",
        subtitle: "Extracted key dates and parties",
        timestamp: new Date().toISOString(),
        icon: "Sparkles",
      }),
    },
    {
      id: "ai-missing",
      category: "AI Actions",
      label: "Identify missing intake steps",
      icon: "Sparkles",
      execute: async () => ({
        id: `act-${Date.now()}`,
        type: "ai",
        title: "AI analysis complete",
        subtitle: "Found 2 pending intake steps",
        timestamp: new Date().toISOString(),
        icon: "Sparkles",
      }),
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedCommands = filteredCommands.reduce(
    (acc, cmd) => {
      if (!acc[cmd.category]) acc[cmd.category] = [];
      acc[cmd.category].push(cmd);
      return acc;
    },
    {} as Record<string, Command[]>
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (!open) return;

      if (e.key === "Escape") {
        setOpen(false);
        setSearchQuery("");
        setSelectedIndex(0);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? filteredCommands.length - 1 : prev - 1
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex]);
        }
      }
    },
    [open, filteredCommands, selectedIndex]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const executeCommand = async (cmd: Command) => {
    const activityItem = await cmd.execute();
    onActivityAdd(activityItem);
    setOpen(false);
    setSearchQuery("");
    setSelectedIndex(0);
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Mail,
      Send,
      FileText,
      Flag,
      Star,
      Sparkles,
    };
    const Icon = icons[iconName] || FileText;
    return <Icon className="h-4 w-4" />;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="border-b p-4">
          <input
            type="text"
            placeholder="Search commands..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-lg outline-none placeholder:text-muted-foreground"
            autoFocus
          />
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2">
          {Object.entries(groupedCommands).map(([category, cmds]) => (
            <div key={category} className="mb-4">
              <div className="px-2 py-1 text-xs uppercase tracking-wide text-muted-foreground font-semibold">
                {category}
              </div>
              <div className="space-y-1">
                {cmds.map((cmd, index) => {
                  const globalIndex = filteredCommands.indexOf(cmd);
                  return (
                    <button
                      key={cmd.id}
                      onClick={() => executeCommand(cmd)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
                        globalIndex === selectedIndex
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/50"
                      )}
                    >
                      {getIcon(cmd.icon)}
                      <span>{cmd.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredCommands.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No commands found
            </div>
          )}
        </div>

        <div className="border-t p-3 bg-muted/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <kbd className="rounded bg-background px-1.5 py-0.5 border">↑↓</kbd>
              <span>Navigate</span>
              <kbd className="rounded bg-background px-1.5 py-0.5 border">Enter</kbd>
              <span>Execute</span>
              <kbd className="rounded bg-background px-1.5 py-0.5 border">Esc</kbd>
              <span>Close</span>
            </div>
            <div>
              <kbd className="rounded bg-background px-1.5 py-0.5 border">⌘K</kbd>
              <span className="ml-2">Toggle</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
