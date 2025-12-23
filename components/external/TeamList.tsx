"use client";

import { User, UserPlus } from "lucide-react";
import type { TeamMember } from "@/types/external";
import { useExternalTranslation } from "@/hooks/useExternalTranslation";

interface TeamListProps {
  members: TeamMember[];
}

function getRoleColor(role: string) {
  switch (role) {
    case 'Agent':
      return 'text-blue-700 bg-blue-50';
    case 'Co-Agent':
      return 'text-emerald-700 bg-emerald-50';
    case 'Counsel':
      return 'text-amber-700 bg-amber-50';
    default:
      return 'text-slate-700 bg-slate-50';
  }
}

export function TeamList({ members }: TeamListProps) {
  const t = useExternalTranslation();

  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
        <h3 className="text-sm font-semibold text-slate-900">
          {t.teamMembers}
        </h3>
        <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
          <UserPlus size={14} />
          {t.addMember}
        </button>
      </div>

      {/* Members List */}
      <div className="divide-y divide-slate-100">
        {members.map(member => (
          <div key={member.id} className="px-4 py-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                {member.avatar ? (
                  <img src={member.avatar} alt={member.name} className="w-full h-full rounded-full" />
                ) : (
                  <User size={20} className="text-slate-500" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {member.name}
                </p>
                <p className="text-xs text-slate-600 truncate">
                  {member.email}
                </p>
              </div>

              {/* Role Badge */}
              <span className={`text-[10px] font-semibold px-2 py-1 rounded flex-shrink-0 ${getRoleColor(member.role)}`}>
                {member.role}
              </span>

              {/* Active Status */}
              {member.active && (
                <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" title="Active" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
