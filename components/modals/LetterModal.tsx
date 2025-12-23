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
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import type { LetterType, Language, ActivityItem } from "@/lib/types";

interface LetterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseId: string;
  caseTitle: string;
  agentName: string;
  nextDeadline?: string;
  onActivityAdd: (item: ActivityItem) => void;
}

export function LetterModal({
  open,
  onOpenChange,
  caseId,
  caseTitle,
  agentName,
  nextDeadline,
  onActivityAdd,
}: LetterModalProps) {
  const [letterType, setLetterType] = useState<LetterType>("Acknowledgement");
  const [language, setLanguage] = useState<Language>("EN");

  const handleGenerate = async () => {
    const response = await fetch("/api/icj/letters/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caseId, letterType, language }),
    });

    const data = await response.json();
    onActivityAdd(data.activity);
    onOpenChange(false);
  };

  const getMergeFieldsPreview = () => {
    return {
      "Agent Name": agentName,
      "Case Title": caseTitle,
      "Next Deadline": nextDeadline || "N/A",
      Date: new Date().toLocaleDateString(),
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Generate Letter</DialogTitle>
          <DialogDescription>
            Create a letter with merge fields and bilingual support
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Letter Type</label>
            <Select value={letterType} onValueChange={(v) => setLetterType(v as LetterType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Acknowledgement">Acknowledgement</SelectItem>
                <SelectItem value="Transmittal">Transmittal</SelectItem>
                <SelectItem value="Circular">Circular</SelectItem>
                <SelectItem value="Reminder">Reminder</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Language</label>
            <div className="flex items-center gap-3">
              <span className={language === "EN" ? "font-semibold" : "text-muted-foreground"}>EN</span>
              <Switch
                checked={language === "FR"}
                onCheckedChange={(checked) => setLanguage(checked ? "FR" : "EN")}
              />
              <span className={language === "FR" ? "font-semibold" : "text-muted-foreground"}>FR</span>
            </div>
          </div>

          <div className="rounded-lg border p-4 space-y-2">
            <div className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
              Merge Fields Preview
            </div>
            <div className="space-y-1 text-sm">
              {Object.entries(getMergeFieldsPreview()).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-muted-foreground">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleGenerate}>Generate Letter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
