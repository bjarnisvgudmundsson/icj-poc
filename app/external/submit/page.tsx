"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";
import { SubmitFilingForm } from "@/components/external/SubmitFilingForm";
import { mockCases } from "@/lib/mockExternalData";

export default function SubmitPage() {
  const t = useExternalTranslation();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Back Button */}
      <Link
        href="/external"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#5B92E5] transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        {t.backToDashboard}
      </Link>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-semibold text-slate-900 mb-2">
          {t.submitFiling}
        </h1>
        <p className="text-sm text-slate-600">
          Submit documents and filings to the Court
        </p>
      </div>

      {/* Case Selection */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-3">
          Select Case
        </label>
        <div className="space-y-2">
          {mockCases.map(case_ => (
            <Link
              key={case_.id}
              href={`/external/case/${case_.id}?tab=submit`}
              className="block p-4 border border-slate-200 rounded-lg hover:border-[#5B92E5] hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {case_.caseNumber} • {case_.shortTitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    {case_.fullTitle}
                  </p>
                </div>
                <span className="text-xs text-[#5B92E5] font-medium">Select →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* General Submission */}
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <h2 className="text-lg font-serif font-semibold text-slate-900 mb-4">
          General Submission
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          For submissions not related to a specific case, use the form below.
        </p>
        <SubmitFilingForm />
      </div>
    </div>
  );
}
