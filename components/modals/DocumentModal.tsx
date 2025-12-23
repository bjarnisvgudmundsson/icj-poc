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
import type { Language, TranslationStatus, DocumentCategory, ActivityItem } from "@/lib/types";

interface DocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseId: string;
  onActivityAdd: (item: ActivityItem) => void;
  onDocumentAdd: (doc: any) => void;
}

export function DocumentModal({
  open,
  onOpenChange,
  caseId,
  onActivityAdd,
  onDocumentAdd,
}: DocumentModalProps) {
  const [title, setTitle] = useState("");
  const [ref, setRef] = useState("");
  const [pages, setPages] = useState(1);
  const [language, setLanguage] = useState<Language>("EN");
  const [translationStatus, setTranslationStatus] = useState<TranslationStatus>("Received");
  const [category, setCategory] = useState<DocumentCategory>("All Documents");
  const [annexCount, setAnnexCount] = useState(0);

  const handleSubmit = () => {
    const newDoc = {
      id: `d-${Date.now()}`,
      title,
      ref,
      date: new Date().toISOString().split("T")[0],
      pages,
      language,
      translationStatus,
      isKey: false,
      category,
      ...(annexCount > 0 && { annexCount }),
    };

    onDocumentAdd(newDoc);

    const activity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: "document",
      title: "Document filed",
      subtitle: title,
      timestamp: new Date().toISOString(),
      icon: "FileText",
    };

    onActivityAdd(activity);
    onOpenChange(false);

    // Reset form
    setTitle("");
    setRef("");
    setPages(1);
    setLanguage("EN");
    setTranslationStatus("Received");
    setCategory("All Documents");
    setAnnexCount(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>File Document</DialogTitle>
          <DialogDescription>Add a new document to the case</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Document Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm"
              placeholder="e.g., Counter-Memorial of Respondent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Reference</label>
              <input
                type="text"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
                className="w-full rounded-md border px-3 py-2 text-sm"
                placeholder="2024/15"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Pages</label>
              <input
                type="number"
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full rounded-md border px-3 py-2 text-sm"
                min={1}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Select value={language} onValueChange={(v) => setLanguage(v as Language)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EN">English</SelectItem>
                  <SelectItem value="FR">French</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Translation Status</label>
              <Select
                value={translationStatus}
                onValueChange={(v) => setTranslationStatus(v as TranslationStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Translation">Translation</SelectItem>
                  <SelectItem value="Received">Received</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Awaited">Awaited</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={category} onValueChange={(v) => setCategory(v as DocumentCategory)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Key Documents">Key Documents</SelectItem>
                <SelectItem value="All Documents">All Documents</SelectItem>
                <SelectItem value="Correspondence">Correspondence</SelectItem>
                <SelectItem value="Pleadings">Pleadings</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Annex Count (optional)</label>
            <input
              type="number"
              value={annexCount}
              onChange={(e) => setAnnexCount(Number(e.target.value))}
              className="w-full rounded-md border px-3 py-2 text-sm"
              min={0}
              placeholder="0"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title || !ref}>
            File Document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
