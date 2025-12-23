"use client";

import { useState } from "react";
import { X, Upload, FileText, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ChecklistAction } from "@/lib/types";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: ChecklistAction | null;
  itemTitle: string;
  onExecute: (data: any) => void;
}

export function ActionModal({
  isOpen,
  onClose,
  action,
  itemTitle,
  onExecute,
}: ActionModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [distributionType, setDistributionType] = useState<string>("all_states");
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  if (!isOpen || !action) return null;

  const handleSubmit = () => {
    const data: any = {
      action,
      itemTitle,
    };

    switch (action.kind) {
      case "generate_letter":
        data.language = selectedLanguage;
        break;
      case "create_distribution":
        data.distributionType = distributionType;
        data.language = selectedLanguage;
        break;
      case "file_document":
        data.file = uploadedFile;
        break;
      case "record_event":
        data.referenceNumber = referenceNumber;
        data.date = eventDate;
        break;
    }

    onExecute(data);
    handleClose();
  };

  const handleClose = () => {
    // Reset form
    setSelectedLanguage("en");
    setDistributionType("all_states");
    setReferenceNumber("");
    setEventDate(new Date().toISOString().split("T")[0]);
    setUploadedFile(null);
    onClose();
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const getIcon = () => {
    switch (action.kind) {
      case "generate_letter":
        return <Mail className="h-5 w-5" />;
      case "create_distribution":
        return <Send className="h-5 w-5" />;
      case "file_document":
        return <Upload className="h-5 w-5" />;
      case "record_event":
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const renderContent = () => {
    switch (action.kind) {
      case "generate_letter":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Language
              </label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={selectedLanguage === "en" ? "default" : "outline"}
                  onClick={() => setSelectedLanguage("en")}
                  className="flex-1"
                >
                  English
                </Button>
                <Button
                  type="button"
                  variant={selectedLanguage === "fr" ? "default" : "outline"}
                  onClick={() => setSelectedLanguage("fr")}
                  className="flex-1"
                >
                  French
                </Button>
                <Button
                  type="button"
                  variant={selectedLanguage === "both" ? "default" : "outline"}
                  onClick={() => setSelectedLanguage("both")}
                  className="flex-1"
                >
                  Both
                </Button>
              </div>
            </div>
          </div>
        );

      case "create_distribution":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Distribution Type
              </label>
              <Select value={distributionType} onValueChange={setDistributionType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_states">All UN Member States</SelectItem>
                  <SelectItem value="parties">Parties Only</SelectItem>
                  <SelectItem value="convention_parties">Convention Parties</SelectItem>
                  <SelectItem value="judges">Judges Internal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Language
              </label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={selectedLanguage === "en" ? "default" : "outline"}
                  onClick={() => setSelectedLanguage("en")}
                  className="flex-1"
                >
                  English
                </Button>
                <Button
                  type="button"
                  variant={selectedLanguage === "fr" ? "default" : "outline"}
                  onClick={() => setSelectedLanguage("fr")}
                  className="flex-1"
                >
                  French
                </Button>
                <Button
                  type="button"
                  variant={selectedLanguage === "both" ? "default" : "outline"}
                  onClick={() => setSelectedLanguage("both")}
                  className="flex-1"
                >
                  Both
                </Button>
              </div>
            </div>
            <div className="bg-slate-50 rounded-md p-3 text-sm text-slate-600">
              Preview: {distributionType === "all_states" ? "193 states" :
                       distributionType === "parties" ? "2 parties" :
                       distributionType === "convention_parties" ? "152 states" :
                       "15 judges"}
            </div>
          </div>
        );

      case "file_document":
        return (
          <div className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-300 bg-slate-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="space-y-2">
                  <FileText className="h-12 w-12 mx-auto text-green-600" />
                  <p className="text-sm font-medium text-slate-900">
                    {uploadedFile.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setUploadedFile(null)}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-12 w-12 mx-auto text-slate-400" />
                  <p className="text-sm font-medium text-slate-900">
                    Drop file here or click to browse
                  </p>
                  <p className="text-xs text-slate-500">PDF, DOC, DOCX up to 50MB</p>
                  <input
                    type="file"
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                  <label htmlFor="file-upload">
                    <Button type="button" variant="outline" size="sm" asChild>
                      <span>Browse Files</span>
                    </Button>
                  </label>
                </div>
              )}
            </div>
          </div>
        );

      case "record_event":
        return (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="reference"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Reference Number
              </label>
              <input
                type="text"
                id="reference"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="e.g., REG-2024-001"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Event Date
              </label>
              <input
                type="date"
                id="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-sm text-slate-600">
            No additional configuration needed for this action.
          </div>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-[480px] w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-600">
              {getIcon()}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {action.label}
              </h2>
              <p className="text-sm text-slate-500">{itemTitle}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">{renderContent()}</div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </div>
      </div>
    </div>
  );
}
