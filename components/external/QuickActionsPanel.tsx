"use client";

import { Upload, FileText, Users } from "lucide-react";
import Link from "next/link";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";

export function QuickActionsPanel() {
  const t = useExternalTranslation();

  const actions = [
    {
      icon: Upload,
      label: t.submitFiling,
      href: '/external/submit',
      color: 'text-blue-600 bg-blue-50 hover:bg-blue-100'
    },
    {
      icon: FileText,
      label: t.viewDocuments,
      href: '/external/documents',
      color: 'text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
    },
    {
      icon: Users,
      label: t.updateContact,
      href: '/external/profile',
      color: 'text-amber-600 bg-amber-50 hover:bg-amber-100'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      {/* Panel Header */}
      <div className="px-3.5 py-3 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-xs font-semibold text-slate-900">{t.quickActions}</h3>
      </div>

      {/* Actions List */}
      <div className="p-2 space-y-1">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              href={action.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${action.color}`}
            >
              <Icon size={18} />
              <span className="text-xs font-medium">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
