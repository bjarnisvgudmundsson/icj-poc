"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import type { RecipientScope, ActivityItem, Party } from "@/lib/types";

interface DistributionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseId: string;
  parties: Party[];
  documents: { id: string; title: string; pages: number }[];
  onActivityAdd: (item: ActivityItem) => void;
}

export function DistributionModal({
  open,
  onOpenChange,
  caseId,
  parties,
  documents,
  onActivityAdd,
}: DistributionModalProps) {
  const [scope, setScope] = useState<RecipientScope>("All States");
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  const totalRecipients = scope === "All States" ? 191 : scope === "Selected" ? 25 : 15;
  const exclusions = parties.map((p) => p.country);

  const getTotalSize = () => {
    const docs = documents.filter((d) => selectedDocs.includes(d.id));
    const totalPages = docs.reduce((sum, d) => sum + d.pages, 0);
    return totalPages * 0.2; // Mock: ~0.2MB per page
  };

  const fileSizeWarning = getTotalSize() > 10;

  const handleCreate = async () => {
    const response = await fetch("/api/icj/distributions/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caseId, scope, attachments: selectedDocs }),
    });

    const data = await response.json();
    onActivityAdd(data.activity);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>New Distribution</DialogTitle>
          <DialogDescription>
            Create a distribution with automatic party exclusion
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Recipient Scope</label>
            <Select value={scope} onValueChange={(v) => setScope(v as RecipientScope)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All States">All States (193)</SelectItem>
                <SelectItem value="Selected">Selected States</SelectItem>
                <SelectItem value="Judges internal">Judges (Internal)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border p-4 space-y-2 bg-muted/30">
            <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
              Auto-Excluded Parties
            </div>
            <div className="flex flex-wrap gap-2">
              {exclusions.map((country) => (
                <Badge key={country} variant="secondary">
                  {country}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {totalRecipients} recipients will receive this distribution
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Attachments</label>
            <div className="max-h-40 overflow-y-auto rounded-md border p-2 space-y-1">
              {documents.slice(0, 10).map((doc) => (
                <label
                  key={doc.id}
                  className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedDocs.includes(doc.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDocs([...selectedDocs, doc.id]);
                      } else {
                        setSelectedDocs(selectedDocs.filter((id) => id !== doc.id));
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-sm flex-1">{doc.title}</span>
                  <span className="text-xs text-muted-foreground">{doc.pages}p</span>
                </label>
              ))}
            </div>
          </div>

          {fileSizeWarning && (
            <div className="flex items-start gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <div className="font-medium text-yellow-900">Large file size warning</div>
                <div className="text-yellow-700 text-xs">
                  Total size: {getTotalSize().toFixed(1)}MB. Some recipients may have delivery issues.
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={selectedDocs.length === 0}>
            Create Distribution
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
