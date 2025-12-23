"use client";

import { Download, FileText } from "lucide-react";
import type { ExternalDocument } from "@/types/external";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";

interface DocumentsTableProps {
  documents: ExternalDocument[];
  caseId?: number;
}

function getDocumentTypeColor(type: string) {
  switch (type) {
    case 'Order':
      return 'text-blue-700 bg-blue-50';
    case 'Pleading':
      return 'text-emerald-700 bg-emerald-50';
    case 'Correspondence':
      return 'text-amber-700 bg-amber-50';
    default:
      return 'text-slate-700 bg-slate-50';
  }
}

export function DocumentsTable({ documents, caseId }: DocumentsTableProps) {
  const t = useExternalTranslation();

  const filteredDocs = caseId
    ? documents.filter(doc => doc.caseId === caseId)
    : documents;

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                {t.type}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                {t.documents}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                {t.date}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                {t.language}
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700">
                {t.actions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredDocs.map(doc => (
              <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <span className={`inline-block text-[10px] font-semibold px-2 py-1 rounded ${getDocumentTypeColor(doc.type)}`}>
                    {doc.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-slate-400 flex-shrink-0" />
                    <span className="text-sm text-slate-900">{doc.title}</span>
                    {doc.isNew && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">
                        NEW
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-slate-600">
                  {doc.date}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {doc.languages.map(lang => (
                      <span
                        key={lang}
                        className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    <Download size={14} />
                    {t.download}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
