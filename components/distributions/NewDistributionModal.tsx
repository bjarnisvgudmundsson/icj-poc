"use client";

import { useState } from "react";
import { X, Globe, Users, FileText, Building, Scale, Upload, ChevronRight } from "lucide-react";
import { DISTRIBUTION_TYPES } from "@/lib/distributions-data";
import { MOCK_CASES } from "@/lib/cases-data";

interface NewDistributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: NewDistributionData) => void;
}

export interface NewDistributionData {
  type: string;
  caseId: string;
  subject: string;
  documents: string[];
}

const iconMap: Record<string, any> = {
  Globe,
  Users,
  FileText,
  Building,
  Scale,
};

export function NewDistributionModal({
  isOpen,
  onClose,
  onCreate,
}: NewDistributionModalProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [documents, setDocuments] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleClose = () => {
    setSelectedType(null);
    setSelectedCase("");
    setSubject("");
    setDocuments([]);
    onClose();
  };

  const handleCreate = () => {
    if (!selectedType || !selectedCase || !subject) return;

    onCreate({
      type: selectedType,
      caseId: selectedCase,
      subject,
      documents,
    });

    handleClose();
  };

  const canProceed = selectedType && selectedCase && subject.trim().length > 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center"
        onClick={handleClose}
      >
        {/* Modal */}
        <div
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">
              New Distribution
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-slate-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Step 1: Distribution Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                1. Select Distribution Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {DISTRIBUTION_TYPES.map((type) => {
                  const Icon = iconMap[type.icon] || FileText;
                  const isSelected = selectedType === type.id;

                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        isSelected
                          ? "border-blue-500 bg-blue-50"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected ? "bg-blue-100" : "bg-slate-100"
                          }`}
                        >
                          <Icon
                            size={20}
                            className={
                              isSelected ? "text-blue-600" : "text-slate-600"
                            }
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-slate-900 mb-1">
                            {type.label}
                          </div>
                          <div className="text-xs text-slate-600">
                            {type.recipients}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Case */}
            {selectedType && (
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  2. Select Case
                </label>
                <select
                  value={selectedCase}
                  onChange={(e) => setSelectedCase(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Choose a case...</option>
                  {MOCK_CASES.map((c) => (
                    <option key={c.id} value={c.id}>
                      No. {c.number} - {c.shortTitle}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Step 3: Subject */}
            {selectedCase && (
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  3. Subject Line
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter distribution subject..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Step 4: Documents */}
            {subject && (
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  4. Attach Documents (Optional)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-slate-400 transition-colors cursor-pointer">
                  <Upload size={32} className="mx-auto mb-3 text-slate-400" />
                  <div className="text-sm font-medium text-slate-700 mb-1">
                    Click to upload or drag and drop
                  </div>
                  <div className="text-xs text-slate-500">
                    PDF, DOC, DOCX up to 50MB
                  </div>
                </div>
                {documents.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                      >
                        <FileText size={16} className="text-slate-400" />
                        <span className="flex-1 text-sm text-slate-900">
                          {doc}
                        </span>
                        <button
                          onClick={() =>
                            setDocuments(documents.filter((_, i) => i !== idx))
                          }
                          className="p-1 hover:bg-slate-200 rounded transition-colors"
                        >
                          <X size={14} className="text-slate-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Preview */}
            {canProceed && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider mb-2">
                  Distribution Preview
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-700">Type:</span>
                    <span className="font-medium text-blue-900">
                      {
                        DISTRIBUTION_TYPES.find((t) => t.id === selectedType)
                          ?.label
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-700">Case:</span>
                    <span className="font-medium text-blue-900">
                      No.{" "}
                      {MOCK_CASES.find((c) => c.id === selectedCase)?.number}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-700">Recipients:</span>
                    <span className="font-medium text-blue-900">
                      {
                        DISTRIBUTION_TYPES.find((t) => t.id === selectedType)
                          ?.recipients
                      }
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-700">Documents:</span>
                    <span className="font-medium text-blue-900">
                      {documents.length || "None"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!canProceed}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                canProceed
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              Create Distribution
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
