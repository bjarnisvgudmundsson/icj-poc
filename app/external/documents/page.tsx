"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";
import { mockDocuments } from "@/lib/mockExternalData";
import { DocumentsTable } from "@/components/external/DocumentsTable";

export default function DocumentsPage() {
  const t = useExternalTranslation();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Back Button */}
      <Link
        href="/external"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-[#5B92E5] transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        {t.backToDashboard}
      </Link>

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-slate-900 mb-1">
            {t.documents}
          </h1>
          <p className="text-sm text-slate-600">
            All documents across your cases
          </p>
        </div>
      </div>

      {/* Documents Table */}
      <DocumentsTable documents={mockDocuments} />
    </div>
  );
}
