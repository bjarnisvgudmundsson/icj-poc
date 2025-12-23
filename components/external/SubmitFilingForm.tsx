"use client";

import { Upload } from "lucide-react";
import { useState } from "react";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";
import type { FilingType } from "@/types/external";

export function SubmitFilingForm() {
  const t = useExternalTranslation();
  const [filingType, setFilingType] = useState<FilingType | ''>('');

  const filingTypes: FilingType[] = [
    'Memorial',
    'Counter-Memorial',
    'Reply',
    'Rejoinder',
    'Letter/Request',
    'Evidence/Annex'
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <h3 className="text-lg font-serif font-semibold text-slate-900 mb-6">
        {t.submitFiling}
      </h3>

      <div className="space-y-6">
        {/* Filing Type Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t.filingType}
          </label>
          <select
            value={filingType}
            onChange={(e) => setFilingType(e.target.value as FilingType)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#5B92E5] focus:border-transparent"
          >
            <option value="">{t.selectType}</option>
            {filingTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* File Upload Area */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            {t.documents}
          </label>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-[#5B92E5] transition-colors cursor-pointer">
            <Upload size={32} className="mx-auto text-slate-400 mb-3" />
            <p className="text-sm text-slate-600 mb-1">{t.dragDrop}</p>
            <p className="text-xs text-slate-500">{t.orClick}</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          disabled={!filingType}
          className="w-full bg-[#5B92E5] text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          {t.submitButton}
        </button>

        {/* Help Text */}
        <p className="text-xs text-slate-600 text-center">
          All submissions are processed securely and acknowledged by the Registry within 24 hours.
        </p>
      </div>
    </div>
  );
}
