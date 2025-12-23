"use client";

import { ArrowLeft, Shield, Lock, Eye } from "lucide-react";
import Link from "next/link";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";

export default function PrivacyPage() {
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
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-semibold text-slate-900 mb-2">
          {t.privacy} Policy
        </h1>
        <p className="text-sm text-slate-600">
          Last updated: December 17, 2025
        </p>
      </div>

      {/* Privacy Content */}
      <div className="space-y-6">
        {/* Data Collection */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-3">
            <Shield size={24} className="text-[#5B92E5] flex-shrink-0" />
            <div>
              <h2 className="text-lg font-serif font-semibold text-slate-900 mb-2">
                Data Collection
              </h2>
              <p className="text-sm text-slate-600 mb-3">
                The International Court of Justice collects and processes personal data only as necessary
                for the performance of its judicial functions under the United Nations Charter and the
                Statute of the Court.
              </p>
              <p className="text-sm text-slate-600">
                Data collected includes identification information, contact details, and communications
                related to cases before the Court.
              </p>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-3">
            <Lock size={24} className="text-[#5B92E5] flex-shrink-0" />
            <div>
              <h2 className="text-lg font-serif font-semibold text-slate-900 mb-2">
                Data Security
              </h2>
              <p className="text-sm text-slate-600 mb-3">
                All data transmitted through this portal is encrypted using industry-standard protocols.
                Access to sensitive information is restricted to authorized personnel only.
              </p>
              <p className="text-sm text-slate-600">
                The Court maintains strict security measures to protect against unauthorized access,
                alteration, disclosure, or destruction of personal data.
              </p>
            </div>
          </div>
        </div>

        {/* Data Usage */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="flex items-start gap-3 mb-3">
            <Eye size={24} className="text-[#5B92E5] flex-shrink-0" />
            <div>
              <h2 className="text-lg font-serif font-semibold text-slate-900 mb-2">
                Data Usage
              </h2>
              <p className="text-sm text-slate-600 mb-3">
                Personal data is used exclusively for:
              </p>
              <ul className="text-sm text-slate-600 space-y-2 ml-4 list-disc">
                <li>Case management and proceedings</li>
                <li>Official communications with States and their representatives</li>
                <li>Maintaining the Court's records and archives</li>
                <li>Fulfilling the Court's judicial and administrative functions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="text-lg font-serif font-semibold text-slate-900 mb-3">
            Your Rights
          </h2>
          <p className="text-sm text-slate-600 mb-3">
            You have the right to:
          </p>
          <ul className="text-sm text-slate-600 space-y-2 ml-4 list-disc">
            <li>Access your personal data held by the Court</li>
            <li>Request correction of inaccurate data</li>
            <li>Understand how your data is being processed</li>
            <li>Contact the Registry regarding data protection concerns</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
          <p className="text-sm text-slate-600">
            For questions regarding this privacy policy or data protection, please contact the
            Registry at{" "}
            <a href="mailto:registry@icj-cij.org" className="text-[#5B92E5] hover:underline">
              registry@icj-cij.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
